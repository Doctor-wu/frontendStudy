class MinStack {
  private stack: number[];
  private minStack: number[];
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.addMinStackItem(val);
    this.stack.push(val);
  }

  addMinStackItem(val: number) {
    if (!this.minStack.length) this.minStack.push(val);
    else if (val <= this.minStack[this.minStack.length - 1]) this.minStack.push(val);
  }

  pop(): void {
    this.deleteMinStackItem(this.stack.pop()!);
  }

  deleteMinStackItem(val: number) {
    if (val === this.minStack[this.minStack.length - 1]) this.minStack.pop();
  }

  top(): number {
    return this.stack.slice(-1)[0];
  }

  getMin(): number {
    return this.minStack.slice(-1)[0];
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 * pop、top 和 getMin 操作总是在 非空栈 上调用。
 */
