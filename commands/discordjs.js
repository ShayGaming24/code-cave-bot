const config = require("../config.json");

const Discord = require("discord.js");
const fetch = require(`node-fetch`);

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports.run = async(client, message, args, prefix) => {

	if (!message.channel.name.includes(`discordjs`)) return message.channel.send(`${message.author}, this command can only be run in ${message.guild.channels.cache.find(c => c.name.includes(`discordjs`))}!`);

	fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${
	(
		message.content.substring(prefix.length + args[0].length + 1)
			.replace(` `, `%20`)
			.replace(`#`, `.`)
		).toLowerCase()}`
	)
		.then(res => res.json())
		.then(res => {
			message.channel.send({embed: res});
		});

}

module.exports.help = {
  name: `discordjs`,
	aliases: [`djs`]
}
