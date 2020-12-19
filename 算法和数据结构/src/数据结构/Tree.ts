/**
 * 二叉搜索树
 * 搜索时间和树的高度成正比例
 * 对任何一个节点x，对任何一个x左边的节点y，y.key <= x.key;
 * 对任何一个x右边的节点y，y.key >= x.key
 */
type treeNode<T> = BinarySearchTreeNode<T> | null;

export class BinarySearchTreeNode<T>{
    public parent:treeNode<T>;
    public left:treeNode<T>;
    public right:treeNode<T>;
    constructor(public key:T) {
        this.parent = null;
        this.left = null;
        this.right = null;
        // this.value = value;
    }
}

export class BinarySearchTree<T>{
    constructor(public root?:treeNode<T>) {
    }

    insert(key:T) {
        const node = new BinarySearchTreeNode(key);

        let p = this.root;

        // 尾指针
        let tail = this.root;
        while(tail){
            p = tail;

            if(tail.left && key < tail.key){
                tail = tail.left;
            } else if(tail.right && key > tail.key){
                tail = tail.right;
            }else{
                tail = null;
            }
        }


        if(!p){
            this.root = node;
            return;
        }

        if(p.key < key){
            p.right = node;
        }else{
            p.left = node;
        }
        node.parent = p;
    }


    *inorder(node?:BinarySearchTreeNode<T>):IterableIterator<BinarySearchTreeNode<T>>{
        if(!node) {
            if(this.root) node = this.root;
            else return;
        }
        if(node.left){
            yield* this.inorder(node.left);
        }
        yield node;
        if(node.right){
            yield* this.inorder(node.right);
        }
    }
}
