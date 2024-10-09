var field1Values;
var field2Values;
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://api.thingspeak.com/alerts/send';

// Função que faz o fetch para a API
async function fetchData() {
  try {
    const response = await fetch('https://api.thingspeak.com/channels/2688722/feeds/last.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return null;
  }
}

// Função que será executada quando houver uma mudança nos dados
function executeOnChange() {
  const data = {
    subject: 'alerta',
    body: 'alerta executado'
};
  postRequest(targetUrl, data)
    .then(response => console.log('Sucesso:', response))
    .catch(error => console.error('Falha:', error));

  alert("BOTÃO ACIONADO!!")
 }

// Função principal que verifica mudanças a cada 30 segundos
async function monitorChanges() {
  let lastData = await fetchData(); // Captura o primeiro estado dos dados

  setInterval(async () => {
    const newData = await fetchData(); // Faz nova requisição

    if (newData && JSON.stringify(newData) !== JSON.stringify(lastData)) {
      // Se os dados forem diferentes, executa a função e atualiza o estado anterior
      executeOnChange();
      lastData = newData;
    }
  }, 30000); // 30 segundos
}

// Inicia o monitoramento
monitorChanges();

async function postRequest(url, data) {
    try {
        const response = await fetch(proxyUrl + url, {
            method: 'POST', // Método da requisição
            headers: {
                "Content-Type": "application/json",  // Define o tipo do conteúdo como JSON
                "ThingSpeak-Alerts-API-Key": "TAKZpzsTyO5tBnJVU6b" // Cabeçalho de autenticação
            },
            body: JSON.stringify(data) // Converte o objeto `data` para JSON
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const responseData = await response.json(); // Processa a resposta como JSON
        return responseData; // Retorna a resposta
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error; // Lança o erro para tratamento posterior
    }
}

