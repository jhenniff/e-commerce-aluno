import { Component,signal, inject } from '@angular/core';
import { FavoritosService } from './favoritos.service';

@Component({
  selector: 'app-favoritos',
  imports: [],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
  standalone: true,
})
export class Favoritos {
   private favoritosService = inject(FavoritosService)
  
   favoritos = this.favoritosService.favoritos;

  adicionarFavorito(novoProdutoInput: HTMLInputElement): void {
    const nomeProduto = novoProdutoInput.value.trim();
    if (nomeProduto) {
      this.favoritosService.adicionar(nomeProduto);
      novoProdutoInput.value = '';
    }

  }
  removerFavoritos(indexParaRemover:number): void {
    this.favoritosService.remover(indexParaRemover);
  }
}
