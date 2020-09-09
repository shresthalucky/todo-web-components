const buttonTemplate = document.createElement('template');

buttonTemplate.innerHTML = `
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
    
    <button></button>
  `;

class Button extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
    this.buttonElement = this.shadowRoot.querySelector('button');
  }

  static get observedAttributes() {
    return ['btn-label', 'btn-color'];
  }

  set color(value) {
    this.setAttribute('btn-color', value);
  }

  set label(value) {
    this.setAttribute('btn-label', value);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }

  render = () => {
    this.buttonElement.innerHTML = this.getAttribute('btn-label');
    this.buttonElement.className = this.getAttribute('btn-color');
  }
}

window.customElements.define('app-button', Button);