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
    if (cep_inputado.length !== 8) {
        return false
    }
    for (let index in cep_inputado) {
        if (numbers.includes(cep_inputado[index])) {
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

// Editando o event listener
document.getElementById('form').addEventListener('submit', (event) => {
    // Selecionando os elementos dos inputs pelo id
    const rua = document.getElementById('rua')
    const bairro = document.getElementById('bairro')
    const cidade = document.getElementById('cidade')
    const cep = document.getElementById('cep')
    // Valor do dropdown da tag select
    const uf = document.getElementById('uf')
    const selected_uf = uf.options[uf.selectedIndex].value
    // Array para checar erros
    const errors = []
    // Logica
    if (rua.value === '') {
        errors.push('err')
    }
    if (bairro.value === '') {
        errors.push('err')
    }
    if (cidade.value === '') {
        errors.push('err')
    }
    if (selected_uf === 'NaS') {
        errors.push('err')
    }

    /*
    -> Resolver esse bgl do cep
    if (valido(cep.value)) {
        // do nothing
    } else {
        errors.push('err')
    }
    */

    // Disparando o Sweet Alert alert quando os dados não passam nas validações.
    if (errors.length !== 0) {
        event.preventDefault()
        swal({
            title: "Falha no cadastro!",
            text: "Verifique novamente os campos que estão em vermelho. Eles não podem estar em branco e o CEP deve ser válido.",
            icon: "error",
            dangerMode: true
        })
        // Disparando o SWeet Alert quando os dados passam nas validações.
    } else {
        event.preventDefault()
        swal({
            title: "Cadastro realizado com sucesso!",
            text: "O endereço foi salvo no banco de dados.",
            icon: "success",
        })
            .then((value) => {
                if (value === null || value == true) {
                    document.getElementById('form').submit()
                }
            })
    }
})
