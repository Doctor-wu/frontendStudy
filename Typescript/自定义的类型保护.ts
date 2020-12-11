interface Bird{
    leg: number;
    birdLeg: number;
}
interface Dog{
    leg: number;
    dogLeg: number;
}

function isBird(x:any):x is Bird{
    return x.leg === 2;
}

function getLeg(x:Bird|Dog):number{
    if(isBird(x)){
        return x.birdLeg;
    }else{
        return x.dogLeg;
    }
}
