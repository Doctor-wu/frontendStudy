import {InsertSort} from "../../../src/算法/减治法/插入排序"

test("insert-sort",()=>{
    let record = [23, 123, 43, 20, 1, 4, 23, 3, 42, 123, 53, 57, 45, 234, 41, 31, 12, 8];
    expect(new InsertSort(record).sort()).toEqual([...record].sort((a,b)=>a-b))
})
