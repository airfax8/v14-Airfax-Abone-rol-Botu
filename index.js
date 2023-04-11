const { Client, TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [ Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const { readdirSync } = require("fs")
const moment = require("moment");
const config = require("./config.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const db = require("croxydb")


module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token).catch(e => {
  console.log("Tokeninde Hatan Var Bota bağlanamadı | Airfax")
  })


client.on("messageCreate", (msg) => {
  const args = msg.content.split(" ")
  const command = args.shift()
  let cmd = args[0]
 
  if (command === "!başvuru") {
      if (!msg.member.permissions.has("Administrator")) return msg.channel.send({ content: `${msg.author} bu komutu kullanmak için \`Administrator\` yetkisine sahip olmalısın.`})
      const basvuru_embed = new EmbedBuilder()
      .setAuthor({ name: `${msg.guild.name} Başvuru Sistemi`})
      .setColor("Random")
      .setFooter({ text: `${config.Footer}`})
      .setThumbnail(msg.guild.iconURL())
      .setDescription("Sunucumuzda yetkili olmak istiyorsanız yapmanız gereken aşağıdaki butona tıklayıp formu düzgün bir şekilde doldurmak")

      const basvurubuton = new ButtonBuilder()
      .setCustomId("basvuru_buton")
      .setLabel("Başvuru Yap")
      .setStyle(3)

      const row3 = new ActionRowBuilder()
      .addComponents(basvurubuton)
      
      msg.channel.send({ embeds: [basvuru_embed], components: [row3]})
  }
})

client.on("interactionCreate", async (i) => {

  const modal = new ModalBuilder()
  .setCustomId('ybasvuru')
  .setTitle('Yetkili Başvuru')
  .setComponents(
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("isimyas")
        .setLabel("İsminiz ve Yaşınız")
        .setStyle(1)
        .setMinLength(5)
        .setMaxLength(20)
        .setPlaceholder('İsminizi ve yaşınızı yazınız. / Örnek: Titan 18')
        .setRequired(true),
      ),
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("aktiflik")
        .setLabel("Sunucuda ne kadar aktifsiniz?")
        .setStyle(1)
        .setMinLength(1)
        .setMaxLength(10)
        .setPlaceholder("Sunucudaki günlük aktifliğiniz. / Örnek: 13 saat")
        .setRequired(true)
      ),
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("ability")
        .setLabel("Sunucumuz için neler yapabilirsiniz?")
        .setStyle(1)
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Lütfen buraya yazın. / Örnek: Çekiliş yapmak veya diğer...')
        .setRequired(true)
      ),
      new ActionRowBuilder()
      .setComponents(
          new TextInputBuilder()
          .setCustomId("kaçsunucu")
          .setLabel("Daha Önce Başka Sunucuda Yetkili Oldun mu?")
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder("Buraya yazınız. / Örnek: 5 sunucuda yetkili oldum")
          .setRequired(true)
      ),
    new ActionRowBuilder()
      .setComponents(
          new TextInputBuilder()
          .setCustomId("neden")
          .setLabel("Neden AirCod?")
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder("Buraya yazınız. / Örnek: Samimi Olduğu İçin")
          .setRequired(true)
      )
  )
  if (i.customId === "basvuru_buton") {
      i.showModal(modal)
  }
  let message ;
  let logKanalı = client.guilds.cache.get(config.guildID).channels.cache.find((channel) => channel.name === "・başvuru・onay-red")

  if (i.customId === "ybasvuru") {

      const kabulet = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Et")
      .setStyle(3)
      .setEmoji("✅")

      const reddet = new ButtonBuilder()
      .setCustomId("basvuru_red")
      .setLabel("Reddet")
      .setStyle(1)
      .setEmoji("❌")

      const row4 = new ActionRowBuilder()
      .addComponents(kabulet,reddet)

      
      const isimyas = i.fields.getTextInputValue("isimyas");
      const aktiflik = i.fields.getTextInputValue("aktiflik");
      const ability = i.fields.getTextInputValue("ability");
      const kaçsunucu = i.fields.getTextInputValue("kaçsunucu")
      const neden = i.fields.getTextInputValue("neden")

      const titan = new EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: `${i.guild.name} Başvuru Sistemi`})
      .setThumbnail(i.guild.iconURL())
      .setDescription(`
      **${i.user.tag}** - (\`${i.user.id}\`) ** Kullanıcısının Başvuru Formu**
      
      ** İsminiz ve Yaşınız**
      \`${isimyas}\`
      **Sunucumuzda Günlük Aktifliğiniz**
      \`${aktiflik}\`
      **Sunucumuz için neler yapabilirsiniz**
      \`${ability}\`
      **Daha Önce Başka Sunucularda Yetkili Oldun mu?**
      \`${kaçsunucu}\`
      **Neden Airfax?**
      \`${neden}\`
      `)
      .setTimestamp()

      await i.reply({ content: `Başvurunuz başarıyla alındı, şimdi tek yapmanız gereken yetkililerin cevap vermesini beklemek :) umarım kabul edilir..`, ephemeral: true})
      message = await logKanalı.send({ content: `${i.user}`, embeds: [titan], components: [row4]})
      db.set(message.id,i.user.id)
  }

  const basvuruDurum = i.guild.channels.cache.find((channel) => channel.name === "・başvuru・log")

  if (i.customId === "basvuru_kabul") {

      if (!i.member.roles.cache.has(config.basvuruYt)) return i.reply({ content: `Başvuruyu yanıtlamak için <@&${config.basvuruYt}> rolüne sahip olmalısın`, ephemeral: true})

      const kabulet2 = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Edildi")
      .setStyle(3)
      .setEmoji("✅")
      .setDisabled(true)


      const row5 = new ActionRowBuilder()
      .addComponents(kabulet2)

      i.update({ components: [row5]})
      let kişi = db.get(i.message.id)
      let kullanıcı = i.client.guilds.cache.get(config.guildID).members.cache.get(kişi) 
      kullanıcı.roles.add(config.yetkiRolleri)
      await basvuruDurum.send({ content: `<@${kişi}>, Tebrikler! Başvurunuz **kabul edildi** ve **yetkili ekibimize** onaylandınız. \n **Sizi onaylayan kişi: **${i.user.toString()}`})
      kullanıcı.user.send(`Yetkili Başvurun Başarıyla **Onaylanmıştır**`).catch(() => {});
      db.delete(i.message.id)
  } 
  if (i.customId === "basvuru_red") {

      let kişi = db.get(i.message.id)
      let kullanıcı = i.client.guilds.cache.get(config.guildID).members.cache.get(kişi)

      const reddet2 = new ButtonBuilder()
      .setCustomId("başvuru_red")
      .setLabel("Reddedildi")
      .setStyle(1)
      .setEmoji("❌")
      .setDisabled(true)

      const row6 = new ActionRowBuilder()
      .addComponents(reddet2)
      await basvuruDurum.send({ content: `<@${kişi}>, Maalesef ! Başvurunuz **Rededildi** ve **yetkili ekibimize** onaylanmadınız. \n **Sizi onaylamayan kişi: **${i.user.toString()}`})
      i.update({ components: [row6]})
      kullanıcı.user.send(`Maalef yetkili başvurun reddedilmiştir!`).catch(() => {});
      db.delete(i.message.id)
  }
})
