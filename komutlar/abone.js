const { Client, TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials, MessageActivityType } = require("discord.js");
const  config = require("../config.js")
const db = require("croxydb")

exports.run = async (client, message) => {
  const sistem = db.fetch(`abonesistem_${message.guild.id}`)
  const logKanal = db.fetch(`abonelog_${message.guild.id}`)
  if (!logKanal) return message.reply("Log Kanalı Ayarlanmamış!")
  const abonerol = db.fetch(`abonerol_${message.guild.id}`)
  if (!abonerol) return message.reply("Abone Rol Ayarlamamışsın!")
  const abonesorumlu = db.fetch(`abonesorumlu_${message.guild.id}`)
  if (!abonesorumlu) return message.reply("Abone Sorumlu Rolü Ayarlamamışsın!")
    let user = message.mentions.users.first()

    if(!sistem) return message.reply(`Abone Sistemi Kapalı`)
    if(!message.member.roles.cache.has(abonesorumlu)) return message.reply("abone yetkilisi rolün yok")
 //   if (message.member.roles.cache.has(abonerol)) return message.reply("Ztn Abone Rolü Var")
    if(!user) return message.reply("birini etiketle ")
    const embed = new EmbedBuilder()
    .setColor("Orange")
    .setAuthor({ name: 'AirCod Abone Sistemi', iconURL: message.author.displayAvatarURL(), url: "https://www.youtube.com/@Airfax-Developer" })
    .setDescription(`
**Atmış Olduğunuz Fotorafta bulunması gerekenler;**
1. Son Video Olması Gerekmekte.
2. Son Video **Yorum, Like, Abone** Olması gerekmekte.
    `)
    const row = new ActionRowBuilder()
    .addComponents(
new ButtonBuilder()
.setLabel("Onayla")
.setStyle(ButtonStyle.Success)
.setCustomId("onay"),
new ButtonBuilder()
.setLabel("Abone Eksik")
.setStyle(ButtonStyle.Danger)
.setCustomId("abone"),
new ButtonBuilder()
.setLabel("Like Eksik")
.setStyle(ButtonStyle.Danger)
.setCustomId("like"),
new ButtonBuilder()
.setLabel("Yorum Eksik")
.setStyle(ButtonStyle.Danger)
.setCustomId("yorum"),
new ButtonBuilder()
.setLabel("Son Video")
.setStyle(ButtonStyle.Danger)
.setCustomId("video"),

    )
    message.reply({embeds: [embed], components: [row]}).then(msg => {
      msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
        let interaction = button
          if (interaction.customId == "onay") {
            const data = db.fetch(`sistem_${message.guild.id}`)
           if (!interaction.member.roles.cache.has(abonesorumlu)) return interaction.reply({ content: `<@&${abonesorumlu}> rolüne sahip olmalısın`, ephemeral: true})
          msg.delete()
      const onay = new EmbedBuilder()
      .setAuthor({ name: 'Abone Rolü Başarıyla Verildi', iconURL: message.author.displayAvatarURL(), url: "https://aircod.com.tr" })
      .setDescription("+1 Abone Stat'ın Artdı Teprikler")
      message.channel.send({content: `${user}`, embeds: [onay]})
            message.guild.members.cache.get(user.id).roles.add(abonerol)
          
            if(sistem) {
          if(db.has(`abonestat_${message.guild.id}.${message.author.id}`))
          db.add(`abonestat_${message.guild.id}.${message.author.id}`, 1)
          else db.set(`abonestat_${message.guild.id}.${message.author.id}`, 1)
            }
          let stat = db.fetch(`abonestat_${message.guild.id}.${message.author.id}`)

            const logembed = new EmbedBuilder()
             .setTitle(`AirCod Abone Sistemi`)
             .addFields(
              {
                name: "Abone Rolü Veren:",
                value: `${message.author}`,
                inline: true
              },
              {
                name: "Abone Rolü Alan:",
                value: `${user}`,
                inline: true
              },
              {
                name: "Abone Rolü Verdiği Sayı:",
                value: `\`\`\`js\n${stat}\n\`\`\``,
                inline: true
              },
             )
             .setImage("https://cdn.discordapp.com/attachments/1101872948916273286/1102138872726560878/standard.gif")
             message.guild.channels.cache.get(logKanal).send({ embeds: [logembed]})
                    }
                    else if(interaction.customId == "abone") {
                      if (!interaction.member.roles.cache.has(abonesorumlu)) return interaction.reply({ content: `<@&${abonesorumlu}> rolüne sahip olmalısın`, ephemeral: true})
                      msg.delete()
                      let abone = new EmbedBuilder()
                      .setDescription(`**Abone Eksik!**\n Abone Olmamışsın Yada [Yanlış Kanala Atmışsın!](https://www.youtube.com/@Airfax-Developer) \nAşağıdaki gibi örnek ss atmalısın`)
                      .setImage(config.image.örnekresim)
                      
                      message.channel.send({content: `${user}`, embeds: [abone]})
                    } 
                     else if(interaction.customId == "like") {
                      if (!interaction.member.roles.cache.has(abonesorumlu)) return interaction.reply({ content: `<@&${abonesorumlu}> rolüne sahip olmalısın`, ephemeral: true})
                      msg.delete()
                      let like = new EmbedBuilder()
                      .setDescription(`**Like Eksik!**\n Aşağıdaki gibi örnek ss atmalısın`)
                      .setImage(config.image.örnekresim)
                      message.channel.send({content: `${user}`, embeds: [like]})
                    }
                    else if(interaction.customId == "yorum") {
                      if (!interaction.member.roles.cache.has(abonesorumlu)) return interaction.reply({ content: `<@&${abonesorumlu}> rolüne sahip olmalısın`, ephemeral: true})
                      msg.delete()
                      let yorum = new EmbedBuilder()
                      .setDescription(`**Yorum Eksik!**\n Aşağıdaki gibi örnek ss atmalısın`)
                      .setImage(config.image.örnekresim)
                      message.channel.send({content: `${user}`, embeds: [yorum]})
                    }
                    else if(interaction.customId == "video") {
                      if (!interaction.member.roles.cache.has(abonesorumlu)) return interaction.reply({ content: `<@&${abonesorumlu}> rolüne sahip olmalısın`, ephemeral: true})
                      msg.delete()
                      let son = new EmbedBuilder()
                      .setDescription(`**Son Video Değil!**\n <#1101926816647757865> Kanalından Son Videoya Ulaşabilirsin!`)
                      message.channel.send({content: `${user}`, embeds: [son]})
                    }
      })
  })
  
  };
  exports.conf = {
    aliases: ["a"]
  };
  
  exports.help = {
    name: "abone"
  }