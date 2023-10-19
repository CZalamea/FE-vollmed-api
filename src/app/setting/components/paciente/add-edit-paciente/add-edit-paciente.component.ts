import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPaciente } from 'src/app/interfaces/ipaciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-paciente',
  templateUrl: './add-edit-paciente.component.html',
  styleUrls: ['./add-edit-paciente.component.css']
})
export class AddEditPacienteComponent {
  form: FormGroup;
  title: string = "Agregar Paciente";
  iconName: string = "arrow_forward_ios";

  constructor(
    private dialogRef: MatDialogRef<AddEditPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPaciente,
    private fb: FormBuilder,
    private _toast: ToastService,
    private _medicoServices: PacienteService
  ) {
    this.form = this.fb.group({
      nombre:         ['', Validators.required],
      email:          ['', Validators.required],
      telefono:       ['', Validators.required],
      especialidad:   ['', Validators.required],
      calle:          ['', Validators.required],
      distrito:       ['', Validators.required],
      ciudad:         ['', Validators.required],
      numero:         ['', Validators.required],
      complemento:    ['', Validators.required],    
    })
  }

}
