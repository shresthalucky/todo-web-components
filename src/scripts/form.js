import { html, render } from 'lit-html';

import './button';

class Form extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.htmlElement = html`
      <style>
        .wrapper {
          padding: 20px;
          border: 1px solid #eee;
          background-color: #fff;
          border-radius: 6px;
        }

        div {
          padding: 6px 0;
        }

        input[type="text"], textarea {
          width: 100%;
          padding: 6px 8px;
          box-sizing: border-box;
        }

        textarea {
          resize:vertical;
        }
      </style>
      
      <div class="wrapper">
        <form>
          <div>
            <label>Title</label>
            <div>
              <input type="text" name="title" required>
            </div>
          </div>
          <div>
            <label>Description</label>
            <div>
              <textarea name="description"></textarea>
            </div>
          </div>
          <div>
            <app-button .label="${'Add'}" .color=${'green'} .onClick=${this.submitForm}></app-button>
          </div>
        </form>
      </div>
    `;
  }

  submitForm = () => {
    this.shadowRoot.querySelector('form').requestSubmit();
  }

  handleAddTodo = (e) => {
    e.preventDefault();

    const todo = {
      id: Date.now(),
      title: e.target.title.value,
      description: e.target.description.value,
      active: true
    }

    this.addTodo(todo);
    e.target.reset();
  }

  connectedCallback() {

    render(this.htmlElement, this.shadowRoot);

    this.shadowRoot.querySelector('form')
      .addEventListener('submit', this.handleAddTodo);
  }

}

window.customElements.define('app-form', Form);
