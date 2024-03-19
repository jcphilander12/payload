export default {
  authentication: {
    account: 'Fiók',
    apiKey: 'API-kulcs',
    enableAPIKey: 'API-kulcs engedélyezése',
    newAccountCreated:
      'Létrehoztunk egy új fiókot, amellyel hozzáférhet a következőhöz <a href="{{serverURL}}"> {{serverURL}} </a> Kérjük, kattintson a következő linkre, vagy illessze be az alábbi URL-t a böngészőbe az e-mail-cím ellenőrzéséhez : <a href="{{verificationURL}}"> {{verificationURL}} </a> <br> Az e-mail-cím ellenőrzése után sikeresen be tud majd jelentkezni.',
    resetYourPassword: 'Jelszó visszaállítása',
    verified: 'Megerősítve',
    verifyYourEmail: 'Erősítse meg az e-mail címét',
    youAreReceivingResetPassword:
      'Ezt azért kapja, mert Ön (vagy valaki más) kérte fiókja jelszavának visszaállítását. A folyamat befejezéséhez kattintson a következő linkre, vagy illessze be böngészőjébe:',
    youDidNotRequestPassword:
      'Ha nem Ön kérte ezt, kérjük, hagyja figyelmen kívül ezt az e-mailt, és jelszava változatlan marad.',
  },
  error: {
    deletingFile: 'Hiba történt a fájl törlésekor.',
    emailOrPasswordIncorrect: 'A megadott e-mail-cím vagy jelszó helytelen.',
    followingFieldsInvalid_one: 'A következő mező érvénytelen:',
    followingFieldsInvalid_other: 'A következő mezők érvénytelenek:',
    noFilesUploaded: 'Nem került fájl feltöltésre.',
    notAllowedToPerformAction: 'Ezt a műveletet nem hajthatja végre.',
    problemUploadingFile: 'Hiba történt a fájl feltöltése közben.',
    unableToDeleteCount: 'Nem sikerült törölni {{count}}/{{total}} {{label}}.',
    unableToUpdateCount: 'Nem sikerült frissíteni {{count}}/{{total}} {{label}}.',
    unauthorized: 'Jogosulatlan, a kéréshez be kell jelentkeznie.',
    userLocked: 'Ez a felhasználó túl sok sikertelen bejelentkezési kísérlet miatt zárolva van.',
    valueMustBeUnique: 'Az értéknek egyedinek kell lennie',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Válasszon egy egyéni szöveges URL-cím megadása vagy egy másik dokumentumra való hivatkozás között.',
    chooseDocumentToLink: 'Válassza ki a dokumentumot, amelyre hivatkozni kíván',
    customURL: 'Egyéni URL',
    enterURL: 'Adjon meg egy URL-t',
    internalLink: 'Belső link',
    linkType: 'Link típusa',
    openInNewTab: 'Megnyitás új lapon',
    textToDisplay: 'Megjelenítendő szöveg',
  },
  general: {
    copy: 'Másolás',
    createdAt: 'Létrehozva:',
    deletedCountSuccessfully: '{{count}} {{label}} sikeresen törölve.',
    deletedSuccessfully: 'Sikeresen törölve.',
    email: 'E-mail',
    notFound: 'Nem található',
    row: 'Sor',
    rows: 'Sorok',
    successfullyCreated: '{{label}} sikeresen létrehozva.',
    successfullyDuplicated: '{{label}} sikeresen duplikálódott.',
    thisLanguage: 'Magyar',
    updatedAt: 'Frissítve:',
    updatedCountSuccessfully: '{{count}} {{label}} sikeresen frissítve.',
    updatedSuccessfully: 'Sikeresen frissítve.',
    user: 'Felhasználó',
    users: 'Felhasználók',
    value: 'Érték',
  },
  upload: {
    fileName: 'Fájlnév',
    fileSize: 'Fájl mérete',
    height: 'Magasság',
    sizes: 'Méretek',
    width: 'Szélesség',
  },
  validation: {
    emailAddress: 'Kérjük, adjon meg egy érvényes e-mail címet.',
    enterNumber: 'Kérjük, adjon meg egy érvényes számot.',
    greaterThanMax: '{{value}} nagyobb, mint a megengedett maximum {{label}} érték, ami {{max}}.',
    invalidInput: 'Ez a mező érvénytelen értéket tartalmaz.',
    invalidSelection: 'Ez a mező érvénytelen kijelöléssel rendelkezik.',
    invalidSelections: 'Ez a mező a következő érvénytelen kijelöléseket tartalmazza:',
    lessThanMin: '{{value}} kisebb, mint a megengedett minimum {{label}} érték, ami {{min}}.',
    longerThanMin:
      'Ennek az értéknek hosszabbnak kell lennie, mint a minimális {{minLength}} karakter hosszúság.',
    notValidDate: '" {{value}} " nem érvényes dátum.',
    required: 'Ez a mező kötelező.',
    requiresAtLeast: 'Ehhez a mezőhöz legalább {{count}} {{label}} szükséges.',
    requiresNoMoreThan: 'Ehhez a mezőhöz legfeljebb {{count}} {{label}} szükséges.',
    requiresTwoNumbers: 'Ehhez a mezőhöz két szám szükséges.',
    shorterThanMax:
      'Ennek az értéknek rövidebbnek kell lennie, mint a maximálisan megengedett {{maxLength}} karakter.',
    trueOrFalse: 'Ez a mező csak igaz vagy hamis lehet.',
    validUploadID: 'Ez a mező nem érvényes feltöltési azonosító.',
  },
  version: {
    autosavedSuccessfully: 'Automatikus mentés sikeres.',
    draft: 'Piszkozat',
    draftSavedSuccessfully: 'A piszkozat sikeresen mentve.',
    published: 'Közzétett',
    restoredSuccessfully: 'Sikeresen visszaállítva.',
    status: 'Állapot',
  },
}
