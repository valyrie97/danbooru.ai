import $ from 'jquery';


const images = [
	{
		file_url: 'https://danbooru.donmai.us/data/sample/__ping_hai_ning_hai_ping_hai_universal_bullin_and_ning_hai_azur_lane_drawn_by_ipuu_el_ane_koubou__sample-6c7b8a992100e390db9c7ae70dd49e95.jpg'
	},
	{
		file_url: 'https://danbooru.donmai.us/data/sample/__original_drawn_by_okamired__sample-10f16990a9cbb66889379059f0435540.jpg'
	}
];
let counter = 0;

$(document).ready(_ => {
	const swiper = $('booru-swiper');

	swiper.on('next', nextImage);
	swiper.on('love', nextImage);
	swiper.on('like', nextImage);

	function nextImage() {
		swiper[0].post = images[counter];
		counter ++;
		counter %= images.length;
	}
});