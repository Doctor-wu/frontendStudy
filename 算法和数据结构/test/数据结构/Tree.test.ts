import {BinarySearchTree, BinarySearchTreeNode} from "../../src/数据结构/Tree"

test("Tree-transverse",()=>{
    const tree = new BinarySearchTree(new BinarySearchTreeNode(4));

    tree.insert(2);
    tree.insert(3);
    tree.insert(10);
    tree.insert(7);
    tree.insert(1);

    expect([...tree.inorder()].map(n=>n.key)).toEqual([1,2,3,4,7,10])
})
