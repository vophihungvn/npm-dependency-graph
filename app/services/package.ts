import * as http from "http";
import * as querystring from "querystring";
import * as GraphBuilder from "npmgraphbuilder";
import { PackageGraph } from "./package.d";
import cache from "./cache";

const Graph = require("ngraph.graph");

function httpClient(url, data) {
  return new Promise((resolve, reject) => {
    http.get(url + "?" + querystring.stringify(data), function(res) {
      var body = "";
      res.setEncoding("utf8");
      res
        .on("data", function(chunk) {
          body += chunk;
        })
        .on("end", function() {
          resolve({ data: JSON.parse(body) });
        })
        .on("error", reject);
    });
  });
}

class PackageService {
  graph: any;
  graphBuilder: any;

  constructor() {
    this.graph = Graph();
    this.graphBuilder = GraphBuilder(httpClient);
  }

  async getGraph(pkgName: String): Promise<PackageGraph | any> {
    const packageInfo: PackageGraph = {
      nodes: [],
      edges: []
    };

    try {
      const cacheKey = cache.getKey(pkgName);
      const cached = await cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const graphData = await this.graphBuilder.createNpmDependenciesGraph(
        pkgName,
        this.graph
      );

      graphData.forEachNode(function(node) {
        packageInfo.nodes.push(node.data.name);
      });

      graphData.forEachLink(link => {
        packageInfo.edges.push({
          from: link.fromId.split("@")[0],
          to: link.toId.split("@")[0]
        });
      });
      await cache.set(cacheKey, packageInfo);
      return packageInfo;
    } catch (error) {
      return {
        message: "Something wrong"
      };
    }
  }
}

export default new PackageService();
