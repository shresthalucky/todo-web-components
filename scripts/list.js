class List extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  toggleActive = (id) => {

    const todoElement = this.shadowRoot.getElementById(id);
    const active = this.todos.find(todo => todo.id === id).active;
    
    todoElement.setAttribute('status', active ? 'done' : 'undone');
    
    this.actions.toggleTodo(id);
  }

  connectedCallback() {
    this.todos.forEach(todo => {
      const todoElement = document.createElement('app-todo');

      todoElement.setAttribute('id', todo.id);
      todoElement.setAttribute('status', todo.active ? 'undone' : 'done');
      
      todoElement.actions = {
        ...this.actions,
        toggleTodo: this.toggleActive
      };

      todoElement.todo = todo;
      this.shadowRoot.appendChild(todoElement);
    });
  }

}

window.customElements.define('app-list', List);
