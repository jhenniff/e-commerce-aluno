import { Component, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import {PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe}  from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!==================signal===============>
  
produtos = signal <{nome: string; preco: number}[]>([]);

produtoSelecionado =signal <string | null>(null);

 erro = signal <string | null>(null);

carregando = signal (true);

//?=============================COMPUTED================
 totalProdutos = computed(() => this.produtos().length);

 //! funcao calcula o valor total dos produtos
  valorTotal = computed(() => this.produtos().reduce((total, produto) => total + produto.preco, 0));

//FUNCAO QUE CONTABILIZA A QUANTIDADE A QUANTIDADE DE ITENS DA LISTA 

  //!funcao para exibir o produto selecionado pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
//!funcao que adciona o produto
  adicionaProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome: 'Sony Playstation 5', preco: 3000}
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
constructor(){
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
    })

  }
  private produtoService = inject(produtosService);

  public carrinhoService = inject(CarrinhoService);

  quantidadeCarrinho = this.carrinhoService.quantidadeItens;

  totalCarrinho = this.carrinhoService.totalItens;
  
  adicionarAoCarrinho(produto: {nome: string; preco: number; }){
    this.carrinhoService.adicionar(produto);
  }

 
}
  


