class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHtml(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoTipoConta = document.querySelector("#tipo-conta");

        const numeroConta = elementoNumero.value.trim();
        const saldoConta = Number(elementoSaldo.value.trim());

        if (numeroConta === "") {
            window.alert("Preencha o campo 'Número' para criar a conta.");
            return;
        }

        if (elementoTipoConta.value == "conta-bonificada") {
            const conta = new ContaBonificada(numeroConta, saldoConta);
            this.adicionarConta(conta);
            this.inserirContaNoHtml(conta);
        } else if (elementoTipoConta.value == "conta-poupanca") {
            const elementoDataAniversario = document.querySelector('#data-aniversario');
            if (elementoDataAniversario.value == "") {
                window.alert("Campo 'Data Aniversário' é obrigatório para conta Poupança.");
                return;
            }
            const conta = new Poupanca(numeroConta, saldoConta, elementoDataAniversario.value);
            this.adicionarConta(conta);
            this.inserirContaNoHtml(conta);
        } else if (elementoTipoConta.value == "conta-normal") {
            const conta = new Conta(numeroConta,saldoConta);
            this.adicionarConta(conta);
            this.inserirContaNoHtml(conta);
        } else {
            window.alert("Não foi possível criar a conta. Preencha corretamente os campos para o tipo da Conta.");
            return;
        }
    }  

    inserirContaNoHtml(conta) {
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
