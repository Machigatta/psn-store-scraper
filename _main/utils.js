var request = require("request")

class mUtils {
    constructor() {

    }

    getJSON(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) reject(error);
                if (response.statusCode != 200) {
                    reject('Invalid status code <' + response.statusCode + '>');
                }
                resolve(body);
            });
        });
    }
}

module.exports.mUtils = new mUtils();