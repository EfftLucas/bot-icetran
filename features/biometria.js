const { BotkitConversation } = require('botkit');
const { TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');


module.exports = function(controller) {

    let biometria = new BotkitConversation('biometria', controller);

    biometria.say('Deixa comigo que vou te explicar sobre a biometria!')

    biometria.addAction('typing')

    biometria.addMessage({type: 'typing'}, 'typing');

    biometria.addAction('next_thread','typing');

    biometria.addMessage('Você fará a validação da sua biometria 3 vezes durante a sua aula conosco, a primeira é feita logo no inicio para poder acessar a sala de aula!', 'next_thread')

    biometria.addAction('typing-2', 'next_thread')

    biometria.before('next_thread',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    biometria.addAction('typing-2')

    biometria.addMessage({type: 'typing'}, 'typing-2');

    biometria.addAction('biometria_next_thread', 'typing-2')

    biometria.addMessage('A segunda é durante a aula, para garantir que ainda é você que está fazendo o curso ;D\nE terceira e ultima, é feita ao final do curso ao sair da sala de aula!', 'biometria_next_thread')


    biometria.before('biometria_next_thread',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });  


    let camera = new BotkitConversation('camera', controller);

    camera.say('Vou lhe ensinar como habilitar a sua camera então!')

    camera.addAction('typing-3');

    camera.addMessage({type: 'typing'}, 'typing-3');

    camera.addAction('next_thread-camera', 'typing-3');

    camera.addMessage('Quando você acessar pela primeira vez a aula, a plataforma irá solicitar acesso há sua camera', 'next_thread-camera');
    camera.addAction('typing-5' , 'next_thread-camera')

    camera.before('next_thread-camera',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    // next thread

    camera.addAction('typing-5');

    camera.addMessage({type: 'typing'}, 'typing-5');

    camera.addAction('next_thread-camera-2', 'typing-5');

    camera.addMessage('Caso não tenha acessado o curso ainda, é so clicar em permitir', 'next_thread-camera-2');

    camera.addAction('typing-4', 'next_thread-camera-2')

    camera.before('next_thread-camera-2',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    // next thread
    camera.addAction('typing-4')

    camera.addMessage({type: 'typing'}, 'typing-4');
    camera.addAction('next_thread-camera-1', 'typing-4');

    camera.addMessage('Mas caso já tenha acessado o curso, irei enviar algumas imagens para lhe ajudar a habilitar a imagem', 'next_thread-camera-1');

    camera.before('next_thread-camera-1',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    controller.addDialog(camera);
    controller.addDialog(biometria);

    controller.hears(['biometria'], 'message', async(bot, message) => {
        await bot.beginDialog('biometria')
    })

    controller.hears(['camera'], 'message', async(bot, message) => {
        await bot.beginDialog('camera')

        var reply1 = {
            text: 'Clique em definições',
            files: [
                {
                  url: 'https://i.imgur.com/FmErEJu.png',
                  image: true
                }
            ]
        }
        var reply2 = {
            text: 'Clique em Privacidade e Segurança, depois clique em Configurações do site ',
            files: [
                {
                  url: 'https://i.imgur.com/uWL4zBu.png',
                  image: true
                }
            ]
        }
        var reply3 = {
            text: 'Depois clique no site live.com (Que é o site do Microsoft Teams)',
            files: [
                {
                  url: 'https://i.imgur.com/KzywvmT.png',
                  image: true
                }
            ]
        }
        var reply4 = {
            text: 'Depois clique e selecione permitir nas abas camera e microfone, e acesse novamente a plataforma de aula',
            files: [
                {
                  url: 'https://i.imgur.com/HZfBBmn.png',
                  image: true
                }
            ]
        }

        await bot.reply(message, reply1);
        await new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
        await bot.reply(message, reply2);
        await new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
        await bot.reply(message, reply3);
        await new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
        await bot.reply(message, reply4);
        await bot.reply(message, 'Lembre-se você precisa deixar a sua camera ativada o tempo inteiro durante a aula!')
    })

}
