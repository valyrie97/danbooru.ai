import $ from 'jquery';

const Danbooru = require('danbooru');
let booru;
import credentials from './../../credentials.js';
if(credentials && credentials.login) {
	booru = new Danbooru(`https://${credentials.login}:${credentials.api_key}@danbooru.donmai.us`);
} else {
	booru = new Danbooru(`https://danbooru.donmai.us`);
}



$(document).ready(_ => {
	const swiper = $('booru-swiper');
	nextImage();

	swiper.on('next', nextImage);
	swiper.on('love', nextImage);
	swiper.on('like', nextImage);

	function nextImage() {
		booru.posts({ tags: 'breasts', limit: 1, random: true }).then(async (gotPost) => {
			// $('booru-gallery')[0].posts = gotPost;
			swiper[0].post = gotPost[0];
		});
	}
});