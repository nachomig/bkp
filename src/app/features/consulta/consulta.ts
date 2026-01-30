import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './consulta.html',
  styleUrls: ['./consulta.css'],
})
export class Consulta implements OnInit {
  fConsultaCUIT!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  initializeForm(): void {
    this.fConsultaCUIT = this.fb.group({
      fcuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  hasErrors(controlName: string, errorType: string): boolean {
    const control = this.fConsultaCUIT.get(controlName);
    return control?.hasError(errorType) && control?.touched ? true : false;
  }

  resetForm(): void {
    this.initializeForm();
  }

  enviar(): void {
    if (this.fConsultaCUIT.invalid) {
      this.fConsultaCUIT.markAllAsTouched();
      return;
    }

    Swal.fire('Enviado', 'Consulta enviada con éxito', 'success');
    this.resetForm();
  }
}