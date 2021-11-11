const { BotkitConversation } = require('botkit');
const { TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');


module.exports = function(controller) {

let aula = new BotkitConversation('aula', controller);

aula.say('Certo! Vou ajudar a encontrar as suas aulas!')

aula.addAction('typing-aula');

aula.addMessage({type: 'typing'}, 'typing-aula');

aula.addAction('next_thread-aula', 'typing-aula');

aula.addMessage('Logo após fazer o seu login no site da aula remota, você será direcionado para o menu principal da sua inscrição na aula remota.', 'next_thread-aula');
aula.addAction('typing-aula-1', 'next_thread-aula');
aula.before('next_thread-aula',  async () => {
    return new Promise((resolve) => {
        // simulate some long running process
        setTimeout(resolve, 3000);
    });
});

aula.addAction('typing-aula-1');
aula.addMessage({type: 'typing'}, 'typing-aula-1');
aula.addAction('next_thread-aula-1', 'typing-aula-1');

aula.addMessage('No menu principal existe um calendario ali em baixo que você consegue ver suas aulas', 'next_thread-aula-1')

aula.before('next_thread-aula-1',  async () => {
    return new Promise((resolve) => {
        // simulate some long running process
        setTimeout(resolve, 3000);
    });
});

controller.addDialog(aula)

function espera(tempo){
    return new Promise((resolve) => {
        // simulate some long running process
        setTimeout(resolve, tempo);
    });
}

controller.hears(['sala de aula', 'teams', 'como acessar o curso', 'curso'], 'message', async(bot, message) => {
    await bot.beginDialog('aula');
    await espera(3000)

    var reply = {
        text: 'Vou lhe mandar uma imagem do calendario para lhe ajudar ;D',
        files: [
            {
              url: 'https://i.imgur.com/cwnpf2D.png',
              image: true
            }
        ]
    }

    await bot.reply(message, reply);
    await espera(3000);

    await bot.reply(message, 'Lembrando que para acessar a sala de aula você precisa de uma conta no Microsoft Teams, para criar uma é so clicar [aqui](https://www.microsoft.com/pt-br/microsoft-teams/group-chat-software)')
    await espera(3000);

    await bot.reply(message, 'Lembrando que você tem apenas 15 minutos de tolerância para acessar a sala de aula!')
    await espera(3000);

    await bot.reply(message, 'E não sai da aula antes da hora! No final de cada aula existe uma biometria para verificar se você concluiu a aula!');
    await espera(3000);

    await bot.reply(message, 'Se precisar de ajuda é so escrever ajuda.')

    
});

}
