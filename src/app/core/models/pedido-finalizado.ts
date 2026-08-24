import { ItemCarrinho } from "./item-carrinho";
import { Inject } from "@angular/core";

export type PedidoFinalizado ={
  codigo: number;
  cliente: string;
    email: string;
  quantidadeItens: number;
  total: number;  
  itens: ItemCarrinho[];
}