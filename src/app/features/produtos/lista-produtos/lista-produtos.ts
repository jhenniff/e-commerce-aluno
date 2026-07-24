import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import {PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
produtos = signal <{nome: string; preco: number}[]>([]);

carregando = signal (true);

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
constructor(private http: HttpClient){
  this.carregarProdutos();
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
 //!funcao 
produtoSelecionado = signal <string | null>(null);
//!metodo para criar um estado para carrinho com signal
carrinho = signal <{nome: string; preco: number}[]>([]);
adicionarAoCarrinho(produto:{nome: string; preco: number}){
  this.carrinho.update(listaAtual =>[...listaAtual, produto]
  );
}
//!totalProduto = computed (() => this.prdutos().length);
//metodo para calcular a quantidade total de item do carrinho 
quantidadedeCarrinho = computed(() => this.carrinho().length);
//!metodo para calcular o valor total dos itens do carrinho
totalCarrinho =computed (() =>{
  return this.carrinho().reduce((total, item) =>
  total + item.preco,0)});

  carregarProdutos(){
this.carregando.set(true);
this.http.get<{title: string; price: number}[]>
('https://fakestoreapi.com/products').subscribe({
  next: (dados) => {
    const produtosFormatados = dados.map(p => ({
      nome: p.title,
      preco: p.price,
    }));
    this.produtos.set(produtosFormatados);
    this.carregando.set(false);
  },
  error:(erro) =>{
    console.error('Erro ao carregar produtos: ', erro);
    this.carregando.set(false);
  }
});

  }
}

