import $ from 'jquery';
import booru from '../danbooru.js';


$(document).ready(_ => {
	const swiper = $('booru-swiper');
	nextImage();

	swiper.on('next', nextImage);
	swiper.on('love', nextImage);
	swiper.on('like', nextImage);

	function nextImage() {
		booru.posts({ tags: 'breasts', limit: 1, random: true }).then(async (posts) => {
			swiper[0].post = posts[0];
		});
	}
});