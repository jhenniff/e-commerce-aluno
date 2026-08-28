import { CurrencyPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ItemCarrinho} from '../../../core/models/item-carrinho';
import { Favoritos } from "../favoritos/favoritos";
import { FavoritosService } from '../favoritos/favoritos.service';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule,],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})

export class Produto {
 //Entrada de dados de lista-produtos.ts
  @Input() nome: string = '';
  @Input() preco: number = 0;

  private favoritosService = inject(FavoritosService)
  
  //Saída de dados de produtos selecionados para lista-produtos.ts
  @Output() produtoSelecionado = new EventEmitter<string>();
  @Output() ProdutoAdicionado = new EventEmitter<{nome: string;preco: number;}>();
  @Output() produtoFavoritado = new EventEmitter<string>();

  private favoritoService = inject(FavoritosService);

    selecionarProduto() {
      this.produtoSelecionado.emit(this.nome);
}
 
  adicionarAoCarrinho() {
    this.ProdutoAdicionado.emit({ 
      nome: this.nome, 
      preco: this.preco,
     }); 
    
  }
   favoritarProduto(nomeProduto:string){
    this.favoritoService.adicionar(nomeProduto);
   }
}
