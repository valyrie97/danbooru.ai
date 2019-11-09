console.log('%c%s', 'border-radius:5px;background-color:#333333;padding:1em 2em; margin: 1em', 'booru.ai THINGS');

import credentials from './../credentials.js';
import Danbooru from 'danbooru';
let booru;

if(credentials.login && credentials.api_key) {
	console.log('authenticated!')
	booru = new Danbooru(`https://${credentials.login}:${credentials.api_key}@danbooru.donmai.us`);
} else {
	console.log('browsing signed out...')
	booru = new Danbooru(`https://danbooru.donmai.us`);
}

export default booru;