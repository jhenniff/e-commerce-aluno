import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import {PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';

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
  }

  adicionaProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome: 'Sony Playstation 5', preco: 1000}
    ]);
  }
  totalProdutos = computed(()) => this.produtos().length;

  
