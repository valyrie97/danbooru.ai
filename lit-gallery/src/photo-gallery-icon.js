import { LitElement, html } from 'lit-element';




class PhotoGalleryIcon extends LitElement {
  static get properties() {
    return {
      icon: {
        type: String
      }
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
        }

        .icon {
          display: block;
          width: 24px;
          height: 24px;
          @apply --photo-gallery-icon;
        }
      </style>

      ${(_ => {
        if(this.isIcon('arrow-back', this.icon)) {
          return html`
            <svg class='icon' viewBox='0 0 24 24' fill='white'>
              <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/>
              <path d='M0 0h24v24H0z' fill='none'/>
            </svg>
          `;
        }
      })()}
      
      ${(_ => {
        if(this.isIcon('chevron-left', this.icon)) {
          return html`
            <svg class='icon' viewBox='0 0 24 24' fill='white'>
              <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/>
              <path d='M0 0h24v24H0z' fill='none'/>
            </svg>
          `;
        }
      })()}
      
      ${(_ => {
        if(this.isIcon('chevron-right', this.icon)) {
          return html`
            <svg class='icon' viewBox='0 0 24 24' fill='white'>
              <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/>
              <path d='M0 0h24v24H0z' fill='none'/>
            </svg>
          `;
        }
      })()}
    `;
  }

  isIcon(name, icon) {
    return name === icon
  }
}

window.customElements.define('photo-gallery-icon', PhotoGalleryIcon)
