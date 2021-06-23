const Discord = require("discord.js");
const client = new Discord.Client();
//Feel free to add here the MIMEs types of attachment you want to blacklist :) <3
const blacklist = ['exe', 'vbs', 'bat'];
client.on("ready", () => {
  console.log("Your bot has been launched !");
});
 
client.on("message", (message) => {
    if (message.attachments.size > 0){
        // This const split the url with every . and takes the last object in the array with the .pop so people can't cheat with naming their files thing.txt.exe 
        const MIME = message.attachments.map(a => a.url.split('.').pop())
        // This const convert the file MIME type to a string and lowercase it so it can be detected (or not) with the .includes :))
        const LowerCStringMIME = MIME.toString().toLowerCase();
        // This if tries to see if the MIME is in your blacklist
        if(blacklist.includes(LowerCStringMIME)){
          // This if tries to see if your member got the VIEW_AUDIT_LOG permission (so it grants you a kind of whitelist) and ignore if they got it. https://discord.com/developers/docs/topics/permissions if you wish to change it :)
          if (message.member.hasPermission('VIEW_AUDIT_LOG')) return console.log(message.author + ' (' + message.author.username +')' + ' sent a (probably) malicious file but has VIEW_AUDIT_LOG permission so it was ignored.')
          message.delete()
          message.reply(' what are you trying to do ?' + LowerCStringMIME + 'file' + ' not accepted on this server.)')
          console.log(message.author + ' (' + message.author.username +')' + ' tried to send a (probably) malicious file !')
        }
    }
});
 
client.login("SuperMegaHyperSecretImpostorToken");