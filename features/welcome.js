const { BotkitConversation } = require("botkit");
const { TextPrompt, WaterfallDialog } = require("botbuilder-dialogs");
const WelcomeData = ['Oi', 'Hello', 'tudo bem?', 'preciso de ajuda!','ola', '']

module.exports = function (controller) {
  const ONBOARDING_PROMPT = "onboarding_prompt";
  const PROFILE_DIALOG = "profile_dialog";

  const textPrompt = new TextPrompt(ONBOARDING_PROMPT);

  const profile = new WaterfallDialog(PROFILE_DIALOG, [
    async (step) => {
      return await step.prompt(ONBOARDING_PROMPT, "Qual o seu nome?");
    },
    async (step) => {
      step.values.name = step.result;
      return await step.next();
    },
    async (step) => {
      return step.endDialog(step.values);
    },
  ]);

  let onboarding = new BotkitConversation("onboarding", controller);

  onboarding.say("Oie Aluno, tudo bem?");
  onboarding.addChildDialog(PROFILE_DIALOG, "profile");
  onboarding.say({
    text: "Com oque eu posso lhe ajudar hoje?",
    quick_replies: [
      {
        title: "Biometria",
        payload: "biometria",
      },
      {
        title: "Instrutor",
        payload: "instrutor",
      },
      {
        title: "Como acessar as aulas",
        payload: "sala de aula",
      },
      {
        title: "Habilitar minha Camera",
        payload: "camera",
      }
    ],
  });

  controller.addDialog(textPrompt);
  controller.addDialog(profile);
  controller.addDialog(onboarding);

  controller.hears(
    WelcomeData,
    "message",
    async (bot, message) => {
      await bot.beginDialog("onboarding");
      console.log(message.incoming_message.channelData);
    }
  );
  controller.hears(
    ['help'],
    "message",
    async (bot, message) => {
      await bot.reply(
        message,
        'Para mais informações, entrar em contato com o seu CFC!'
      )
    }
  );
  // Para o fluxo de qualquer dialogo e função
  controller.interrupts(["ajuda"], "message", async (bot, message) => {
    bot.reply(
      message,
      "Se você está no ICETRAN Aula-Remota, problemas com DETRAN, recomendo que entre em contato com seu CFC, aqui so consigo lhe ajudar, em como navegar na plataforma!"
    );
    await bot.reply(message, {
      text: "É so clicar em uma das opções aqui!",
      quick_replies: [
        {
          title: "Como acessar minhas Aulas",
          payload: "Cursos",
        },
        {
          title: "Ajuda",
          payload: "help",
        },
      ],
    });
  });
};
