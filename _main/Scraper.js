var mUtils = require("./utils.js").mUtils
const { StoreObject } = require("./StoreObject.js")

class Scraper {
    constructor() {
        this.storeApiPattern = "https://store.playstation.com/store/api/chihiro/00_09_000/container/{REGION}/{LANGUAGE}/999/{OBJECT}";
    }

    async scrape(urlObj, callback, settingsObject) {
        return new Promise((resolve, reject) => {

            let resolveArray = [];
            let urlList = (Array.isArray(urlObj) ? urlObj : [urlObj]);
            let _settings = (typeof settingsObject === 'undefined') ? { logOutput: false, logError: false } : settingsObject;
            _settings.logOutput = (typeof _settings.logOutput === 'undefined') ? false : _settings.logOutput;
            _settings.logError = (typeof _settings.logError === 'undefined') ? true : _settings.logError;

            var mRegExp = new RegExp(/(https:\/\/store.playstation.com\/)(.*)(\/.*\/)(.*)/);
            urlList.forEach(async url => {
                if (!mRegExp.test(url)) {
                    reject(`Invalid URL given: ${url}`);
                } else {
                    let res = mRegExp.exec(url);
                    let product = res[4];
                    let language = res[2].split("-")[0];
                    let region = res[2].split("-")[1];

                    let storeApiUrl = this.storeApiPattern;
                    storeApiUrl = storeApiUrl.replace("{REGION}", region);
                    storeApiUrl = storeApiUrl.replace("{LANGUAGE}", language);
                    storeApiUrl = storeApiUrl.replace("{OBJECT}", product);

                    try {
                        if (_settings.logOutput) {
                            console.log(storeApiUrl);
                        }

                        let jsonBody = JSON.parse(await mUtils.getJSON(storeApiUrl));
                        let sObj = new StoreObject(
                            jsonBody.id,
                            jsonBody.name,
                            jsonBody.default_sku.display_price,
                            (jsonBody.default_sku.rewards !== undefined && Object.entries(jsonBody.default_sku.rewards).length !== 0 && jsonBody.default_sku.constructor === Object) ? { new_price: jsonBody.default_sku.rewards[0].display_price, plus_required: jsonBody.default_sku.rewards[0].isPlus, discount_percent: jsonBody.default_sku.rewards[0].discount } : null,
                            jsonBody.game_contentType,
                            jsonBody.playable_platform,
                            jsonBody.release_date,
                            jsonBody.provider_name,
                            jsonBody.long_desc,
                            jsonBody.images
                        );

                        if (_settings.logOutput) {
                            console.log(sObj);
                        }
                        (typeof callback != 'undefined') ? callback(sObj): null;

                        resolveArray.push(sObj);
                        if (resolveArray.length == urlList.length) {
                            resolve(resolveArray);
                        }


                    } catch (error) {
                        if (_settings.logError) {
                            console.error('ERROR:');
                            console.error(error);
                        }
                        reject(error);
                    }
                }
            });
        });
    }
}

module.exports = {
    Scraper
}