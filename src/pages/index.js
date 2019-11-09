import $ from 'jquery';
const Danbooru = require('danbooru');
let booru;
import credentials from './../../credentials.js';
if(credentials && credentials.login) {
	booru = new Danbooru(`https://${credentials.login}:${credentials.api_key}@danbooru.donmai.us`);
} else {
	booru = new Danbooru(`https://danbooru.donmai.us`);
}


booru.posts({ limit: 1, random: true }).then(async (gotPost) => {
	$('booru-gallery')[0].posts = gotPost;
});

$(document).ready(_ => {
	$('booru-gallery').attr('login', credentials.login)
	$('booru-gallery').attr('api_key', credentials.api_key)
	$('[breasts]').click(_ => {
		$('booru-gallery').attr('query', 'breasts')
	});
	$('[naval]').click(_ => {
		$('booru-gallery').attr('query', 'navel')
	});
});