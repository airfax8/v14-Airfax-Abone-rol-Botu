const { TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const db = require("croxydb")
const  config = require("../config.js")

exports.run = async (client, message) => {
    let bilgi = db.fetch(`abonestat_${message.guild.id}.${message.author.id}`)
    const user = message.mentions.users.first() || message.author;
    let bilgi2 = db.fetch(`abonestat_${message.guild.id}.${user.id}`)

  if(!user) {

    let stat = new EmbedBuilder()
    .setDescription(`Bu Kullanıcının Abone Etdiği kişiler; ${bilgi || 0}`)
    message.reply({ embeds: [stat] })
    }
if(user) {

  let stat2 = new EmbedBuilder()
    .setDescription(`Bu Kullanıcının Abone Etdiği kişiler; ${bilgi2 || 0}`)
    message.reply({ embeds: [stat2] })
    }



};
exports.conf = {
  aliases: ["abone-stat"]
};

exports.help = {
  name: "abone-bilgi"
};