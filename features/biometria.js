let biometriaData = require('./database/biometria.json')
let cameraData = require('./database/camera.json')

module.exports = function(controller) {
    
    var delayBiometria = 1000;
    var delayCamera = 1000;

    controller.hears(['biometria'], 'message', async(bot, message) => {

        for(var prop in biometriaData) {
            let data = biometriaData[prop]
    
            setTimeout(tick, delayBiometria);
    
            async function tick() {
               await bot.changeContext(message.reference);
    
               if (data.Img === true) {
    
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
    
               } else if (data.Img === false){
    
                await bot.reply(message, data.text);
    
                await bot.reply(message, { type: 'typing' });
    
               }
            
            }
            
    
            delayBiometria += 2500;
        }
    
        setTimeout(async () => {
            await bot.changeContext(message.reference);
        
            await bot.reply(message, 'O que posso lhe ajudar agora?');
    
        }, delayBiometria + 2500)


    })

    controller.hears(['camera'], 'message', async(bot, message) => {

        for(var prop in cameraData) {
            let data = cameraData[prop]
    
            setTimeout(tick, delayCamera);
    
            async function tick() {
               await bot.changeContext(message.reference);
    
               if (data.Img === true) {
    
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
    
               } else if(data.Img === false) {
    
                await bot.reply(message, data.text);
    
                await bot.reply(message, { type: 'typing' });
    
               }
            
            }
            
    
            delayCamera += 2500;
        }
    
        setTimeout(async () => {
            await bot.changeContext(message.reference);
        
            await bot.reply(message, 'O que posso lhe ajudar agora?');
    
        }, delayCamera + 2500)
    })

}
