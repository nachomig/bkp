import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CreditosService } from '../../../services/creditos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-alta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-alta.html',
  styleUrls: ['./form-alta.css'],
})
export class FormAlta implements OnInit {
  formularioContacto!: FormGroup;

  get tipoCredito() {
    return this.formularioContacto.get('tipoCredito')?.value;
  }

  constructor(private fb: FormBuilder, private creditosService: CreditosService) {}

  ngOnInit() {
    this.formularioContacto = this.fb.group({
      tipoCredito: ['', Validators.required],
      importeCredito: ['', [Validators.required, Validators.pattern(/^\d{1,16}(\.\d{1,2})?$/)]],
      fechaEmision: ['', Validators.required],
      cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      expediente: ['', Validators.required],
      numeroResolucion: [''],
      actoAdministrativo: [''],
      fechaActoAdministrativo: [''],
      fechaResolucion: [''],
      numeroCertificado: [''],
      cicNumeroCertificado: [''],
      cicNumeroResolucion: [''],
      cicFechaResolucion: [''],
      razonSocial: ['', Validators.required]
    });

    // Suscribirse a cambios en tipoCredito para actualizar validaciones
    this.formularioContacto.get('tipoCredito')?.valueChanges.subscribe(value => {
      this.actualizarValidaciones(value);
    });
  }
  //
  buscarRazonSocial(): void {
  const cuit = this.formularioContacto.get('cuit')?.value;
  
  if (!cuit || cuit.length !== 11) {
    Swal.fire('Error', 'CUIT debe tener 11 dígitos', 'error');
    return;
  }
  
  // reemplazar con llamada real al servicio this.creditosService.obtenerRazonSocial(cuit).subscribe(...)
  const razonSocialSimulada = `Nombre Apellido ${cuit}`;
  
  this.formularioContacto.get('razonSocial')?.setValue(razonSocialSimulada);
  Swal.fire('Éxito', 'Razón social cargada', 'success');
}
//
  actualizarValidaciones(tipo: string): void {
    const limpiar = (campo: string) => {
      this.formularioContacto.get(campo)?.clearValidators();
      this.formularioContacto.get(campo)?.updateValueAndValidity();
    };

    [
      'numeroResolucion',
      'actoAdministrativo',
      'fechaActoAdministrativo',
      'fechaResolucion',
      'numeroCertificado',
      'cicNumeroCertificado',
      'cicNumeroResolucion',
      'cicFechaResolucion'
    ].forEach(limpiar);

    if (tipo === '3') {
      ['numeroResolucion', 'actoAdministrativo', 'fechaActoAdministrativo', 'fechaResolucion']
        .forEach(campo => this.formularioContacto.get(campo)?.setValidators(Validators.required));
    }

    if (tipo === '1') {
      this.formularioContacto.get('numeroCertificado')?.setValidators(Validators.required);
    }

    if (tipo === '2') {
      ['cicNumeroCertificado', 'cicNumeroResolucion', 'cicFechaResolucion']
        .forEach(campo => this.formularioContacto.get(campo)?.setValidators(Validators.required));
    }

    this.formularioContacto.updateValueAndValidity();
  }

  hasErrors(controlName: string, errorType: string): boolean {
    const control = this.formularioContacto.get(controlName);
    return control?.hasError(errorType) && control?.touched ? true : false;
  }
// MAPEO 
    
  mapearParaBackend(formValue: any): any {
    const datosBase = {
      tipoCredito: formValue.tipoCredito,  // Corregido: eliminado "@" que era un error de tipeo
      importe: formValue.importeCredito,
      fechaEmision: formValue.fechaEmision,
      cuit: formValue.cuit,
      expediente: formValue.expediente,  
      
    };

    // Agregar resolucion según tipoCredito
    if (formValue.tipoCredito === '3') {
      //cultura
      return {
        ...datosBase,
      
        resolucion: {
          codigo: formValue.numeroResolucion,
          fecha: formValue.fechaResolucion,
        },
        actoAdministrativo: {
        acto: formValue.actoAdministrativo,
        fecha: formValue.fechaActoAdministrativo,
      },
      };
    } else if (formValue.tipoCredito === '2') {
      //CIC
      return {
        ...datosBase,
        numeroCertificado: formValue.cicNumeroCertificado,
        resolucion: {
          codigo: formValue.cicNumeroResolucion,
          fecha: formValue.cicFechaResolucion
        }
      };
    }  else if (formValue.tipoCredito === '1') {
      //COPRET
      return {
        ...datosBase,
        numeroCertificado: formValue.numeroCertificado
      };
    }
    return datosBase;
  }
// fin mapeo

  // Envía los datos 
  async enviar(): Promise<void> {
    if (this.formularioContacto.invalid) {
      this.formularioContacto.markAllAsTouched();
      return;
    }
   // Envía los datos orignal 
      //const datos = this.formularioContacto.value;
   
  const datos = this.mapearParaBackend(this.formularioContacto.value);
    
    
    
      console.log('Enviando formulario:', datos);
      try {
        const respuesta = await firstValueFrom(this.creditosService.enviarFormulario(datos));
        console.log('Formulario enviado correctamente:', respuesta);
        alert('Formulario enviado con éxito');
        this.formularioContacto.reset();
      
      } catch (error: any) {
        console.error('Error al enviar el formulario:', error);
        
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el formulario',
          text: error?.estado && error?.mensaje && error?.codigo|| 'Ocurrió un error al enviar los datos',
          timer: 5000
        }); 
      }
  }

}

