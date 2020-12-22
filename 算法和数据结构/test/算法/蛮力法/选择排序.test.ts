import {SelectionSort} from "../../../src/算法/蛮力法/选择排序"


test("selection-sort-0", () => {
    let list = new SelectionSort([5, 3, 2, 6, 2, 8]);
    expect(list.sort()).toEqual([2, 2, 3, 5, 6, 8]);
})

test("selection-sort-1", () => {
    let randomArray = new Array(50).fill('').map(Math.random);
    let list = new SelectionSort(randomArray);
    expect(list.sort()).toEqual([...randomArray].sort(((a, b) => a - b)));
    console.log(list);
})
