const TeleBot = require('node-telegram-bot-api');
const TOKEN = '900048883:AAHLoSLuep-W9ovzSJ5y-Z-xEtq9qL9KcAw';

const bot = new TeleBot(TOKEN, {
    polling: true
});
// http://t.me/NodejsFitBot

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    if(msg.text){
        bot.sendMessage(chatId, `echo: ${msg.text}`);
    }
    else{
        bot.sendMessage(chatId, `Send a text message`);
    }
});
