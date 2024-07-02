import type { DefaultTranslationsObject, Language } from '../types.js'

export const ptTranslations: DefaultTranslationsObject = {
  authentication: {
    account: 'Conta',
    accountOfCurrentUser: 'Conta do usuário ativo',
    alreadyActivated: 'Conta já ativada',
    alreadyLoggedIn: 'Login já realizado',
    apiKey: 'Chave da API',
    authenticated: 'Autenticado',
    backToLogin: 'Voltar para login',
    beginCreateFirstUser: 'Para começar, crie seu primeiro usuário.',
    changePassword: 'Mudar senha',
    checkYourEmailForPasswordReset:
      'Verifique seu email para um link que permitirá que você redefina sua senha com segurança.',
    confirmGeneration: 'Confirmar Geração',
    confirmPassword: 'Confirmar Senha',
    createFirstUser: 'Criar primeiro usuário',
    emailNotValid: 'O email fornecido não é válido',
    emailSent: 'Email Enviado',
    emailVerified: 'Email verificado com sucesso.',
    enableAPIKey: 'Habilitar Chave API',
    failedToUnlock: 'Falha ao desbloquear',
    forceUnlock: 'Forçar Desbloqueio',
    forgotPassword: 'Esqueci a senha',
    forgotPasswordEmailInstructions:
      'Por favor, preencha seu email abaixo. Você receberá um email com instruções para gerar uma nova senha',
    forgotPasswordQuestion: 'Esqueceu a senha?',
    generate: 'Gerar',
    generateNewAPIKey: 'Gerar nova chave API',
    generatingNewAPIKeyWillInvalidate:
      'Gerar uma nova chave API <1>invalidará</1> a chave anterior. Você tem certeza que deseja prosseguir?',
    lockUntil: 'Bloquear Até',
    logBackIn: 'Fazer login novamente',
    logOut: 'Log out',
    loggedIn: 'Para fazer login como outro usuário, você deve fazer o <0>log out</0> antes.',
    loggedInChangePassword:
      'Para mudar a sua senha, acesse a sua <0>conta</0> e edite sua senha lá.',
    loggedOutInactivity: 'Você foi desconectado devido a inatividade.',
    loggedOutSuccessfully: 'Log out efetuado com sucesso.',
    loggingOut: 'Saindo...',
    login: 'Login',
    loginAttempts: 'Tentativas de Login',
    loginUser: 'Iniciar sessão',
    loginWithAnotherUser:
      'Para fazer login como outro usuário, você deve fazer o <0>log out</0> antes.',
    logout: 'Logout',
    logoutSuccessful: 'Logout bem sucedido.',
    logoutUser: 'Encerrar sessão',
    newAPIKeyGenerated: 'Nova Chave API Gerada.',
    newAccountCreated:
      'Uma nova conta acaba de ser criada para que você possa acessar <a href="{{serverURL}}">{{serverURL}}</a> Por favor, clique no link a seguir ou cole a URL abaixo no seu navegador para verificar seu email: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Após a verificação de email, você será capaz de fazer o login.',
    newPassword: 'Nova Senha',
    passed: 'Autenticação Aprovada',
    passwordResetSuccessfully: 'Redefinição de senha realizada com sucesso.',
    resetPassword: 'Redefinir Senha',
    resetPasswordExpiration: 'Tempo Limite para Redefinição de Senha',
    resetPasswordToken: 'Token para Redefinição de Senha',
    resetYourPassword: 'Redefinir Sua Senha',
    stayLoggedIn: 'Manter sessão ativa',
    successfullyRegisteredFirstUser: 'Primeiro usuário registrado com sucesso.',
    successfullyUnlocked: 'Desbloqueado com sucesso',
    tokenRefreshSuccessful: 'Atualização do token bem-sucedida.',
    unableToVerify: 'Não foi possível verificar',
    verified: 'Verificado',
    verifiedSuccessfully: 'Verificado com Sucesso',
    verify: 'Verificar',
    verifyUser: 'Verificar Usuário',
    verifyYourEmail: 'Verifique seu email',
    youAreInactive:
      'Você não está ativo há algum tempo e sua sessão será automaticamente finalizada em breve, para sua própria segurança. Você gostaria de manter a sessão ativa?',
    youAreReceivingResetPassword:
      'Você está recebendo essa mensagem porque você (ou outra pessoa) requisitou a redefinição de senha da sua conta. Por favor, clique no link a seguir ou cole no seu navegador para completar o processo:',
    youDidNotRequestPassword:
      'Se você não fez essa requisição, por favor ignore esse email e sua senha permanecerá igual.',
  },
  error: {
    accountAlreadyActivated: 'Essa conta já foi ativada.',
    autosaving: 'Ocorreu um problema ao salvar automaticamente esse documento.',
    correctInvalidFields: 'Por favor, corrija os campos inválidos.',
    deletingFile: 'Ocorreu um erro ao excluir o arquivo.',
    deletingTitle:
      'Ocorreu um erro ao excluir {{title}}. Por favor, verifique sua conexão e tente novamente.',
    emailOrPasswordIncorrect: 'O email ou senha fornecido está incorreto.',
    followingFieldsInvalid_one: 'O campo a seguir está inválido:',
    followingFieldsInvalid_other: 'Os campos a seguir estão inválidos:',
    incorrectCollection: 'Coleção Incorreta',
    invalidFileType: 'Tipo de arquivo inválido',
    invalidFileTypeValue: 'Tipo de arquivo inválido: {{value}}',
    loadingDocument: 'Ocorreu um problema ao carregar o documento com ID {{id}}.',
    localesNotSaved_one: 'A seguinte configuração regional não pôde ser salva:',
    localesNotSaved_other: 'As seguintes configurações regionais não puderam ser salvas:',
    logoutFailed: 'Falha ao sair.',
    missingEmail: 'Email ausente.',
    missingIDOfDocument: 'ID do documento a ser atualizado ausente.',
    missingIDOfVersion: 'ID da versão ausente.',
    missingRequiredData: 'Dados requeridos ausentes.',
    noFilesUploaded: 'Nenhum arquivo foi carregado.',
    noMatchedField: 'Não foi encontrado nenhum campo correspondente a "{{label}}"',
    noUser: 'Nenhum Usuário',
    notAllowedToAccessPage: 'Você não tem permissão para acessar essa página.',
    notAllowedToPerformAction: 'Você não tem permissão para realizar essa ação.',
    notFound: 'O recurso requisitado não foi encontrado.',
    previewing: 'Ocorreu um problema ao visualizar esse documento.',
    problemUploadingFile: 'Ocorreu um problema ao carregar o arquivo.',
    tokenInvalidOrExpired: 'Token expirado ou inválido.',
    tokenNotProvided: 'Token não fornecido.',
    unPublishingDocument: 'Ocorreu um problema ao despublicar esse documento',
    unableToDeleteCount: 'Não é possível excluir {{count}} de {{total}} {{label}}.',
    unableToUpdateCount: 'Não foi possível atualizar {{count}} de {{total}} {{label}}.',
    unauthorized: 'Não autorizado. Você deve estar logado para fazer essa requisição',
    unknown: 'Ocorreu um erro desconhecido.',
    unspecific: 'Ocorreu um erro.',
    userEmailAlreadyRegistered: 'Um usuário com o email fornecido já está registrado.',
    userLocked: 'Esse usuário está bloqueado devido a muitas tentativas de login malsucedidas.',
    valueMustBeUnique: 'Valor deve ser único',
    verificationTokenInvalid: 'Token de verificação inválido.',
  },
  fields: {
    addLabel: 'Adicionar {{label}}',
    addLink: 'Adicionar Link',
    addNew: 'Adicionar novo',
    addNewLabel: 'Adicionar novo {{label}}',
    addRelationship: 'Adicionar Relação',
    addUpload: 'Adicionar Upload',
    block: 'bloco',
    blockType: 'Tipo de bloco',
    blocks: 'blocos',
    chooseBetweenCustomTextOrDocument:
      'Escolha entre inserir um URL de texto personalizado ou vincular a outro documento.',
    chooseDocumentToLink: 'Escolha um documento para vincular',
    chooseFromExisting: 'Escolher entre os existentes',
    chooseLabel: 'Escolher {{label}}',
    collapseAll: 'Recolher todos',
    customURL: 'URL personalizado',
    editLabelData: 'Editar dados de {{label}}',
    editLink: 'Editar Link',
    editRelationship: 'Editar Relacionamento',
    enterURL: 'Insira um URL',
    internalLink: 'Link Interno',
    itemsAndMore: '{{items}} e mais {{count}}',
    labelRelationship: 'Relacionado a {{label}}',
    latitude: 'Latitude',
    linkType: 'Tipo de link',
    linkedTo: 'Ligado a <0>{{label}}</0>',
    longitude: 'Longitude',
    newLabel: 'Novo(a) {{label}}',
    openInNewTab: 'Abrir em nova aba',
    passwordsDoNotMatch: 'Senhas não coincidem.',
    relatedDocument: 'Documento Relacionado',
    relationTo: 'Relacionado a',
    removeRelationship: 'Remover Relacionamento',
    removeUpload: 'Remover Upload',
    saveChanges: 'Salvar alterações',
    searchForBlock: 'Procurar bloco',
    selectExistingLabel: 'Selecionar {{label}} existente',
    selectFieldsToEdit: 'Selecione os campos para editar',
    showAll: 'Mostrar Tudo',
    swapRelationship: 'Relação de Troca',
    swapUpload: 'Substituir Upload',
    textToDisplay: 'Texto a ser exibido',
    toggleBlock: 'Alternar bloco',
    uploadNewLabel: 'Carregar novo(a) {{label}}',
  },
  general: {
    aboutToDelete: 'Você está prestes a excluir o/a {{label}} <1>{{title}}</1>. Tem certeza?',
    aboutToDeleteCount_many: 'Você está prestes a deletar {{count}} {{label}}',
    aboutToDeleteCount_one: 'Você está prestes a deletar {{count}} {{label}}',
    aboutToDeleteCount_other: 'Você está prestes a deletar {{count}} {{label}}',
    addBelow: 'Adicionar abaixo',
    addFilter: 'Adicionar Filtro',
    adminTheme: 'Tema do Admin',
    and: 'E',
    applyChanges: 'Aplicar alterações',
    ascending: 'Ascendente',
    automatic: 'Automático',
    backToDashboard: 'Voltar para Painel de Controle',
    cancel: 'Cancelar',
    changesNotSaved:
      'Suas alterações não foram salvas. Se você sair agora, essas alterações serão perdidas.',
    close: 'Fechar',
    collapse: 'Recolher',
    collections: 'Coleções',
    columnToSort: 'Coluna para Ordenar',
    columns: 'Colunas',
    confirm: 'Confirmar',
    confirmDeletion: 'Confirmar exclusão',
    confirmDuplication: 'Confirmar duplicação',
    copied: 'Copiado',
    copy: 'Copiar',
    create: 'Criar',
    createNew: 'Criar Novo',
    createNewLabel: 'Criar novo(a) {{label}}',
    created: 'Criado',
    createdAt: 'Criado Em',
    creating: 'Criando',
    creatingNewLabel: 'Criando novo(a) {{label}}',
    custom: 'Personalizado',
    dark: 'Escuro',
    dashboard: 'Painel de Controle',
    delete: 'Excluir',
    deletedCountSuccessfully: 'Excluído {{count}} {{label}} com sucesso.',
    deletedSuccessfully: 'Apagado com sucesso.',
    deleting: 'Excluindo...',
    depth: 'Profundidade',
    descending: 'Decrescente',
    deselectAllRows: 'Desmarcar todas as linhas',
    document: 'Documento',
    documents: 'Documentos',
    duplicate: 'Duplicar',
    duplicateWithoutSaving: 'Duplicar sem salvar alterações',
    edit: 'Editar',
    editLabel: 'Editar {{label}}',
    editing: 'Editando',
    editingLabel_many: 'Editando {{count}} {{label}}',
    editingLabel_one: 'Editando {{count}} {{label}}',
    editingLabel_other: 'Editando {{count}} {{label}}',
    email: 'Email',
    emailAddress: 'Endereço de Email',
    enterAValue: 'Insira um valor',
    error: 'Erro',
    errors: 'Erros',
    fallbackToDefaultLocale: 'Recuo para o local padrão',
    false: 'Falso',
    filter: 'Filtro',
    filterWhere: 'Filtrar {{label}} em que',
    filters: 'Filtros',
    globals: 'Globais',
    language: 'Idioma',
    lastModified: 'Última modificação',
    leaveAnyway: 'Sair mesmo assim',
    leaveWithoutSaving: 'Sair sem salvar',
    light: 'Claro',
    livePreview: 'Pré-visualização',
    loading: 'Carregando',
    locale: 'Local',
    locales: 'Localizações',
    menu: 'Cardápio',
    moveDown: 'Mover para Baixo',
    moveUp: 'Mover para Cima',
    newPassword: 'Nova Senha',
    noFiltersSet: 'Nenhum filtro definido',
    noLabel: '<Nenhum(a) {{label}}>',
    noOptions: 'Sem opções',
    noResults:
      'Nenhum {{label}} encontrado. Ou nenhum(a) {{label}} existe ainda, ou nenhum(a) corresponde aos filtros que você especificou acima.',
    noValue: 'Nenhum valor',
    none: 'Nenhum',
    notFound: 'Não Encontrado',
    nothingFound: 'Nada encontrado',
    of: 'de',
    open: 'Abrir',
    or: 'Ou',
    order: 'Ordem',
    pageNotFound: 'Página não encontrada',
    password: 'Senha',
    payloadSettings: 'Configurações do Payload',
    perPage: 'Itens por Página: {{limit}}',
    remove: 'Remover',
    reset: 'Redefinir',
    row: 'Linha',
    rows: 'Linhas',
    save: 'Salvar',
    saving: 'Salvando...',
    searchBy: 'Buscar por {{label}}',
    selectAll: 'Selecione tudo {{count}} {{label}}',
    selectAllRows: 'Selecione todas as linhas',
    selectValue: 'Selecione um valor',
    selectedCount: '{{count}} {{label}} selecionado',
    showAllLabel: 'Mostre todos {{label}}',
    sorryNotFound: 'Desculpe—não há nada que corresponda à sua requisição.',
    sort: 'Ordenar',
    sortByLabelDirection: 'Ordenar por {{label}} {{direction}}',
    stayOnThisPage: 'Permanecer nessa página',
    submissionSuccessful: 'Envio bem-sucedido.',
    submit: 'Enviar',
    submitting: 'Enviando...',
    success: 'Sucesso',
    successfullyCreated: '{{label}} criado com sucesso.',
    successfullyDuplicated: '{{label}} duplicado com sucesso.',
    thisLanguage: 'Português',
    titleDeleted: '{{label}} {{title}} excluído com sucesso.',
    true: 'Verdadeiro',
    unauthorized: 'Não autorizado',
    unsavedChangesDuplicate: 'Você tem mudanças não salvas. Você gostaria de continuar a duplicar?',
    untitled: 'Sem título',
    updatedAt: 'Atualizado Em',
    updatedCountSuccessfully: 'Atualizado {{count}} {{label}} com sucesso.',
    updatedSuccessfully: 'Atualizado com sucesso.',
    updating: 'Atualizando',
    uploading: 'Fazendo upload',
    user: 'usuário',
    users: 'usuários',
    value: 'Valor',
    welcome: 'Boas vindas',
  },
  operators: {
    contains: 'contém',
    equals: 'igual',
    exists: 'existe',
    isGreaterThan: 'é maior que',
    isGreaterThanOrEqualTo: 'é maior ou igual a',
    isIn: 'está em',
    isLessThan: 'é menor que',
    isLessThanOrEqualTo: 'é menor ou igual a',
    isLike: 'é como',
    isNotEqualTo: 'não é igual a',
    isNotIn: 'não está em',
    near: 'perto',
  },
  upload: {
    addImage: 'Adicionar imagem',
    crop: 'Cultura',
    cropToolDescription:
      'Arraste as bordas da área selecionada, desenhe uma nova área ou ajuste os valores abaixo.',
    dragAndDrop: 'Arraste e solte um arquivo',
    dragAndDropHere: 'ou arraste um arquivo aqui',
    editImage: 'Editar imagem',
    fileName: 'Nome do Arquivo',
    fileSize: 'Tamanho do Arquivo',
    focalPoint: 'Ponto Focal',
    focalPointDescription:
      'Arraste o ponto focal diretamente na pré-visualização ou ajuste os valores abaixo.',
    height: 'Altura',
    lessInfo: 'Ver menos',
    moreInfo: 'Ver mais',
    pasteURL: 'Colar URL',
    previewSizes: 'Tamanhos de Pré-visualização',
    selectCollectionToBrowse: 'Selecione uma Coleção para Navegar',
    selectFile: 'Selecione um arquivo',
    setCropArea: 'Definir área de corte',
    setFocalPoint: 'Definir ponto focal',
    sizes: 'Tamanhos',
    sizesFor: 'Tamanhos para {{label}}',
    width: 'Largura',
  },
  validation: {
    emailAddress: 'Por favor, insira um endereço de email válido.',
    enterNumber: 'Por favor, insira um número válido.',
    fieldHasNo: 'Esse campo não contém {{label}}',
    greaterThanMax: '{{value}} é maior que o máximo permitido de {{label}} que é {{max}}.',
    invalidInput: 'Esse campo tem um conteúdo inválido.',
    invalidSelection: 'Esse campo tem uma seleção inválida.',
    invalidSelections: "'Esse campo tem as seguintes seleções inválidas:'",
    lessThanMin: '{{value}} é menor que o mínimo permitido de {{label}} que é {{min}}.',
    limitReached: 'Limite atingido, apenas {{max}} itens podem ser adicionados.',
    longerThanMin: 'Esse valor deve ser maior do que o mínimo de {{minLength}} characters.',
    notValidDate: '"{{value}}" não é uma data válida.',
    required: 'Esse campo é obrigatório.',
    requiresAtLeast: 'Esse campo requer no máximo {{count}} {{label}}.',
    requiresNoMoreThan: 'Esse campo requer pelo menos {{count}} {{label}}.',
    requiresTwoNumbers: 'Esse campo requer dois números.',
    shorterThanMax: 'Esse valor deve ser menor do que o máximo de {{maxLength}} caracteres.',
    trueOrFalse: 'Esse campo pode ser apenas verdadeiro (true) ou falso (false)',
    validUploadID: "'Esse campo não é um ID de upload válido.'",
  },
  version: {
    type: 'Tipo',
    aboutToPublishSelection:
      'Você está prestes a publicar todos os {{label}} da seleção. Tem certeza?',
    aboutToRestore:
      'Você está prestes a restaurar o documento {{label}} para o estado em que ele se encontrava em {{versionDate}}.',
    aboutToRestoreGlobal:
      'Você está prestes a restaurar o Global {{label}} para o estado em que ele se encontrava em {{versionDate}}.',
    aboutToRevertToPublished:
      'Você está prestes a reverter as alterações desse documento para seu estado de publicação. Tem certeza?',
    aboutToUnpublish: 'Você está prestes a despublicar esse documento. Tem certeza?',
    aboutToUnpublishSelection:
      'Você está prestes a cancelar a publicação de todos os {{label}} na seleção. Tem certeza?',
    autosave: 'Salvamento automático',
    autosavedSuccessfully: 'Salvamento automático com sucesso.',
    autosavedVersion: 'Versão de salvamento automático',
    changed: 'Alterado',
    compareVersion: 'Comparar versão com:',
    confirmPublish: 'Confirmar publicação',
    confirmRevertToSaved: 'Confirmar a reversão para o salvo',
    confirmUnpublish: 'Confirmar despublicação',
    confirmVersionRestoration: 'Confirmar Restauração de versão',
    currentDocumentStatus: 'Documento {{docStatus}} atual',
    draft: 'Rascunho',
    draftSavedSuccessfully: 'Rascunho salvo com sucesso.',
    lastSavedAgo: 'Última gravação há {{distance}}',
    noFurtherVersionsFound: 'Nenhuma outra versão encontrada',
    noRowsFound: 'Nenhum(a) {{label}} encontrado(a)',
    preview: 'Pré-visualização',
    problemRestoringVersion: 'Ocorreu um problema ao restaurar essa versão',
    publish: 'Publicar',
    publishChanges: 'Publicar alterações',
    published: 'Publicado',
    publishing: 'Publicação',
    restoreThisVersion: 'Restaurar essa versão',
    restoredSuccessfully: 'Restaurado com sucesso.',
    restoring: 'Restaurando...',
    revertToPublished: 'Reverter para publicado',
    reverting: 'Revertendo...',
    saveDraft: 'Salvar rascunho',
    selectLocales: 'Selecione as localizações para exibir',
    selectVersionToCompare: 'Selecione uma versão para comparar',
    showLocales: 'Exibir localizações:',
    showingVersionsFor: 'Mostrando versões para:',
    status: 'Status',
    unpublish: 'Despublicar',
    unpublishing: 'Despublicando...',
    version: 'Versão',
    versionCount_many: '{{count}} versões encontradas',
    versionCount_none: 'Nenhuma versão encontrada',
    versionCount_one: '{{count}} versão encontrada',
    versionCount_other: '{{count}} versões encontradas',
    versionCreatedOn: '{{version}} criada em:',
    versionID: 'ID da versão',
    versions: 'Versões',
    viewingVersion: 'Visualizando versão para o/a {{entityLabel}} {{documentTitle}}',
    viewingVersionGlobal: '`Visualizando versão para o global {{entityLabel}}',
    viewingVersions: 'Visualizando versões para o/a {{entityLabel}} {{documentTitle}}',
    viewingVersionsGlobal: '`Visualizando versões para o global {{entityLabel}}',
  },
}

export const pt: Language = {
  dateFNSKey: 'pt',
  translations: ptTranslations,
}
