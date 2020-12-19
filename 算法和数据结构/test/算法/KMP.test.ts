import {KMP} from "../../src/算法/KMP";

test("get-next",()=>{
    expect(KMP.getNext("ababc")).toEqual([-1,0,0,1,2]);
    expect(KMP.getNext("adaddadd")).toEqual([-1,0,0,1,2,0,1,2]);
});

test("kmp-compare-0",()=>{
    expect(KMP.compare("ababaababcb","ababc")).toEqual(5);
});

test("kmp-compare-1",()=>{
    expect(KMP.compare("cdmamdmmaassdd","maass")).toEqual(7);
});
