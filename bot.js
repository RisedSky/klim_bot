const Discord = require("discord.js")
    , bot = new Discord.Client()
//#region Vars
bot.config = require("./config.js").config;
bot.prefixLog = "[!]"
bot.Klim_Server = "426157164466405377"

//#region List des rôles givable
//bot.csgo = ""
//#endregion
bot.invisible_emote = "<:vide:456161732901994506>"
bot.Streamer_Role = "440172608969900035"
bot.Partenaires_Role = "445136652076056577"
bot.VIP_Role = "364693732374740994"
bot.Moderateur_Role = "364682190006517771"
bot.rolesArray = [
    `Counter-Strike : ${bot.config.prefix} csgo`,
    `Fortnite : ${bot.config.prefix} ftn`,
    `HearthStone : ${bot.config.prefix} hs`,
    `League of Legends : ${bot.config.prefix} lol`
]

bot.admin_id = [
    "145632403946209280", //RisedSky
    "239887147765727232", //KLIM iQuakerstar
    "340509678347878401", //KLIM Tibo
    "204892097357021184" //Klim B4ttix
]

bot.deleteUserMessage = function (message, time) {
    if (!time) time = 750
    if (message.deletable) message.delete(time)
}

bot.sendDMToUser = function (message, msgToSend) {
    message.author.createDM()
        .catch(e => {
            if (e.name === "DiscordAPIError") {
                message.reply("Désolé mais je ne peux pas te MP, ouvre tes MPs stp.")
                return;
            }
        })
        .then(() => {
            message.author.send(msgToSend)
        })

}
//#endregion

const ms = require("ms")
    , Twitch = require("twitch.tv-api")
    , twitch = new Twitch({
        id: bot.config.twitch_id,
        secret: bot.config.twitch_secret
    })
    , fs = require("fs")


bot.once('ready', () => {
    bot.user.setStatus("online")
    console.log("------------------------------")
    console.log(`${bot.prefixLog} Bot created by RisedSky`)
    console.log(`${bot.prefixLog} All rights reserved`)
    console.log(`${bot.prefixLog} Bot ready`)
    console.log("------------------------------")

    bot.user.setActivity(`${bot.config.prefix} help | Lancé et prêt !`);
    setTimeout(ChangeState1, ms("15s"));
    console.log("The bot is now ready !")

    for (var i in bot.guilds.array()) {
        console.log(`${i} » '${bot.guilds.array()[i]}'`)
    }

    setInterval(() => {
        loop_verification()
    }, ms("2m"));

    setInterval(() => {
        channel_loop_verification()
    }, ms("3m"))
})

bot.commands = new Discord.Collection();
bot.disabledCommands = [];
var jsfiles;

function checkCommand(command, name) {
    var resultOfCheck = [true, null];
    if (!command.run) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Function: "module.run" of ${name}.`;
    if (!command.help) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Object: "module.help" of ${name}.`;
    if (command.help && !command.help.name) resultOfCheck[0] = false; resultOfCheck[1] = `Missing String: "module.help.name" of ${name}.`;
    return resultOfCheck;
}

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    jsfiles = files.filter(f => f.endsWith(".js"));
    if (jsfiles.length <= 0) return console.log("Couldn't find commands.");
    jsfiles.forEach((f) => {
        try {
            var props = require(`./commands/${f}`);
            if (checkCommand(props, f)[0]) {
                bot.commands.set(props.help.name, props);
            } else {
                throw checkCommand(props, f)[1];
            }
        } catch (err) {
            bot.disabledCommands.push(f);
            console.log(`\nThe ${f} command failed to load:`);
            console.log(err);
        }
    });
});

class Call {
    constructor(message, bot, commands, args, content, prefix, cmd) {
        this.message = message;
        this.bot = bot;
        this.commands = commands;
        this.args = args;
        this.content = content;
        this.prefix = prefix;
        this.cmd = cmd;
    }
}

bot.on("message", (message) => {
    const prefix = bot.config.prefix,
        cmd = message.content.slice(bot.config.prefix.length).trim().split(/ +/g).shift(),
        args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g).join(" ").slice(cmd.length + 1).split(" "),
        //cmd = message.content.slice(bot.config.prefix.length).trim().split(/ +/g),
        content = args.join(" ");

    if (message.channel.id == "453459420257714176" || message.channel.id == "370145947109425152") {
        //console.log(message.content);
        //console.log(message.content.substr(40));


        if (message.content.substr(40, 45).includes("RT")) {
            if (message.deletable) message.delete()
        }else if(message.content.substr(55, 60).includes("@")){
            if(message.deletable) message.delete()
        }

        //return;
    }

    if (message.content.startsWith(prefix) && !message.author.bot) {
        /*
        console.log(1);
        console.log(`'${prefix}'`);
        console.log(bot.commands);
        console.log(`args`);
        console.log(args);

        console.log(`cmd => '${cmd}'`);
        console.log(`cmd.length => '${cmd.length}'`);
        console.log(`content => '${content}'`);
        */

        const commandFile = bot.commands.find((command) => (command.help.aliases || []).concat([command.help.name]).includes(cmd));
        if (commandFile != null) {
            //console.log(2);
            if (message.channel.type !== "dm" || (commandFile.help.dm || false)) {
                //console.log(3);
                commandFile.run(new Call(message, bot, bot.commands, args, content, prefix, cmd));
            } else message.reply("Cette commande ne fonctionne pas en message privé").catch(() => { });
        }
    }
});

bot.on("error", err => {
    console.log(err);
})

bot.on("voiceStateUpdate", (old, now) => {
    var voice_move_user = "456184854036480000" //Accueil
    var voice_create_voice_name = "créer votre salon privé"

    if (!old.voiceChannel || !old.voiceChannel.name && now.voiceChannel.name == voice_create_voice_name) {
        //Si le mec vient de join un vocal
        try {

            log(`1- Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(c => {
                    c.setParent(now.voiceChannel.parent).then(() => {
                        now.setVoiceChannel(c).then(() => {
                            setTimeout(() => {
                                c.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                            })
                        }, 1000);
                    })
                })
            }
        } catch (error) {
            log(error)
        }

    }

    if (old.voiceChannel && now.voiceChannel) {

        try {
            if (!now.voiceChannel.name == voice_create_voice_name) return;
            log(`2 - Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(c => {
                    c.setParent(now.voiceChannel.parent).then(() => {
                        now.setVoiceChannel(c).then(() => {
                            setTimeout(() => {
                                c.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                            })
                        }, 1000);
                    })
                })
            }
        } catch (error) {
            log(error)
        }

    }

    if (!old.serverMute && now.serverMute) {
        if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[PV]")) {
                now.setMute(false)
                now.setDeaf(false)

                now.setVoiceChannel(voice_move_user)
            }
        }
    } else if (!old.serverDeaf && now.serverDeaf) {
        if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[PV]")) {
                now.setMute(false)
                now.setDeaf(false)
                now.voiceChannel.overwritePermissions(now, { CONNECT: false }).then(() => {
                    now.setVoiceChannel(voice_move_user)
                })
            }
        }
    }

})

bot.login(bot.config.BOT_TOKEN)


//#region Functions
function ChangeState1() {
    //bot.user.setActivity(`${bot.config.prefix} help | Watching u ( ͡° ͜ʖ ͡°)`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    bot.user.setActivity(`${bot.config.prefix} help | Pour la liste des commandes.`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    setTimeout(() => {
        ChangeState2()
    }, ms("60s"));
}

function ChangeState2() {
    bot.user.setActivity(`${bot.config.prefix} help | Giving u some force (づ◕_◕)づ`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    setTimeout(() => {
        ChangeState1()
    }, ms("60s"));
}

function channel_loop_verification() {
    console.log("Channel Loop Verification");

    bot.guilds.forEach(g => {
        g.channels.forEach(c => {
            if (!c.type == "voice") return;
            if (c.name.includes("[PV]")) {
                if (c.members.size == 0) {
                    if (c.deletable) c.delete()
                    return console.log(`Deleted the channel: '${c.name}'`);

                }
                //console.log(c.members.size);
            }
        })
    });
}

function loop_verification() {
    /*
    bot.guilds.forEach(g => {
        if (g.id == bot.Klim_Server) {

            var memb_arr = g.members.array()
            console.log(`Verifying ${memb_arr.length} members`);
            memb_arr.forEach(user => {
                //if (!user.roles.exists("id", bot.Partenaires_Role)) return;
                if (user.user.bot) return;
                //console.log(user.user.username);

                if (!user.presence.game) {
                    if (user.roles.exists("id", bot.Streamer_Role)) {
                        console.log(`Removed the role streamer to ${user.user.tag} bcs not playing`)
                        user.removeRole(bot.Streamer_Role);
                    }
                    return;
                }

                if (!user.presence.game.streaming) {
                    if (user.roles.exists("id", bot.Streamer_Role)) {
                        user.removeRole(bot.Streamer_Role);
                        console.log(`Removed the role streamer to ${user.user.tag} bcs no streaming`)
                        return
                    }
                }

                if (user.presence.game.streaming) {
                    let userURL = user.presence.game.url.split("/")[3]

                    twitch.getUser(userURL)
                        .then(async data => {
                            console.log(data);

                            //console.log(data);

                            //console.log(data.stream.game);
                            //if (!data.stream.streaming) {
                            //    if (user.roles.exists("id", bot.Streamer_Role)) {
                            //        console.log(`Removed the role Streamer for ${user.user.tag}`);
                            //        
                            //        user.removeRole(bot.Streamer_Role)
                            //    }
                            //
                            //}
                            if (!user.roles.exists("id", bot.Streamer_Role)) {
                                user.addRole(bot.Streamer_Role)

                                var embed_msg = new Discord.RichEmbed()
                                    .setAuthor(bot.user.username, bot.user.avatarURL)
                                    //.setURL(user.presence.game.url)

                                    .setColor("GREEN")
                                    .setDescription(`${GetUserMention(user.id)} vient de lancer un stream sur le jeu ${""}`)


                                    .addField("Lien du stream", user.presence.game.url)
                                    //.setThumbnail(data.stream.preview.small)
                                    .setImage(data.stream.preview.large)
                                    .setTimestamp();

                                var salon = user.guild.channels.find("id", partage_media_id)

                                if (send_new_stream) salon.send(embed_msg)

                                console.log(`Don du rôle à '${user.user.tag}'`);

                                
                                //} else if (data.stream.game != "Darwin Project" && user.roles.exists("id", bot.Streamer_Role)) {
                                //        user.removeRole(bot.Streamer_Role)
                                //        console.log(`The user changed his game in twitch, i removed the role`);
                                
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
        }
    })
    */

}

function GetUserMention(id) { return `<@${id}>` }

log = console.log;
//#endregion