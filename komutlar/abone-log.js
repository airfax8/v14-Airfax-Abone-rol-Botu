
const {Discord, PermissionFlagsBits, Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.js");
const db = require("croxydb")


exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);

    let kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send("kanal Belirt")

    db.set(`abonelog_${message.guild.id}`, kanal.id)
    return message.reply("Başarıyla Ayarlandı")


};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "abone-log"
};
