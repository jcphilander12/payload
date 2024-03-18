export default {
  authentication: {
    account: 'Cuenta',
    apiKey: 'Clave API',
    enableAPIKey: 'Habilitar Clave API',
    newAccountCreated:
      'Se ha creado una nueva cuenta para que puedas acceder a <a href="{{serverURL}}">{{serverURL}}</a>. Por favor, haz click o copia el siguiente enlace a tu navegador para verificar tu correo: <a href="{{verificationURL}}">{{verificationURL}}</a>.<br> Una vez hayas verificado tu correo, podrás iniciar sesión.',
    resetYourPassword: 'Restablecer tu Contraseña',
    verified: 'Verificado',
    verifyYourEmail: 'Verifica tu correo',
    youAreReceivingResetPassword:
      'Estás recibiendo esto porque tú (o alguien más) ha solicitado restablecer la contraseña de tu cuenta. Por favor haz click en el siguiente enlace o pégalo en tu navegador para completar el proceso:',
    youDidNotRequestPassword:
      'Si tú no solicitaste esto, por favor ignora este correo y tu contraseña no se cambiará.',
  },
  error: {
    deletingFile: 'Ocurrió un error al eliminar el archivo.',
    emailOrPasswordIncorrect: 'El correo o la contraseña introducida es incorrecta.',
    followingFieldsInvalid_one: 'El siguiente campo es inválido:',
    followingFieldsInvalid_other: 'Los siguientes campos son inválidos:',
    noFilesUploaded: 'No se subieron archivos.',
    notAllowedToPerformAction: 'No tienes permiso para realizar esta acción.',
    problemUploadingFile: 'Ocurrió un problema al subir el archivo.',
    unableToDeleteCount: 'No se pudo eliminar {{count}} de {{total}} {{label}}.',
    unableToUpdateCount: 'No se puede actualizar {{count}} de {{total}} {{label}}.',
    unauthorized: 'No autorizado, debes iniciar sesión para realizar esta solicitud.',
    userLocked:
      'Este usuario ha sido bloqueado debido a que tiene muchos intentos fallidos para iniciar sesión.',
    valueMustBeUnique: 'El valor debe ser único',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Elige entre ingresar una URL personalizada o enlazar a otro documento.',
    chooseDocumentToLink: 'Elige un documento a enlazar',
    customURL: 'URL Personalizado',
    enterURL: 'Ingresar URL',
    internalLink: 'Enlace Interno',
    linkType: 'Tipo de enlace',
    openInNewTab: 'Abrir en nueva pestaña',
    textToDisplay: 'Texto a mostrar',
  },
  general: {
    createdAt: 'Fecha de creación',
    deletedCountSuccessfully: 'Se eliminó {{count}} {{label}} con éxito.',
    deletedSuccessfully: 'Borrado exitosamente.',
    email: 'Correo electrónico',
    notFound: 'No encontrado',
    row: 'Fila',
    rows: 'Filas',
    successfullyCreated: '{{label}} creado correctamente.',
    thisLanguage: 'Español',
    updatedAt: 'Fecha de modificado',
    updatedCountSuccessfully: '{{count}} {{label}} actualizado con éxito.',
    updatedSuccessfully: 'Actualizado con éxito.',
    user: 'Usuario',
    users: 'Usuarios',
    value: 'Valor',
  },
  upload: {
    fileName: 'Nombre del archivo',
    fileSize: 'Tamaño del archivo',
    height: 'Alto',
    sizes: 'Tamaños',
    width: 'Ancho',
  },
  validation: {
    emailAddress: 'Por favor introduce un correo electrónico válido.',
    enterNumber: 'Por favor introduce un número válido.',
    greaterThanMax: '{{value}} es mayor que el {{label}} máximo permitido de {{max}}.',
    invalidInput: 'La información en este campo es inválida.',
    invalidSelection: 'La selección en este campo es inválida.',
    invalidSelections: 'Este campo tiene las siguientes selecciones inválidas:',
    lessThanMin: '{{value}} es menor que el {{label}} mínimo permitido de {{min}}.',
    longerThanMin: 'Este dato debe ser más largo que el mínimo de {{minLength}} caracteres.',
    notValidDate: '"{{value}}" es una fecha inválida.',
    required: 'Este campo es obligatorio.',
    requiresAtLeast: 'Este campo require al menos {{count}} {{label}}.',
    requiresNoMoreThan: 'Este campo require no más de {{count}} {{label}}',
    requiresTwoNumbers: 'Este campo requiere dos números.',
    shorterThanMax: 'Este dato debe ser más corto que el máximo de {{maxLength}} caracteres.',
    trueOrFalse: 'Este campo solamente puede ser verdadero o falso.',
    validUploadID: "'Este campo no es una ID de subida válida.'",
  },
  version: {
    autosavedSuccessfully: 'Guardado automáticamente con éxito.',
    draft: 'Borrador',
    draftSavedSuccessfully: 'Borrador guardado con éxito.',
    published: 'Publicado',
    restoredSuccessfully: 'Restaurado éxito.',
    status: 'Estado',
  },
}
