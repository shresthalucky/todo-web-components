import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import "./AppButton";

/**
 * `<app-todo>` is a detailed todo component.
 *
 * @class AppTodo
 * @extends {LitElement}
 */
class AppTodo extends LitElement {
  /**
   * Static getter properties.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppTodo
   */
  static get properties() {
    return {
      /**
       * Todo detail object.
       *
       * @type {{todo: Object}}
       */
      
      todo: { type: Object },
    };
  }

  /**
   * Static getter styles.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppTodo
   */
  static get styles() {
    return css`
      .todo {
        background-color: #fff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 6px;
      }
      h2,
      p {
        margin: 0;
        padding: 0;
      }
      .todo.complete h2,
      .todo.complete p {
        text-decoration: line-through;
      }
      .todo-actions {
        margin-top: 20px;
      }
    `;
  }

  /**
   * Handle todo delete action.
   * 
   * @memberof AppTodo
   */
  handleDeleteTodo = () => {
    this.handleDelete(this.todo.id);
  };

  /**
   * Handle toggle todo status action.
   * 
   * @memberof AppTodo
   */
  handleToggleActive = () => {
    this.handleToggle(this.todo.id);
  };

  /**
   * Render life cycle hook.
   *
   * @returns {customElement}
   * @memberof AppTodo
   */
  render() {
    return html`
      <div
        class="todo ${classMap({ todo: true, complete: !this.todo.active })}"
      >
        <h2>${this.todo.title}</h2>
        <p>${this.todo.description}</p>

        <div class="todo-actions">
          <app-button
            .color="${"green"}"
            .label="${this.todo.active ? "Done" : "Undone"}"
            .handleClick=${this.handleToggleActive}
          >
          </app-button>

          <app-button
            .color="${"red"}"
            .label="${"Delete"}"
            .handleClick=${this.handleDeleteTodo}
          >
          </app-button>
        </div>
      </div>
    `;
  }
}

window.customElements.define("app-todo", AppTodo);
