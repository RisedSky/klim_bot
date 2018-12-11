const games = {
    //#region Pole Battle Royale
    //PUBG
    /*
    ANCIEN
    pubgid: "503973242864926750",

    pubgid: "505380807737606155",
    pubgid: "507583317965799454",
    */
    pubgname: "Playerunknown's Battlegrounds",
    pubgid: "507584619797938176",
    //FTN
    fortnitename: "Fortnite",
    fortniteid: "503973241094799360",

    //COD
    bo4name: "Call of Duty",
    bo4id: "503973240407064576",
    //#endregion

    //#region Pole FPS
    //CS
    csgoname: "Counter-Strike",
    csgoid: "503973243619770398",

    cssname: "Counter-Strike",
    cssid: "503973240889147393",

    //R6
    r6sname: "Rainbow Six Siege",
    r6sid: "503973242449428513",

    //OW        
    owname: "Overwatch",
    owid: "503973242248364033",
    //#endregion

    //#region Pole MMOBA - Sports
    //WoW
    wowname: "World of Warcraft",
    wowid: "503973243137425408",

    //HS
    hsname: "HearthStone",
    hsid: "503973243422769163",

    //LoL
    lolname: "League of Legends",
    lolid: "503973243913240576",
    lolidserv: "453905058044575758",

    //D2
    dota2name: "Dota 2",
    dota2id: "503973242080460811",

    //----

    //RL
    rocketname: "Rocket League",
    rocketid: "503973242223198244",

    //FIFA
    fifaname: "FIFA",
    fifaid: "503973242378256392"
    //#endregion

}

//#region Colors section
var logred = function (m) { return console.log(colors.red(m)) }
    , logblue = function (m) { return console.log(colors.blue(m)) }
    , logyellow = function (m) { return console.log(colors.yellow(m)) }
    , loggreen = function (m) { return console.log(colors.green(m)) }
    , loggrey = function (m) { return console.log(colors.grey(m)) }
    , logcyan = function (m) { return console.log(colors.cyan(m)) }
    , logmagenta = function (m) { return console.log(colors.magenta(m)) }
    , logitalic = function (m) { return console.log(colors.italic(m)) }
    , lograinbow = function (m) { return console.log(colors.rainbow(m)) }

//#endregion
const Discord = require("discord.js")
    , bot = new Discord.Client()
    , colors = require("colors/safe")
    , ms = require("ms")
    , Twitch = require("twitch.tv-api")

//#region Vars
bot.config = require("./config.js").config;
bot.YTDL = require("ytdl-core")
bot.URL = require("url")
bot.moment = require("moment")
bot.request = require("request")
bot.prefixLog = "[!]"
bot.Klim_Server = "426157164466405377"
bot.servers = {}

const twitch = new Twitch({
    id: bot.config.twitch_id,
    secret: bot.config.twitch_secret
})
    , fs = require("fs")


//#region List des rôles givable
//bot.csgo = ""
//#endregion
//bot.Twitter = "<:Twitter:"

//#region Emojis
//504055814059982860
//insta
bot.insta = "<:insta:504055814059982860>"
bot.instaid = "504055814059982860"

//504055813950668811
//amazon
bot.amazon = "<:amazon:504055813950668811>"
bot.amazonid = "504055813950668811"

//504051544203984896
//fb
bot.fb = "<:fb:504051544203984896>"
bot.fbid = "504051544203984896"

//id: '503973243619770398',
//name: 'csgo',
bot.csgo = "<:csgo:503973243619770398>"
bot.csgoid = "503973243619770398"

//id: '503973240889147393',
//name: 'css',
bot.css = "<:css:503973240889147393>"
bot.cssid = "503973240889147393"

//id: '503973243913240576',
//name: 'lol',
bot.lol = "<:lol:503973243913240576>"
bot.lolid = "503973243913240576"

//id: '503973243422769163',
//name: 'hs',
bot.hs = "<:hs:503973243422769163>"
bot.hsid = "503973243422769163"

//id: '503973243271774218',
//name: 'kappa',
bot.kappa = "<:kappa:503973243271774218>"
bot.kappaid = "503973243271774218"

//id: '503973242864926750',
//name: 'pubg',
/*
ANCIEN
bot.pubg = "<:pubg:503973242864926750>"
bot.pubgid = "503973242864926750"
*/
//bot.pubg = "<:pubg:505380807737606155>"
//bot.pubg = "<:pubg:507583317965799454>"
//bot.pubgid = "507583317965799454"
bot.pubg = "<:pubg:507584619797938176>"
bot.pubgid = "507584619797938176"

//id: '503973243137425408',
//name: 'wow',
bot.wow = "<:wow:503973243137425408>"
bot.wowid = "503973243137425408"

//id: '503973242449428513',
//name: 'r6s',
bot.r6s = "<:r6s:503973242449428513>"
bot.r6sid = "503973242449428513"

//id: '503973242378256392',
//name: 'fifa',
bot.fifa = "<:fifa:503973242378256392>"
bot.fifaid = "503973242378256392"

//id: '503973242248364033',
//name: 'ow',
bot.ow = "<:ow:503973242248364033>"
bot.owid = "503973242248364033"

//id: '503973242080460811',
//name: 'dota2',
bot.dota2 = "<:dota2:503973242080460811>"
bot.dota2id = "503973242080460811"

//id: '503973241094799360',
//name: 'fortnite',
bot.fortnite = "<:fortnite:503973241094799360>"
bot.fortniteid = "503973241094799360"

//id: '503973240407064576',
//name: 'bo4',
bot.bo4 = "<:bo4:503973240407064576>"
bot.bo4id = "503973240407064576"

//id: '503973242223198244',
//name: 'rocket',
bot.rocket = "<:rocket:503973242223198244>"
bot.rocketid = "503973242223198244"

//id: '503973240843010069',
//name: 'klimtechs',
bot.klimtechs = "<:klimtechs:503973240843010069>"
bot.klimtechsid = "503973240843010069"

//id: '503973242235518986',
//name: 'klimcommunity',
bot.klimcommunity = "<:klimcommunity:503973242235518986>"
bot.klimcommunityid = "503973242235518986"

//id: '503973241258246144',
//name: 'klimesports',
bot.klimesports = "<:klimesports:503973241258246144>"
bot.klimesportsid = "503973241258246144"

//503976784107143169
//name: "twitter"
bot.twitter = "<:twitter:503976784107143169>"
bot.twitterid = "503976784107143169"

//503976784216457226
//twitch
bot.twitch = "<:twitch:503976784216457226>"
bot.twitchid = "503976784216457226"

//503976784384098304
//youtube
bot.youtube = "<:youtube:503976784384098304>"
bot.youtubeid = "503976784384098304"

//503976784342155321
//steam
bot.steam = "<:steam:503976784342155321>"
bot.steamid = "503976784342155321"
//#endregion

bot.invisible_emote = "<:vide:456161732901994506>"
bot.Streamer_Role = "440172608969900035"
bot.Partenaires_Role = "445136652076056577"
bot.VIP_Role = "364693732374740994"
bot.Administrateur_Role = "365131394676031489"
bot.Moderateur_Role = "364682190006517771"
bot.ResponsableSection_Role = "505011080431534091"

bot.admin_id = [
    "516033691525447680", //RisedSky Ancien : 145632403946209280
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
                try {
                    message.reply("Désolé mais je ne peux pas te MP, ouvre tes MPs stp.")
                } catch (error) {
                    console.log(error)
                }
                return;
            }
        })
        .then(() => {
            message.author.send(msgToSend)
        })

}
//#endregion


bot.once('ready', () => {
    bot.user.setStatus("online")
    console.log(colors.green("------------------------------"))
    console.log(colors.green(`${bot.prefixLog} Bot créé par RisedSky`))
    console.log(colors.green(`${bot.prefixLog} Tous droits réservés`))
    console.log(colors.green(`${bot.prefixLog} Bot prêt`))
    console.log(colors.green("------------------------------"))

    //bot.user.setActivity(`${bot.config.prefix} help | Lancé et prêt !`);
    bot.user.setActivity(`${bot.config.prefix} help | Lancé et prêt !`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })

    setTimeout(ChangeState1, ms("15s"));
    console.log(colors.blue("The bot is now ready !"))

    for (var i in bot.guilds.array()) {
        console.log(`${i} » '${bot.guilds.array()[i]}'`)
    }

    for (var i in bot.guilds.array()) {
        if (bot.guilds.array()[i].id == "364679913707667461") { //serv klim public > 364679913707667461
            bot.guilds.array()[i].roles.forEach(r => console.log(`${r.name} » ${r.id}`))
            //console.log(`${i} » ${g.roles.array()[i]}`)
        }
    }

    /*
    setInterval(() => {
        loop_verification()
    }, ms("5m"));
    */

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
            bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === salon).send(`:outbox_tray: ${member.user.tag}`) // :arrow_right: vient de quitter le discord
            //bot.guilds.find("id", serv).channels.find("id", salon).send(`:outbox_tray: ${member.user.tag}`) // :arrow_right: vient de quitter le discord
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

        if (member.guild.id == "364679913707667461") await bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === "495968450095742976").send(kick_embed)
    })
})

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

        await bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === "495968450095742976").send(unban_embed)
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

        await bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === "495968450095742976").send(ban_embed)
    })
})


bot.on("guildMemberAdd", async member => {
    let serv = "453464806062817281"
    var usr = member
    let embed_welcome = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Bienvenue sur le serveur discord KLIM !`, bot.avatarURL)
        .setDescription(`Avant toute chose merci de lire ce message, puis ensuite d'aller lire le <#364687962916651010>\n${bot.invisible_emote}`)
        .addField(`Pour accéder à vos salons favoris.`, `:small_orange_diamond: Allez dans le salon <#453483219770277888>, puis réagissez avec les réactions, cela va vous permettre d'accéder à vos différentes sections de jeux.\n${bot.invisible_emote}`)
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
    if (member.guild.id == "364679913707667461") await bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === salon).send(`:inbox_tray: ${member.user.tag}`) // :arrow_right: vient de rejoindre le discord

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
    if (!bot.servers[message.guild.id]) {
        bot.servers[message.guild.id] = {
            queue: [],
            now_playing_data: {},
            loopit: Boolean,
            playit: Boolean,
            dispatcher_paused: Boolean,
            annonce_it: Boolean
        }
    }

    //Declaring variable
    bot.server = bot.servers[message.guild.id]
    var server = bot.servers[message.guild.id]

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
            //#region Permission Du Bot | bot.guilds.find(async g => await g.id === serv).channels.find(async c => await c.id === 
            bot.BOT_SEND_MESSAGESPerm = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.guild.me).has("SEND_MESSAGES") && message.channel.type === 'text'
            bot.BOT_MANAGE_MESSAGESPerm = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.guild.me).has("MANAGE_MESSAGES") && message.channel.type === 'text'
            bot.BOT_ADMINISTRATORPerm = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.guild.me).has("ADMINISTRATOR") && message.channel.type === 'text'
            bot.BOT_USE_EXTERNAL_EMOJISPerm = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS") && message.channel.type === 'text'
            bot.BOT_ADD_REACTIONSPerm = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.guild.me).has("ADD_REACTIONS") && message.channel.type === 'text'
            //#endregion

            //#region Permission de la personne
            bot.member_Has_BAN_MEMBERS = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.member).has("BAN_MEMBERS") && message.channel.type === 'text'
            bot.member_Has_KICK_MEMBERS = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.member).has("KICK_MEMBERS") && message.channel.type === 'text'
            bot.member_Has_MANAGE_GUILD = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.member).has("MANAGE_GUILD") && message.channel.type === 'text'
            bot.member_has_MANAGE_MESSAGES = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.member).has("MANAGE_MESSAGES") && message.channel.type === 'text'
            bot.member_has_MANAGE_CHANNELS = await message.guild.channels.find(async c => await c.id === message.channel.id).permissionsFor(message.member).has("MANAGE_CHANNELS") && message.channel.type === 'text'
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
            console.log("Erreur bot :366")
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

    //demande-de-droits ancien : 453483219770277888
    /*if (message.channel.id == "364687962916651010") {
        if (message.member == message.guild.me) return;
        await message.delete(500)
    }*/
});

bot.on("error", err => {
    console.error(err)
})

bot.on("channelUpdate", async (oldchannel, newchannel) => {
    if (oldchannel.name.includes("[PV]")) {
        if (newchannel.name != oldchannel.name) {
            let user = String(oldchannel.name).substr(5)
            console.log(user)
            let userfind = bot.users.find(async u => u.username == user)
            if (!userfind) return console.log("pas trouvé")
            await newchannel.setName(oldchannel.name)
            console.log(oldchannel.name);

            return console.log("defined")
        }
    }

})

bot.on("voiceStateUpdate", async (old, now) => {
    var voice_move_user = "456184854036480000" //Accueil
    var voice_create_voice_name = "créer-votre-salon-privé"
    var voice_create_voice_name_autres_jeux = "autres-jeux"
    var voice_create_voice_name_events = "tournois"

    //Salons normaux
    if (!old.voiceChannel || !old.voiceChannel.name && now.voiceChannel.name == voice_create_voice_name) {
        //Si le mec vient de join un vocal
        try {

            log(`1- Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                var channel = await now.voiceChannel.guild.channels.find(async c => await c.name === `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        await c.overwritePermissions(now.guild.me, { VIEW_CHANNEL: true, MANAGE_CHANNELS: true, MANAGE_ROLES_OR_PERMISSIONS: true })
                        if (now.voiceChannel.parent.name === "Rocket League & FIFA") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Rocket League"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "FIFA"), { VIEW_CHANNEL: true }).then(console.log("done"))
                        } else if (now.voiceChannel.parent.name === "W. Warcraft & HearthStone") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "World of Warcraft"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "HearthStone"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else if (now.voiceChannel.parent.name == "Playerunknown's BG") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Playerunknown's Battlegrounds"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else c.overwritePermissions(now.guild.roles.find(async r => await r.name === now.voiceChannel.parent.name), { VIEW_CHANNEL: true })

                        await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "@everyone"), { VIEW_CHANNEL: false })
                        await c.setBitrate(128).catch(e => { console.error(e.message); c.setBitrate(96) })

                        setTimeout(async () => {
                            c.setParent(now.voiceChannel.parent).then(async () => {
                                await now.setVoiceChannel(c).then(async () => {
                                    setTimeout(async () => {
                                        await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                    })
                                }, 1000);
                            })
                        }, 1200);

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
                        if (now.voiceChannel.parent.name === "Rocket League & FIFA") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Rocket League"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "FIFA"), { VIEW_CHANNEL: true }).then(console.log("done"))
                        } else if (now.voiceChannel.parent.name === "W. Warcraft & HearthStone") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "World of Warcraft"), { VIEW_CHANNEL: true }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "HearthStone"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else if (now.voiceChannel.parent.name == "Playerunknown's BG") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Playerunknown's Battlegrounds"), { VIEW_CHANNEL: true }).then(console.log("done"))

                        } else c.overwritePermissions(now.guild.roles.find(async r => await r.name === now.voiceChannel.parent.name), { VIEW_CHANNEL: true })

                        await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "@everyone"), { VIEW_CHANNEL: false })
                        await c.setBitrate(128).catch(e => { console.error(e.message); c.setBitrate(96) })

                        setTimeout(async () => {
                            c.setParent(now.voiceChannel.parent).then(async () => {
                                await now.setVoiceChannel(c).then(async () => {
                                    setTimeout(async () => {
                                        await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                    })
                                }, 1000);
                            })
                        }, 1200);

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

    }//Salon "autres-jeux"
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

    //Salon "events"
    if (!old.voiceChannel || !old.voiceChannel.name && now.voiceChannel.name == voice_create_voice_name_events) {
        //Si le mec vient de join un vocal
        try {

            log(`1 Events- Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name_events) {
                //now.voiceChannel.overwritePermissions(now.user, { CONNECT: false })
                var channel = await now.voiceChannel.guild.channels.find("name", `[PV] ${now.user.username}`)
                if (!channel) {
                    console.log(`Pas de salon au nom de [PV] ${now.user.username}`)
                    await now.voiceChannel.guild.createChannel(`[PV] ${now.user.username}`, "voice").then(async c => {
                        await c.overwritePermissions(now.guild.me, { VIEW_CHANNEL: true, MANAGE_CHANNELS: true, MANAGE_ROLES_OR_PERMISSIONS: true })
                        if (now.voiceChannel.parent.name === "Rocket League & FIFA") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Rocket League"), { VIEW_CHANNEL: true, CONNECT: false }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "FIFA"), { VIEW_CHANNEL: true, CONNECT: false }).then(console.log("done"))
                        } else if (now.voiceChannel.parent.name === "W. Warcraft & HearthStone") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "World of Warcraft"), { VIEW_CHANNEL: true, CONNECT: false }).then(console.log("done"))
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "HearthStone"), { VIEW_CHANNEL: true, CONNECT: false }).then(console.log("done"))

                        } else if (now.voiceChannel.parent.name == "Playerunknown's BG") {
                            await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "Playerunknown's Battlegrounds"), { VIEW_CHANNEL: true, CONNECT: false }).then(console.log("done"))

                        } else c.overwritePermissions(now.guild.roles.find(async r => await r.name === now.voiceChannel.parent.name), { VIEW_CHANNEL: true, CONNECT: false })

                        await c.overwritePermissions(now.guild.roles.find(async r => await r.name === "@everyone"), { VIEW_CHANNEL: false })
                        await c.setBitrate(128).catch(e => { console.error(e.message); c.setBitrate(96) })

                        setTimeout(async () => {
                            c.setParent(now.voiceChannel.parent).then(async () => {
                                await now.setVoiceChannel(c).then(async () => {
                                    setTimeout(async () => {
                                        await c.overwritePermissions(now.user, { MANAGE_CHANNELS: true, CREATE_INSTANT_INVITE: true, DEAFEN_MEMBERS: true, MUTE_MEMBERS: true })
                                    })
                                }, 1000);
                            })
                        }, 1200);

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

    }//Salon "events"
    else if (old.voiceChannel && now.voiceChannel) {

        try {
            if (!now.voiceChannel.name == voice_create_voice_name_events) return;
            log(`2 Events - Detected the join of ${now.user.tag}`)
            if (now.voiceChannel.name == voice_create_voice_name_events) {
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


    if (!old.serverMute && now.serverMute) {//Si avant il n'était pas mute micro

        if (old.voiceChannel.name == now.voiceChannel.name) {//Si le salon où il est est le même que son mute

            if (now.voiceChannel.name.includes("[PV]")) {//Si le salon dans lequel il est contient [PV]
                var embed_kick_private = new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[PV]")[1].slice(1)}**`)

                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name_autres_jeux)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)

            } /*else if (now.voiceChannel.name.includes("[TRN]")) {//Si le salon dans lequel il est contient [PV]
                var embed_kick_private = new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[TRN]")[1].slice(1)}**`)

                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name_events)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)
            }*/
        }
    } else if (!old.serverDeaf && now.serverDeaf) {

        if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[PV]")) {
                var embed_kick_private = new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[PV]")[1].slice(1)}**`)

                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name_autres_jeux)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)
            }
        }/* else if (old.voiceChannel.name == now.voiceChannel.name) {
            if (now.voiceChannel.name.includes("[TRN]")) {
                var embed_kick_private = new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription(`Vous avez été exclu du salon de **${now.voiceChannel.name.split("[TRN]")[1].slice(1)}**`)

                await now.setMute(false)
                await now.setDeaf(false)

                var salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name)
                if (!salon) salon = now.voiceChannel.parent.children.find(async c => await c.name == voice_create_voice_name_events)
                await now.user.createDM().then(async c => await c.send(embed_kick_private))
                await now.setVoiceChannel(salon)
            }
        }*/
    }

})

bot.login(bot.config.BOT_TOKEN)


bot.on("messageReactionAdd", async (reaction, user) => {
    let getout = Boolean
    let guild = reaction.message.guild
    const salonHighlight = "495968450095742976"
        , serv = "453464806062817281"

    if (user.bot) return console.log("bot reaction detected")
    if (!reaction.message.guild) return await console.log("pas guild");
    console.log("id => " + reaction.message.author.id)
    //if (!reaction.message.author.id == "445592720157704222") return console.log("pas mwa")
    if (!reaction.message.author.bot) return await console.log("pas mwa")
    if (!reaction.message.author.id == bot.user.id) return await console.log("pas mwa !")

    /*
    reaction.message.guild.fetchMember(user, true).then(user => {
        user.roles.find(r => {
            if ((r.id == bot.ResponsableSection_Role) || (r.id == bot.Moderateur_Role)) {
                //if ((r.id == "440172608969900035") || (r.id == "475790839919017994")) {R Streamer R Translator G private
                getout = true
                try {
                    reaction.remove(user)
                } catch (error) {
                    console.log(`Can't remove reaction of ${user.user.tag}`)
                }
                return console.log("detected ResponsableSection_Role / Moderateur_Role")
            }
        })
    })
    */

    //console.log(reaction.emoji)
    //console.log(user.username)
    setTimeout(async () => {
        if (getout == true) return console.log(`getout is true`);
        switch (reaction.emoji.id) {

            //#region Pole Battle Royale
            //PUBG
            case games.pubgid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.pubgname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.pubgname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.pubgname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.pubgname}**`)

                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //FTN
            case games.fortniteid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.fortnitename)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.fortnitename)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.fortnitename}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.fortnitename}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //COD
            case games.bo4id:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.bo4name)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.bo4name)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.bo4name}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.bo4name}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //#endregion

            //#region Pole FPS
            //CS
            case games.csgoid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.csgoname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.csgoname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.csgoname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.csgoname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //R6
            case games.r6sid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.r6sname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.r6sname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.r6sname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.r6sname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //OW
            case games.owid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.owname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.owname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.owname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.owname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;
            //#endregion

            //#region Pole MMOBA - Sports
            //WOW
            case games.wowid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.wowname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.wowname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.wowname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.wowname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //HS
            case games.hsid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.hsname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.hsname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.hsname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.hsname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //D2
            case games.dota2id:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.dota2name)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.dota2name)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.dota2name}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.dota2name}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //lol
            case games.lolid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.lolname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.lolname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.lolname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.lolname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //lol du serv offi
            case games.lolidserv:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.lolname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.lolname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.lolname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.lolname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //RL
            case games.rocketid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.rocketname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.rocketname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.rocketname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.rocketname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //FIFA
            case games.fifaid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (!member.roles.find(async r => await r.name == games.fifaname)) {
                            console.log("trouvé")
                            await member.addRole(guild.roles.find(async r => await r.name == games.fifaname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.fifaname}\` ajouté.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est donné le rôle :arrow_right: **${games.fifaname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //#endregion

            default:
                break;
        }

    }, 2500);
})

bot.on("messageReactionRemove", async (reaction, user) => {
    let getout = Boolean
    let guild = reaction.message.guild
    const salonHighlight = "495968450095742976"
        , serv = "453464806062817281"

    if (user.bot) return console.log("bot reaction detected")
    if (!reaction.message.guild) return await console.log("pas guild");
    console.log("id => " + reaction.message.author.id)
    //if (!reaction.message.author.id == "445592720157704222") return console.log("pas mwa")
    if (!reaction.message.author.bot) return await console.log("pas mwa")
    if (!reaction.message.author.id == bot.user.id) return await console.log("pas mwa !")

    /*
    await reaction.message.guild.fetchMember(user, true).then(user => {
        user.roles.find(r => {
            if (r.id == bot.ResponsableSection_Role || r.id == bot.Moderateur_Role) {
                getout = true
                return console.log("detected ResponsableSection_Role / Moderateur_Role")
            }
        })
    })
    */

    setTimeout(async () => {
        if (getout == true) return console.log(`getout is true`);
        //console.log(reaction.emoji)
        //console.log(user.username)
        switch (reaction.emoji.id) {

            //#region Pole Battle Royale
            //PUBG
            case games.pubgid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.pubgname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.pubgname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.pubgname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.pubgname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //FTN
            case games.fortniteid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.fortnitename)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.fortnitename)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.fortnitename}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.fortnitename}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //COD
            case games.bo4id:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.bo4name)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.bo4name)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.bo4name}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.bo4name}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //#endregion


            //#region Pole FPS
            //CS
            case games.csgoid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.csgoname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.csgoname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.csgoname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.csgoname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //R6
            case games.r6sid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.r6sname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.r6sname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.r6sname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.r6sname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //OW
            case games.owid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.owname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.owname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.owname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.owname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;
            //#endregion


            //#region Pole MMOBA - Sports
            //WOW
            case games.wowid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.wowname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.wowname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.wowname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.wowname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //HS
            case games.hsid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.hsname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.hsname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.hsname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.hsname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //D2
            case games.dota2id:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.dota2name)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.dota2name)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.dota2name}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.dota2name}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //lol
            case games.lolid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.lolname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.lolname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.lolname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.lolname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //lol du serv offi
            case games.lolidserv:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.lolname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.lolname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.lolname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.lolname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //RL
            case games.rocketid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.rocketname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.rocketname)).then(async () => {

                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.rocketname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.rocketname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //FIFA
            case games.fifaid:
                await guild.fetchMember(user, true)
                    .then(async member => {
                        if (member.roles.find(async r => await r.name == games.fifaname)) {
                            console.log("trouvé")
                            await member.removeRole(guild.roles.find(async r => await r.name == games.fifaname)).then(async () => {
                                await user.createDM().then(async c => await c.send(`✅ Rôle \`${games.fifaname}\` supprimé.`))
                                await bot.guilds.find(async s => await s.id == serv).channels.find(async c => await c.id == salonHighlight).send(`**${user.tag}** s'est enlevé le rôle :arrow_right: **${games.fifaname}**`)
                            })
                        } else {
                            console.log("pas trouvé")
                        }
                    })
                    .catch(async e => console.error(e))
                break;

            //#endregion

            default:
                break;
        }
    }, 2500);
})

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on("raw", async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }

    await bot.emit(events[event.t], reaction, user);
});


//#region Functions
async function ChangeState1() {
    //bot.user.setActivity(`${bot.config.prefix} help | Watching u ( ͡° ͜ʖ ͡°)`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    await bot.user.setActivity(`${bot.config.prefix} help | Pour la liste des commandes.`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
    setTimeout(async () => {
        await ChangeState2()
    }, ms("60s"));
}

async function ChangeState2() {
    await bot.user.setActivity(`${bot.config.prefix} help | Te donner de la force (づ◕_◕)づ`, { type: "STREAMING", url: "https://twitch.tv/KlimTechs" })
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

bot.CheckInfo_ToBooleanEmoji = async function (thing) { if (thing) { return `Oui :white_check_mark:` } else { return `Non ❌` } }

bot.deleteMyMessage = async function (message, time) {
    try {
        if (time === null) {
            time = 750;
        }

        if (!message.author.name === bot.user.name || !message.author.name === bot.user.username) {
            return;
        }
        await message.delete(time).catch(async error => (console.log("deleteMyMessage prblm : " + error)));
    } catch (error) {
        console.log("Problem on deleteMyMessage function: " + error)
    }
}

//#region "Functions pour la musique"
bot.AskedBy_EmbedFooter = async function (author) {
    return await String(`Demandé par ${author.tag} • ID: ${author.id}`);
}

bot.search_video = async function (message, query) {
    bot.request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${bot.config.yt_api_key}`, async (error, response, body) => {
        var json = JSON.parse(body);

        if ("error" in json) {
            await message.reply("Merci de prendre un screen et de l'envoyer à `KLIM RisedSky#4841````\nAn error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason + "```")
                .then(async msg => {
                    await bot.deleteMyMessage(msg, 30000);
                })
        } else if (json.items.length === 0) {
            await message.reply("Aucune vidéo trouvée avec les critères: ```" + query + "```")
                .then(async msg => {
                    await bot.deleteMyMessage(msg, 20 * 1000);
                })
        } else {
            await bot.add_to_queue(json.items[0].id.videoId, message);
        }
    })
}

bot.add_to_queue = async function (video, message) {
    var server = await bot.servers[message.guild.id]
        , video_id = video
        , playit = server.playit
    console.log(`Le playit => ${playit}`)

    bot.YTDL.getInfo(`https://www.youtube.com/watch?v=${video}`, async (error, info) => {
        if (error) {
            message.reply(`La vidéo demandée (${video}) n'existe pas ou ne peut être lue.`).then(async msg => {
                await bot.deleteMyMessage(msg, 15000);
            })
            console.log(`Error (${video}): ${error}`);
            return;
        }

        console.log(info)
        console.log(`----------------------`)
        var date = new Date(null); //défini comme null la date
        console.log(info.view_count);
        date.setSeconds(info.length_seconds); //défini la date avec des secondes
        var result = date.toISOString().substr(11, 8); // récupere le temps et le transforme en HH:mm:ss

        var YouTubeTimeSec = await info.length_seconds
            , YouTubeViews = await info.view_count
            , YouTubeUploader = await info.author.name
            , YouTubeTitle = await info.title
            , YouTubeThumbnail = await info.thumbnail_url
            , YouTubeLink = await info.video_url
            , YouTubeTime = result

        if (playit) {
            if (server.annonce_it) {
                var embed = new Discord.RichEmbed()
                    .setColor("#00FF00")

                    .setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)

                    //petit logo à gauche du titre
                    .setTitle(`Ajouté à la liste à la [${server.queue.length}] place`)

                    .addField(`Ajout de ${YouTubeTitle}`, `*demandé par ${message.author.username}*`)
                    .setFooter(await bot.AskedBy_EmbedFooter(message.author))
                await message.channel.send(embed).then(async msg => {
                    bot.deleteMyMessage(msg, (YouTubeTimeSec * 1000) - 10);
                })
            }
        }

        if (!playit) {//Si on NE doit PAS jouer la musique alors

            let EmbedAuthorName = "Musique cherchée sur YouTube";
            let EmbedAuthorIcon = `https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png`;

            var search_embed = new Discord.RichEmbed()
                .setColor("#00FF00")

                .setThumbnail(YouTubeThumbnail).setURL(YouTubeLink)

                //petit logo à gauche du titre
                .setAuthor(EmbedAuthorName, EmbedAuthorIcon)
                .setTitle(YouTubeTitle)

                .addField("Votre demande est", "```" + message.content + "```")

                .addBlankField()

                .addField(`Mise en ligne par`, YouTubeUploader, true)
                .addField(`Durée de`, `**${YouTubeTime}**`, true)

                .addBlankField()

                .addField(`Vues`, YouTubeViews, true)
                .addField(`Lien`, `[Cliquez ici](${YouTubeLink})`, true)

                .setFooter(await bot.AskedBy_EmbedFooter(message.author))


            await message.channel.send(search_embed).then(async msg => {
                bot.deleteMyMessage(msg, 600 * 1000)
            })
        }

        if (playit) {
            if (!message.member.voiceChannel) return await message.reply(`❌ Tu as besoin d'être connecté à un salon vocal`).then(async m => await bot.deleteMyMessage(m, 350))

            if (!message.guild.voiceConnection) {
                server.loopit = false;
                server.dispatcher_paused = false;

                await message.member.voiceChannel.join()
                    .then(async connection => {
                        if (!message.guild.me.serverDeaf) { await message.guild.me.setDeaf(true, "Save bot's bandwith") }

                        await bot.play(connection, message);
                    })
                    .catch(async error => {
                        console.error(error)
                    })
            };

            server.queue.push(
                {
                    title: info["title"],
                    id: video_id,
                    user: message.author.username,
                    YouTubeTimeSec: YouTubeTimeSec,
                    YouTubeViews: YouTubeViews,
                    YouTubeUploader: YouTubeUploader,
                    YouTubeTitle: YouTubeTitle,
                    YouTubeThumbnail: YouTubeThumbnail,
                    YouTubeLink: YouTubeLink,
                    YouTubeTime: YouTubeTime,
                    MessContent: message.content
                }
            );
        };
    })

}

bot.queue_playlist = async function (playlistId, message, pageToken = '') {
    var Number_Added = 0;
    var server = await bot.servers[message.guild.id];


    bot.request(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${yt_api_key}&pageToken=${pageToken}`, async (error, response, body) => {
        var json = JSON.parse(body);

        if ("error" in json) {
            await message.reply(`An error has occurred: ${json.error.errors[0].message} - ${json.error.errors[0].reason}`)
                .then(async msg => {
                    await bot.deleteMyMessage(msg, 15 * 1000)
                });
        } else if (json.items.length === 0) {
            await message.reply("Aucune vidéo trouvée dans la playlist.")
                .then(async msg => {
                    await bot.deleteMyMessage(msg, 15 * 1000)
                });
        } else {
            for (var i = 0; i < json.items.length; i++) {
                server.annonce_it = false;
                await bot.add_to_queue(json.items[i].snippet.resourceId.videoId, message)
                Number_Added++;
            }

            if (json.nextPageToken == null) {
                await message.channel.send(`${Number_Added} Musiques ajoutées.`)
                    .then(async msg => {
                        await bot.deleteMyMessage(msg, 20 * 1000)
                    })

                Number_Added = 0;
                return;
            }

            await bot.queue_playlist(playlistId, message, json.nextPageToken)
        }
    });
}

bot.get_video_id = async function (string) {
    try {
        var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
        console.log("String: " + string)
        var matches = String(string.match(regex));
        console.log("Matches: " + matches)

        if (matches) {
            return matches[1];
        } else {
            return string;
        }

    } catch (error) {
        console.log("get_video_id problem => " + error)
    }
}

bot.play = async function (connection, message) {

    try {
        console.log(`-----------------------------------`)
        console.log(`bot.play section\n----`)
        var server = bot.servers[message.guild.id];
        //console.log(message.guild.id)

        setTimeout(async () => {

            var video_id = server.queue[0]["id"];
            console.log(colors.green(video_id))
            var title = server.queue[0]["title"];
            var user = server.queue[0]["user"];

            server.now_playing_data["title"] = title;
            server.now_playing_data["user"] = user;

            console.log(colors.green(server))
            console.log(server.queue[0])

            var playit = server.playit;

            var embed = new Discord.RichEmbed()
                .setColor("#00FF00")

                .setThumbnail(server.queue[0]["YouTubeThumbnail"]).setURL(server.queue[0]["YouTubeLink"]) //miniature + lien vers la vidéo en cliquant sur la minia

                //petit logo à gauche du titre
                .setAuthor(`Musique actuelle`, `https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png`)
                .setTitle(server.queue[0]["YouTubeTitle"])

                .addField("Votre demande est", "```" + server.queue[0]["MessContent"] + "```")

                .addBlankField()

                .addField(`Mise en ligne par`, server.queue[0]["YouTubeUploader"], true)
                .addField(`Durée de`, `**${server.queue[0]["YouTubeTime"]}**`, true) //temps

                .addBlankField()

                .addField(`Vues`, server.queue[0]["YouTubeViews"], true)
                .addField(`Lien`, `[Cliquez ici](${server.queue[0]["YouTubeLink"]})`, true)
                /*.setAuthor(YouTubeTitle, message.author.avatarURL)
                Code qui permet de définir le titre et le logo du demandeur
                */
                .setFooter(await bot.AskedBy_EmbedFooter(message.author));

            console.log(`Vues : ${server.queue[0]["YouTubeViews"]}`)

            message.channel.send(embed).then(async msg => {
                await bot.deleteMyMessage(msg, server.queue[0]["YouTubeTimeSec"] * 1000);
            })

            server.dispatcher = connection.playStream(
                await bot.YTDL(video_id, { filter: "audioonly", audioEncondig: "opus", audioBitrate: "64" })
            );

            await server.dispatcher.setVolume(0.2);

            server.dispatcher.on("end", async function () {

                if (!server.loopit) {
                    await server.queue.splice(0, 1);
                }

                if (server.queue[0]) {
                    setTimeout(async () => {
                        await bot.play(connection, message);
                    }, 1200);
                } else {
                    if (message.guild.voiceConnection) {
                        //message.channel.send(bot.EmojiGreenTickString + " Finished the queue from channel: `" + message.guild.voiceConnection.channel.name + "` :wave:")
                        message.channel.send(`:white_check_mark: Fin de la liste dans le salon : \`${message.guild.voiceConnection.channel.name}\` :wave:`)
                            .then(async msg => {
                                await bot.deleteMyMessage(msg, 13 * 1000);
                            });
                        await message.guild.voiceConnection.disconnect();

                    }
                }

            })
        }, 750);

    } catch (error) {
        console.log("[play] Function play")
        console.log(error)
    }
}
//#endregion

module.exports = bot, Call;