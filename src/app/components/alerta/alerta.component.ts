import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent implements OnInit{

   isVisible:boolean = true;
   messagem:string = "";
   bgColor :string = "";

  ngOnInit(): void {
    setTimeout(()=>{
      this.isVisible = false
    }, 3000)
  }

  sucesso(mensagem:string){
      this.messagem = mensagem;
      this.bgColor = "green"
  }

  erro(mensagem:string){
   this.messagem = mensagem;
      this.bgColor = "red"
  }

}
