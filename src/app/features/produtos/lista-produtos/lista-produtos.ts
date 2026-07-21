import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import {PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
produtos = signal ([
    { 
      nome: 'Teclado Gamer', 
      preco:149.00
    },
    {
      nome: 'Mouse Gamer', 
      preco:299.99
    },
    {
      nome: 'Monitor Gamer', 
      preco:1599.99
    },
    {
      nome: 'Desktop Gamer', 
      preco:4999.99
    },
    {
      nome: 'Headset Gamer', 
      preco:699.99
    }
  ]);
  //funcao para exibir o produto selecionado pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
//funcao que adciona o produto
  adicionaProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome: 'Sony Playstation 5', preco: 3000}
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => this.produtos().reduce((total, produto) => total + produto.preco, 0));
  //funcao para substituir a lista atual usando o metodo set do signal
substituirProduto(){
  this.produtos.set([
    {nome: 'Teclado', preco:50},
    {nome: 'Mouse', preco:15},
    {nome: 'Monitor', preco:500},
    {nome: 'Desktop', preco:1500},
    {nome: 'Headset', preco:30}
  ]);
}
constructor(){
effect(() => {
  console.log('lista de produtos alterados: ', this.produtos());
});
effect(() => {
  console.log('Valor Total Atualizado: ', this.valorTotal());
});
effect(() => {
  if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) - loja da jhennif`;
  }

});
}
 
produtoSelecionado= signal <string | null>(null);
//metodo para criar um estado para carrinho com signal
carrinho = signal <{nome: string; preco: number}[]>([]);
adicionarAoCarrinho(produto:{nome: string; preco: number}){
  this.carrinho.update(listaAtual =>[...listaAtual, produto]
  );
}
//totalProduto = computed (() => this.prdutos().length);
//metodo para calcular a quantidade total de item do carrinho 
quantidadedeCarrinho = computed(() => this.carrinho().length);
//metodo para calcular o valor total dos itens do carrinho
totalCarrinho =computed (() =>{
  return this.carrinho().reduce((total, item) =>
  total + item.preco,0)});

}