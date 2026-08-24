import { Injectable, inject } from "@angular/core";
import { CarrinhoService } from "../services/carrinho.service";


type ItemCarrinho ={
    nome: string;
    preco: number;
}
@Injectable({providedIn: 'root'})

export class CarrinhoFacade {
private CarrinhoService= inject(CarrinhoService)
itensCarrinho= this.CarrinhoService.itens;
quantidadeCarrinho=this.CarrinhoService.quantidadeItens;
totalCarrinho= this.CarrinhoService.totalItens;
carrinhoVazio=this.CarrinhoService.carrinhoVazio;

adicionarProdutoCarrinho(produto:ItemCarrinho){
    this.CarrinhoService.adicionar(produto);
}
limparCarrinho(){
    this.CarrinhoService.limpar();
}
removerItem(rmvItem:number){
    this.CarrinhoService.removerItem(rmvItem);
}}