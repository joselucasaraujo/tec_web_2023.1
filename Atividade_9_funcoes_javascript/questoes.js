//Escreva uma função JavaScript para verificar se uma `entrada` é um array ou não.
exports.questao01 = (entrada) => {
    Array.isArray(entrada) ? console.log("É um array") : console.log("Não é um array")
}

//Escreva uma função JavaScript para clonar um array.
exports.questao02 = (entrada) => {
    if (Array.isArray(entrada)) {
        clone = entrada.map((x) => x)
        console.log(clone)
    } else {
        console.log("Não é um array, logo não será possível cloná-lo")
    }
}

//Escreva uma função JavaScript para obter o primeiro elemento de um array. Passar um parâmetro 'n' retornará os primeiros 'n' elementos do array.
exports.questao03 = (array, n = 0) => {
    if (Array.isArray(array)) {
        if (n !== 0) {
            return array.slice(0,n)
        } else {
            return array[0]
        }
    } else {
        console.log("Não é um array")
    }
}

//Escreva uma função JavaScript para obter o último elemento de um array. Passar um parâmetro 'n' retornará os últimos 'n' elementos do array.
exports.questao04 = (array, n = 0) => {
    if (Array.isArray(array)) {
        if (n !== 0) {
            let array2 = []
            for(let i = array.length - 1; i > array.length - n - 1; i--){
                array2.push(array[i])
            }
            return array2
        } else {
            return array[array.length - 1]
        }
    } else {
        console.log("Não é um array")
    }
}

//Escreva um programa JavaScript simples para unir todos os elementos de um array em uma string.
exports.questao05 = (array) => {
    if (Array.isArray(array)) {
        console.log(array.join());
    } else {
        console.log("Não é um array")
    }
}

//Escreva um programa JavaScript que aceite um número como entrada e insira traços (-) entre cada dois números pares. Por exemplo, se você aceitar 025468, a saída deve ser 0-254-6-
exports.questao06 = (numero) => {
    numeroString = numero.toString();
    retorno = "";
    
    for (let i = 0; i < numeroString.length; i++) {
        retorno += numeroString[i];
        if (numeroString[i] % 2 === 0 && numeroString[i + 1] % 2 === 0) {
            retorno += "-";
        }
    }
    return retorno;
}

//Escreva um programa JavaScript para localizar o item mais frequente de um array.
exports.questao07 = (array) => {
    let itemMaisFrequente;
    frequencia = {};
    frequenciaMaxima = 0;

    for(let i = 0; i < array.length; i++){
        item = array[i];
        frequencia[item] = (frequencia[item] || 0) + 1;

        if(frequencia[item] > frequenciaMaxima){
            itemMaisFrequente = item;
            frequenciaMaxima = frequencia[item];
        }
    }

    return itemMaisFrequente;
}

//Escreva um programa JavaScript para remover itens duplicados de um array (ignore a diferenciação entre maiúsculas e minúsculas).
exports.questao08 = (array) => {
    let retorno = [];

    for (let i = 0; i < array.length; i++) {
        item = array[i].toUpperCase();
        if (retorno.indexOf(item) === -1) {
            retorno.push(item);
        }
    }

    return retorno;
}

//Existem dois arrays com valores individuais, escreva um programa JavaScript para calcular a soma de cada valor de índice individual dos arrays fornecidos.
exports.questao09 = (array1, array2) => {
    let somaArrays = [];

    for (var i = 0; i < array1.length; i++) {
        let soma = array1[i] + array2[i];
        somaArrays.push(soma);
    }

    return somaArrays;
}

//Crie dois vetores chamados vetorPilha e vetorAdiciona. Inicialmente, o vetorPilha conterá cinco elementos inteiros: [1, 2, 3, 4, 5]. Você deverá adicionar os valores contidos no vetorAdiciona [6, 7, 8, 9, 10] ao vetor pilha e mostrá-los no console.
exports.questao10 = () => {
    var vetorPilha = [1,2,3,4,5];
    var vetorAdiciona = [6,7,8,9,10];

    vetorPilha.push(...vetorAdiciona)
    console.log(vetorPilha)
    console.log(vetorAdiciona)
}