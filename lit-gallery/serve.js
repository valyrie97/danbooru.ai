const Express = require('express');
const ffp = require('find-free-port');
const open = require('open')

const app = new Express();

app.get('/', (req, res) => {
	res.redirect('/demo/index.html');
})

app.use(Express.static('./'));


ffp(8080, async (err, port) => {
	if(err) return console.error(err);

	app.listen(port);
	console.log()
	console.log('demo http server is listening on port ' + port);

	console.log('opening demo page...')
	await open('http://localhost:' + port + '/');
	console.log('success!');
})
