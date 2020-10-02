const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = ";";

client.once('ready', () => {
	console.log('Ready!');
});

let admin = '';

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
   
    if (message.content === `${prefix}server`) {
        console.log(`${message.guild.name}`)
    } else if (message.content === `${prefix}play`){ 
        if(message.member.hasPermission(`MUTE_MEMBERS`)){
            message.react('🤫')
            message.send(``)
            admin = message.member.id;
            console.log(admin);    
        }
    } else if (message.content === `${prefix}over`){
        if(message.member.hasPermission(`MUTE_MEMBERS`)){
            message.react('🤡')
            admin = '';
        }
    }
})

client.on('voiceStateUpdate', async(oldState, newState) => {
    let userID = oldState.member.id;
    if (userID === admin){
        console.log('Voice State Changed')
        let channel = oldState.guild.channels.cache.get(oldState.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (member != oldState.member){
                member.voice.setMute(oldState.member.voice.mute);
            }
        }
    }
})

client.login(config.token);