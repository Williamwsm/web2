import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-form-emp',
  standalone: true,
  imports: [NgxMaskDirective],
  templateUrl: './form-emp.component.html',
  styleUrl: './form-emp.component.css',
  providers: [provideNgxMask()]

})
export class FormEmpComponent {
  meuFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]]
    });
  }
}
