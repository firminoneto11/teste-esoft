const any_return = (ceperson) => {
    // Chamando a API do ViaCep para checar se o cep existe
    const url = `https://viacep.com.br/ws/${ceperson}/json/`
    const request = new XMLHttpRequest()
    let checked
    request.open('GET', url)
    request.send()
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.response)
            if (response.length !== 10) {
                checked = false
                request.abort()
            } else {
                checked = true
                request.abort()
            }
        } else {
            checked = false
            request.abort()
        }
    }
    return checked
}

const valido = (cep_inputado) => {
    if (isNaN(cep_inputado) || cep_inputado.length !== 8) {
        return false
    } else if (any_return(cep_inputado) === false) {
        return false
    }
    return true
}

// Editando o event listener
document.getElementById('form').addEventListener('submit', (event) => {
    // Parando a ação default do form
    event.preventDefault()

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

    // Lógica de validação de erros
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

    // still bugged
    if (valido(cep.value) === false) {
        errors.push('err')
        console.log(valido(cep.value))
    }

    // Disparando o Sweet Alert alert quando os dados não passam nas validações.
    if (errors.length !== 0) {
        swal({
            title: "Falha no cadastro!",
            text: "Verifique novamente os campos que estão em vermelho. Eles não podem estar em branco e o CEP deve ser válido.",
            icon: "error",
            dangerMode: true
        })
        // Disparando o SWeet Alert quando os dados passam nas validações.
    } else {
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
