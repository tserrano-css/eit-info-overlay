import { LitElement, html, css } from 'lit';
import { DileOverlayMixin } from '@dile/dile-overlay-mixin';
import { DileCloseDocumentClickMixin } from '@dile/dile-close-document-click-mixin';

const icon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-info-circle"
  viewBox="0 0 16 16"
>
  <path
    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
  />
  <path
    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
  />
</svg>`;

export class EitInfoOverlay extends DileOverlayMixin(
  DileCloseDocumentClickMixin(LitElement)
) {
  static styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      span {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      #overlay {
        box-sizing: border-box;
        display: none;
        position: absolute;
        text-align: left;
        opacity: 0;
        color: var(--eit-info-overlay-color, #303030);
        background-color: var(--eit-info-overlay-background-color, #f5f5f5);
        padding: var(--eit-info-overlay-padding, 1rem);
        border: var(--eit-info-overlay-border, 1px solid #eee);
        box-shadow: var(
          --eit-info-overlay-box-shadow,
          0 0 10px rgba(0, 0, 0, 0.2)
        );
        width: var(--eit-info-overlay-width, 250px);
        transition: ease 0.5s;
        transition-property: transform, opacity;
        transform: translateY(-10px);
      }
      #overlay.opened {
        opacity: 1;
        transform: translateY(0);
      }
      svg {
        width: var(--eit-info-overlay-icon-size, 32px);
        height: var(--eit-info-overlay-icon-size, 32px);
      }
      path {
        fill: var(--eit-info-overlay-icon-color, #de0303);
        transition: fill 0.3s ease;
      }
      path[fill='none'] {
        fill: transparent;
      }
    `,
  ];

  static get properties() {
    return {
      opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      if(this.opened) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  render() {
    return html`
      <span id="trigger" @click=${this.toggle}> ${icon} </span>
      <div id="overlay" @click=${this.stopClick} class="${this._overlayClass}">
        <slot></slot>
      </div>
    `;
  }

  stopClick(e) {
    e.stopPropagation();
  }
}
