import "./index.scss";
import bg from "./bg.png";

const img = new Image();
img.src = bg;

document.body.appendChild(img);

console.log("Hello webpack");