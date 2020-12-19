import {BinarySearchTree} from "../../src/数据结构/Tree"

test("Tree-transverse",()=>{
    const tree = new BinarySearchTree();

    tree.insert(2);
    tree.insert(3);
    tree.insert(10);
    tree.insert(1);

    expect([...tree.inorder()].map(n=>n.key)).toEqual([1,2,3,10])
})
