const mainTemplate = document.createElement('template');

mainTemplate.innerHTML = `
  <style>
    .container {
      width: 960px;
      margin: 0 auto;
      padding: 20px 0;
    }
  </style>
  
  <div class="container"></div>
`;

class Main extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true));

    const dummyData = [
      { id: 2, title: 'Seize the day', description: 'Do something great today!', active: true },
      { id: 1, title: 'Create Todo using Web Components', description: 'Its fun!', active: false }];

    this.searchText = '';

    this.todos = JSON.parse(localStorage.getItem('todos')) || dummyData;
    this.containerElement = this.shadowRoot.querySelector('div.container');
    this.todoFormElement = document.createElement('app-form');
    this.searchElement = document.createElement('app-search');
  }

  addTodo = (todo) => {
    this.todos = [
      todo,
      ...this.todos
    ]

    this.saveTodos();
    this.render();
  }

  deleteTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this.saveTodos();
    this.render();
  }

  toggleActiveTodo = (id) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) todo.active = !todo.active;
      return todo;
    });

    this.saveTodos();
    this.render();
  }

  searchTodo = (value) => {
    this.searchText = value.toLowerCase();
    this.render();
  }

  saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  connectedCallback() {
    this.todoFormElement.addTodo = this.addTodo;
    this.searchElement.searchTodo = this.searchTodo;

    this.containerElement.appendChild(this.todoFormElement);
    this.containerElement.appendChild(this.searchElement);
    this.renderList();
  }

  renderList = () => {
    const todoListElement = document.createElement('app-list');

    todoListElement.actions = {
      deleteTodo: this.deleteTodo,
      toggleTodo: this.toggleActiveTodo
    }

    todoListElement.todos = this.todos.filter(todo => todo.title.toLowerCase().includes(this.searchText) ||
      todo.description.toLowerCase().includes(this.searchText));

    this.containerElement.appendChild(todoListElement);
  }

  render = () => {
    const list = this.shadowRoot.querySelector('app-list');

    this.containerElement.removeChild(list);
    this.renderList();
  }
}

window.customElements.define('app-main', Main);