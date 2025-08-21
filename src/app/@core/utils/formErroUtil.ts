export interface ErrorMessages {
  [key: string]: string;
}

export const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  required: 'Este campo es requerido',
  email: 'Debe ingresar un email válido',
  minlength: 'Debe tener al menos {requiredLength} caracteres',
  maxlength: 'No puede tener más de {requiredLength} caracteres',
  pattern: 'El formato ingresado no es válido',
  min: 'El valor mínimo es {min}',
  max: 'El valor máximo es {max}',
  phone: 'Debe ingresar un número de teléfono válido',
  url: 'Debe ingresar una URL válida'
};

export class FormErrorUtil {
  /**
   * Obtiene el mensaje de error para un control específico
   * @param control - AbstractControl del formulario
   * @param fieldName - Nombre del campo (opcional, para mensajes personalizados)
   * @param customMessages - Mensajes personalizados por campo
   * @returns string con el mensaje de error o null si no hay errores
   */
  static getErrorMessage(
    control: any,
    fieldName: string = '',
    customMessages: { [fieldName: string]: ErrorMessages } = {}
  ): string | null {

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;
    const fieldMessages = customMessages[fieldName] || {};

    // Prioridad: mensajes personalizados del campo > mensajes por defecto
    for (const errorType in errors) {
      if (errors.hasOwnProperty(errorType)) {
        const errorValue = errors[errorType];

        // Buscar mensaje personalizado primero
        if (fieldMessages[errorType]) {
          return this.interpolateMessage(fieldMessages[errorType], errorValue);
        }

        // Usar mensaje por defecto
        if (DEFAULT_ERROR_MESSAGES[errorType]) {
          return this.interpolateMessage(DEFAULT_ERROR_MESSAGES[errorType], errorValue);
        }

        // Mensaje genérico si no se encuentra
        return `Error en el campo ${fieldName}`;
      }
    }

    return null;
  }

  /**
   * Interpola valores en el mensaje de error
   * @param message - Mensaje con placeholders
   * @param errorValue - Valor del error que contiene los datos para interpolación
   * @returns string con valores interpolados
   */
  private static interpolateMessage(message: string, errorValue: any): string {
    if (typeof errorValue === 'object' && errorValue !== null) {
      let interpolatedMessage = message;
      Object.keys(errorValue).forEach(key => {
        const placeholder = `{${key}}`;
        interpolatedMessage = interpolatedMessage.replace(placeholder, errorValue[key]);
      });
      return interpolatedMessage;
    }
    return message;
  }

  /**
   * Verifica si un control tiene errores y ha sido tocado
   * @param control - AbstractControl del formulario
   * @returns boolean
   */
  static hasError(control: any): boolean {
    return control && control.errors && control.touched;
  }

  /**
   * Verifica si un control tiene un tipo de error específico
   * @param control - AbstractControl del formulario
   * @param errorType - Tipo de error a verificar
   * @returns boolean
   */
  static hasSpecificError(control: any, errorType: string): boolean {
    return control && control.errors && control.errors[errorType] && control.touched;
  }
}
