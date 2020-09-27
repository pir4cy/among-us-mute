const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = ";";
client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
   
    if (message.content === `${prefix}server`) {
        message.channel.send(`${message.guild.name} is gey`)
    } 
    else if (message.content === `${prefix}mute`){ 
        if (message.member.voice.channel) {
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members){
                if (member != message.member)
                    member.voice.setMute(true);
            }
            console.log("Muted")
        }
    }  
    else if (message.content === `${prefix}unmute`){
        if (message.member.voice.channel) {
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members){
                if (member != message.member)
                    member.voice.setMute(false);
            }
            console.log("Unmuted")
        }
    }
    else {
        message.channel.send(`You need to join a voice channel first`)
    }
})

client.login(config.token);