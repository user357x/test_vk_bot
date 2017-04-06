"use strict"

module.exports = body => {
    return new Promise(function(resolve, reject) {
        try {
            resolve(JSON.parse(body));
        } catch (error) {
            reject({
                error: {
                    error_code: -2,
                    error_msg: "Parse Error",
                    error: error,
                    body: body
                }
            });
        }
    });
}