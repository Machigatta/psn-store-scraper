//In your application: let Scraper = require('psn-store-scraper').Scraper;
let Scraper = require('./index.js').Scraper;

let urlArray = [
    "https://store.playstation.com/de-de/product/EP4060-CUSA12063_00-NEPTUNIA2D000001",
    "https://store.playstation.com/de-de/product/EP4060-CUSA12063_00-AV00000000000014"
]

//callback
Scraper.scrape(urlArray, function(sObject) {
    console.log(sObject);
});

// promise
Scraper.scrape(urlArray).then(result => console.log(result))