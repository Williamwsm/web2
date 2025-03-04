import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [NgxMaskDirective],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
  providers: [provideNgxMask()]

})
export class FormUserComponent {
  meuFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]]
    });
  }

}
