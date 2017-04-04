"use strict"

const group_token = 'a7acb2c3d44ad4102eeb7800f01212d2363b52f96c7f8c37c798205f1d43dcac1e9d446a6a5d59358a032';

const VK = require("VK-Promise");
const vk = new VK(group_token);

const getDate = require('./getDate');
 
vk.init_longpoll();

let message_id;
let last_from_id;

vk.on("message", function (event, msg) {
	if(msg.id === message_id + 1 && last_from_id === msg.from_id) return;
	message_id = msg.id;
	last_from_id = msg.from_id;
    msg.send(getDate());
});