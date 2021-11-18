module.exports = function(controller) {

controller.hears(['sala de aula', 'teams', 'como acessar o curso', 'curso'], 'message', async(bot, message) => {
    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Certo! Vou ajudar a encontrar as suas aulas!')

        await bot.reply(message, { type: 'typing' });
    }, 2000);

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Logo após fazer o seu login no site da aula remota, você será direcionado para o menu principal da sua inscrição na aula remota.')

        await bot.reply(message, { type: 'typing' });
    }, 5000);

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'No menu principal existe um calendario ali em baixo que você consegue ver suas aulas')

        await bot.reply(message, { type: 'typing' });
    }, 7000);

    setTimeout( async () => {

        await bot.changeContext(message.reference);
        let reply = {
            text: 'Imagem para lhe ajudar!',
            files: [
                {
                    url: 'https://i.imgur.com/cwnpf2D.png',
                   image: true,
                }
            ]
        }

        await bot.reply(message, reply);

        await bot.reply(message, { type: 'typing' });
    }, 10000)

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Lembrando que para acessar a sala de aula você precisa de uma conta no Microsoft Teams, para criar uma é so clicar [aqui](https://www.microsoft.com/pt-br/microsoft-teams/group-chat-software)')

        await bot.reply(message, { type: 'typing' });
    }, 13000);

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Lembrando que você tem apenas 15 minutos de tolerância para acessar a sala de aula!')

        await bot.reply(message, { type: 'typing' });
    }, 17000);

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'E não sai da aula antes da hora! No final de cada aula existe uma biometria para verificar se você concluiu a aula!')

        await bot.reply(message, { type: 'typing' });
    }, 19000);

    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Se precisar de ajuda é so escrever ajuda.')
    }, 22000);

})

}
