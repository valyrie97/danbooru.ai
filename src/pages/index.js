import $ from 'jquery';
import credentials from './../../credentials.js';
const Danbooru = require('danbooru');
let post;
let booru;
booru = new Danbooru(`https://${credentials.login}:${credentials.api_key}@danbooru.donmai.us`);


booru.posts({ limit: 1, random: true }).then(async (gotPost) => {
	post = gotPost;
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
	$('booru-gallery').attr('posts', post);
});