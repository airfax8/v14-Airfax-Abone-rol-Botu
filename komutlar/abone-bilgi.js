const { TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const db = require("croxydb")
const  config = require("../config.js")

exports.run = async (client, message) => {
    const aboneyetkili = db.fetch(`abonesorumlu_${message.guild.id}`)
    const bilgi = db.fetch(`abonebilgi_${message.author.id}`, +1)
    const user = message.mentions.users.first() || message.author;
    const bilgi2 = db.fetch(`abonebilgi_${user.id}`, +1)

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
  aliases: ["c"]
};

exports.help = {
  name: "abone-bilgi"
};