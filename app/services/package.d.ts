export interface Edge {
  from: String;
  to: String;
}

export interface PackageGraph {
  nodes: String[];
  edges: Edge[];
}
