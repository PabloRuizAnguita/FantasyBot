const TelegramBot = require('node-telegram-bot-api');

const token = '6955397070:AAFzuPaKIOvwWt8Od2p02mWc6032B_M1FMM';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '¡Hola! ¿Qué te gustaría hacer?', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Mercado Fantasy', callback_data: 'mercado' },
          { text: 'Comparador de Jugadores', callback_data: 'comparador' }
        ]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  if (action === 'mercado') {
    const url = 'https://www.analiticafantasy.com/fantasy-la-liga/mercado';
    bot.sendMessage(chatId, 'Pulsa el botón para dirigirte al mercado Fantasy:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ir al mercado',
              url: url
            }
          ]
        ]
      }
    });
  } else if (action === 'comparador') {
    const url = 'https://www.analiticafantasy.com/fantasy-la-liga/comparador-de-jugadores';
    bot.sendMessage(chatId, 'Pulsa el botón para dirigirte al comparador de jugadores Fantasy:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ir al comparador',
              url: url
            }
          ]
        ]
      }
    });
  }
});
