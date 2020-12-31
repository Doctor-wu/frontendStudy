/**
 * 数塔问题
 *
 * 从数塔的顶层出发，在每一个节点可以选择向左或者向右走，一直走到最底层，要求找出一条路径，使得路径上的数值和最大。
 * */

class RandomNumTower {
    public tower: number[][] = [];
    public maxAdd: number[][] = [];
    public path: number[][] = [];

    constructor(public size: number) {
        this.generateRandomNumTower();
        this.print(this.tower, 100);
        this.programming(this.maxAdd, this.path, this.tower);
    }

    private generateRandomNumTower() {
        for (let i = this.size - 1; i >= 0; i--) {
            this.tower[i] = new Array(i + 1).fill("").map(() => ~~(Math.random() * 100))
        }
    }

    private programming(maxAdd: number[][], path: number[][], tower: number[][]) {
        let size = tower.length;
        maxAdd[size - 1] = [];// 行初始化
        tower[size - 1].forEach((v, i) => {
            maxAdd[size - 1][i] = v;
        });

        for (let i = size - 2; i >= 0; i--) {
            maxAdd[i] = [];// 行初始化
            path[i] = [];
            tower[i].forEach((_, index) => {
                let max = maxAdd[i + 1][index] > maxAdd[i + 1][index + 1];
                maxAdd[i][index] = tower[i][index] + (max ? maxAdd[i + 1][index] : maxAdd[i + 1][index + 1]);
                path[i][index] = max ? index : index + 1;
            })
        }
        this.print(maxAdd, 100);
        this.print(path, 100);
    }

    /**
     * 打印函数
     * @param tower
     * @param radix
     */
    print(tower: number[][], radix: number = 10) {
        let space = new Array(String(radix).length).fill(" ").join("");
        tower.forEach((level, currIndex) => {
            console.log(`${new Array(this.size - currIndex).fill(space).join("")}${level.map(transformRadix).join(space)}`);
        })
        console.log(); // 换行
        function transformRadix(item: number) {
            if (item > radix) return item;
            let templateLength = String(radix).length;
            let itemLength = String(item).length;
            return new Array(templateLength - itemLength).fill(" ").join("") + item;
        }
    }

    /**
     * 打印路径
     * @param path
     */
    printPath(path: number[][]) {
        path.reduce((last, curr) => {
            console.log(curr[last]);
            return curr[last];
        }, 0)
    }
}


new RandomNumTower(10);
