

var field1Values;
var field2Values;
async function fetchData() {
  try {
    const response = await fetch('https://api.thingspeak.com/channels/2492075/fields/1.json');
    const data = await response.json();
    field1Values = data.feeds.map(feed => feed.field1);
    return field1Values;
  } catch (error) {
    console.error('Erro:', error);
  }
  
}
async function fetchData2() {
  try {
    const response = await fetch('https://api.thingspeak.com/channels/2492075/fields/2.json');
    const data = await response.json();
    field2Values = data.feeds.map(feed => feed.field2);
    return field2Values;
  } catch (error) {
    console.error('Erro:', error);
  }
  
}

fetchData().then(() => {
  var soma=0;
    function calcularModa(array) {
        var frequencia = {};  // array de frequência
        var maxFreq = 0;  // guarda a máxima frequência
        var modas = [];
      
        for(var i in array) {
          frequencia[array[i]] = (frequencia[array[i]] || 0) + 1; // incrementa a frequência
      
          if(frequencia[array[i]] > maxFreq) { 
            maxFreq = frequencia[array[i]];  // atualiza a máxima frequência se necessário
          }
        }
      
        for(var i in frequencia) {
          if(frequencia[i] === maxFreq) {
            modas.push(Number(i));
          }
        }
      
        return modas;
      }
      function calcularDesvioPadrao(array) {
        let tamanho = array.length;
    
    
        // Calcular a variância
        let variancia = 0;
        for(let valor of array) {
            variancia += Math.pow(valor - media, 2);
        }
        variancia = variancia / tamanho;
    
        // Calcular o desvio padrão (raiz quadrada da variância)
        let desvioPadrao = Math.sqrt(variancia);
    
        return desvioPadrao;
    }

 

    for (let i = 0; i < field1Values.length; i++) {
        soma += parseFloat(field1Values[i]);
      }
  var conta = soma/field1Values.length;
  var media = parseFloat(conta.toFixed(2));
  var moda = calcularModa(field1Values);
  var desvio = parseFloat(calcularDesvioPadrao(field1Values).toFixed(5)); 
  var desviomin = media-desvio;
  var desviominok = desviomin.toFixed(2);
  var desviomax = media+desvio;
  var desviomaxok = desviomax.toFixed(2);

  console.log(desviomin);
  console.log(desviomax);
  document.getElementById("media").innerHTML = "<p> <strong>" + media + " ºC </strong> <br> <br> média da temperatura. </p>";
  document.getElementById("moda").innerHTML = "<p> <strong>" + moda + "</strong> <br> <br> moda da temperatura. </p>";
  document.getElementById("desvioPadrao").innerHTML = "<p> <strong>" + desvio + "</strong> <br> <br> desvio padrão da temperatura entre: " + desviominok + " e " + desviomaxok + ". </p>";
})
fetchData2().then(() => {
  var soma=0;
    function calcularModa(array) {
        var frequencia = {};  // array de frequência
        var maxFreq = 0;  // guarda a máxima frequência
        var modas = [];
      
        for(var i in array) {
          frequencia[array[i]] = (frequencia[array[i]] || 0) + 1; // incrementa a frequência
      
          if(frequencia[array[i]] > maxFreq) { 
            maxFreq = frequencia[array[i]];  // atualiza a máxima frequência se necessário
          }
        }
      
        for(var i in frequencia) {
          if(frequencia[i] === maxFreq) {
            modas.push(Number(i));
          }
        }
      
        return modas;
      }
      function calcularDesvioPadrao(array) {
        let tamanho = array.length;
    
    
        // Calcular a variância
        let variancia = 0;
        for(let valor of array) {
            variancia += Math.pow(valor - media, 2);
        }
        variancia = variancia / tamanho;
    
        // Calcular o desvio padrão (raiz quadrada da variância)
        let desvioPadrao = Math.sqrt(variancia);
    
        return desvioPadrao;
    }

 

    for (let i = 0; i < field2Values.length; i++) {
        soma += parseFloat(field2Values[i]);
      }
      var conta = soma/field2Values.length;
      var media = parseFloat(conta.toFixed(2));
      var moda = calcularModa(field2Values);
      var desvio = parseFloat(calcularDesvioPadrao(field2Values).toFixed(5)); 
      var desviomin = media-desvio;
      var desviominok = desviomin.toFixed(2);
      var desviomax = media+desvio;
      var desviomaxok = desviomax.toFixed(2);
      document.getElementById("media2").innerHTML = "<p> <strong>" + media + "</strong> <br> <br> média da umidade. </p>" ;
      document.getElementById("moda2").innerHTML = "<p> <strong>" + moda + "</strong> <br> <br> moda da umidade. </p>";
      document.getElementById("desvioPadrao2").innerHTML = "<p> <strong>" + desvio + " </strong> <br> <br> desvio padrão da umidade entre: " + desviominok + " e " + desviomaxok + ". </p>";
})
;
