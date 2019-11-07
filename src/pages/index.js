import $ from 'jquery';
import credentials from './../../credentials.js';

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