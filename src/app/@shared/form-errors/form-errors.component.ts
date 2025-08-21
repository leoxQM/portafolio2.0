import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessages, FormErrorUtil } from '../../@core/utils/formErroUtil';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css',
})
export class FormErrorsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
  @Input() customMessages: { [fieldName: string]: ErrorMessages } = {};
  @Input() errorClass: string = 'colorRed text-sm mt-1';

  get errorMessage(): string | null {
    return FormErrorUtil.getErrorMessage(
      this.control,
      this.fieldName,
      this.customMessages
    );
  }
}
