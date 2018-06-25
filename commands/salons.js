module.exports = {
    help: { name: "salons", aliases: ["channels"] },
    run: async (call) => {
        //message, bot, bot.commands, args, content, prefix, cmd

        call.message.react("✅")

        call.message.author.createDM().then(c => {
            c.send("Comment créer votre propre salon privé ?\n\nRien de plus simple ! Rejoignez le salon \"créer votre salon privé\" de votre section de jeu, attendez quelques secondes et le tour est joué !\n\n*A savoir que votre salon privé sera supprimé dans un délai de 5 minutes si aucune personne y est présente.*")
        })
    }
}