import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl, Validators  } from '@angular/forms';
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
// import { CarrinhoService } from '../../../core/services/carrinho.service';
import { log } from 'console';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { RouterLink } from '@angular/router';
import {PedidoFinalizado} from '../../../core/models/pedido-finalizado';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, PrecoFormatadoPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  
 carrinhoFacade = inject (CarrinhoFacade);


 compraFinalizada =signal(false);
 pedidoFinalizado = signal<PedidoFinalizado | null>(null);

   formulario = new FormGroup({
    nome: new FormControl('',[Validators.required,Validators.minLength(2),nomeSemNumeros]),
    email: new FormControl('',[Validators.required,Validators.email]),
    endereco: new FormControl('',[Validators.required,Validators.minLength(5)]),
  });
  finalizar(){
    this.compraFinalizada.set(false);
    this.pedidoFinalizado.set(null);

    if(this.carrinhoFacade.carrinhoVazio()){
      console.log('Não é possivel finalizar a compra com o carrinho vazio');
      return
    }

    if(this.formulario.invalid){
    console.log('Formulário Inválido!');
    this.formulario.markAllAsTouched();
    return;
    }

    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();

    const pedido={
      codigo: Date.now(),
      cliente: dados.nome ??'',
      email: dados.email ??'',
      quantidadeItens: itens.length,
      total,
      itens,
    }

    console.log('compraFinalizada com sucesso!');
    console.log('Itens do carrinho: ', itens)
   console.log('Dados do Pedido: ', pedido)

    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.compraFinalizada.set(true);

  }
}
function nomeSemNumeros(controle:AbstractControl):ValidationErrors | null {
  const valor = controle.value;
  if (!valor) return null;
  if(/\d/.test(valor)){
    return{numeroInvalido: true};
  }
return null;
}


