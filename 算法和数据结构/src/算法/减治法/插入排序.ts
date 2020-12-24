import {ISort} from "../蛮力法/选择排序";

export class InsertSort<T> implements ISort<T>{
    constructor(public record:Array<T>) {
    }

    sort(){
        let sorted:T[] = [this.record[0]];
        for (let i = 1; i<this.record.length; i++){
            this.record[i] && this.insert(sorted,this.record[i]);
        }
        return sorted;
    }

    insert(sorted:T[], inserted:T){
        let insertIndex = sorted.length-1;
        while(sorted[insertIndex]>inserted){
            insertIndex--;
        }
        if(insertIndex < 0) {
            sorted.unshift(inserted);
            return;
        }
        sorted.splice(insertIndex+1,0,inserted);
    }
}
