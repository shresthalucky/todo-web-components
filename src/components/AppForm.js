import { LitElement, html, css } from "lit-element";

import "./AppButton";

/**
 * `<app-form>` is a todo form component.
 *
 * @class AppForm
 * @extends {LitElement}
 */
class AppForm extends LitElement {
  /**
   * Static getter properties.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppForm
   */
  static get properties() {
    return {
      /**
       * Todo title value.
       *
       * @type {{title: String}}
       */
      title: { type: String },

      /**
       * Todo description value.
       *
       * @type {{description: String}}
       */
      description: { type: String },
    };
  }

  /**
   * Static getter styles for todo form.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppForm
   */
  static get styles() {
    return css`
      .wrapper {
        padding: 20px;
        border: 1px solid #eee;
        background-color: #fff;
        border-radius: 6px;
      }
      div {
        padding: 6px 0;
      }
      input[type="text"],
      textarea {
        width: 100%;
        padding: 6px 8px;
        box-sizing: border-box;
      }
      textarea {
        resize: vertical;
      }
    `;
  }

  /**
   * Creates an instance of AppForm.
   * Initialize empty title and description value.
   *
   * @memberof AppForm
   */
  constructor() {
    super();
    this.clearTodo();
  }

  /**
   * Clear todo input fields.
   *
   * @memberof AppForm
   */
  clearTodo = () => {
    this.title = "";
    this.description = "";
  };

  /**
   * Handle change in input value.
   *
   * @param {Object} event Input event object.
   * @memberof AppForm
   */
  handleInputChange = (event) => {
    this[event.target.name] = event.target.value;
  };

  /**
   * Handle add todo submission.
   *
   * @memberof AppForm
   */
  handleAddTodo = () => {
    if (this.title) {
      const todo = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        active: true,
      };

      this.handleAdd(todo);
      this.clearTodo();
    }
  };

  /**
   * Render life cycle hook.
   *
   * @returns {customElement}
   * @memberof AppForm
   */
  render() {
    return html`
      <div class="wrapper">
        <form>
          <div>
            <label>Title</label>
            <div>
              <input
                type="text"
                name="title"
                @input="${this.handleInputChange}"
                .value="${this.title}"
              />
            </div>
          </div>
          <div>
            <label>Description</label>
            <div>
              <textarea
                name="description"
                @input="${this.handleInputChange}"
                .value="${this.description}"
              ></textarea>
            </div>
          </div>
          <div>
            <app-button
              .label="${"Add"}"
              .color=${"green"}
              .handleClick=${this.handleAddTodo}
              @input=${this.handleInputChange}
            >
            </app-button>
          </div>
        </form>
      </div>
    `;
  }
}

window.customElements.define("app-form", AppForm);
