async function test_cep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const response_json = await response.json()
    if (response_json.length !== 10) {
        return false
    }
    return true
}

const valido = (cep_inputado) => {
    if (isNaN(cep_inputado) || cep_inputado.length !== 8) {
        return false
    } else if (test_cep(cep_inputado) === false) {
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
        if (rua.className === 'text') {
            rua.classList.remove('text')
            rua.classList.add('error')
        }
    }
    if (bairro.value === '') {
        errors.push('err')
        if (bairro.className === 'text') {
            bairro.classList.remove('text')
            bairro.classList.add('error')
        }
    }
    if (cidade.value === '') {
        errors.push('err')
        if (cidade.className === 'text') {
            cidade.classList.remove('text')
            cidade.classList.add('error')
        }
    }
    if (selected_uf === 'NaS') {
        errors.push('err')
        if (document.getElementById('selectDiv').className === 'select') {
            document.getElementById('selectDiv').classList.remove('select')
            document.getElementById('selectDiv').classList.add('select_error')
        }
    }

    // still bugged
    /*
    if (valido(cep.value) === false) {
        errors.push('err')
    }
    */

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
        const ui = [rua, bairro, cidade, cep]
        for (let index in ui) {
            if (ui[index].className === 'text') {
                continue
            } else {
                ui[index].classList.remove('error')
                ui[index].classList.add('text')
            }
            if (uf.className === 'select_error') {
                uf.classList.remove('select_error')
                uf.classList.add('select')
            }
        }
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
