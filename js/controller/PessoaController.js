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

    excluir(pId) {
        if (pId) {
            if (confirm('Deseja excluir?')) {
                this._pessoas = this._pessoas.filter(p => p.id != pId);
            }
        }
        this.exibir();
    }

    alterar(pId) {
        if (pId) {
            let p = this._pessoas.filter(p => p.id == pId)[0];

            if (p) {
                this.inpCodigo.value = p.id;
                this.inpNome.value = p.nome;
                this.inpSobrenome.value = p.sobrenome;
                this.inpSalario.value = p.salario;
            }
        }
    }

    salvar(pId, pNome, pSobrenome, pSalario) {
        let p;
        if (pId == 0) {
            p = new Pessoa();
        } else {
            p = this._pessoas.filter(p => p.id == pId)[0];
            if (!p)
                p = new Pessoa();
        }
        p.nome = pNome;
        p.sobrenome = pSobrenome;
        p.salario = pSalario;

        if (pId == 0) {
            p.id = this._pessoas.length + 1;
            this._pessoas.push(p);
        }

    }

    exibir() {
        let linhas = "";
        this._pessoas.forEach(p => {
            linhas +=
                `<tr>
               <td>${p.id}</td>
               <td>${p.nome}</td>
               <td>${p.sobrenome}</td>
               <td>${p.salario}</td>
               <td>${p.NomeCompleto()}</td>
               <td>
                 <button id="btnAlterar${p.id}" class="btn btn-primary btn-db" data-id="${p.id}">Alterar</button>
                 <button id="btnExcluir${p.id}" class="btn btn-danger btn-db" data-id="${p.id}">Excluir</button>
               </td>
             </tr>                     
            `
        });
        this.bodyPessoa.innerHTML = linhas;
        this.eventosDB();
        this.calculaTotal();
    }

    eventosDB() {
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
                    self.alterar(btn.dataset.id);
                }
            }
        });
    }

    calculaTotal() {
        let total = this._pessoas.reduce((pTotal, p) => {
            return pTotal + parseFloat(p.salario);
        }, 0);
        this.divTotal.innerHTML = `R$ ${total}`;
    }

    limpar() {
        this.inpNome.value = "";
        this.inpSalario.value = 0;
        this.inpSobrenome.value = "";
        this.inpCodigo.value = 0;
    }

    inicializaEventos() {
        this.btnSalvar.onclick = () => {
            if (this.inpNome.value && this.inpSobrenome.value && this.inpSalario.value) {
                this.salvar(this.inpCodigo.value, this.inpNome.value, this.inpSobrenome.value, this.inpSalario.value);
                this.exibir();
                this.limpar();
                this.inpNome.focus();
            } else {
                alert("Campos não preenchidos corretamente");
            }
            
            
        }
    }

    constructor() {
        this.inicializaElementos();
        this.inicializaEventos();
    }
}