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
      opacity: 0;
      transform: translateY(var(--translate-y)) translateX(var(--translate-x));
      transition: opacity 0.3s ease, display 0s 0.3s;
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
      opacity: 1;
      transition: opacity 0.3s ease;
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

    .tooltip__text {
      font-size: var(--fs-300);
      letter-spacing: var(--letter-spacing-2);
      color: var(--clr-gray-400);
      font-weight: var(--fw-light);
    }

    .tooltip__icons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .tooltip__link {
      display: block;
      color: var(--clr-white);
      text-decoration: none;
      padding: 0.3rem 0;
    }

    .tooltip__link:hover {
      color: var(--clr-gray-400);
    }
  </style>
  <div class="tooltip">
    <div class="tooltip__text">SHARE</div>
    <div class="tooltip__icons">
      <a href="#" class="tooltip__link"><img src="/images/icon-facebook.svg" /></a>
      <a href="#" class="tooltip__link"><img src="/images/icon-twitter.svg" /></a>
      <a href="#" class="tooltip__link"><img src="/images/icon-pinterest.svg" /></a>
    </div>
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
    this._active = isActive;
    const tooltip = this.shadowRoot.querySelector("div");
    tooltip.classList.toggle("show", this._active);
  }
}

customElements.define("share-tooltip", ShareTooltip);
