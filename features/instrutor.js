let InstrutorData = require("./database/appInstrutor.json");

let {
  instrutorBase
} = require("../conhecimento/basedeconhecimento.js");

module.exports = function (controller) {
  var delayinstrutorBase = 1000;

  controller.hears(instrutorBase, "message", async (bot, message) => {
    for (var prop in biometriaData) {
      let data = InstrutorData[prop];

      setTimeout(tick, delayinstrutorBase);

      async function tick() {
        await bot.changeContext(message.reference);

        if (data.Img === true) {
          let reply = {
            text: data.text,
            files: [
              {
                url: data.ImgData.url,
                image: true,
                source: data.ImgData.source, // <- Envia link da imagem
              },
            ],
          };

          await bot.reply(message, reply);

          await bot.reply(message, { type: "typing" });
        } else if (data.Img === false) {
          await bot.reply(message, data.text);

          await bot.reply(message, { type: "typing" });
        }
      }

      delayinstrutorBase += 2500;
    }

    setTimeout(async () => {
      await bot.changeContext(message.reference);

      await bot.reply(message, "Caso precise de ajudar so digitar Ajuda!");
    }, delayinstrutorBase + 2500);
  });

};
