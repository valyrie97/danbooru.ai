import {LitElement, html} from 'lit-element';

class Swiper extends LitElement {
	
	static get properties() {
		return {
			post: {
				type: String
			}
		}
	}

	updated() {
		// console.log(this.post);
		// console.log(this.post.tag_string);
		console.log(this.post.file_url);
		// console.log(this.censored(this.post.tag_string))
	}

	
	censored(tag_string) {
		return (tag_string.indexOf('loli') > -1) ||
					 (tag_string.indexOf('shota') > -1) ||
					 (tag_string.indexOf('toddlercon') > -1);
	}

	render() {
		return html`
		
		<style>
.main.alt {
	${this.post ? `background: url(${this.post.preview_file_url});` : ''});
  background-repeat: none;
  background-repeat: no-repeat;
  background-size: contain;
	background-position: center;
}
.main.bigalt {
	${this.post ? `background: url(${this.post.large_file_url});` : ''});
  background-repeat: none;
  background-repeat: no-repeat;
  background-size: contain;
	background-position: center;
}
.main {
	${this.post ? `background: url(${this.post.file_url});` : ''});
  height: 100vh;
  width: 100vw;
	position:absolute;
	top: 0px;
	left: 0px;
  background-repeat: none;
  background-repeat: no-repeat;
  background-size: contain;
	background-position: center;
}

.button {
  --size: 100px;
  background: white;
  border-radius: 50%;
  height: var(--size);
  width: var(--size);
  display:inline-block;
  float: center;
  text-align: center;
  font-size: calc(var(--size) / 2);
  line-height: var(--size);
  margin: 16px 24px;
  cursor: pointer;
  transition: background 300ms;
}

.button:hover {
  background: #C1C1C1;
}
.button:active {
  background: #505050;
}

.buttons {
  position: fixed;
  bottom: 0px;
  text-align: center;
  width: 100vw;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0+1,0.65+100 */
background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.65) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 1%,rgba(0,0,0,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0) 1%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */

}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
		</style>
		
		
<div>
  <div class="main alt noselect"></div>
  <div class="main noselect"></div>
  <div class="main bigalt noselect"></div>
  <div class="buttons noselect">
    <div @click=${this.next.bind(this)} class="button noselect">❌</div>
    <div @click=${this.reload.bind(this)} class="button noselect">💙</div>
    <div @click=${this.like.bind(this)} class="button noselect">❤️</div>
  </div>
</div>
		`;
	}

	async reload() {
		const post = this.post;
		this.post = {};
		await new Promise (res => setTimeout(res, 500));
		this.post = post;
	}

	next() {
		// console.log('next')
		this.dispatchEvent(new CustomEvent('next', {post: this.post || null}));
	}

	like() {
		// console.log('like')
		this.dispatchEvent(new CustomEvent('like', {post: this.post || null}));
	}

	love() {
		// console.log('love')
		this.dispatchEvent(new CustomEvent('love', {post: this.post || null}));
	}
}

window.customElements.define('booru-swiper', Swiper);



