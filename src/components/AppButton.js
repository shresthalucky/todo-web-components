import { LitElement, html, css } from "lit-element";

/**
 * `<app-button>` is a button component.
 *
 * @class AppButton
 * @extends {LitElement}
 */
class AppButton extends LitElement {
  /**
   * Static getter properties.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppButton
   */
  static get properties() {
    return {
      /**
       * Button label.
       *
       * @type {{label: String}}
       */
      label: { type: String },
    };
  }

  /**
   * Static getter styles.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppButton
   */
  static get styles() {
    return css`
      button {
        cursor: pointer;
        color: #fff;
        border: 0;
        padding: 8px 10px;
        border-radius: 4px;
      }
      .green {
        background-color: #28e236;
      }
      .red {
        background-color: #e22828;
      }
    `;
  }

  /**
   * Render life cycle hook.
   *
   * @returns {customElement}
   * @memberof AppButton
   */
  render() {
    return html`
      <button class="${this.color}" @click=${this.handleClick}>
        ${this.label}
      </button>
    `;
  }
}

window.customElements.define("app-button", AppButton);
