import "./index.scss";
import bg from "./bg.png";

const img = new Image();
img.src = bg;

document.body.insertBefore(img, document.body.firstChild);

console.log("Hello webpack");

const promiseArr = [new Promise((r) => {
    r(1)
})].map(p => p.then())

console.log(promiseArr)