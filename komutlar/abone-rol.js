const {Discord, Client, PermissionFlagsBits, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.js");
const db = require("croxydb")


exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);

    let rol = message.mentions.roles.first()
    if(!rol) return message.channel.send("kanal Belirt")

    db.set(`abonerol_${message.guild.id}`, rol.id)
    return message.reply("Başarıyla Ayarlandı")


};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "abone-rol"
};
