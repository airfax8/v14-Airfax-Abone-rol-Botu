const {EmbedBuilder} = require("discord.js");
const config = require("../config.js");


exports.run = async (client, message, args) => {

    const embed = new EmbedBuilder()
    .setTitle(`${message.guild.name} **|** Yardım`)
    .setDescription("**KOMUTLAR**\n ```js\n!help, !ping\n```\n\n **Abone Sistemi;**\n ```js\n!abone-sorumlu, !abone-rol, !abone-log, !abone-stat, !abone \n```")
    .setFooter({ text: `Asked by ${message.author.tag}.`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
    .setTimestamp()  
    return message.reply({embeds : [embed]});

};
exports.conf = {
  aliases: ["help"]
};

exports.help = {
  name: "yardım"
};
