export default {
  authentication: {
    account: '帐户',
    apiKey: 'API密钥',
    enableAPIKey: '启用API密钥',
    newAccountCreated:
      '刚刚为您创建了一个可以访问 <a href="{{serverURL}}">{{serverURL}}</a> 的新帐户 请点击以下链接或在浏览器中粘贴以下网址，以验证您的电子邮件: <a href="{{verificationURL}}">{{verificationURL}}</a><br> 验证您的电子邮件后，您将能够成功登录。',
    resetYourPassword: '重置您的密码',
    verified: '已验证',
    verifyYourEmail: '验证您的电子邮件',
    youAreReceivingResetPassword:
      '您收到此邮件是因为您（或其他人）已请求重置您帐户的密码。请点击以下链接，或将其粘贴到您的浏览器中以完成该过程：',
    youDidNotRequestPassword: '如果您没有要求这样做，请忽略这封邮件，您的密码将保持不变。',
  },
  error: {
    deletingFile: '删除文件时出现了错误。',
    emailOrPasswordIncorrect: '提供的电子邮件或密码不正确。',
    followingFieldsInvalid_one: '下面的字段是无效的：',
    followingFieldsInvalid_other: '以下字段是无效的：',
    noFilesUploaded: '没有上传文件。',
    notAllowedToPerformAction: '您不被允许执行此操作。',
    problemUploadingFile: '上传文件时出现了问题。',
    unableToDeleteCount: '无法从 {{total}} {{label}} 中删除 {{count}}。',
    unableToUpdateCount: '无法更新 {{count}} 个，共 {{total}} 个 {{label}}。',
    unauthorized: '未经授权，您必须登录才能提出这个请求。',
    userLocked: '该用户由于有太多次失败的登录尝试而被锁定。',
    valueMustBeUnique: '值必须是唯一的',
  },
  fields: {
    chooseBetweenCustomTextOrDocument: '选择输入一个自定义的文本URL或链接到另一个文档。',
    chooseDocumentToLink: '选择一个要链接的文档',
    customURL: '自定义URL',
    enterURL: '输入一个URL',
    internalLink: '内部链接',
    linkType: '链接类型',
    openInNewTab: '在新标签中打开',
    textToDisplay: '要显示的文本',
  },
  general: {
    createdAt: '创建于',
    deletedCountSuccessfully: '已成功删除 {{count}} {{label}}。',
    deletedSuccessfully: '已成功删除。',
    email: '电子邮件',
    notFound: '未找到',
    row: '行',
    rows: '行',
    successfullyCreated: '成功创建{{label}}',
    thisLanguage: '中文 (简体)',
    updatedAt: '更新于',
    updatedCountSuccessfully: '已成功更新 {{count}} {{label}}。',
    updatedSuccessfully: '更新成功。',
    user: '用户',
    users: '用户',
    value: '值',
  },
  upload: {
    fileName: '文件名',
    fileSize: '文件大小',
    height: '高度',
    sizes: '尺寸',
    width: '宽度',
  },
  validation: {
    emailAddress: '请输入一个有效的电子邮件地址。',
    enterNumber: '请输入一个有效的号码。',
    greaterThanMax: '{{value}}超过了允许的最大{{label}}，该最大值为{{max}}。',
    invalidInput: '这个字段有一个无效的输入。',
    invalidSelection: '这个字段有一个无效的选择。',
    invalidSelections: '这个字段有以下无效的选择：',
    lessThanMin: '{{value}}小于允许的最小{{label}}，该最小值为{{min}}。',
    longerThanMin: '该值必须大于{{minLength}}字符的最小长度',
    notValidDate: '"{{value}}"不是一个有效的日期。',
    required: '该字段为必填项目。',
    requiresAtLeast: '该字段至少需要{{count}} {{label}}。',
    requiresNoMoreThan: '该字段要求不超过{{count}} {{label}。',
    requiresTwoNumbers: '该字段需要两个数字。',
    shorterThanMax: '该值必须小于{{maxLength}}字符的最大长度',
    trueOrFalse: '该字段只能等于真或伪。',
    validUploadID: '该字段不是有效的上传ID。',
  },
  version: {
    autosavedSuccessfully: '自动保存成功。',
    draft: '草稿',
    draftSavedSuccessfully: '草稿成功保存。',
    published: '已发布',
    restoredSuccessfully: '恢复成功。',
    status: '状态',
  },
}
