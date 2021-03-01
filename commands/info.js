const config = require("../config.json");

const Discord = require("discord.js");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports.run = async(client, message, args, prefix) => {

	const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Code Cave`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)
		.setDescription([
			`__Welcome to Code Cave!__\nHave you reached a mountain in your coding adventures that you're struggling to climb alone?`,
			`Do you need that one extra push to get to the other side of a wall preventing you from achieving your dream code?`,
			`We're here for you! Code Cave is a Discord server designed to help new developers with problems in their code, and help those helping out learn more whilst helping others!`,
			`Our core rule is to __respect everyone.__\n**If you ask for help, respect those helping you. They are taking time out of their day to help you. If you give help, respect those you are helping. Everyone started somewhere. That doesn't mean don't give them positive criticism.**`,
			`Before you get started, be sure to read the <#748295997196861500> to get yourself familiarized with the server! Then, be sure to introduce yourself in <#748292672028016726>!`
		].join(`\n\n`))

	message.channel.send(helpEmbed);

}

module.exports.help = {
  name: `info`,
	aliases: [`information`, `wtf`]
}
