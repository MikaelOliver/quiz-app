// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('quizForm');
//   const lista = document.getElementById('listaPerguntas');
//   let perguntasGlobal = [];
//   let idEdicao = null;

//   const modal = document.getElementById('modal');

//   function abrirModal(p) {
//     document.getElementById('edit-pergunta').value = p.pergunta;
//     document.getElementById('edit-alt1').value = p.alternativas[0];
//     document.getElementById('edit-alt2').value = p.alternativas[1];
//     document.getElementById('edit-alt3').value = p.alternativas[2];
//     document.getElementById('edit-alt4').value = p.alternativas[3];
//     document.getElementById('edit-correta').value = p.correta;
//     document.getElementById('edit-dificuldade').value = p.dificuldade;
//     document.getElementById('edit-serie').value = p.serie;
//     modal.style.display = 'flex';
//   }

//   window.fecharModal = () => modal.style.display = 'none';

//   document.getElementById('salvarEdicao').onclick = () => {
//     const nova = {
//       pergunta: document.getElementById('edit-pergunta').value,
//       alternativas: [
//         document.getElementById('edit-alt1').value,
//         document.getElementById('edit-alt2').value,
//         document.getElementById('edit-alt3').value,
//         document.getElementById('edit-alt4').value
//       ],
//       correta: parseInt(document.getElementById('edit-correta').value),
//       dificuldade: document.getElementById('edit-dificuldade').value,
//       serie: document.getElementById('edit-serie').value
//     };

//     fetch('/editar-pergunta/' + idEdicao, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(nova)
//     }).then(() => {
//       fecharModal();
//       carregarPerguntas();
//     });
//   };

//   form.onsubmit = (e) => {
//     e.preventDefault();
//     const nova = {
//       pergunta: document.getElementById('pergunta').value,
//       alternativas: [
//         document.getElementById('alt1').value,
//         document.getElementById('alt2').value,
//         document.getElementById('alt3').value,
//         document.getElementById('alt4').value
//       ],
//       correta: parseInt(document.getElementById('correta').value),
//       dificuldade: document.getElementById('dificuldade').value,
//       serie: document.getElementById('serie').value
//     };
//     fetch('/adicionar-pergunta', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(nova)
//     }).then(() => {
//       form.reset();
//       carregarPerguntas();
//     });
//   };

//   window.editar = (id) => {
//     idEdicao = id;
//     abrirModal(perguntasGlobal[id]);
//   };

//   window.excluir = (id) => {
//     if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
//       fetch('/excluir-pergunta/' + id, { method: 'DELETE' }).then(carregarPerguntas);
//     }
//   };

//   function carregarPerguntas() {
//     fetch('/perguntas')
//       .then(res => res.json())
//       .then(data => {
//         perguntasGlobal = data;
//         lista.innerHTML = '';
//         data.forEach((p, i) => {
//           const li = document.createElement('li');
//           li.innerHTML = `
//             <strong>${p.pergunta}</strong><br>
//             ${p.alternativas.map((alt, idx) => `<em>${String.fromCharCode(65 + idx)}:</em> ${alt}`).join('<br>')}<br>
//             <strong>Correta:</strong> ${String.fromCharCode(65 + p.correta)}<br>
//             <strong>Dificuldade:</strong> ${p.dificuldade} | <strong>Série:</strong> ${p.serie}<br>
//             <button onclick="editar(${i})">Editar</button>
//             <button onclick="excluir(${i})">Excluir</button>
//             <hr>
//           `;
//           lista.appendChild(li);
//         });
//       });
//   }

//   carregarPerguntas();
// });
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  const lista = document.getElementById('listaPerguntas');
  let perguntasGlobal = [];
  let idEdicao = null;

  const modal = document.getElementById('modal');

  function abrirModal(p) {
    document.getElementById('edit-pergunta').value = p.pergunta;
    document.getElementById('edit-alt1').value = p.alternativas[0];
    document.getElementById('edit-alt2').value = p.alternativas[1];
    document.getElementById('edit-alt3').value = p.alternativas[2];
    document.getElementById('edit-alt4').value = p.alternativas[3];
    document.getElementById('edit-correta').value = p.correta;
    document.getElementById('edit-dificuldade').value = p.dificuldade;
    document.getElementById('edit-serie').value = p.serie;
    modal.style.display = 'flex';
  }

  window.fecharModal = () => modal.style.display = 'none';

  document.getElementById('salvarEdicao').onclick = () => {
    const nova = {
      pergunta: document.getElementById('edit-pergunta').value,
      alternativas: [
        document.getElementById('edit-alt1').value,
        document.getElementById('edit-alt2').value,
        document.getElementById('edit-alt3').value,
        document.getElementById('edit-alt4').value
      ],
      correta: parseInt(document.getElementById('edit-correta').value),
      dificuldade: document.getElementById('edit-dificuldade').value,
      serie: document.getElementById('edit-serie').value
    };

    fetch('/editar-pergunta/' + idEdicao, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova)
    }).then(() => {
      fecharModal();
      carregarPerguntas();
    });
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const nova = {
      pergunta: document.getElementById('pergunta').value,
      alternativas: [
        document.getElementById('alt1').value,
        document.getElementById('alt2').value,
        document.getElementById('alt3').value,
        document.getElementById('alt4').value
      ],
      correta: parseInt(document.getElementById('correta').value),
      dificuldade: document.getElementById('dificuldade').value,
      serie: document.getElementById('serie').value
    };
    fetch('/adicionar-pergunta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova)
    }).then(() => {
      form.reset();
      carregarPerguntas();
    });
  };

  window.editar = (id) => {
    idEdicao = id;
    abrirModal(perguntasGlobal[id]);
  };

  window.excluir = (id) => {
    if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
      fetch('/excluir-pergunta/' + id, { method: 'DELETE' }).then(carregarPerguntas);
    }
  };

  function carregarPerguntas() {
    fetch('/perguntas')
      .then(res => res.json())
      .then(data => {
        perguntasGlobal = data;
        lista.innerHTML = '';
        data.forEach((p, i) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${p.pergunta}</strong><br>
            ${p.alternativas.map((alt, idx) => `<em>${String.fromCharCode(65 + idx)}:</em> ${alt}`).join('<br>')}<br>
            <strong>Correta:</strong> ${String.fromCharCode(65 + p.correta)}<br>
            <strong>Dificuldade:</strong> ${p.dificuldade} | <strong>Série:</strong> ${p.serie}<br>
            <button onclick="editar(${i})">Editar</button>
            <button onclick="excluir(${i})">Excluir</button>
            <hr>
          `;
          lista.appendChild(li);
        });
      });
  }

  carregarPerguntas();
});
