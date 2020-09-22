import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat";

import "./AppForm";
import "./AppTodo";
import "./AppSearch";

/**
 * `<app-main>` is a top level app component
 *
 * @class AppMain
 * @extends {LitElement}
 */
class AppMain extends LitElement {
  /**
   * Static getter properties.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppMain
   */
  static get properties() {
    return {
      /**
       * Todo objects list.
       *
       * @type {{todos: Array}}
       */
      todos: { type: Array },

      /**
       * Search text value.
       *
       * @type {{searchText: String}}
       */
      searchText: { type: String },
    };
  }

  /**
   * Static getter styles.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppMain
   */
  static get styles() {
    return css`
      .container {
        width: 960px;
        margin: 0 auto;
        padding: 20px 0;
      }
    `;
  }

  /**
   * Creates an instance of AppMain.
   * Initialize todos and search text value
   *
   * @memberof AppMain
   */
  constructor() {
    super();

    const dummyData = [
      {
        id: 2,
        title: "Seize the day",
        description: "Do something great today!",
        active: true,
      },
      {
        id: 1,
        title: "Create Todo using Lit HTML",
        description: "Its fun!",
        active: false,
      },
    ];

    this.searchText = "";
    this.todos = JSON.parse(localStorage.getItem("todos")) || dummyData;
  }

  /**
   * Add todo to todo-list.
   *
   * @param {Object} todo Todo object
   * @memberof AppMain
   */
  addTodo = (todo) => {
    this.todos = [todo, ...this.todos];
  };

  /**
   * Delete todo from todo-list.
   *
   * @param {Number} id Todo id
   * @memberof AppMain
   */
  deleteTodo = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  /**
   * Toggle active status of todo.
   *
   * @param {Number} id Todo id
   * @memberof AppMain
   */
  toggleActiveTodo = (id) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, active: !todo.active } : todo
    );
  };

  /**
   * Set search text.
   *
   * @param {String} value Search text
   * @memberof AppMain
   */
  handleSearchText = (value) => {
    this.searchText = value.toLowerCase();
  };

  /**
   * Store todo-list to local storage.
   * @memberof AppMain
   */
  storeTodo = () => {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  };

  /**
   * Handle add todo.
   *
   * @param {Number} id Todo id.
   * @memberof AppMain
   */
  handleAdd = (id) => {
    this.addTodo(id);
    this.storeTodo();
  };

  /**
   * Handle delete todo.
   *
   * @param {Number} id Todo id.
   * @memberof AppMain
   */
  handleDelete = (id) => {
    this.deleteTodo(id);
    this.storeTodo();
  };

  /**
   * Handle todo status toggle.
   *
   * @param {Number} id Todo id.
   * @memberof AppMain
   */
  handleToggleActive = (id) => {
    this.toggleActiveTodo(id);
    this.storeTodo();
  };

  /**
   * Filter and render todo-list.
   *
   * @param {Array} todos Todo-list array.
   * @param {String} searchText Search text string.
   * @returns {customElement}
   * @memberof AppMain
   */
  renderList = (todos, searchText) => {
    let list = todos;

    if (searchText) {
      list = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(this.searchText) ||
          todo.description.toLowerCase().includes(this.searchText)
      );
    }

    return html`
      ${repeat(
        list,
        (todo) => todo.id,
        (todo) => html`
          <app-todo
            .todo=${todo}
            .handleDelete=${this.handleDelete}
            .handleToggle=${this.handleToggleActive}
            id=${todo.id}
          >
          </app-todo>
        `
      )}
    `;
  };

  /**
   * Render life cycle hook.
   *
   * @returns {customElement}
   * @memberof AppMain
   */
  render() {
    return html`
      <div class="container">
        <app-form .handleAdd=${this.handleAdd}></app-form>
        <app-search .handleSearch=${this.handleSearchText}></app-search>

        ${this.renderList(this.todos, this.searchText)}
      </div>
    `;
  }
}

window.customElements.define("app-main", AppMain);
