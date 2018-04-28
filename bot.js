const Discord = require("discord.js");
const bot = new Discord.Client()
const config = require("./config2.json");
const newUserss = [];
const embed = new Discord.RichEmbed()
const ms = require('ms');
const fs = require('fs');

bot.on('ready', function() {
    console.log('Bot Online and Ready! On ' + bot.guilds.size + ' Servers!');
    bot.user.setPresence({
        game: {
            name: 'Mention me || m/help',
            type: 0
        }
    });
});


bot.on("error", (e) => {
console.error(e);
return;
});

bot.on("warn", (e) => {
console.warn(e);
return;
});

bot.on("debug", (e) => {
console.info(e);
return;
});

process.on('unhandledRejection', (reason, promise) => {
console.log('Unhandled Rejection at:', reason.stack || reason)
return;
});

process.on('uncaughtException', (reason, promise) => {
console.log('Unhandled Rejection at:', reason.stack || reason)
return;
});
bot.on("guildMemberAdd", (member) => {
try{
const guild = member.guild
let test = member.guild.channels.find("name", config.joinlog)
if (!newUserss[guild.id]) newUserss[guild.id] = new Discord.Collection();
newUserss[guild.id].set(member.id, member.user);

if(!test){
member.guild.owner.send('Please create a join-log channel') 
}
		
if (newUserss[guild.id].size || test) {
member.guild.channels.find("name", config.joinlog).send({embed: {
    color: 3447003, 
	author: {
      name: member.user.username,
      icon_url: member.user.avatarURL
    },
    description: "A new user has joined.",
	fields: [{
	name: "Member username and discriminator tag:",
	value: `**${member.user.username}#${member.user.discriminator}**`
	},
	{
	name: "User ID:",
	value: `**${member.user.id}**`
	},
	{
    name: "Total users including bots:",
	value: `**${member.guild.memberCount}**`
	},
	{
    name: "Account creation:",
	value: `**${member.user.createdAt}**`
	},
	{
    name: "Is the account a bot?",
	value: `**${member.user.bot}**`
	}
	],
	timestamp: new Date(),
    footer: {
      icon_url: member.user.avatarURL,
      text: "@ ModerationBot"
    }
  }
});
newUserss[guild.id].clear();
}
}
catch(error) {
return;
}
});


bot.on("guildMemberRemove", (member) => {
try{
const guild = member.guild
let test = member.guild.channels.find("name", config.joinlog)
if (!newUserss[guild.id]) newUserss[guild.id] = new Discord.Collection();
newUserss[guild.id].set(member.id, member.user);

if(!test){
member.guild.owner.send('Please create a join-log channel with permissions for the bot.') 
}

if (newUserss[guild.id].size || test) {
member.guild.channels.find("name", config.joinlog).send({embed: {
    color: 3447003, 
	author: {
      name: member.user.username,
      icon_url: member.user.avatarURL
    },
    description: "A user has left or probably kicked.",
	fields: [{
	name: "Member username and discriminator tag:",
	value: `**${member.user.username}#${member.user.discriminator}**`
	},
	{
	name: "User ID:",
	value: `**${member.user.id}**`
	},
	{
    name: "Total users including bots:",
	value: `**${member.guild.memberCount}**`
	},
	{
    name: "Account creation:",
	value: `**${member.user.createdAt}**`
	},
	{
    name: "Is the account a bot?",
	value: `**${member.user.bot}**`
	}
	],
	timestamp: new Date(),
    footer: {
      icon_url: member.user.avatarURL,
      text: "@ ModerationBot"
    }
  }
});
newUserss[guild.id].clear();
}
}
catch(error) {
return;
}
});

bot.on("guildBanRemove", (guild, user) => {
try{
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (test) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `**${user.username}#${user.discriminator}** was unbanned from the guild`}});
}
}
catch(error) {
return;
}
});

bot.on("guildBanAdd", (guild, user) => {
try{
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (test) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `**${user.username}#${user.discriminator}** was banned from the guild`}});
}
}
catch(error) {
return;
}
});

bot.on('roleCreate', role => {
try{
let guild = role.guild;
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (role) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A new role called **${role.name}** has been created`}});
}
}
catch(error) {
return;
}
});

bot.on('roleDelete', role => {
try{
let guild = role.guild;
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (role) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A role called **${role.name}** has been deleted`}});
}
}
catch(error) {
return;
}
});

bot.on('roleUpdate', (oldRole, newRole) => {
try {
let guild = oldRole.guild;	
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (oldRole.name != newRole.name) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A role called **${oldRole.name}** was updated to **${newRole.name}**`}});
}
}
catch(error) {
return;
}
});

bot.on('channelCreate', channel => {
try {
let guild = channel.guild;	
let test = guild.channels.find("name", config.modlog);

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (channel) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A **${channel.type}** channel by the name of **${channel.name}** was created at **${channel.createdAt}** with the ID of **${channel.id}**`}});
}
}
catch(error) {
return;
}
});

bot.on('channelDelete', channel => {
try{
let guild = channel.guild;	
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (channel) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A **${channel.type}** channel by the name of **${channel.name}** was deleted`}});
}
}
catch(error) {
return;
}
});

bot.on('channelUpdate', (oldChannel, newChannel) => {
try{
let guild = oldChannel.guild;	
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (oldChannel.name != newChannel.name) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A channel called **${oldChannel.name}** was updated to **${newChannel.name}**`}});
}
}
catch(error) {
return;
}
});

bot.on('messageDelete', (message) => {
try{
if (message.author.bot) return;
let guild = message.guild;	
let log = guild.fetchAuditLogs({limit: 1}).then(audit=> audit.entries.first().executor);
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log & report-log(if you want users to report) channel with permissions for the bot.') 
}

if (message) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A message, **${message}** was deleted by the user **${message.author.username}#${message.author.discriminator}** at the channel called **${message.channel}**`}});
}
}
catch(error) {
return;
}
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
try{
if (oldMessage.author.bot) return;
let guild = oldMessage.guild;	
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log channel with permissions for the bot.') 
}

if (oldMessage != newMessage) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A message, **${oldMessage}** was updated to **${newMessage}** by the user **${oldMessage.author.username}#${oldMessage.author.discriminator}** at the channel called **${oldMessage.channel}** which was edited at the following time: **${newMessage.editedAt}**`}});
}
}
catch(error) {
return;
}
});

bot.on('guildMemberUpdate', (oldMember, newMember) => {
try{
let guild = oldMember.guild;	
let test = guild.channels.find("name", config.modlog)

if(!test){
guild.owner.send('Please create a mod-log channel with permissions for the bot.') 
}

if (oldMember.nickname != newMember.nickname) {
guild.channels.find("name", config.modlog).send({embed: {color: 3447003, description: `A user changed his nickname from **${oldMember.displayName}** to **${newMember.displayName}**`}});
}
}
catch(error) {
return;
}
});

bot.on("message", msg => {

    const suffix = msg.content.split(" ").slice(1).join(" ");
	const regex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
	
		 
    if (msg.author.bot) return;
    if (msg.channel.type == "dm") return;

    switch (true) {

        case (msg.content === config.prefix + "users"): //check the amount of users
            var filusers = msg.guild.memberCount;
            msg.channel.send(`There are ${filusers} users in this server.`)
            break;
			
		
		case msg.content.startsWith("discordapp.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("http://discordapp.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("https://discordapp.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("discord.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("https://discord.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("http://discord.gg"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("discordapp.com"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("https://discordapp.com"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
		case msg.content.startsWith("http://discordapp.com"):
        msg.delete();
		msg.channel.send("Invite links are not allowed!");
        break;
		
			
		case (msg.content === config.prefix + "invite"): 
		msg.channel.send([
           "Hello, I am " + bot.user.username + ". To invite me to your server please click this link. " +
           "https://discordapp.com/oauth2/authorize?&client_id=424891540176109568&scope=bot&permissions=8"
        ])
        break;
		
		case (msg.content === config.prefix + "support"): 
		msg.channel.send([
           "Hello, I am " + bot.user.username + ". To join my support server, please click this link. " +
           "https://discord.gg/euxKbju"
        ])
        break;
	
	    case (msg.content === config.prefix + "help" || (msg.isMentioned(bot.user))):
        msg.author.send([
		"Hello, I am " + bot.user.username + ". I was created by **Dev321**. My prefix is 'm/' . My current commands are: " +
	    "\n**m/say**: Sends a message that you wrote. !say (message)" +
	    "\n**m/uptime**: Check my up-time." +
		"\n**m/users**: Check the amount of users in your guild." +
		"\n**m/userinfo**: Check a user's basic info. !userinfo (mention someone)" +            
		"\n**m/stats**: Check the status of the bot." +   
	    "\n**m/invite**: Invite the bot." +    
	    "\n**m/support**: Join the support server." + 
	    "\n**m/report**: Report someone. !report (mention someone) reason, only if the guild owner decides to enable it." +                    				
		"\n**m/setname**: Sets my username.(MOD)" +
		"\n**m/lockdown**: Lockdown your channel for a specific time.(MOD)(Only for guild owner and Administrators)" +
	    "\n**m/muteunmute**: Mute or unmute a specfic user.(MOD)" +
	    "\n**m/kick**: Kick a specfic user.(MOD)" +
		"\n**m/ban**: Ban a specfic user.(MOD)" +
	    "\n**m/warn**: Warn a specfic user.(MOD)" +
	    "\n**m/purge**: Purge messages, 2-200(MOD)"])
		break;
                                
        case (msg.content.startsWith(config.prefix + 'setname')): //set bot's username
		if (msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            msg.guild.member(bot.user).setNickname(suffix).then(() => {
                msg.channel.send("Success!")
            });
		}
            break;

        case (msg.content.startsWith(config.prefix + "say")): //make the bot say something
            msg.channel.send(suffix)
            break;
			
		case (msg.content.startsWith(config.prefix + "uptime")): 
		var date = new Date(bot.uptime);
            var strDate = '**';
            strDate += date.getUTCDate() - 1 + ' days, ';
            strDate += date.getUTCHours() + ' hours, ';
            strDate += date.getUTCMinutes() + ' minutes, ';
            strDate += date.getUTCSeconds() + ' seconds**';
            msg.channel.send(strDate);
        break;
			
        case (msg.content.startsWith(config.prefix + "stats")): 
		let m = '';
        m += `The guild has ${msg.guild.channels.size} channels\n`;
        m += `The guild has ${msg.guild.members.size} members\n`;
        m += `I am in ${bot.channels.size} channels overall\n`;
        m += `I am in ${bot.guilds.size} guilds overall\n`;
        m += `Total number of users from all the guilds: ${bot.users.size}\n`;
        msg.channel.send(m)
        break;

        case (msg.content.startsWith(config.prefix + "muteunmute")):
            if (msg.member.hasPermission("BAN_MEMBERS")) {
                let reason = suffix;
                let user = msg.mentions.users.first();
                let modlog = msg.guild.channels.find('name', config.modlog);
                let muteRole = bot.guilds.get(msg.guild.id).roles.find('name', 'muted');
                if (!modlog) return msg.channel.send('I cannot find a mod-log channel');
                if (!muteRole) return msg.channel.send('I cannot find a mute role');
                if (reason.length < 1) return msg.channel.send('You must supply a reason for the mute.');
                if (msg.mentions.users.size < 1) return msg.channel.send('You must mention someone to mute them.');
                msg.delete();
                const embed = new Discord.RichEmbed()
                    .setColor(0x00AE86)
                    .addField('Action:', 'Un/Mute')
                    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
                    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`)
                    .addField('Reason', reason);

                if (!msg.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;


                if (msg.guild.member(user).roles.has(muteRole.id)) {
                    msg.guild.member(user).removeRole(muteRole).then(() => {
                        bot.channels.get(modlog.id).sendEmbed(embed);
                    });
                } else {
                    msg.guild.member(user).addRole(muteRole).then(() => {
                        bot.channels.get(modlog.id).send(embed);
                    });
                }
            }
            break;

        case (msg.content.startsWith(config.prefix + "warn")):
            if (msg.member.hasPermission("KICK_MEMBERS")) {
                let reason = suffix;
                let user = msg.mentions.users.first();
                let modlog = msg.guild.channels.find('name', config.modlog);
                if (!modlog) return msg.channel.send('I cannot find a mod-log channel');
                if (reason.length < 1) return msg.channel.send('You must supply a reason for the warning.');
                if (msg.mentions.users.size < 1) return msg.channel.send('You must mention someone to warn them.');
                msg.delete();
                const embed = new Discord.RichEmbed()
                    .setColor(0x32CD32)
                    .addField('Action:', 'Warning')
                    .addField('User:', `${user.username}#${user.discriminator}`)
                    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`)
                    .addField('Reason', reason);
                return bot.channels.get(modlog.id).send(embed);
            }
            break;
			
		case (msg.content.startsWith(config.prefix + "report")):
                let reason = suffix;
                let user = msg.mentions.users.first();
                let modlog = msg.guild.channels.find('name', 'report-log');
                if (!modlog) return msg.channel.send('I cannot find a report-log channel which means your guild owner did not enable it.');
                if (reason.length < 1) return msg.channel.send('You must supply a reason for the report.');
                if (msg.mentions.users.size < 1) return msg.channel.send('You must mention someone to report them.');
                msg.delete();
                const embed = new Discord.RichEmbed()
                    .setColor(0x32CD32)
                    .addField('Action:', 'Report')
                    .addField('User that got reported:', `${user.username}#${user.discriminator}`)
                    .addField('User who reported:', `${msg.author.username}#${msg.author.discriminator}`)
                    .addField('Reason', reason);
                return bot.channels.get(modlog.id).send(embed);
            break;

        case (msg.content.startsWith(config.prefix + "ban")):
            if (msg.member.hasPermission("BAN_MEMBERS")) {
                let reason = suffix;
                let user = msg.mentions.users.first();
                let modlog = msg.guild.channels.find('name', config.modlog);
                if (!modlog) return msg.channel.send('I cannot find a mod-log channel');
                if (reason.length < 1) return msg.channel.send('You must supply a reason for the ban.');
                if (msg.mentions.users.size < 1) return msg.channel.send('You must mention someone to ban them.');

                if (!msg.guild.member(user).bannable) return msg.channel.send('I cannot ban that member');
                msg.guild.ban(user, 2);
                msg.delete();

                const embed = new Discord.RichEmbed()
                    .setColor(0xa50d0d)
                    .addField('Action:', 'Ban')
                    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
                    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`)
                    .addField('Reason', reason);
                return bot.channels.get(modlog.id).send(embed);
            }
            break;

        case (msg.content.startsWith(config.prefix + "kick")):
            if (msg.member.hasPermission("KICK_MEMBERS")) {
                let reason = suffix;
                let user = msg.mentions.users.first();
                let modlog = msg.guild.channels.find('name', config.modlog);
                if (!modlog) return msg.channel.send('I cannot find a mod-log channel');
                if (reason.length < 1) return msg.channel.send('You must supply a reason for the kick.');
                if (msg.mentions.users.size < 1) return msg.channel.send('You must mention someone to kick them.');
                msg.delete();
                if (!msg.guild.member(user).kickable) return msg.channel.send('I cannot kick that member');
                msg.guild.member(user).kick();

                const embed = new Discord.RichEmbed()
                    .setColor(0xe5ac10)
                    .addField('Action:', 'kick')
                    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
                    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`)
                    .addField('Reason', reason);
                return bot.channels.get(modlog.id).send(embed);
            }
            break;

        case (msg.content.startsWith(config.prefix + "createrank")):
            let cool = msg.guild.roles.find("name", config.secretrole);
            if (msg.member.roles.has(cool.id)) {
                msg.guild.createRole({
                    name: suffix
                }).then(role => {
                    msg.channel.send(`Made role ${role.name}`);
                }).catch(console.log);
            }
            break;
			
		case (msg.content.startsWith(config.prefix + "lockdown")):
		 let args = msg.content.split(" ").slice(1);
		 if (msg.member.hasPermission("ADMINISTRATOR")) {
         if (!bot.lockit) bot.lockit = [];
		 let time = args.join(' ');
		  let validUnlocks = ['release', 'unlock'];
  if (!time) return msg.reply('You must set a duration for example: !lockdown (number) which is counted in millisecond so suppose if it was for 1 minute then, !lockdown 60000.');
  if (validUnlocks.includes(time)) {
    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      msg.channel.send('Lockdown lifted.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      msg.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {
 
        bot.lockit[msg.channel.id] = setTimeout(() => {
          msg.channel.overwritePermissions(msg.guild.id, {
            SEND_MESSAGES: null
          }).then(msg.channel.send('Lockdown lifted.')).catch(console.error);
          delete bot.lockit[msg.channel.id];
        }, ms(time));
 
      }).catch(error => {
        console.log(error);
      });
    });
  }
  }
break;
		 
		case (msg.content.startsWith(config.prefix + "userinfo")):
        var ui = msg.mentions.users.first();
		 if (!ui) {
	     const embed = new Discord.RichEmbed()
        .setColor(0x32CD32)
		.setAuthor(msg.author.username, msg.author.avatarURL)
        .addField('User:', `${msg.author.id}#${msg.author.discriminator}`)
        .addField('ID:', `${msg.author.id}`)
        .addField('Is bot:', `${msg.author.bot}`)
		.addField('Account creation:', `${msg.author.createdAt}`);
        return msg.channel.sendEmbed(embed);
        } else {
		const embed = new Discord.RichEmbed()
	    .setColor(0x32CD32)
		.setAuthor(ui.username, ui.avatarURL)
		.addField('User:', `${ui.username}#${ui.discriminator}`)
        .addField('ID:', `${ui.id}`)
        .addField('Is bot:', `${ui.bot}`)
		.addField('Account creation:', `${ui.createdAt}`);
        return msg.channel.sendEmbed(embed);
		}
        break;
		
	    case (msg.content.startsWith(config.prefix + "purge")):
	        if (msg.member.hasPermission("BAN_MEMBERS")) {
			var numberofmessages = parseInt(suffix);
			if(isNaN(numberofmessages)) return msg.channel.send("Please provide a number to delete those specific messages");
		    let messagecount = parseInt(numberofmessages);
			if(!isNaN(messagecount)) {
			msg.channel.fetchMessages({limit: messagecount}).then(messages => msg.channel.bulkDelete(messages));
		    msg.channel.send(`Successfully deleted ${numberofmessages} messages`); 
			msg.delete(1);
			}
		  }
        break;
    }

	
});

bot.login(config.token);
