const Crawler = require('js-crawler');
const cheerio = require('cheerio');
const fs = require('fs');

var config = {
prefix_url : "https://www.wuxiaworld.com",
type : "novel",
novelName : "renegade-immortal",
chapter_prefix : "rge-chapter-",
startPage: 1401,
endPage: 1600
}

var CONTENT='';

var chaptersArr = [];
for (var i = config.startPage; i <= config.endPage; i++) 
{
	chaptersArr.push(i);
}

function krawl(urllll){
	return new Promise((resolve, reject) => {
		var crawler = new Crawler().configure({ignoreRelative: false, depth: 1});
	  	return crawler.crawl({
	  		url:urllll, 
			success: function(page) {
				var $ = cheerio.load(page.content);
				fs.appendFile(process.cwd()+'/files/'+config.chapter_prefix+config.startPage+'-'+config.endPage,$('#content-container > div.section > div > div.panel.panel-default').html(),function(err){
					if (err){
						return reject(err);
					}
					else{
						return resolve("done!");
					}
				});
	 		},
	  		failure: function(page) {
	  			console.log('Failed -> reKrawl');
	  			console.log('Failed URL -> '+urllll);
	    		return krawl(urllll);
	  		}
		});
	});
}
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
console.log("chaptersArr => "+chaptersArr);
const start = async () => {
  await asyncForEach(chaptersArr, async (num) => {
    // await waitFor(5000);
    let url;
    console.log('num -> ' + num)
    if(num==1455){
	let gg = 2;
        for(var i=0; i< gg; i++){
    	   url = config.prefix_url + '/' + config.type + '/' + config.novelName + '/' + config.chapter_prefix + num +'-'+(i+1); 
	   await krawl(url);
	}		
    }else{
    	url = config.prefix_url + '/' + config.type + '/' + config.novelName + '/' + config.chapter_prefix + num; 
	await krawl(url);
    }
  });
  console.log('Done');
}
start();
