
const ms = require('ms');
const db = require('croxydb');
const {Discord, PermissionFlagsBits, EmbedBuilder} = require('discord.js');
const config = require("../config.js")

module.exports.run = async(client, message, args) => {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);


  if(!db.fetch(`abonesistem_${message.guild.id}`)) {
    
    db.set(`abonesistem_${message.guild.id}`, true)
    message.channel.send("✅ | Abone Sistemi Açıldı.")
    
 } else {
    
    db.delete(`abonesistem_${message.guild.id}`)
    message.channel.send("✅ | Abone Sistemi Kapatıldı.")
    
  }

  
  
};


exports.conf = {
  aliases: [],
};
exports.help = {
  name: 'sistem',
   description: 'Susturma',
  usage: 'timeout <@kullanıcı> <süre>'
};