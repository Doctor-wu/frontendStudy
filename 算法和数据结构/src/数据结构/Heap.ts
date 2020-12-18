export class Heap<T> {
    public size:number;
    public data:Array<T>;
    constructor(data:Array<T>) {
        this.data = [...data];
        this.size = this.data.length;
        this.rebuildHeap();
    }

    rebuildHeap(){}
}

export class MaxHeap<T> extends Heap<T>{
    constructor(arr:Array<T>){
        super(arr);
    }


    /**
     * 重构堆
     * [1,2,3,4,5]
     *      1
     *    2    3
     *   4 5
     */
    rebuildHeap(){
        const L = Math.floor(this.size / 2);
        for(let i = L - 1;i>=0;i--){
            this.maxHeapify(i);
        }
    }

    /**
     * 堆排序
     */
    sort(){
        for(let i = this.size - 1;i > 0; i--){
            swap(this.data, 0, this.size - 1);
            this.size--;
            this.maxHeapify(0);
        }
    }



    /**
     * 假设堆其它地方都满足性质
     * 唯独根节点不满足，重构堆性质
     * @param i
     */
    maxHeapify(i:number){
        let max = i;

        if(i >= this.size) return;

        // 求左右节点中较大的序号
        const l = left(i);
        const r = right(i);
        if(l < this.size &&　this.data[l]>this.data[max]){
            max = l;
        }

        if(r < this.size &&　this.data[r]>this.data[max]){
            max = r;
        }

        // 如果当前节点最大，已经是最大堆
        if(max === i){
            return;
        }

        swap<T>(this.data, i, max);

        this.maxHeapify(max);
    }
}

function left(i:number){
    return i * 2 + 1;
}

function right(i:number){
    return i * 2 + 2;
}

function swap<T>(arr:Array<T>, src:number, des:number){
    let temp:T;
    temp = arr[src];
    arr[src] = arr[des];
    arr[des] = temp;
}

// let mh = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
// // mh = new MaxHeap<number>([1,2,3,4,5]);
// console.log(mh.data)
// mh.sort();
// console.log(mh.data)
