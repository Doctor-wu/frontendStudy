interface Bird {
    leg: number;
    birdLeg: number;
}
interface Dog {
    leg: number;
    dogLeg: number;
}
declare function isBird(x: any): x is Bird;
declare function getLeg(x: Bird | Dog): number;
