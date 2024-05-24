document.addEventListener('DOMContentLoaded', () => {
    const addTarefa = document.getElementById('botaoadd');
    const tarefa = document.getElementById('ft_list');
    let tarefas = [];

    const carregarmemoria = () => {
        const tarefasString = localStorage.getItem('tarefas');
        if (tarefasString) {
            tarefas = JSON.parse(tarefasString);
            rendertarefas();
        }
    };

    const salvar = () => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    };

    const rendertarefas = () => {
        tarefa.innerHTML = '';
        tarefas.forEach(task => adicionar(task));
    };

    const adicionar = (textoTarefa) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = textoTarefa;
        tarefa.appendChild(li);
        janela(li);
    };

    const janela = (li) => {
        li.onclick = (event) => {
            const confirmarDelete = confirm("Você quer excluir esta tarefa?");
            if (confirmarDelete) {
                const index = tarefas.indexOf(li.textContent);
                tarefas.splice(index, 1);
                tarefa.removeChild(li);
                salvar();
            }
        };
    };

    carregarmemoria();

    addTarefa.onclick = () => {
        const textoTarefa = prompt("Adicione nova tarefa");
        if (textoTarefa && textoTarefa.trim() !== '') {
            tarefas.push(textoTarefa.trim());
            adicionar(textoTarefa.trim());
            salvar();
        }
    };
});
