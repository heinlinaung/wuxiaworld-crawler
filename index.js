const Crawler = require('js-crawler');

var config = {
prefix_url : "https://www.wuxiaworld.com",
type : "novel",
novelName : "renegade-immortal",
chapter_prefix : "rge-chapter-",
startPage: 1200,
endPage: 1200
}

var crawler = new Crawler().configure({ignoreRelative: false, depth: 1});
for (var i = config.startPage; i <= config.endPage; i++) 
{
	// Expected url -> https://www.wuxiaworld.com/novel/renegade-immortal/rge-chapter-1165 
	let url = config.prefix_url + '/' + config.type + '/' + config.novelName + '/' + config.chapter_prefix + i; 
	console.log('URL is '+url);
	crawler.crawl({
  		url:url, 
		success: function(page) {
    			console.log(page.content);
 		 },
  		failure: function(page) {
    			console.log(page.status);
  		}
	});
}
