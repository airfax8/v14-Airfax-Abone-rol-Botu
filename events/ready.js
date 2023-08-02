const client = require("../index.js");
const config = require("../config.js")
const color = require('../color.js')
const { version, Collection } = require("discord.js")
const fs = require("fs")
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setBorder('│', '─', "✥", "✥");
table.setTitle(`Bot is online!`)

client.on("ready", (client) => {

    const activities = [
        { name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
        { name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
        { name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
        { name: `AirCod ❤ `, type: 5 } // COMPETING
      ];
      const status = [
        'online',
        'dnd',
        'idle'
      ];

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
if (err) console.error(err);
console.log(`${color.fg.Magenta} [Botlog] ${color.fg.White} | ${color.fg.Green} ${files.length} Toplam Komut Yüklendi! ${color.Reset}`);
files.forEach(f => {
let props = require(`../komutlar/${f}`);

/*table
.setTitle("KOMUTLAR")
.setHeading("Name", "Aliases")
.addRow(`${props.help.name}`, `${props.conf.aliases}`)
setTimeout(() => { console.log(table.toString()) }, 3000)
*/

client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

console.log(`${color.fg.Magenta} [Botlog] ${color.fg.White} | ${color.fg.Green} ${client.user.username} Bot Aktif! ${color.Reset}`)
let i = 0;
setInterval(() => {
  if (i >= activities.length) i = 0
  client.user.setActivity(activities[i])
  i++;
}, 5000);


let s = 0;
setInterval(() => {
  if (s >= activities.length) s = 0
  client.user.setStatus(status[s])
  s++;
}, 30000);


  table
  .addRow(`Bot`, client.user.tag)
  .addRow(`Guild(s)`, `${client.guilds.cache.size} Server(s)`)
  .addRow(`Member(s)`, `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members`)
  .addRow(`Commands`, `${client.commands.size}`)
  .addRow(`Discord.js`, `${version}`)
  .addRow(`Node.js`, `${process.version}`)
  .addRow(`Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
setTimeout(() => { console.log(table.toString()) }, 3000)


});
