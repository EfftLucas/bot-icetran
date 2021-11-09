const { BotkitConversation } = require('botkit');
const { TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');


module.exports = function(controller) {




    const ONBOARDING_PROMPT = 'onboarding_prompt'
    const PROFILE_DIALOG = 'profile_dialog'
    
    const textPrompt = new TextPrompt(ONBOARDING_PROMPT);

    const profile = new WaterfallDialog(PROFILE_DIALOG, [
        async(step) => {
            return await step.prompt(ONBOARDING_PROMPT, 'Qual o seu nome?')
        },
        async(step) => {
            step.values.name = step.result
            return await step.next();
        },
        async(step)=> {
            return step.endDialog(step.values);
        }
    ])
    
    
    let onboarding = new BotkitConversation('onboarding', controller);
    
    onboarding.say('Oie Aluno, tudo bem?');
    onboarding.addChildDialog(PROFILE_DIALOG, 'profile');
    onboarding.say({
        text: 'Quais da minhas funções, vamos explorar hoje?',
        quick_replies: [
            {
                title: "Cursos",
                payload: "Cursos",
            },
            {
                title: "Ambiente Virtual",
                payload: "AVA"
            },
            {
                title: "Ajuda",
                payload: "help"
            },
            {
                title: "Cep?",
                payload: "cep",
            }
        ]
    })
    

controller.addDialog(textPrompt);
controller.addDialog(profile);
controller.addDialog(onboarding);
    
controller.hears(['hello', 'hi', 'ola', 'oi'], 'message', async(bot, message) => {
    await bot.beginDialog('onboarding');
    
});
// Para o fluxo de qualquer dialogo e função
controller.interrupts('help','message', async(bot, message) => {
    bot.reply(message, 'Se você está no ICETRAN Aula-Remota, problemas com DETRAN, recomendo que entre em contato com seu CFC, aqui so consigo lhe ajudar, em como navegar na plataforma!')
    bot.reply(message, 'É so clicar em uma das opções aqui!')

    await bot.reply(message, {
        text: 'Menu super poderoso!',
        quick_replies: [
            {
                title: "Cursos",
                payload: "Cursos",
            },
            {
                title: "Ambiente Virtual",
                payload: "AVA"
            },
            {
                title: "Ajuda",
                payload: "help"
            },
            
        ]
    });
    
})

}
