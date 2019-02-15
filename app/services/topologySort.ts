class TopologySort {
  nodes: Object = {};
  traveled: string[] = [];
  list: string[] = [];

  constructor({ nodes, edges }) {
    this._buildNodes(nodes, edges);
  }

  _buildNodes = (nodes, edges) => {
    nodes.forEach(node => {
      this.nodes[node] = [];
    });

    edges.forEach(({ from, to }) => {
      this.nodes[from].push(to);
    });
  };

  _isTraveled(node: string): boolean {
    return this.traveled.indexOf(node) >= 0;
  }

  _travelNode(node: string) {
    this.traveled.push(node);
    this.nodes[node].forEach(node => {
      if (!this._isTraveled(node)) {
        this._travelNode(node);
      }
    });
    this.list.push(node);
  }

  sort(): string[] {
    Object.keys(this.nodes).forEach(node => {
      if (!this._isTraveled(node)) {
        this._travelNode(node);
      }
    });
    return this.list;
  }
}

export default TopologySort;
