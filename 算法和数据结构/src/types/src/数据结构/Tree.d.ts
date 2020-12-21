/**
 * 二叉搜索树
 * 搜索时间和树的高度成正比例
 * 对任何一个节点x，对任何一个x左边的节点y，y.key <= x.key;
 * 对任何一个x右边的节点y，y.key >= x.key
 */
declare type treeNode<T> = BinarySearchTreeNode<T> | null;
declare type ClipNull<U> = U extends null ? never : U;
export declare class BinarySearchTreeNode<T> {
    key: T;
    parent: treeNode<T>;
    left: treeNode<T>;
    right: treeNode<T>;
    constructor(key: T);
}
export declare class BinarySearchTree<T> {
    root?: BinarySearchTreeNode<T> | null | undefined;
    constructor(root?: BinarySearchTreeNode<T> | null | undefined);
    insert(key: T): void;
    inorder(node?: ClipNull<treeNode<T>>): IterableIterator<ClipNull<treeNode<T>>>;
}
export {};
