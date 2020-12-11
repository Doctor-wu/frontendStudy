export {}

interface Fish{
    name1:string;
}
interface Water{
    name2:string;
}
interface Bird{
    name3:string;
}
interface Sky{
    name4:string;
}

type Condition<T> = T extends Fish?Water:Sky;

let con:Condition<Fish> = {
    name2: "水"
}


// 条件类型的分发
let con1:Condition<Fish|Bird> = {
    name2: "",
    // name4: ""
}
// con1的类型为：Water | Sky

type Diff<T,U> = T extends U?never:T;
type R = Diff<'a'|'b'|'c'|'d', 'a'|'b'|'c'>;
// type R = 'd'
