const todoTemplate = document.createElement('template');

todoTemplate.innerHTML = `
  <style>

    .todo {
      background-color: #fff;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
    }

    h2, p {
      margin: 0;
      padding: 0;
    }

    .todo.done h2, .todo.done p {
      text-decoration: line-through;
    }

    .todo-actions {
      margin-top: 20px;
    }
  </style>
  
  <div class="todo">
    <h2></h2>
    <p></p>
    <div class="todo-actions"></div>
  </div>
`;

class Todo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(todoTemplate.content.cloneNode(true));

    this.todoElement = this.shadowRoot.querySelector('div.todo');
    this.titleElement = this.shadowRoot.querySelector('h2');
    this.descriptionElement = this.shadowRoot.querySelector('p');
    this.actionsElement = this.shadowRoot.querySelector('div.todo-actions');
    this.doneButton = document.createElement('app-button');
    this.deleteButton = document.createElement('app-button');

    this.state = {}
  }

  handleDeleteTodo = () => {
    this.actions.deleteTodo(this.todo.id);
  }

  handleToggleActive = () => {
    this.actions.toggleTodo(this.todo.id);
    this.state.active = !this.state.active;
    this.render();
  }

  connectedCallback() {
    this.state.active = this.todo.active;
    this.deleteButton.label = 'Delete';


    this.titleElement.innerHTML = this.todo.title;
    this.descriptionElement.innerHTML = this.todo.description;
    this.actionsElement.appendChild(this.doneButton);
    this.actionsElement.appendChild(this.deleteButton);

    this.deleteButton.addEventListener('click', this.handleDeleteTodo);
    this.deleteButton.color = 'red';

    this.doneButton.addEventListener('click', this.handleToggleActive);
    this.doneButton.color = 'green';

    this.render();
  }

  render = () => {
    this.todoElement.classList.add(this.state.active ? 'undone' : 'done');
    this.doneButton.label = this.state.active ? 'Done' : 'Undone';
  }

}

window.customElements.define('app-todo', Todo);
