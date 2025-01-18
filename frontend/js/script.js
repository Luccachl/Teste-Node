// Função para formatar a data
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Função para exibir enquetes
async function fetchEnquetes() {
  const response = await fetch('http://localhost:3000/enquetes'); // Supondo que o backend esteja na porta 3000
  const enquetes = await response.json();

  const enquetesList = document.getElementById('enquetes-list');
  enquetesList.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

  enquetes.forEach(enquete => {
    const listItem = document.createElement('div');
    listItem.classList.add('enquete-item');

    const title = document.createElement('h3');
    title.textContent = `${enquete.titulo} (De ${formatDate(enquete.dataInicio)} a ${formatDate(enquete.dataFim)})`;
    listItem.appendChild(title);

    const status = document.createElement('p');
    const currentDate = new Date();
    if (currentDate < new Date(enquete.dataInicio)) {
      status.textContent = 'Enquete ainda não iniciada';
    } else if (currentDate > new Date(enquete.dataFim)) {
      status.textContent = 'Enquete finalizada';
    } else {
      status.textContent = 'Enquete em andamento';
    }
    listItem.appendChild(status);

    // Exibe a enquete e as opções quando o usuário clica
    listItem.addEventListener('click', () => showEnqueteDetails(enquete));
    
    enquetesList.appendChild(listItem);
  });
}

// Função para mostrar detalhes de uma enquete
async function showEnqueteDetails(enquete) {
  const modal = document.getElementById('enquete-modal');
  const modalTitle = document.getElementById('modal-title');
  const optionsList = document.getElementById('options-list');
  const voteButton = document.getElementById('vote-button');

  modalTitle.textContent = enquete.titulo;
  optionsList.innerHTML = ''; // Limpa as opções anteriores

  enquete.opcoes.forEach(option => {
    const optionItem = document.createElement('li');
    optionItem.textContent = `${option.descricao} - Votos: ${option.votos}`;
    optionsList.appendChild(optionItem);
  });

  // Habilita ou desabilita o botão de votar
  const currentDate = new Date();
  if (currentDate >= new Date(enquete.dataInicio) && currentDate <= new Date(enquete.dataFim)) {
    voteButton.disabled = false;
  } else {
    voteButton.disabled = true;
  }

  // Exibe o modal
  modal.style.display = 'block';
}

// Função para inicializar
function init() {
  fetchEnquetes();
}

// Chama a função de inicialização
init();
