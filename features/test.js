module.exports = function(controller) {
// this is a text and example for future dialogs;
controller.hears(['teste'], ['message', 'direct_message'], async(bot, message) => {
    await bot.reply(message, { type: 'typing' });
    
    setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'Halllo!')

        await bot.reply(message, { type: 'typing' });
    }, 1000);
    

    setTimeout( async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, 'what heck are u doing here');

        await bot.reply(message, { type: 'typing' });
    }, 2000)


    setTimeout( async () => {

        await bot.changeContext(message.reference);
        let reply = {
            text: 'hippity hoppity',
            files: [
                {
                    url: 'https://i.imgur.com/pylWkt9.jpeg',
                   image: true,
                }
            ]
        }

        await bot.reply(message, reply);
    }, 3000)
});

}
