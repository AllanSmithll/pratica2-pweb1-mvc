class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoDataAniversario = document.querySelector('#data_aniversario');
        const elementoTipoConta = document.querySelector("#tipo-conta");
        let conta = null;
        
        elementoTipoConta.addEventListener("change", () => {
            const selectedValue = elementoTipoConta.value;

            if (selectedValue == "conta-bonificada") {
                conta = new ContaBonificada(elementoNumero.value, Number(elementoSaldo.value));
            } else if (selectedValue == "conta-poupanca") {
                conta = new Poupanca(elementoNumero.value, Number(elementoSaldo.value), Number(elementoDataAniversario.value));
            } else if (selectedValue == "conta-normal") {
                conta = new Conta(elementoNumero.value, Number(elementoSaldo));
            } else {
                    window.alert("Não foi possível criar a conta. Preencha corretamente os campos para o tipo da Conta.")
                    return
                }
                this.adicionarConta(conta);
                this.adicionarContaNoHtml(conta);
            }  
        );
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
