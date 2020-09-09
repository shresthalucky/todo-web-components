const formTemplate = document.createElement('template');

formTemplate.innerHTML = `
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
        <app-button btn-label="Add" btn-color="green"></app-button>
      </div>
    </form>
  </div>
`;

class Form extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
    this.formElement = this.shadowRoot.querySelector('form');
    this.submitButton = this.shadowRoot.querySelector('app-button');
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

    e.target.title.value = '';
    e.target.description.value = '';
  }

  connectedCallback() {
    this.formElement.addEventListener('submit', this.handleAddTodo);
    this.submitButton.addEventListener('click', () => { this.formElement.requestSubmit(); });
  }

}

window.customElements.define('app-form', Form);
