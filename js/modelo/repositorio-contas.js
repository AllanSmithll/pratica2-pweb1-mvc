class RepositorioContas {
    constructor() {
        this.contas = new Array();
    }

    adicionar(conta) {
        this.contas.push(conta);
    }

    pesquisar(numero) {
        return this.contas.find(conta => conta.numero === numero);
    }

    getContas(){
        return this.contas;
    }

    remover(numero) {
        const contaARemover = this.pesquisar(numero);
        if (contaARemover) {
            const indiceARemover = this.contas.indexOf(contaARemover);
            if (indiceARemover > -1) {
                this.contas.splice(indiceARemover, 1);
            }
        }
    }
}
