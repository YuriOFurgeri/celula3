$(document).ready(function() {
    const tarefa = $('#ft_list');
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
        tarefa.empty();
        tarefas.forEach(task => adicionar(task));
    };

    const adicionar = (textoTarefa) => {
        const li = $('<li>').addClass('task-item').text(textoTarefa);
        tarefa.append(li);
        janela(li);
    };

    const janela = (li) => {
        li.on('click', () => {
            const confirmarDelete = confirm("Você quer excluir esta tarefa?");
            if (confirmarDelete) {
                const index = tarefas.indexOf(li.text());
                tarefas.splice(index, 1);
                li.remove();
                salvar();
            }
        });
    };

    carregarmemoria();

    $('#botaoadd').on('click', () => {
        const textoTarefa = prompt("Adicione nova tarefa");
        if (textoTarefa && textoTarefa.trim() !== '') {
            tarefas.push(textoTarefa.trim());
            adicionar(textoTarefa.trim());
            salvar();
        }
    });
});