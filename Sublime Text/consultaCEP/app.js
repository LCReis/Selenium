// Variables
const $cep = document.querySelector('#cep');
const $resultado = document.querySelector('#resultado');

const msg = {
  "cep_invalido": "O CEP informado está inválido.",
  "cep_naoencontrado": "O CEP informado não existe!",
  "cep_erro": "Ocorreu um erro ao tentar realizar a consulta do CEP, tente novamente.",
};

// Máscara - Estrutura 
VMasker($cep).maskPattern("99999-999");

document.querySelector('#consulta').addEventListener('submit', getCEP);
document.querySelector("body").addEventListener("click", fecharResultado);


function getCEP(event) {
  event.preventDefault();

  carregando('on');

  if (!validaCEP($cep.value)) {
    
    carregando('off');

    $resultado.innerHTML = `<article class="message is-danger">
                              <div class="message-header">
                                <p>CEP: <strong>${$cep.value}</strong></p>
                                <button class="delete" aria-label="delete"></button>
                              </div>
                              <div class="message-body">${msg.cep_invalido}</div>
                            </article>`;

    $cep.focus();
    throw Error(msg.cep_invalido);
  }


  // Solicitando CEP usando API
  fetch(`https://viacep.com.br/ws/${$cep.value}/json/`)

  .then(response => {

    carregando('off');

    if (response.status != 200) {

      $resultado.innerHTML = `<article class="message is-danger">
                                 <div class="message-header">
                                   <p>CEP: <strong>${$cep.value}</strong></p>
                                   <button class="delete" aria-label="delete"></button>
                                 </div>
                                 <div class="message-body">${msg.cep_erro}</div>
                              </article>`;

      $cep.focus();
      throw Error(response.status);
    
    } else {
      return response.json();
    }
  })

  .then(data => {
    carregando('off');

    if (data.erro) 
    {
      $resultado.innerHTML = `<article class="message is-warning">
                                <div class="message-header">
                                  <p>CEP: <strong>${$cep.value}</strong></p>
                                  <button class="delete" aria-label="delete"></button>
                                </div>
                                <div class="message-body">${msg.cep_naoencontrado}</div>
                              </article>`;

      $cep.focus();
    
    } else {
      $resultado.innerHTML = `<article class="message">
                                <div class="message-header">
                                  <p>CEP: <strong>${$cep.value}</strong></p>
                                  <button class="delete"></button>
                                </div>

                                <div class="message-body">
                                  <ul>
                                    <li><strong>Endereço: </strong> 
                                        <span>${data.logradouro}</span>
                                    </li>

                                    <li><strong>Complemento: </strong>
                                        <span>${data.complemento}</span>
                                    </li>

                                    <li><strong>Bairro: </strong>
                                        <span>${data.bairro}</span>
                                    </li>

                                    <li><strong>Cidade: </strong>
                                        <span>${data.localidade}</span>
                                    </li>

                                    <li><strong>Estado: </strong>
                                        <span>${data.uf}</span>
                                    </li>
                                  </ul>
                                </div>
                              </article>`;
    }
  })
  .catch(error => console.warn(error));
}


function validaCEP(value) {
  return /(^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$)/.test(value) ? true : false;
}


function fecharResultado(event) {
  if (event.target.className == 'delete') {
    $resultado.innerHTML = '';
    $cep.value = '';
    $cep.focus();
  }
}


function carregando(status) {
  let invisivel = (status == 'on') ? '' : 'is-invisible';

  $resultado.innerHTML = `
    <div class="has-text-centered">
      <span class="button is-white is-size-2 is-loading ${invisivel}"></span>
    </div>
  `;
}
