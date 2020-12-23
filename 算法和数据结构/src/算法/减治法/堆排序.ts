export class Heap<T> {
    public size:number;
    public data:Array<T>;
    constructor(data:Array<T>) {
        this.data = [...data];
        this.size = this.data.length;
    }
}

export class MaxHeap<T> extends Heap<T>{
    constructor(arr:Array<T>){
        super(arr);
        this.rebuildHeap();
        this.sort();
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
        console.log(L)
        for(let i = L;i>=0;i--){
            this.maxHeapify(i);
        }
        return this.data;
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
        return this.data;
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
        return this.data[i];
    }
}

export function left(i:number){
    return i * 2 + 1;
}

export function right(i:number){
    return i * 2 + 2;
}

export function swap<T>(arr:Array<T>, src:number, des:number){
    let temp:T;
    temp = arr[src];
    arr[src] = arr[des];
    arr[des] = temp;
    return arr;
}
