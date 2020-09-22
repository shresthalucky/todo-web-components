import { html, render } from 'lit-html';

import './button';

class Todo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.htmlElement = (todo) => html`
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
        .todo.complete h2, .todo.complete p {
          text-decoration: line-through;
        }
        .todo-actions {
          margin-top: 20px;
        }
      </style>

      <div class="todo ${!todo.active ? 'complete' : ''}">
        <h2>${todo.title}</h2>
        <p>${todo.description}</p>
        
        <div class="todo-actions">
          
          <app-button
            .color="${'green'}"
            .label="${todo.active ? 'Done' : 'Undone'}"
            .onClick=${this.handleToggleActive}>
          </app-button>

          <app-button
            .color="${'red'}"
            .label="${'Delete'}"
            .onClick=${this.handleDeleteTodo}>
          </app-button>
        
        </div>
      
      </div>
    `;
  }

  handleDeleteTodo = () => {
    this.actions.deleteTodo(this.todo.id);
  }

  handleToggleActive = () => {
    this.actions.toggleTodo(this.todo.id);
    render(this.htmlElement(this.todo), this.shadowRoot);
  }

  connectedCallback() {
    render(this.htmlElement(this.todo), this.shadowRoot);
  }

}

window.customElements.define('app-todo', Todo);
