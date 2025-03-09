import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vaga } from '../../model/vaga';
import { DiferendayPipe } from '../../pipes/diferenday.pipe';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../servicos/api.service';
import { LoadComponent } from "../load/load.component";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirmar-vaga',
  standalone: true,
  imports: [DatePipe, DiferendayPipe, LoadComponent],
  templateUrl: './confirmar-vaga.component.html',
  styleUrl: './confirmar-vaga.component.css'
})
export class ConfirmarVagaComponent {

  @Input() vaga: Vaga | null = null
  @Output() vagaChange = new EventEmitter<null>();
  protected isLoad: boolean = false;
  toast: ToastrService = inject(ToastrService)

  apiService: ApiService = inject(ApiService);

  handleBack() {
    this.vagaChange.emit(null);
  }

  handleConfirm() {
    this.isLoad = true;
    setTimeout(()=>{
      this.apiService.inscreverEmVaga(this.vaga!.vagNrId)
      .subscribe(
        {
          next: (value) => {
            this.isLoad = false;
            this.toast.success("Candidatura realizada com sucesso!")
            this.vagaChange.emit(null);
          },
          error: (e: HttpErrorResponse) =>{
            this.isLoad = false;
            this.toast.error(e.error.message)
          }
        }
      )
    }, 1500)
  }
}
