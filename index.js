"use strict"

const group_token = 'a7acb2c3d44ad4102eeb7800f01212d2363b52f96c7f8c37c798205f1d43dcac1e9d446a6a5d59358a032';


const VK = require("VK-Promise");
const vk = new VK(group_token);

const getDate = require('./getDate');
 
vk.init_longpoll();

vk.on("message", (event, msg) => {	
	if(!msg.out) 
		msg.send(getDate());
});