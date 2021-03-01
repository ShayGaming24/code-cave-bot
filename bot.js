const config = require('./config.json');
const token = require('./token.json');

const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const colors = require("colors");
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let generalChannel;
let logChannel;

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	};

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`)
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name)
		});
	});

});

client.login(token.token);

client.on(`ready`, () => {

	console.log(`${client.user.tag} is now active.`.green);
	generalChannel = client.channels.cache.get(`748292672028016726`);
	logChannel = client.channels.cache.find(c => c.name.includes(`staff-logs`));

});

client.on(`message`, message => {
	
	if(message.author.bot && message.author.id !== `302050872383242240`) return;
	if(!message.guild) return message.channel.send(`${message.author}, you can only run bot commands in servers.`);
	if(message.guild.id !== `748292671495208961`) return;
	
	if (message.content.split(`\n`).length > 20 && message.author.id !== "293405833231073280") {
		message.delete({timeout: 10});
		message.channel.send(`${message.author}, please paste large amounts of text/code into https://sourceb.in/ to keep the channels clean.`);
	};
	
	if (message.author.id === `302050872383242240`) {
		if (message.embeds.length == 1) {
			console.log(message.embeds[0].color == `2406327`);
			console.log(message.embeds[0].description.substring(0, 21).replace( /^\D+/g, '').replace(`>`, ``));
			if (message.embeds[0].color == `2406327`) {
			}
		}
	}

	let prefix = config.prefix;

	let args = message.content.toLowerCase().slice(prefix.length).split(" ");

	if(message.content.toLowerCase().startsWith(prefix)) {

		const command = args[0];

		// if(command !== "apply" && message.author.id !== "293405833231073280") return;

		let timeNow = new Date().toLocaleTimeString();
		let timeNowString = ("[" + timeNow + "] ");

		let stringArgs = args.join(" ");

		if(message.channel.type === "text") {
			console.log(timeNowString.cyan + command.yellow + " has been run by user " + message.author.tag.yellow + " in channel " + message.channel.name.yellow + " in server " + message.guild.name.yellow + ": " + stringArgs.brightMagenta);
		} else {
			console.log(timeNowString.cyan + command.yellow + " has been run by user " + message.author.tag.yellow + " privately: " + stringArgs.brightMagenta);
		};

		let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if(commandfile) commandfile.run(client, message, args, prefix);
		// if(!commandfile) message.channel.send(`${message.author}, unknown command! Use \`${prefix}help\` for a list of commands.`);
		if(!commandfile) return;

	};

});

client.on(`guildMemberUpdate`, (oldMember, newMember) => {

	let noFirstRole = !oldMember.roles.cache.has(`762693579989975050`);
	let yesNextRole = newMember.roles.cache.has(`762693579989975050`);

	if (noFirstRole && yesNextRole) {
		generalChannel.send(`Welcome to Code Cave, ${newMember.user}!`);
	};

});

client.on(`messageDelete`, message => {

	if (message.author.bot) return;

	logChannel.send(new Discord.MessageEmbed()
		.setTitle(`Code Cave | A message was deleted!`)
		.setThumbnail(config.embedThumb)
		.setColor(`#d10000`)
		.addField(`User`, `${message.author}`)
		.addField(`Channel`, `${message.channel}`)
		.addField(`Sent`, `${new Date(message.createdAt).toLocaleDateString()} @ ${new Date(message.createdAt).toLocaleTimeString()}`)
		.addField(`Content`, `\`\`\`${message.content.split("`").join(`'`)}\`\`\``)
	);

});

client.on(`messageUpdate`, (oldMessage, newMessage) => {

	if (oldMessage.author.bot || newMessage.author.bot) return;
	if (oldMessage.content == newMessage.content) return;

	logChannel.send(new Discord.MessageEmbed()
		.setTitle(`Code Cave | A message was modified!`)
		.setThumbnail(config.embedThumb)
		.setColor(`#fca503`)
		.addField(`User`, `${newMessage.author}`)
		.addField(`Channel`, `${newMessage.channel}`)
		.addField(`Sent`, `${new Date(newMessage.createdAt).toLocaleDateString()} @ ${new Date(newMessage.createdAt).toLocaleTimeString()}`)
		.addField(`Edited`, `${new Date(newMessage.editedAt).toLocaleDateString()} @ ${new Date(newMessage.editedAt).toLocaleTimeString()}`)
		.addField(`Old content`, `\`\`\`${oldMessage.content.split("`").join(`'`)}\`\`\``)
		.addField(`New content`, `\`\`\`${newMessage.content.split("`").join(`'`)}\`\`\``)
		.addField(`Message URL`, `${newMessage.url}`)
	);

});