import { html, render } from 'lit-html';

class Button extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.htmlElement = (label, color) => html`
      <style>
        button {
          cursor: pointer;
          color: #fff;
          border: 0;
          padding: 8px 10px;
          border-radius: 4px;
        }

        .green {
          background-color: #28e236;
        }

        .red {
          background-color: #e22828;
        }
      </style>
      <button class="${color}" @click=${this.handleClick}>${label}</button>
    `;
  }

  handleClick = () => {
    this.onClick();
    render(this.htmlElement(this.label, this.color), this.shadowRoot);
  }

  connectedCallback() {
    render(this.htmlElement(this.label, this.color), this.shadowRoot);
  }

}

window.customElements.define('app-button', Button);