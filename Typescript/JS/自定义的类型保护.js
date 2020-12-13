"use strict";
function isBird(x) {
    return x.leg === 2;
}
function getLeg(x) {
    if (isBird(x)) {
        return x.birdLeg;
    }
    else {
        return x.dogLeg;
    }
}
