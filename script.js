// puxar dados do localstorage, se houverem
const dadosGuardados = localStorage.getItem('dadosGuardados')

// se a chave dadosGuardados existir, usá-la como json que contém os produtos
// se não, usar a declaração padrão de 4 produtos
let json = dadosGuardados ? JSON.parse(dadosGuardados ) :
[
    {
        "id": 1,
        "name": "produto a",
        "quantity": 100
    },
    {
        "id": 2,
        "name": "produto b",
        "quantity": 50
    },
    {
        "id": 3,
        "name": "produto c",
        "quantity": 25
    },
    {
        "id": 4,
        "name": "produto d",
        "quantity": 75
    }
]

// função para criar um item de unordered list por produto no json
function mostrarProdutos()
{
    const listaProdutos = document.getElementById('lista-produtos')
    // limpar lista antes de recarregar
    listaProdutos.innerHTML = ''
    json.forEach(produto =>
    {
        const itemLista = document.createElement('li')
        itemLista.innerHTML = `id: ${produto.id}<br>
                               name: ${produto.name}<br>
                               quantity: ${produto.quantity}<br><br>`
        listaProdutos.appendChild(itemLista)
    })

    // persistir os valores no localstorage
    // aqui, pois a função mostrarProduto é chamada em adicionar(), atualizar() e deletar()
    // ou seja, é chamada em todos os métodos que alteram o json
    localStorage.setItem('dadosGuardados', JSON.stringify(json))
}

// mostrar produtos pela primeira vez, ao abrir a página
mostrarProdutos()

// esconder todos os formulários da página no primeiro acesso
// e mostrar apenas um específico ao chamar a função com argumento
function mostrarForm(formId)
{
    const forms = document.querySelectorAll('form');
    forms.forEach(form =>
    {
        form.style.display = 'none';
    });
    const formParaMostrar = document.getElementById(formId);
    formParaMostrar.style.display = 'block';
}

// mostrar form-adicionar ao clicar no button-adicionar
document
    .getElementById('button-adicionar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-adicionar')
    })

// mostrar form-atualizar ao clicar no button-atualizar
document
    .getElementById('button-atualizar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-atualizar')
    })

// mostrar form-deletar ao clicar no button-deletar
document
    .getElementById('button-deletar')
    .addEventListener('click', () =>
    {
        mostrarForm('form-deletar')
    })

function adicionar()
{
    document
        .getElementById('form-adicionar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault()
            const idParaCriar = parseInt(document
                .getElementById('id-adicionar')
                .value)
            const nameParaCriar = document
                .getElementById('name-adicionar')
                .value
            const quantityParaCriar = parseInt(document
                .getElementById('quantity-adicionar')
                .value)

            const idExiste = json.some(item => item.id === idParaCriar)

            // se o id não existe, o produto é criado e adicionado ao json
            if (!idExiste)
            {
                const novoProduto =
                    {
                        "id": idParaCriar,
                        "name": nameParaCriar,
                        "quantity": quantityParaCriar
                    }
                json.push(novoProduto)
            }
            else
            {
                // pq estão saindo tantos alerts? deveria ser apenas um
                alert('id já existe, tente outro')
            }
            mostrarProdutos()
        })
}

function atualizar()
{
    document
        .getElementById('form-atualizar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault()
            const idParaAtualizar = parseInt(document
                .getElementById('id-atualizar')
                .value)
            const novaQuantidade = parseInt(document
                .getElementById('quantity-atualizar')
                .value)

            // se o id existe, o produto é atualizado no json
            for (let i = 0; i < json.length; i++)
            {
                if (json[i].id === idParaAtualizar)
                {
                    json[i].quantity = novaQuantidade
                    break
                }
                else
                {
                    alert('id não existe, tente outro')
                }
            }
            mostrarProdutos()
        })
}

function deletar()
{
    document
        .getElementById('form-deletar')
        .addEventListener('submit', function (event)
        {
            event.preventDefault();
            const idParaDeletar = parseInt(document
                .getElementById('id-deletar')
                .value)
            json = json.filter(item => item.id !== idParaDeletar)
            mostrarProdutos()
        })
}