class Conta {

    constructor(numero, saldo=0) {
        this.saldo = saldo;
        this.numero = numero;
    }

    debitar(valor){
        if (this.saldo >= valor){
            this.saldo -= valor;
        }
    }

    creditar(valor){
        this.saldo += valor;
    }

    transferir(destino, valor){
        this.debitar(valor);
        destino.creditar(valor);
    }

}
