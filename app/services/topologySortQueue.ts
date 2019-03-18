class TopologySort {
  nodes: Object = {};

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

  sort(): string[] {
    const keys = Object.keys(this.nodes);
    if (keys.length === 0) return [];
    const isTraveled = {};
    const results = [];
    const processing = [keys[0]];

    while (processing.length > 0) {
      const current = processing.pop();
      if (!isTraveled[current]) {
        isTraveled[current] = true;
        if (this.nodes[current].length === 0) {
          results.push(current);
          continue;
        }

        this.nodes[current].forEach(node => {});
      }
    }
  }
}

export default TopologySort;
