import {QuickSort} from "../../../src/算法/分治法/快速排序";

test("partition-0",()=>{
    let qs = new QuickSort([23,13,35,6,19,50,28],0,7),
        partitionFn = qs.partition.bind(qs);

    expect(partitionFn(0,6)).toEqual(3);
})

test("partition-1",()=>{
    let qs = new QuickSort([12,13],0,2),
        partitionFn = qs.partition.bind(qs);

    expect(partitionFn(0,1)).toEqual(0);
})

test("quick-sort", () => {
    let record = [23, 123, 43, 20, 1, 4, 23, 3, 42, 123, 53, 57, 45, 234, 41, 31, 12, 8];
    expect(new QuickSort(record, 0, record.length-1).sort()).toEqual([...record].sort((a,b)=>a-b));
})
