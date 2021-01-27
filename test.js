class CInteractor {
    constructor(array) {
        this.array = iterateArray(array);
        console.log(this.array);
        if(array.length !== 0){
            this.hasnext = true;
        }else{
            this.hasnext = fasle;
        }
    }
    next() {
        if(!this.hasnext) return null;
        let x = this.array.shift();
        if(this.array.length === 0) this.hasnext = false;
        return x;

    }
    hasNext() {
        return this.hasnext;
    }
}

function iterateArray(array){
    let arr = [];
    array.forEach(item=>{
        if(Array.isArray(item))
            arr = arr.concat(...iterateArray(item))
        else
            arr.push(item);
    });
    return arr;
}

let it = new CInteractor([[1,1],2,[1,[1,2]]]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
