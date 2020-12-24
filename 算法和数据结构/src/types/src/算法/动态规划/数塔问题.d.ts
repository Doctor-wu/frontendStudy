/**
 * 数塔问题
 *
 * 从数塔的顶层出发，在每一个节点可以选择向左或者向右走，一直走到最底层，要求找出一条路径，使得路径上的数值和最大。
 * */
declare class RandomNumTower {
    size: number;
    tower: number[][];
    maxAdd: number[][];
    path: number[][];
    constructor(size: number);
    private generateRandomNumTower;
    private programming;
    print(tower: number[][]): void;
    printPath(path: number[][]): void;
}
