import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

import './form';
import './search';
import './todo';

class Main extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const dummyData = [
      { id: 2, title: 'Seize the day', description: 'Do something great today!', active: true },
      { id: 1, title: 'Create Todo using Lit HTML', description: 'Its fun!', active: false }];

    this.searchText = '';

    this.todos = JSON.parse(localStorage.getItem('todos')) || dummyData;
    
    this.htmlElement = (todos) => html`
      <style>
        .container {
          width: 960px;
          margin: 0 auto;
          padding: 20px 0;
        }
      </style>

      <div class="container">
        <app-form .addTodo=${this.addTodo}></app-form>
        <app-search .searchTodo=${this.searchTodo}></app-search>

        ${repeat(todos, (todo) => todo.id, (todo) => html`
        <app-todo
          .todo=${todo}
          .actions=${{
            deleteTodo: this.deleteTodo,
            toggleTodo: this.toggleActiveTodo
          }}
          id=${todo.id}
          status=${todo.active ? 'undone' : 'done'}>
        </app-todo>
        `)}

      </div>
    `;
  }

  addTodo = (todo) => {
    this.todos = [
      todo,
      ...this.todos
    ]

    this.saveTodos();
    this.renderList();
  }

  deleteTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this.saveTodos();
    this.renderList();
  }

  toggleActiveTodo = (id) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) todo.active = !todo.active;
      return todo;
    });

    this.saveTodos();
  }

  searchTodo = (value) => {
    this.searchText = value.toLowerCase();
    this.renderList();
  }

  saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  connectedCallback() {
    this.renderList();
  }

  renderList = () => {
    const todos = this.todos.filter(todo => todo.title.toLowerCase().includes(this.searchText) ||
      todo.description.toLowerCase().includes(this.searchText));

    render(this.htmlElement(todos), this.shadowRoot);
  }
}

window.customElements.define('app-main', Main);