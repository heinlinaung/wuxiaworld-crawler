const Crawler = require('js-crawler');
const prefix_url = "https://www.wuxiaworld.com";

var config = {
startPage: 1200,
endPage: 1250
}

var crawler = new Crawler().configure({ignoreRelative: false, depth: 2});
for (var i = config.startPage; i <= config.endPage; i++) 
{
	console.log('i value is '+i);
}
