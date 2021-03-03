class Collpase extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });

    let template = document.getElementById("collapse_tmpl");
    let templateContent = template.content;
    shadow.appendChild(templateContent.cloneNode(true));

    let style = document.createElement("style");
    style.textContent = `
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px;
            border: 2px solid #dfdfdf;
            border-radius: 8px;
        }
    `;
    shadow.appendChild(style);
  }
}

export default Collpase;
