import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import {PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe}  from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
// import { CarrinhoService } from '../../../core/services/carrinho.service';
import {CarrinhoFacade} from '../../../core/facades/carrinho.facade';
import{ItemCarrinho} from '../../../core/models/item-carrinho';
import { RouterLink} from '@angular/router';
import {ProdutoLoja} from '../../../core/models/produto-loja';
import { Favoritos } from '../favoritos/favoritos';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, RouterLink, Favoritos],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!==================signal===============>
  produtosService = inject(produtosService);
  
  
produtos = signal <ProdutoLoja[]>([]);

produtoSelecionado =signal <string | null>(null);

carregando = signal (true);

 erro = signal <string | null>(null);



//?=============================COMPUTED================
 totalProdutos = computed(() => this.produtos().length);

 //! funcao calcula o valor total dos produtos
  valorTotal = computed(() =>
     this.produtos().reduce((total, produto) => 
      total + produto.preco, 0));

  valorTotalFormatado = computed(() =>this.valorTotal().toFixed(2)); 

  //!=========================inject=============== 



  //!funcao para exibir o produto selecionado pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
    private produtoService = inject(produtosService);

    //!funcao que adciona produto usando metodo update
  adicionaProduto(){
    this.produtos.update(listaAtual => [...listaAtual,
       {nome: 'Sony Playstation 5', preco: 3000}
    ]);
  }
  
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

// METODO PARA MONITORAR ALTERACOES EM TEMPO REAL USANDO EFFECT
constructor(){
  this.carregarProdutos();

effect(() => {
  if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) - loja da jhennif`;
  }
});
}


  carregarProdutos(){
    this.erro.set(null);
    this.carregando.set(true);
    this.produtoService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtoService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) =>{
        console.error('Erro ao carregar produtos: ', erro);
        this.carregando.set(false);
        this.erro.set('Erro ao Carregar Produtos. Por Favor, tente novamente mais tarde')
        this.carregando.set(false);

      }
    });

  }
   exibirProdutoSelecionado(nome: string){
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual => [...listaAtual, {
      nome: 'teclado', preco:250
    }]);
  }
  substituirProdutos(){
    this.produtos.set([
      {nome: 'Monitor', preco: 500}]);
    }
  

 public carrinhoFacade = inject(CarrinhoFacade);

 quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
 totalCarrinho = this.carrinhoFacade.totalCarrinho;

 adicionarAoCarrinho(produto: { nome: string; preco:number}){
  this.carrinhoFacade.adicionarProdutoCarrinho(produto);}
 }
  

