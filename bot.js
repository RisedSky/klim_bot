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
bot.Administrateur_Role = "365131394676031489"
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
    console.log(`${bot.prefixLog} Bot créé par RisedSky`)
    console.log(`${bot.prefixLog} Tous droits réservés`)
    console.log(`${bot.prefixLog} Bot prêt`)
    console.log("------------------------------")

    //bot.user.setActivity(`${bot.config.prefix} help | Lancé et prêt !`);
    bot.user.setActivity(`${bot.config.prefix} help | Lancé et prêt !`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })

    setTimeout(ChangeState1, ms("15s"));
    console.log("The bot is now ready !")

    for (var i in bot.guilds.array()) {
        console.log(`${i} » '${bot.guilds.array()[i]}'`)
    }

    setInterval(() => {
        loop_verification()
    }, ms("5m"));

    setInterval(() => {
        channel_loop_verification()
    }, ms("5m"))
})

bot.on("messageUpdate", async (oldmsg, newmsg) => {
    var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
    if (No_Show.includes(oldmsg.member.id)) return log("Don't show !");

    let serv = "453464806062817281"
    let update_embed = new Discord.RichEmbed()
        .setColor("#FFFF00") //yellow
        .setAuthor("Un message a été modifié")
        .setDescription(`Le message de ${oldmsg.member.user.tag} a été modifié dans le salon : <#${oldmsg.channel.id}>\n\nSon contenu était :\n\`\`\`${oldmsg.content}\`\`\`\n\nSon contenu est désormais :\n\`\`\`${newmsg.content}\`\`\``)
        .setTimestamp()

    if (oldmsg.member.roles.find("id", bot.Moderateur_Role) || oldmsg.member.roles.find("id", bot.Administrateur_Role)) {
        await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(update_embed)
    }
})

bot.on("guildMemberRemove", async member => {
    if (!member.bannable) return log("Banni donc pas besoin de mettre la notif de kick")
    let serv = "453464806062817281"

    member.guild.fetchAuditLogs({ type: 20, limit: 1 }).then(async logs => {
        var kick = await logs.entries.first()
        var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
        if (No_Show.includes(kick.executor.id)) return log("Don't show !");
        log(kick.reason)
        log(kick.executor.tag)

        let kick_embed = new Discord.RichEmbed()
            .setColor("#E59400") //orange
            //.setAuthor(`${member.user.tag} a été kick manuellement par ${kick.executor.tag}`)
            .setDescription(`L'utilisateur ${bot.GetUserMention(kick.target.id)} a été kick manuellement par ${bot.GetUserMention(kick.executor.id)}\n\nPour la raison suivante :\n\`\`\`${kick.reason}\`\`\``)

        await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(kick_embed)
    })
})

bot.on("messageDelete", async message => {
    //log("message deleted !")
    let serv = "453464806062817281"
    let delete_embed = new Discord.RichEmbed()
        .setColor("#FFFF00") //yellow
        //.setAuthor("Un message a été supprimé manuellement ")
        .setDescription(`Le message de ${message.member.user.tag} a été supprimé dans le salon : <#${message.channel.id}>\n\nSon contenu était :\n\`\`\`${message.content}\`\`\``)

    if (message.member.roles.find("id", bot.Moderateur_Role) || message.member.roles.find("id", bot.Administrateur_Role)) {
        bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(delete_embed)
    }
})

bot.on("guildBanRemove", async (guild, member) => {
    let serv = "453464806062817281"

    guild.fetchAuditLogs({ type: 22, limit: 1 }).then(async logs => {
        var unban = await logs.entries.first()
        var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
        if (No_Show.includes(unban.executor.id)) return log("Don't show !");

        log(unban.executor.tag)

        let unban_embed = new Discord.RichEmbed()
            .setColor("#008000") //green
            //.setAuthor(`${member.tag} a été débanni manuellement par ${unban.executor.tag}`)
            .setDescription(`L'utilisateur ${bot.GetUserMention(unban.target.id)} a été débanni manuellement par ${bot.GetUserMention(unban.executor.id)}`)

        await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(unban_embed)
    })
})

bot.on("guildBanAdd", async (guild, member) => {
    let serv = "453464806062817281"

    guild.fetchAuditLogs({ type: 22, limit: 1 }).then(async logs => {
        var ban = await logs.entries.first()
        var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
        if (No_Show.includes(ban.executor.id)) return log("Don't show !");

        log(ban.reason)
        log(ban.executor.tag)

        let ban_embed = new Discord.RichEmbed()
            .setColor("#FF0000") //red
            //.setAuthor(`${member.tag} a été banni manuellement par ${ban.executor.tag}`)
            .setDescription(`L'utilisateur ${bot.GetUserMention(ban.target.id)} a été banni manuellement par ${bot.GetUserMention(ban.executor.id)}\n\nPour la raison suivante :\n\`\`\`${ban.reason}\`\`\``)

        await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(ban_embed)
    })

    //member.createDM().then(c => c.send("a"))
})


bot.on("guildMemberAdd", async  member => {
    var usr = member
    let embed_welcome = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Bienvenue sur le serveur discord KLIM !`, bot.avatarURL)
        .setDescription(`Avant toute chose merci de lire ce message, puis ensuite d'aller lire le <#364687962916651010> !`)
        .addField(`${bot.invisible_emote}\nLes salons vocaux privés de KLIM.`, `:small_blue_diamond: Vous avez accès à des salons privés sur notre serveur discord.\nAvec ces salons vous allez pouvoir communiquer avec des personnes ou avec vos amis directement sur le serveur officiel de KLIM !\n\n:small_blue_diamond: Cliquez sur le salon "créer votre salon privé" dans la catégorie de votre choix.\n\nUne fois cela fait, vous allez avoir la permssion de muter les personnes **dans votre salon**.\n\n**Voici quelques points sur ces permissions**\nLorsque vous mutez quelqu'un avec le "Server Mute", le bot va détecter ce mute et va alors kicker la personne **de votre salon**\nSi cette personne en question revient dans votre salon, mutez le avec le "Server Deafen", il sera alors "banni" de votre salon **jusqu'à sa suppression**.`)
    //.addBlankField()
    usr.createDM()
        .then(async c => {
            await c.send(embed_welcome)
        })
        .catch(async e => { console.log(`Impossible de DM ${usr.tag}`); console.log(e) })
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
        } else if (message.content.substr(55, 60).includes("@")) {
            if (message.deletable) message.delete()
        }

        //return;
    }

    if (message.channel.id == "455787885371850754" && message.author.id == "404886025077522432") {
        //verifie si le message est dans #partenaires et que le message est envoyé par le bot youtube

        var content_message = message.content.split(/ +/g)

        var user_new_content = content_message[0];
        console.log(`User new content = '${user_new_content}'`)

        message.channel.fetchMessages({ limit: 100, before: message.id })
            .then(msgs => {
                msgs.forEach(msg => {
                    if (msg.content.includes(user_new_content)) {
                        console.log("Detected");
                        //if(msg.id == message.id) return;
                        if (msg.deletable) msg.delete()
                    } else {
                        log("Not detected")
                    }
                })
            })
            .catch(err => {
                console.log(`Error sur le partenaires message`)
                log(err)
            })

    }

    if (message.content.startsWith(prefix) && !message.author.bot) {
        //#region Permission Du Bot
        bot.BOT_SEND_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
        bot.BOT_MANAGE_MESSAGESPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
        bot.BOT_ADMINISTRATORPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
        bot.BOT_USE_EXTERNAL_EMOJISPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'
        bot.BOT_ADD_REACTIONSPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADD_REACTIONS") && message.channel.type === 'text'
        //#endregion

        //#region Permission de la personne
        bot.member_Has_BAN_MEMBERS = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'
        bot.member_Has_KICK_MEMBERS = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("KICK_MEMBERS") && message.channel.type === 'text'
        bot.member_Has_MANAGE_GUILD = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_GUILD") && message.channel.type === 'text'
        bot.member_has_MANAGE_MESSAGES = message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'
        //#endregion

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
                var channel = now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(c => {

                        c.setParent(now.voiceChannel.parent).then(() => {
                            now.setVoiceChannel(c).then(() => {
                                setTimeout(() => {
                                    c.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                })
                            }, 1000);
                        })
                    })
                } else {
                    now.setVoiceChannel(channel).then(m => {
                        setTimeout(() => {
                            channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }


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
                /*now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(c => {
                    c.setParent(now.voiceChannel.parent).then(() => {
                        now.setVoiceChannel(c).then(() => {
                            setTimeout(() => {
                                c.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                            })
                        }, 1000);
                    })
                })
                */
                var channel = now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(c => {

                        c.setParent(now.voiceChannel.parent).then(() => {
                            now.setVoiceChannel(c).then(() => {
                                setTimeout(() => {
                                    c.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                })
                            }, 1000);
                        })
                    })
                } else {
                    now.setVoiceChannel(channel).then(() => {
                        setTimeout(() => {
                            channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }
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
bot.GetUserMention = function (id) { return `<@${id}>` }

let log = console.log;
//#endregion

module.exports = bot, Call;