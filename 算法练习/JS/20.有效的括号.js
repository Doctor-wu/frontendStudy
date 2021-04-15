"use strict";
function isValid(s) {
    if (s.length % 2) {
        return false;
    }
    var dist = {
        "]": "[",
        "}": "{",
        ")": "(",
    }, stack = [];
    for (var i = 0; i < s.length; i++) {
        if (!(s[i] in dist))
            stack.push(s[i]);
        else {
            if (stack[stack.length - 1] !== dist[s[i]])
                return false;
            else
                stack.pop();
        }
    }
    return stack.length === 0;
}
