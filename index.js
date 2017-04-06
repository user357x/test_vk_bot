"use strict"

const request = require('superagent');
const VK = require("VK-Promise");

const getDate = require('./getDate');
const tryJSON = require('./tryJson');

const vk = new VK('a7acb2c3d44ad4102eeb7800f01212d2363b52f96c7f8c37c798205f1d43dcac1e9d446a6a5d59358a032');

vk("messages.getLongPollServer", {
    use_ssl: 1
}).then(function next(data) {
    if (!data.server) throw data;
    vk.on("LongPollRequest", data);
    return request.get("https://" + data.server + "?act=a_check&key=" + data.key + "&ts=" + data.ts + "&wait=25&mode=128")
        .then(res => tryJSON(res.text))
        .then(function(body) {
            vk.on("LongPollResponse", body);
            if (body.error || body.failed){
                throw body;
            }else if (body.updates) {
            	//console.log(JSON.stringify(body));
            	if(body.updates[0] && body.updates[0][0] === 7) 
                	body.updates.map(vk.on.bind(this, "update"));
                data.ts = body.ts;
            }
            return next(data);
        });
}).catch(function(e) {
	console.error(e);
    vk.on("LongPollError",e);
});

vk.on("message", (event, msg) => {
    vk.messages.send({
        peer_id: msg.peer_id,
        message: getDate()
    });
});