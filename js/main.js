async function fetchLogin() {
    var login = document.getElementById('login').value
    var senha = document.getElementById('senha').value
    try {
      const response = await fetch(`http://52.188.81.184:4000/login/user/${login}`);
      const data = await response.json();
      var loginEncontrado = data.login;
      var senhaEncontrada = data.senha;
      if(login == loginEncontrado && senha == senhaEncontrada){
        window.location.href = "home.html";
      }else{
        alert("LOGIN OU SENHA INCORRETOS!")
      }
      return data;
    } catch (error) {
      console.error('Erro:', error);
    }
    if(login == loginEncontrado && senha == senhaEncontrada){
        window.location.href = "home.html";
      }else{
        alert("LOGIN OU SENHA INCORRETOS!")
      }
    
  }