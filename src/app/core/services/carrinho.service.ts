import { Injectable } from "@angular/core";
import{ signal } from "@angular/core";
import { computed } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CarrinhoService {

    private carrinho = signal<{nome: string; preco: number}[]>([]);
    //? selecao
    itens = computed(() => this.carrinho());

    quantidadeItens = computed(() => this.carrinho ().length);
    totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0));

    carrinhoVazio=computed(()=> this.carrinho().length===0);

    //todo: acoes adicionar produto
    adicionar(produtos: {nome: string; preco: number;}){
        this.carrinho.update (lista => [
            ...lista, produtos]);
    }
    //toda acoes de liampeza
    limpar(){
        this.carrinho.set([]);
    } 
}