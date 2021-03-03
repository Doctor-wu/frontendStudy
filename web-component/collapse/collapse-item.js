import { $event } from "./index.js";
class CollpaseItem extends HTMLElement {
  constructor() {
    super();
    this.isShow = true;
    this.name = this.getAttribute("data-name");
    let shadow = this.attachShadow({ mode: "open" });

    let template = document.getElementById("collapse_item_tmpl");
    let templateContent = template.content;
    let cloneElement = templateContent.cloneNode(true);
    shadow.appendChild(cloneElement);

    let style = document.createElement("style");
    style.textContent = `
        :host{
            margin-bottom: 5px;
        }
        
        :host>.title{
            min-height: 35px;
            line-height: 35px;
            background-color: #efefef;
            cursor: pointer;
            padding: 0 3px;
            color: #3a3a3a;
        }

        :host>.content{
            padding: 15px 8px 0 8px;
            margin-bottom: 15px;
            transition: all ease-in-out .3s;
        }

        :host>.content.hide{
            height: 0px;
            padding: 0 8px;
            margin-bottom: 0px;
            overflow: hidden;
        }
    `;
    shadow.appendChild(style);

    this.initEvent();
    this.render();
  }

  initEvent() {
    this.shadowRoot.querySelector(".title").addEventListener("click", () => {
      this.isShow = this.isShow ? false : true;
      $event.emit("collapse-item-update", this);
    });
  }

  render() {
    console.log("render");
    if (this.isShow) {
      let title = this.getAttribute("data-title");
      this.shadowRoot.querySelector(".title").textContent = title;

      this.shadowRoot.querySelector(".content").classList.remove("hide");
    } else {
      this.shadowRoot.querySelector(".content").classList.add("hide");
    }
  }
}

export default CollpaseItem;
