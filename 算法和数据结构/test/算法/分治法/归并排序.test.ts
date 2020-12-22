import {MergeSort} from "../../../src/算法/分治法/归并排序"

test("merge", () => {
    let merge = new MergeSort<number>([]).merge;

    expect(merge([3, 14, 22, 9, 11, 82], [], 3)).toEqual([3, 9, 11, 14, 22, 82]);
});

test("merge-sort", () => {
    let mergeSort = new MergeSort([23, 123, 43, 20, 1, 4, 23, 3, 42, 123, 53, 57, 45, 234, 41, 31, 12, 8])
    expect(mergeSort.sort()).toEqual([...mergeSort.record].sort((a, b) => a - b))
})
