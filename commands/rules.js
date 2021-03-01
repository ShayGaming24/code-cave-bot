const config = require("../config.json");

const Discord = require("discord.js");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports.run = async(client, message, args, prefix) => {

	const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Code Cave | Rules`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)
		.setDescription([
			`1) Spamming chat with a problem is not allowed. If nobody responds within 10 minutes and you are not the last message of the channel you may post your problem again.`,
			`2) Try to keep messages PG-friendly - we love aspiring, young developers!`,
			`3) Racially degrading, controversial and strong political views are not to be expressed here. Keep things relevant.`,
			`4) No advertising other Discord servers.`,
			`5) Use the relevant channels for support.`,
			`6) Ensure that you paste large amounts of code into a web tool such as https://sourceb.in/ for ease of use.`,
			`7) Please be respectful to all users. **Those providing support, please respect new developers. Everyone starts somewhere. Those receiving support, please respect those helping out. They are taking time out of their day to help you.**`,
			`8) Do not DM people for support. Ask them here, and do not @ them constantly.`
		].join(`\n\n`))

	message.channel.send(helpEmbed);

}

module.exports.help = {
  name: `rules`,
	aliases: []
}
