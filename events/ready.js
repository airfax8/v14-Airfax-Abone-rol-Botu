const client = require("../index.js");
const config = require("../config.js")
const { Collection } = require("discord.js")
const fs = require("fs")
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setBorder('│', '─', "✥", "✥");

client.on("ready", () => {

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
if (err) console.error(err);
console.log(`│ ${files.length} Toplam Komut Yüklendi!\n✥─────────────────────────────────────────────────`);
files.forEach(f => {
let props = require(`../komutlar/${f}`);
    
console.log(`│ ${props.help.name} Komut Yüklendi!`);
console.log(`✥─────────────────────────────────────────────────`)
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

console.log(`| ${client.user.username} Bot Aktif!`)
client.user.setActivity(`${config.durum}`)

});