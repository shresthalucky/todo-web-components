class List extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.todos.forEach(todo => {
      const todoElement = document.createElement('app-todo');

      todoElement.actions = this.actions;
      todoElement.todo = todo;
      todoElement.actions = this.actions;
      this.shadowRoot.appendChild(todoElement);
    });
  }

}

window.customElements.define('app-list', List);
