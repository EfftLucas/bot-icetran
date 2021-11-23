
let jsonData = require('./database/data.json')

module.exports = function(controller) {
// this is a text and example for future dialogs;
controller.hears(['teste'], ['message', 'direct_message'], async(bot, message) => {

    await bot.reply(message, { type: 'typing' });

/*
    var offset = 0;
    data1.forEach(async(data) => {
        setTimeout(async () => {
        await bot.changeContext(message.reference);

        await bot.reply(message, data)

        await bot.reply(message, { type: 'typing' });
        }, 5000 + offset);

        offset += 1000;
    })
*/
var delay = 2000

    for(var prop in jsonData) {
        let data = jsonData[prop]

        setTimeout(tick, delay);

        async function tick() {
           await bot.changeContext(message.reference);

           if (data.Img = true) {

            let reply = {
                text: data.text,
                files: [
                    {
                       url: data.ImgData.url,
                       image: true,
                       source: data.ImgData.source  // <- Envia link da imagem
                    }
                ]
            }          
    
            await bot.reply(message, reply);

            await bot.reply(message, { type: 'typing' });

           } else {

            await bot.reply(message, data.text);

            await bot.reply(message, { type: 'typing' });

           }
        
        }
        

        delay += 2500;
    }

    setTimeout(async () => {
        await bot.changeContext(message.reference);
    
        await bot.reply(message, 'O que posso lhe ajudar agora?');

    }, delay + 2500)
   
});

}
