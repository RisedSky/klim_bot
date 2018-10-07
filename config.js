const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    prefix: "!kl",
    bot_version: "2.0.0",
    
    twitch_id: process.env.twitch_id,
    twitch_secret: process.env.twitch_secret,
}

//BOT_TOKEN: process.env.BOT_TOKEN,
module.exports = {
    config: config
}