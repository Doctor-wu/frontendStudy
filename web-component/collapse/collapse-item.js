import { $event } from "./index.js";
class CollpaseItem extends HTMLElement {
  constructor() {
    super();
    this.isShow = true;
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

        :host:hover{
            box-shadow: 2px 2px 8px 2px #333;
            border: 1px solid black;
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
            height: auto;
            max-height: 600px;
            padding: 15px 8px 0 8px;
            margin-bottom: 15px;
            overflow: hidden;
            transition: all 0.3s ease-out;
        }

        :host>.content.collapsed{
            max-height: 0px;
            padding: 0 8px;
            margin-bottom: 0px;
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

      this.shadowRoot.querySelector(".content").classList.remove("collapsed");
    } else {
      this.shadowRoot.querySelector(".content").classList.add("collapsed");
    }
  }
}

export default CollpaseItem;
