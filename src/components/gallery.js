import {LitElement, html} from 'lit-element';
const Danbooru = require('danbooru');

class Gallery extends LitElement {
	constructor(...args) {
		super(...args);
		// debugger;
		this.posts = [];
		this.query = "";
		this.currentQuery = "";
		this.loading = true;
	}

	static get properties() {
		return {
			posts: {
				type: Array
			},
			query: {
				type: String
			},
			login: {
				type: String
			},
			api_key: {
				type: String
			}
		}
	}

	censored(tag_string) {
		return (tag_string.indexOf('loli') > -1) ||
					 (tag_string.indexOf('shota') > -1) ||
					 (tag_string.indexOf('toddlercon') > -1);
	}

	renderPost(post) {
		// return html`<br/><pre>loli tag: ${post.tag_string.indexOf('loli') > -1}</pre><br/><pre>${post.file_url}</pre><br/>`;
		if(post.file_url) {
			return html`
				<img src="${post.preview_file_url}" aspect-ratio="${post.image_width / post.image_height}"></img>
			`;
		} else {
			console.warn('image consored, log in to view');
			return '';
			return html`<div class="item" style="background: red;" data-url="${post.preview_file_url}" aspect-ratio="${post.image_width / post.image_height}"><pre>URL: ${post.preview_file_url}
			
censored: ${this.censored(post.tag_string)}
			</pre></div>`;
		}
	}

	render() {
		return html`
			<style>
				.status {
					line-height: 40px;
					margin: 0px auto;
				}
				.censored {
					box-sizing: border-box;
					border: 4px solid red;
				}
			</style>
			<div gallery>
				${(_ => {
					if(this.posts.length !== 0) {
						return this.posts.map(this.renderPost.bind(this))
					} else if(!this.loading) {
						return html`
							<div class="status">
								There are no images that match your query.
							</div>
						`;
					} else {
						return html`
							<div class="status">
								Loading images...
							</div>
						`;
					}
				})()}
			</div>
		`;
	}

	updated(changedProperties) {
		// debugger;
		// super.update();
		// console.log('update', `${this.currentQuery} => ${this.query}`, this.posts.length);
		// super.firstUpdated();
		// Perform a search for popular image posts
		// if we havent updated the request since the query has changed

		for(let [key] of changedProperties) {
			switch(key) {
				case 'query':
				case 'login':
				case 'api_key': 
					this.updatePosts();
					break;
			}
		}
	}

	updatePosts() {
		this.posts = [];
		this.loading = true;
		const query = this.query;
		let booru;
		if(!this.login || !this.api_key) return;
		if(this.login && this.api_key)
			booru = new Danbooru(`https://${this.login}:${this.api_key}@danbooru.donmai.us`);
		else booru = new Danbooru();
		let opt = {
			tags: this.query || "rating:safe",
			limit: 200,
		};
		
		booru.posts(opt).then(async (posts) => {
			this.currentQuery = query;
			// console.log(posts)
			this.posts = posts;
			this.loading = false;
		});
	}
}

window.customElements.define('booru-gallery', Gallery);