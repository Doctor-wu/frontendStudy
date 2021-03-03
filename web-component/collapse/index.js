import Collpase from "./collapse.js";
import CollpaseItem from "./collapse-item.js";
import EventBus from "./event-bus.js";

customElements.define("dt-collapse", Collpase);
customElements.define("dt-collapse-item", CollpaseItem);

export let $event = new EventBus();

$event.on("collapse-item-update",(item)=>{
    console.log(item.isShow);
    item.render();
});
console.log($event);
