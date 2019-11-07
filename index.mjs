import Express from 'express';
import fs from 'fs';
import request from 'request';
import path from 'path';

const app = new Express();

app.get('/', (req, res) => {
	res.redirect('/index.html');
});

app.use(Express.static('./static'));
app.use(Express.static('./dist'));

console.log('app listening on port 80');
app.listen(80);
// confugreProxy(35);

function confugreProxy(port) {
	const api = Express();

	api.use((req, res) => {
		console.log((path.parse(req.originalUrl)));
		let {dir: domain, base: rest} = (path.parse(req.originalUrl));
		domain = domain.substr(1);
		
		let url = `https://${domain}/${rest}`;
		console.log(domain)
		console.log(rest)
		console.log(url)

		request({
			method: req.method,
			url
		}, (err, url, data) => {
			console.log(err, url);

			res.statusCode = 200;
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(data);

		});
		// console.log(req);
		// console.log(res);
		// res.statusCode = 404;
		// res.end('');
	});

	console.log('app listening on port ' + port);
	api.listen(port);
}