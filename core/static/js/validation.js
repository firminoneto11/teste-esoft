const any_return = (ceperson) => {
    // Chamando a API do ViaCep para checar se o cep existe
    const url = `https://viacep.com.br/ws/${ceperson}/json/`
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.send()
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response)
            if (response.length !== 10) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
}

const valido = (cep_inputado) => {
    // Função que irá validar o CEP e retornar um valor booleano
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (inputted_string.length !== 8) {
        return false
    }
    for (let index in inputted_string) {
        if (numbers.includes(inputted_string[index])) {
            continue
        } else {
            return false
        }
    }
    if (any_return(cep_inputado)) {
        return true
    }
    return false
}

// Selecionando os elementos dos inputs pelo id
const formulario = document.getElementById('form')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const cep = document.getElementById('cep')

// Editando o event listener
formulario.addEventListener('submit', (event) => {
    const errors = []
    if (rua.value === '' || rua.value === null) {
        errors.push('err')
    } else if (bairro.value === '' || bairro.value === null) {
        errors.push('err')
    } else if (cidade.value === '' || cidade.value === null) {
        errors.push('err')
    } else if (uf.value === 'none' || uf.value === null) {
        errors.push('err')
    }

    if (valido(cep) === false) {
        errors.push('err')
    }

    if (errors.length !== 0) {
        event.preventDefault()
        alert('Preencha o formulário direito bixo!')
    } else {
        const output = document.getElementById('error_or_success')
        let new_p = document.createElement('p')
        new_p.innerHTML = 'Endereço cadastrado com sucesso!'
        new_p.classList.add('success')
        output.appendChild(new_p)
    }
})
