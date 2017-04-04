"use strict"

const group_token = 'a7acb2c3d44ad4102eeb7800f01212d2363b52f96c7f8c37c798205f1d43dcac1e9d446a6a5d59358a032';

const VK = require("VK-Promise");
const vk = new VK(group_token);

const getZero = (value, inc) => {
    let int;
    inc ? int = value + 1 : int = value;
    let result;
    int < 10 ? result = `0${int}` : result = `${int}`;
    return result;
};

const getDate = () => {
    const date = new Date();
    return `${getZero(date.getDate())}.${getZero(date.getMonth(), true)}.${date.getFullYear()} ${getZero(date.getHours())}:${getZero(date.getMinutes())}:${getZero(date.getSeconds())}`;
};
 
vk.init_longpoll();

let message_id;

vk.on("message", function (event, msg) {
	if(msg.id === message_id + 1) return;
	message_id = msg.id;
    msg.send(getDate());
});