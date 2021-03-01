const config = require("../config.json");

const Discord = require("discord.js");
const fetch = require(`node-fetch`);
const fs = require("fs");

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

module.exports.run = async(client, message, args, prefix) => {

	let bumps = JSON.parse(fs.readFileSync("./bumps.json", "utf8"));

	var res = [];

	for (var userID in bumps) {
		res.push([userID, bumps[userID]]);
	};

	res.sort(function(a, b) {
		return b[1] - a[1];
	});

	let embed = new Discord.MessageEmbed()
		.setTitle(`Code Cave | Top server bumpers`)
		.setThumbnail(config.embedThumb)
		.setColor(config.embedColor)

	let descString = ``;

	for (i = 0; i < (res.length > 10 ? 10 : res.length); i++) {

		let member = await client.users.cache.get(res[i][0]);
		let rndMoney = formatNumber(Math.floor(res[i][1]));

		if (member) descString += (`${i + 1}) ${member.tag} (${rndMoney})\n`);
		if (!member) descString += (`${i + 1}) [${res[i][0]}] (${rndMoney})\n`);

	};

	embed.setDescription(descString);

	message.channel.send(embed);

}

module.exports.help = {
  name: `bumptop`,
	aliases: []
}
