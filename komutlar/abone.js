const { Client, TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials, MessageActivityType } = require("discord.js");
const  config = require("../config.js")
const db = require("croxydb")

exports.run = async (client, message) => {
  const logKanal = db.fetch(`abonelog_${message.guild.id}`)
  const abonerol = db.fetch(`abonerol_${message.guild.id}`)
  const abonesorumlu = db.fetch(`abonesorumlu_${message.guild.id}`)
    const bilgi = db.fetch(`abonebilgi_${message.author.id}`)
    let user = message.mentions.users.first()

    if(!message.member.roles.cache.has(abonesorumlu)) return message.reply("abone yetkilisi rolün yok")
    if(!user) return message.reply("birini etiketle ")
    if(!abonekanal) return message.reply(`Lütfen Komudu <#${abonekanal}> Kanalında Kullanın!`)
    const embed = new EmbedBuilder()
    .setAuthor({ name: 'Abone Rolü Başarıyla Verildi', iconURL: message.author.displayAvatarURL(), url: "https://www.youtube.com/@Airfax-Developer" })

    const log = new EmbedBuilder()
    .setAuthor({ name: `${user}`, iconURL: message.author.displayAvatarURL() })
    .addFields(
        {
        name: "Abone Rolü Veren:",
        value: `<@${message.author.id}>`,
        inline: true
      },
      {
        name: "Abone Rolü Alan:",
        value: `${user}`,
        inline: true
      },
      {
        name: "Abone Bilgi:",
        value: `\`\`\`yml\n${bilgi || 0}\`\`\``,
        inline: true
      },)

    
    
    await message.reply({embeds : [embed]});
    db.set(`abonebilgi_${message.author.id}`, +1)
    db.add(`abonebilgi_${message.author.id}`, +1)
    db.get(`abonebilgi_${message.author.id}`, +1)

    message.guild.members.cache.get(user.id).roles.add(abonerol)
    message.guild.channels.cache.get(logKanal).send({ embeds: [log]})
  
  };
  exports.conf = {
    aliases: ["a"]
  };
  
  exports.help = {
    name: "abone"
  }