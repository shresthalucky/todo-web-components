import { LitElement, html, css } from "lit-element";

/**
 * `<app-search>` is a search input component.
 *
 * @class AppSearch
 * @extends {LitElement}
 */
class AppSearch extends LitElement {
  /**
   * Static getter styles.
   *
   * @readonly
   * @static
   * @returns {Object}
   * @memberof AppSearch
   */
  static get styles() {
    return css`
      div {
        margin: 20px 0;
      }
      input {
        width: 100%;
        padding: 6px 8px;
        box-sizing: border-box;
      }
    `;
  }

  /**
   * Handle change in input value.
   *
   * @param {Object} event Input event object.
   * @memberof AppSearch
   */
  handleInputChange = (event) => {
    this.handleSearch(event.target.value);
  };

  /**
   * Render life cycle hook.
   *
   * @returns {customElement}
   * @memberof AppSearch
   */
  render() {
    return html`
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          @input=${this.handleInputChange}
        />
      </div>
    `;
  }
}

window.customElements.define("app-search", AppSearch);
