interface Tree {
    left: Tree | null;
    label: any;
    right: Tree | null;
}

function Tree(left: Tree | null, label: any, right: Tree | null): Tree {
    return {
        left,
        label,
        right,
    }
}

function makeTree(array: Array<any>): Tree | any {
    // 判断是否为叶子节点
    if (array.length === 1) return Tree(null, array[0], null);
    return Tree(array[0], array[1], array[2]);
}


function genTree(): Tree {
    return makeTree([
        Math.random() > .5 ? genTree() : null,
        ~~(Math.random() * 100),
        Math.random() > .5 ? genTree() : null
    ])
}


let tree = genTree();
console.log(tree)

function* inorder(tree: Tree): Iterable<Tree> {
    if (tree.left) {
        yield* inorder(tree.left);
    }
    yield tree.label;
    if (tree.right) {
        yield* inorder(tree.right);
    }
}

console.log(...inorder(tree))
