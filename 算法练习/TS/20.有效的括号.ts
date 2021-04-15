function isValid(s: string): boolean {
  if (s.length % 2) {
    return false;
  }
  let dist: any = {
      "]": "[",
      "}": "{",
      ")": "(",
    },
    stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in dist)) stack.push(s[i]);
    else {
      if (stack[stack.length - 1] !== dist[s[i]]) return false;
      else stack.pop();
    }
  }
  return stack.length === 0;
}
