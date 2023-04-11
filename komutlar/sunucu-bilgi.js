const Discord = require('discord.js');

exports.run = async(client, msg) => {

function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " gün" : " gün") + " önce";
        };
        let guild = msg.channel.guild
        let serverSize = msg.guild.memberCount;
        let botCount = msg.guild.members.cache.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;

	let owner = await guild.fetchOwner()
	const channels = msg.guild.channels.cache;
	const members = msg.guild.members.cache;


let sunucu = new Discord.EmbedBuilder()
.setAuthor({ name: 'Sunucu Bilgi', iconURL: msg.author.displayAvatarURL(), url: 'https://discord.gg/T2jXbtBjwj' })
.setDescription(`**Sunucu Bilgileri** \nSunucu İsmi: **${guild.name}** \nSunucu ID: **${msg.guild.id}** \nSunucu Sahibi: **${owner}** \nKuruluş Tarihi: **${checkDays(msg.guild.createdAt)}** \nBoost Sayısı: **${msg.guild.premiumSubscriptionCount || '0'}** \n**Üye Bilgileri:** \nToplam Üye: **${humanCount}** \nToplam Bot: **${botCount}** \nRol Sayısı: **${guild.roles.cache.size}** `)
.setColor('#D2EE07')  
.setFooter({ text: `Bu komutu kullanan kullanıcı ${msg.author.tag}` , iconURL: `${msg.author.displayAvatarURL()}` });

return msg.reply({embeds : [sunucu]});

}; 

module.exports.conf = {
aliases: ['sunucubilgi','sb','sunucu'],
permLevel: 0, 
kategori: 'Sunucu'
};

module.exports.help = {
    name: 'sunucu-bilgi',
    description: 'Sunucu hakkında bilgi verir.',
    usage: 'sunucu-bilgi'
};