class Pessoa{
    _id;
    _nome;
    _salario;
    _sobrenome;
    
    get id() {
        return this._id;
    }

    set id(value) {
        if(value >= 0)
            this._id = value;
        else{
            throw new Error("Informe ids maiores que zero!!");
        }
    }   
    
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }  
    
    get salario() {
        return this._salario;
    }
    set salario(value) {
        this._salario = value;
    } 
    
    get sobrenome() {
        return this._sobrenome;
    }
    set sobrenome(value) {
        this._sobrenome = value;
    }  
    
    NomeCompleto(){
        return `${this.nome} ${this.sobrenome}`; 
    }

    constructor(){
        this.id = 0;
    }

    
}