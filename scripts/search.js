const searchTemplate = document.createElement('template');

searchTemplate.innerHTML = `
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

class Search extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(searchTemplate.content.cloneNode(true));
    this.inputElement = this.shadowRoot.querySelector('input');
  }

  handleInputChange = (e) => {
    this.searchTodo(e.target.value);
  }

  connectedCallback() {
    this.inputElement.addEventListener('input', this.handleInputChange);
  }

}

window.customElements.define('app-search', Search);
