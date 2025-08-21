import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from "primeng/floatlabel";
import { FormsModule } from '@angular/forms';
import { ErrorMessages, FormErrorUtil } from '../../@core/utils/formErroUtil';
import { FormErrorsComponent } from "../../@shared/form-errors/form-errors.component";
import { max } from 'rxjs';
@Component({
  selector: 'app-contactame',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    FormErrorsComponent,
  ],
  templateUrl: './contactame.component.html',
  styleUrl: './contactame.component.css',
})
export class ContactameComponent implements OnInit {
  private fb = inject(FormBuilder);
  formData!: FormGroup;
  invalidControl = signal<boolean>(false);
  estado = signal<'enviar' | 'enviando' | 'enviado'>('enviar');
  customErrorMessages: { [fieldName: string]: ErrorMessages } = {
    name: {
      required: 'Debe ingresar su nombre completo',
      minlength: 'El nombre debe tener al menos 2 caracteres',
    },
    email: {
      required: 'Debe ingresar su correo electrónico',
      email: 'El formato del correo no es válido',
    },
    message: {
      required: 'Debe escribir un mensaje',
      minlength: 'El mensaje debe tener al menos 10 caracteres',
      maxlength: 'El mensaje no puede exceder 100 caracteres',
    },
    phone: {
      required: 'Debe ingresar su número de teléfono',
      phone: 'El formato del teléfono no es válido',
    },
  };

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formData = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  getControl(controlName: string) {
    return this.formData.get(controlName);
  }

  // Método para verificar si hay errores (opcional)
  hasError(controlName: string): boolean {
    return FormErrorUtil.hasError(this.getControl(controlName));
  }
  getErrorMessage(controlName: string): string | null {
    return FormErrorUtil.getErrorMessage(
      this.getControl(controlName),
      controlName,
      this.customErrorMessages
    );
  }

  enviar() {
    if (this.formData.invalid) {
      console.log('Formulario válido:', this.formData.value);
      Object.keys(this.formData.controls).forEach((key) => {
        this.formData.get(key)?.markAsTouched();
        this.formData.get(key)?.markAsDirty();
      });
      return;
    }

    this.estado.set('enviando');

    fetch('https://formspree.io/f/mblkenzr', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify(this.formData.value),
    })
      .then(() => {
        // 2. Mantener "enviando" 2s antes de cambiar
        setTimeout(() => {
          this.estado.set('enviado');
          this.formData.reset();
          // 3. Después de 2s volver a "enviar"
          setTimeout(() => {
            this.estado.set('enviar');
            this.formData.reset();
          }, 2000);
        }, 2000);
      })
      .catch(() => {
        this.estado.set('enviar');
      });
  }
}
