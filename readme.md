# psn-store-scraper


## Install

Fetch the newest version via NPM

`npm install psn-store-scraper`

## Usage

Import the constructor:

```js 
let Scraper = require('psn-store-scraper').Scraper;
```

Using the Promises to retrieve:
```js 
Scraper.scrape("https://store.playstation.com/de-de/product/XXXXX").then(result => console.log(result))
```

Calling a Callback:
```js 
Scraper.scrape("https://store.playstation.com/de-de/product/XXXXX", function(sObject){
    console.log(sObject.name);
});
```

Settings:
```js 
//sets the console.log flags
let settingsObject = { 
        logOutput: true, //default false
        logError: true //default true
    };

Scraper.scrape("https://store.playstation.com/de-de/product/XXXXX", function(sObject){
    console.log(sObject.name);
}, settingsObject);
```



## StoreObject

```js
    id
    name
    old_price
    discount {
        new_price
        plus_required
        discount_percent
    }
    type
    platforms
    release_date
    provider
    description
    images [
        {
            type
            url
        }
    ]
```