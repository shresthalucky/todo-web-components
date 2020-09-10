import { html, render } from 'lit-html';

class Search extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.htmlElement = html`
      <style>
        div {
          margin: 20px 0;
        }
        input {
          width: 100%;
          padding: 6px 8px;
          box-sizing: border-box;
        }
      </style>
      
      <div>
        <input type="text" name="search" placeholder="Search">
      </div>
    `;
  }

  handleInputChange = (e) => {
    this.searchTodo(e.target.value);
  }

  connectedCallback() {

    render(this.htmlElement, this.shadowRoot);

    this.shadowRoot.querySelector('input')
      .addEventListener('input', this.handleInputChange);
  }

}

window.customElements.define('app-search', Search);
