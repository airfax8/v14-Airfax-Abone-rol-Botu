const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args) => {

  
  return message.reply(`${client.ws.ping}ms`)

};
exports.conf = {
  aliases: ["pong"]
};

exports.help = {
  name: "ping"
};