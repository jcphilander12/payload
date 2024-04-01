export default {
  authentication: {
    account: 'Аккаунт',
    apiKey: 'API ключ',
    enableAPIKey: 'Активировать API ключ',
    loggedInChangePassword:
      'Чтобы изменить пароль, зайдите в свой <0>аккаунт</0> и измените пароль там.',
    newAccountCreated:
      'Новый аккаунт был создан для доступа к <a href="{{serverURL}}">{{serverURL}}</a> Пожалуйста, кликните по следующей ссылке или вставьте в адресную строку браузера чтобы подтвердить email: <a href="{{verificationURL}}">{{verificationURL}}</a><br> После подтверждения вашего email, вы сможете успешно войти в систему.',
    resetYourPassword: 'Сброс вашего пароля',
    verified: 'Подтверждено',
    verifyYourEmail: 'Подтвердить ваш email',
    youAreReceivingResetPassword:
      'Вы получили это сообщение, потому что вы (или кто-то другой) запросили сброс пароля для вашей учетной записи. Пожалуйста, нажмите на следующую ссылку или вставьте ее в браузер, чтобы завершить процесс:',
    youDidNotRequestPassword:
      'Если вы не запрашивали этого, пожалуйста, проигнорируйте это письмо, и ваш пароль останется неизменным.',
  },
  error: {
    deletingFile: 'Произошла ошибка при удалении файла.',
    emailOrPasswordIncorrect: 'Указанный email или пароль неверен.',
    followingFieldsInvalid_one: 'Следующее поле недействительно:',
    followingFieldsInvalid_other: 'Следующие поля недействительны:',
    noFilesUploaded: 'Не было загружено ни одного файла.',
    notAllowedToPerformAction: 'У вас нет права на выполнение этого действия.',
    problemUploadingFile: 'Возникла проблема при загрузке файла.',
    unableToDeleteCount: 'Не удалось удалить {{count}} из {{total}} {{label}}.',
    unableToUpdateCount: 'Не удалось обновить {{count}} из {{total}} {{label}}.',
    unauthorized: 'Нет доступа, вы должны войти, чтобы сделать этот запрос.',
    userLocked:
      'Этот пользователь заблокирован из-за слишком большого количества неудачных попыток входа.',
    valueMustBeUnique: 'Значение должно быть уникальным',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Выберите между вводом пользовательского текстового URL и ссылкой на другой документ.',
    chooseDocumentToLink: 'Выберите документ для ссылки',
    customURL: 'Пользовательский URL',
    enterURL: 'Введите URL',
    internalLink: 'Внутренняя ссылка',
    linkType: 'Тип ссылки',
    openInNewTab: 'Открывать в новой вкладке',
    textToDisplay: 'Текст для отображения',
  },
  general: {
    copy: 'Скопировать',
    createdAt: 'Дата создания',
    deletedCountSuccessfully: 'Удалено {{count}} {{label}} успешно.',
    deletedSuccessfully: 'Удален успешно.',
    email: 'Email',
    notFound: 'Не найдено',
    row: 'Строка',
    rows: 'Строки',
    successfullyCreated: '{{label}} успешно создан.',
    successfullyDuplicated: '{{label}} успешно продублирован.',
    thisLanguage: 'Русский',
    updatedAt: 'Дата правки',
    updatedCountSuccessfully: 'Обновлено {{count}} {{label}} успешно.',
    updatedSuccessfully: 'Успешно Обновлено.',
    user: 'пользователь',
    users: 'пользователи',
    value: 'Значение',
  },
  upload: {
    fileName: 'Имя файла',
    fileSize: 'Размер файла',
    height: 'Высота',
    sizes: 'Размеры',
    width: 'Ширина',
  },
  validation: {
    emailAddress: 'Пожалуйста, введите корректный адрес email.',
    enterNumber: 'Пожалуйста, введите корректный номер.',
    greaterThanMax: '{{value}} больше максимально допустимого значения {{label}} {{max}}.',
    invalidInput: 'Это поле имеет недопустимое значение.',
    invalidSelection: 'В этом поле выбран недопустимый вариант.',
    invalidSelections: "'Это поле содержит следующие неправильные варианты:'",
    lessThanMin: '{{value}} меньше минимально допустимого значения {{label}} {{min}}.',
    longerThanMin: 'Это значение должно быть больше минимальной длины символов: {{minLength}}.',
    notValidDate: '"{{value}}" это не действительная дата.',
    required: 'Это обязательное поле.',
    requiresAtLeast: 'Это поле требует не менее {{count}} {{label}}',
    requiresNoMoreThan: 'Это поле требует не более {{count}} {{label}}',
    requiresTwoNumbers: 'В этом поле требуется два числа.',
    shorterThanMax: 'Это значение должно быть короче максимальной длины символов {{maxLength}}.',
    trueOrFalse: 'Это поле может быть равно только true или false.',
    validUploadID: "'Это поле не является действительным ID загрузки.'",
  },
  version: {
    autosavedSuccessfully: 'Автосохранение успешно.',
    draft: 'Черновик',
    draftSavedSuccessfully: 'Черновик успешно сохранен.',
    published: 'Опубликовано',
    restoredSuccessfully: 'Восстановлен успешно.',
    status: 'Статус',
  },
}
