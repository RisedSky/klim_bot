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

/*
bot.on("messageUpdate", async (oldmsg, newmsg) => {
    var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
    if (oldmsg.member === null) return;
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
*/

bot.on("guildMemberRemove", async member => {
    if (!member.bannable) return log("Banni donc pas besoin de mettre la notif de kick")
    let serv = "453464806062817281"

    await member.guild.fetchAuditLogs({ type: 20, limit: 1 }).then(async logs => {
        var kick = await logs.entries.first()
        if (kick.target.id != member.id) {
            var salon = "498236604981182475"
            bot.guilds.find("id", serv).channels.find("id", salon).send(`:outbox_tray: ${member.user.tag}`) // :arrow_right: vient de quitter le discord
            return log("Juste un leave");
        }
        var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
        if (No_Show.includes(kick.executor.id)) return log("Don't show !");
        //log(kick.reason)
        //log(kick.executor.tag)

        let kick_embed = new Discord.RichEmbed()
            .setColor("#E59400") //orange
            //.setAuthor(`${member.user.tag} a été kick manuellement par ${kick.executor.tag}`)
            .setDescription(`L'utilisateur ${bot.GetUserMention(kick.target.id)} a été kick manuellement par ${bot.GetUserMention(kick.executor.id)}\n\nPour la raison suivante :\n\`\`\`${kick.reason}\`\`\``)

        if (member.guild.id == "364679913707667461") await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(kick_embed)
    })
})

/*
bot.on("messageDelete", async message => {
    try {
        //log("message deleted !")
        await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE", limit: 1 })
            .then(async logs => {
                var mess_delete = await logs.entries.first()
                if (mess_delete.executor.bot) return;
            })

        let serv = "453464806062817281"
        let delete_embed = new Discord.RichEmbed()
            .setColor("#FFFF00") //yellow
            //.setAuthor("Un message a été supprimé manuellement ")
            .setDescription(`Le message de ${message.member.user.tag} a été supprimé dans le salon : <#${message.channel.id}>\n\nSon contenu était :\n\`\`\`${message.content}\`\`\``)

        if (message.member.roles.find("id", bot.Moderateur_Role) || message.member.roles.find("id", bot.Administrateur_Role)) {
            await bot.guilds.find("id", serv).channels.find("id", "495968450095742976").send(delete_embed)
        }

    } catch (error) {
        console.log("erreur messageDelete")
        console.error(error)
    }
})
*/

bot.on("guildBanRemove", async (guild, member) => {
    let serv = "453464806062817281"

    await guild.fetchAuditLogs({ type: 22, limit: 1 }).then(async logs => {
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

    await guild.fetchAuditLogs({ type: 22, limit: 1 }).then(async logs => {
        var ban = await logs.entries.first()
        var No_Show = ["239887147765727232", "204892097357021184", "340509678347878401"]
        if (No_Show.includes(ban.executor.id)) return log("Don't show !");

        if (ban.executor.id == guild.me.id) return;
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


bot.on("guildMemberAdd", async member => {
    let serv = "453464806062817281"
    var usr = member
    let embed_welcome = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Bienvenue sur le serveur discord KLIM !`, bot.avatarURL)
        .setDescription(`Avant toute chose merci de lire ce message, puis ensuite d'aller lire le <#364687962916651010>\n${bot.invisible_emote}`)
        .addField(`Pour accéder à vos salons favoris.`, `:small_orange_diamond: Faites la commande : **${bot.config.prefix} "vos jeux"** dans le salon <#453483219770277888> cela va vous permettre d'accéder à vos différentes sections de jeux.\n${bot.invisible_emote}`)
        .addField(`Les salons vocaux privés de KLIM.`, `:small_orange_diamond: Vous avez accès à des salons privés sur notre serveur discord.\n` +
            `Avec ces salons vous allez pouvoir communiquer avec des personnes ou avec vos amis directement sur le serveur officiel de KLIM!\n\n` +
            `:small_orange_diamond: Rejoignez le salon "créer-votre-salon-privé" de votre section de jeu, attendez quelques secondes et le tour est joué !\n${bot.invisible_emote}\n\n` +
            `:warning: Si votre jeu ne se trouve dans aucune des sections disponibles, allez dans la section "KLIM eSport" rejoindre "autres-jeux", un salon privé sera automatiquement crée.\n${bot.invisible_emote}`)

        .addField(`:information_source: Notez que vous allez avoir la permission de kicker ou bannir les personnes ainsi que de modifier **votre salon**.`, //\n\n
            `${bot.invisible_emote}\n**Voici quelques points sur ces permissions **: \n` +
            `:small_orange_diamond: Lorsque vous mutez quelqu'un avec le "Serveur muet" ("Server Mute"), le bot va détecter ce mute et va alors kicker la personne **de votre salon**.\n\n` +
            `:small_orange_diamond: Si cette personne en question revient dans votre salon, mutez le avec le "Serveur sourd" ("Server Deafen"), il sera alors "banni" de votre salon **jusqu'à sa suppression**.\n\n` +
            `:small_orange_diamond: Vous pouvez changer le nombre de slot si vous en avez l'envie en faisant clique droit (sur votre salon) puis "modifier le salon".\n` +
            "*A savoir que votre salon privé sera supprimé dans un délai de 05 minutes si aucune personne n'y est présente.*")
    //.addBlankField()
    usr.createDM()
        .then(async c => {
            await c.send(embed_welcome)
        })
        .catch(async e => {
            await console.log(`Impossible de DM ${usr.tag}`);
            await console.log(e)
        })

    var salon = "498236604981182475"
    if (member.guild.id == "364679913707667461") await bot.guilds.find("id", serv).channels.find("id", salon).send(`:inbox_tray: ${member.user.tag}`) // :arrow_right: vient de rejoindre le discord

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

bot.on("message", async (message) => {

    const prefix = await bot.config.prefix,
        cmd = await message.content.slice(bot.config.prefix.length).trim().split(/ +/g).shift(),
        args = await message.content.slice(bot.config.prefix.length).trim().split(/ +/g).join(" ").slice(cmd.length + 1).split(" "),
        //cmd = message.content.slice(bot.config.prefix.length).trim().split(/ +/g),
        content = await args.join(" ");

    if (message.channel.id == "453459420257714176" || message.channel.id == "370145947109425152") {
        //console.log(message.content);
        //console.log(message.content.substr(40));


        if (message.content.substr(40, 45).includes("RT")) {
            if (message.deletable) await message.delete()
        } else if (message.content.substr(55, 60).includes("@")) {
            if (message.deletable) await message.delete()
        }

        //return;
    }

    if (message.channel.id == "455787885371850754" && message.author.id == "404886025077522432") {
        //verifie si le message est dans #partenaires et que le message est envoyé par le bot youtube

        var content_message = await message.content.split(/ +/g)

        var user_new_content = await content_message[0];
        console.log(`User new content = '${user_new_content}'`)

        await message.channel.fetchMessages({ limit: 100, before: message.id })
            .then(async msgs => {
                await msgs.forEach(async msg => {
                    if (msg.content.includes(user_new_content)) {
                        console.log("Detected");
                        //if(msg.id == message.id) return;
                        if (msg.deletable) await msg.delete()
                    } else {
                        log("Not detected")
                    }
                })
            })
            .catch(async err => {
                await console.log(`Error sur le partenaires message`)
                await log(err)
            })

    }

    if (message.content.startsWith(prefix) && !message.author.bot) {
        try {
            //#region Permission Du Bot
            bot.BOT_SEND_MESSAGESPerm = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
            bot.BOT_MANAGE_MESSAGESPerm = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
            bot.BOT_ADMINISTRATORPerm = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
            bot.BOT_USE_EXTERNAL_EMOJISPerm = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'
            bot.BOT_ADD_REACTIONSPerm = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("ADD_REACTIONS") && message.channel.type === 'text'
            //#endregion

            //#region Permission de la personne
            bot.member_Has_BAN_MEMBERS = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'
            bot.member_Has_KICK_MEMBERS = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("KICK_MEMBERS") && message.channel.type === 'text'
            bot.member_Has_MANAGE_GUILD = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_GUILD") && message.channel.type === 'text'
            bot.member_has_MANAGE_MESSAGES = await message.guild.channels.find("id", message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'
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
        } catch (error) {
            console.log("Erreur bot :286")
            console.error(error)
        }
    }

    //salon mon-setup-klim //364683334644793345
    //salons #screenshots
    if (message.channel.id == "364683334644793345" || message.channel.name == "vos-screenshots") {
        var regex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
        //if(message.attachments.size < 0 || !message.content.match(regex)) return await message.delete()

        if (!message.attachments.size > 0) {
            //log("1")
            await message.delete(1500)
        } else {
            return;
        }

        /*
        if (!message.content.match(regex)) {
            log("2")
            await message.delete()
        }
        */
        /* else if () {
            return await message.delete()
        } else if () {|| message.attachments.first().client == undefined
            return await message.delete()
        }
        */
    }

    //demande-de-droits
    if (message.channel.id == "453483219770277888") {
        if (message.member == message.guild.me) return;
        await message.delete(500)
    }
});

bot.on("error", err => {
    console.error(err)
})

bot.on("voiceStateUpdate", async (old, now) => {
    var voice_move_user = "456184854036480000" //Accueil
    var voice_create_voice_name = "créer-votre-salon-privé"
    var voice_create_voice_name_autres_jeux = "autres-jeux"

    //Salons normaux
    if (!old.voiceChannel || !old.voiceChannel.name && now.voiceChannel.name == voice_create_voice_name) {
        //Si le mec vient de join un vocal
        try {

            log(`1- Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                var channel = await now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        await c.overwritePermissions(now.guild.me, { VIEW_CHANNEL: true, MANAGE_CHANNELS: true, MANAGE_ROLES_OR_PERMISSIONS: true })
                        await c.setBitrate(128).catch(e => { console.error(e.message); c.setBitrate(96) })
                        if (now.voiceChannel.parent.name === "Rocket League & FIFA") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "Rocket League"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "FIFA"), { VIEW_CHANNEL: true }).then(console.log("done"))
                        } else if (now.voiceChannel.parent.name === "W. Warcraft & HearthStone") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "World of Warcraft"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "HearthStone"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else if (now.voiceChannel.parent.name == "Playerunknown's BG") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "Playerunknown's Battlegrounds"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else c.overwritePermissions(now.guild.roles.find(r => r.name === now.voiceChannel.parent.name), { VIEW_CHANNEL: true })

                        await c.overwritePermissions(now.guild.roles.find(r => r.name === "@everyone"), { VIEW_CHANNEL: false })

                        setTimeout(async () => {
                            c.setParent(now.voiceChannel.parent).then(async () => {
                                await now.setVoiceChannel(c).then(async () => {
                                    setTimeout(async () => {
                                        await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                    })
                                }, 1000);
                            })
                        }, 800);

                        //})
                    })
                } else {
                    now.setVoiceChannel(channel).then(async m => {
                        setTimeout(async () => {
                            await channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }


            }
        } catch (error) {
            log(error)
        }

    }//Salons normaux
    else if (old.voiceChannel && now.voiceChannel) {

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
                var channel = await now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        await c.overwritePermissions(now.guild.me, { VIEW_CHANNEL: true, MANAGE_CHANNELS: true, MANAGE_ROLES_OR_PERMISSIONS: true })
                        await c.setBitrate(128).catch(e => { console.error(e.message); c.setBitrate(96) })
                        if (now.voiceChannel.parent.name === "Rocket League & FIFA") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "Rocket League"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "FIFA"), { VIEW_CHANNEL: true }).then(console.log("done"))
                        } else if (now.voiceChannel.parent.name === "W. Warcraft & HearthStone") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "World of Warcraft"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "HearthStone"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else if (now.voiceChannel.parent.name == "Playerunknown's BG") {
                            await c.overwritePermissions(now.guild.roles.find(r => r.name === "Playerunknown's Battlegrounds"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else c.overwritePermissions(now.guild.roles.find(r => r.name === now.voiceChannel.parent.name), { VIEW_CHANNEL: true })

                        await c.overwritePermissions(now.guild.roles.find(r => r.name === "@everyone"), { VIEW_CHANNEL: false })

                        setTimeout(async () => {
                            c.setParent(now.voiceChannel.parent).then(async () => {
                                await now.setVoiceChannel(c).then(async () => {
                                    setTimeout(async () => {
                                        await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                    })
                                }, 1000);
                            })
                        }, 800);

                        //})
                    })
                } else {
                    await now.setVoiceChannel(channel).then(async () => {
                        setTimeout(async () => {
                            await channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }
            }
        } catch (error) {
            log(error)
        }

    }

    //Salon "autres-jeux"
    if (!old.voiceChannel || !old.voiceChannel.name && now.voiceChannel.name == voice_create_voice_name_autres_jeux) {
        //Si le mec vient de join un vocal
        try {

            log(`1 AutresJeux- Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name_autres_jeux) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                var channel = await now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        //c.setParent(now.voiceChannel.parent).then(() => {
                        c.setParent(now.voiceChannel.parent).then(async () => {
                            await now.setVoiceChannel(c).then(async () => {
                                setTimeout(async () => {
                                    await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                })
                            }, 1000);
                        })
                        //})
                    })
                } else {
                    now.setVoiceChannel(channel).then(async m => {
                        setTimeout(async () => {
                            await channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }


            }
        } catch (error) {
            log(error)
        }

    }
    //Salon "autres-jeux"
    else if (old.voiceChannel && now.voiceChannel) {

        try {
            if (!now.voiceChannel.name == voice_create_voice_name_autres_jeux) return;
            log(`2 AutresJeux - Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name_autres_jeux) {
                var channel = await now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        //c.setParent(now.voiceChannel.parent).then(() => {
                        c.setParent(now.voiceChannel.parent).then(async () => {
                            await now.setVoiceChannel(c).then(async () => {
                                setTimeout(async () => {
                                    await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                })
                            }, 1000);
                        })
                        //})
                    })
                } else {
                    now.setVoiceChannel(channel).then(async () => {
                        setTimeout(async () => {
                            await channel.overwritePermissions(now.user, { CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                        })
                    }, 1000);
                }


            }
        } catch (error) {
            log(error)
        }

    }


    if (!old.serverMute && now.serverMute) {
        var embed_kick_private = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[PV]")[1].slice(1)}**`)


        if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[PV]")) {
                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(c => c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(c => c.name == voice_create_voice_name_autres_jeux)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)
            }
        }
    } else if (!old.serverDeaf && now.serverDeaf) {
        var embed_kick_private = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[PV]")[1].slice(1)}**`)

        if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[PV]")) {
                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(c => c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(c => c.name == voice_create_voice_name_autres_jeux)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)
            }
        }
    }

})

bot.login(bot.config.BOT_TOKEN)


//#region Functions
async function ChangeState1() {
    //bot.user.setActivity(`${bot.config.prefix} help | Watching u ( ͡° ͜ʖ ͡°)`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    await bot.user.setActivity(`${bot.config.prefix} help | Pour la liste des commandes.`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    setTimeout(async () => {
        await ChangeState2()
    }, ms("60s"));
}

async function ChangeState2() {
    await bot.user.setActivity(`${bot.config.prefix} help | Giving u some force (づ◕_◕)づ`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    setTimeout(async () => {
        await ChangeState1()
    }, ms("60s"));
}

async function channel_loop_verification() {
    console.log("Channel Loop Verification");

    await bot.guilds.forEach(async g => {
        await g.channels.forEach(async c => {
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