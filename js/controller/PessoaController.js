class PessoaController {
    _pessoas = [];

    inicializaElementos() {
        this.inpCodigo = document.querySelector("#inpCodigo");
        this.btnSalvar = document.querySelector("#btnSalvar");
        this.bodyPessoa = document.querySelector("#bodyPessoa");
        this.inpNome = document.querySelector("#inpNome");
        this.inpSobrenome = document.querySelector("#inpSobreNome");
        this.inpSalario = document.querySelector("#inpSalario");
        this.divTotal = document.querySelector("#divTotal");
    }

    alterar(pId){
        if(pId){
            if(confirm("deseja excluir")){
                this._pessoas = this._pessoas.filter(p => p.id != pId);
            }
        }

        this.exibir
    }

    salvar(pId, pNome, pSobrenome, pSalario) {
        let p;

        if (pId == 0) {
            p = new Pessoa();
        } else {
            p = this._pessoas.filter(p => p.id == pId)[0];
            if (!p) {
                p = new Pessoa();
            }
        }

        p.nome = pNome;
        p.sobrenome = pSobrenome;
        p.salario = pSalario;

        if (pId == 0) {
            p.id = this._pessoas.length + 1;
            this._pessoas.push(p);
        }
    }

    excluir(pId) {
        if (pId) {
            if (confirm("deseja excluir ?")) {
                this._pessoas = this._pessoas.filter(p => p.id != pId);
            }
        }
        this.exibir();
    }

    exibir() {
        let linhas = "";
        this._pessoas.forEach(p => {
            linhas +=
                `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.sobrenome}</td>
                    <td>${p.salario}</td>
                    <td>${p.nomeCompleto()}</td>
                    <td>
                        <button id="btnAlterar${p.id}" class="btn btn-primary btn-db" data-id="${p.id}">Alterar</button>
                        <button id="btnExcluir${p.id}" class="btn btn-danger btn-db" data-id="${p.id}">Excluir</button>
                    </td>
                </tr>
            `
        });

        this.bodyPessoa.innerHTML = linhas;
        this.eventosBD();
        this.calcularTotal();
    }

    eventosBD() {
        let self = this;
        this.bodyPessoa.querySelectorAll('.btn-db').forEach(btn => {
            let id = btn.id.toUpperCase();

            if (id.indexOf('BTNEXCLUIR') != -1) {
                btn.onclick = () => {
                    self.excluir(btn.dataset.id);
                }
            }

            if (id.indexOf('BTNALTERAR') != -1) {
                btn.onclick = () => {
                    alert('alterar');
                }
            }
        });
    }

    calcularTotal() {
        let total = this._pessoas.reduce(function (pTotal , p){
            return pTotal + parseFloat(p.salario);
        }, 0);
        this.divTotal.innerHTML = "R$" + total;
    }

    limpar() {
        this.inpNome.value = "";
        this.inpSalario = 0;
        this.inpSobrenome = "";
    }

    inicializaEventos() {
        this.btnSalvar.addEventListener("click", function () {
            if(this.inpNome || this.inpSobrenome || this.inpSalario){
                this.salvar(this.inpCodigo.value, this.inpNome.value, this.inpSobrenome.value, this.inpSalario.value);
                this.exibir();
                this.limpar();
                this.inpNome.focus();
            } else {
                alert("campo nao preenchido");
            }
        });
    }

    constructor() {
        this.inicializaElementos();
        this.inicializaEventos();
    }
}