const template = document.createElement("template");

template.innerHTML = /* html */ `
  <style>
    div {
      background-color: var(--clr-gray-200);
      position: relative;
      border-radius: 50%;
      width: var(--spacing-300);
      height: var(--spacing-300);;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    div.active {
      background-color: var(--clr-gray-400);
    }

    img {
      transform: translateY(-2px);
    }
  </style>
  <div>
    <img src="/assets/images/icon-share.svg" />
  </div>
`;

class ShareButton extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this._active = false;
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.addEventListener("click", this._toggleActive);
    this.tooltip = document.querySelector("share-tooltip");
  }

  _toggleActive() {
    this._active = !this._active;
    const button = this.root.querySelector("div");
    button.classList.toggle("active", this._active);

    if (this.tooltip) {
      this.tooltip.toggleVisibility(this._active);
    }
  }
}

customElements.define("share-button", ShareButton);
