const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6955397070:AAFzuPaKIOvwWt8Od2p02mWc6032B_M1FMM'; 
const apiUrl = 'https://api.football-data.org/v4/matches';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  //Envia mensaje al recibir el comando /start 
  bot.sendMessage(chatId, 'Puedes escoger entre una de estas opciones.', {
    reply_markup: {
      //Crea un teclado para poder escoger varias opciones desde ahí
      inline_keyboard: [
        [
          //Este es el teclado.
          { text: 'Mercado Fantasy', callback_data: 'Mercado' },
          { text: 'Comparador de Jugadores', callback_data: 'Comparador' },
          { text: 'Bajas para esta semana', callback_data: 'Bajas' },
          { text: 'Resultados', callback_data: 'Resultados' }
        ]
      ]
    }
  });
});
//Se inicia cuando se pulsa el botón Mercado.
bot.on('callback_query', (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  if (action === 'Mercado') {
    //URL de la pagina a la que te redirige.
    const url = 'https://www.analiticafantasy.com/fantasy-la-liga/mercado';
    //Te saca un boton mas especifico dentro del botón Mercado, el cual te envía a la pagina
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
  } else if (action === 'Comparador') {
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
  } else if (action === 'Bajas') {
    const url = 'https://www.futbolfantasy.com/laliga/lesionados';
    bot.sendMessage(chatId, 'Pulsa el botón para dirigirte al comparador de jugadores Fantasy:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ir a las bajas para esta semana',
              url: url
            }
          ]
        ]
      }
    });
  } else if (action === 'Resultados') {
    // Consulta a la API de resultados
    axios.get(apiUrl, {
      headers: {
        'X-Auth-Token': '7e3fedf7561b4fdc9b1b620aecb8dd49', // Token de la API
      },
    })
      .then(response => {
        // Procesar la respuesta de la API y hace el mensaje de resultados
        const resultados = response.data.matches;
        const mensajeResultados = resultados.map((partido) => {
          const equipoLocal = partido.homeTeam.name;
          const equipoVisitante = partido.awayTeam.name;
          const resultado = `${equipoLocal} ${partido.score.fullTime.home} - ${partido.score.fullTime.away} ${equipoVisitante}`;
          return resultado;
        }).join('\n');
        // Mensaje de resultados al usuario
        bot.sendMessage(chatId, `Resultados de los partidos de fútbol:\n${mensajeResultados}`);
      })
  }
});
