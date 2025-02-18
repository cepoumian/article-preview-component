const tooltipTemplate = document.createElement("template");

tooltipTemplate.innerHTML = /* html */ `
  <style>
    .tooltip {
      --translate-y: -8rem;
      --translate-x: -8rem;
      --tooltip-padding-y: var(--spacing-100);
      --tooltip-padding-x: var(--spacing-400);
      position: absolute;
      align-items: center;
      gap: 2rem;
      background-color: var(--clr-gray-900);
      padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
      border-radius: var(--border-radius-1);
      display: none;
      visibility: hidden;
      opacity: 0;
      transform: translateY(var(--translate-y)) translateX(var(--translate-x));
      transition: opacity 0.3s ease, visibility 0s 0.3s;
    }

    .tooltip::after {
      --border-width: 15px;
      content: "";
      position: absolute;
      bottom: calc(var(--border-width) * -2 + 1px);
      border-width: var(--border-width);
      left: 50%;
      border-style: solid;
      border-color: var(--clr-gray-900) transparent transparent transparent;
    }

    .tooltip.show {
      display: flex;
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease, visibility 0s 0.3s;
    }
    
    @media (max-width: 761px) {
      .tooltip {
        --tooltip-padding-y: var(--spacing-50);
        --tooltip-padding-x: var(--spacing-200);
      }

      .tooltip::after {
        left: calc(50% + 1rem);
      }
    }

    @media (max-width: 600px) {
      .tooltip {
        --translate-y: -2.6rem;
        --translate-x: -15.1rem;
      }

      .tooltip::after {
        --border-width: 10px;
        bottom: 30%;
        border-width: var(--border-width);
        left: calc(100% - 3px);
        border-style: solid;
        border-color: transparent transparent transparent var(--clr-gray-900);
      }
    }
  </style>
  <div class="tooltip">
    <slot name="text"></slot>
    <slot name="icons"></slot>
  </div>
`;

class ShareTooltip extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.appendChild(tooltipTemplate.content.cloneNode(true));
    this._active = false;
  }

  toggleVisibility(isActive) {
    const tooltip = this.shadowRoot.querySelector(".tooltip");

    if (isActive) {
      tooltip.classList.add("show");
    } else {
      tooltip.classList.remove("show");
    }
  }
}

customElements.define("share-tooltip", ShareTooltip);
