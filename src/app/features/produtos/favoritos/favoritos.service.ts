import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  favoritos = signal<string[]>([]);

  adicionar(nomeProduto: string): void {
    if (nomeProduto && !this.favoritos().includes(nomeProduto)) {
      this.favoritos.update(lista => [...lista, nomeProduto]);
    }
  }

  remover(index: number): void {
    this.favoritos.update(lista => lista.filter((_, i) => i !== index));
  }
}