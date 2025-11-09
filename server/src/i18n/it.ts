
const it = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Spiacenti, non riconosciamo le tue credenziali`,
    wrongPassword: `Spiacenti, non riconosciamo le tue credenziali`,
    depositExist: 'I metodi di deposito sono già inizializzati',
    weakPassword: 'Questa password è troppo debole',
    emailAlreadyInUse: 'Nome utente già in uso',
    invitationCode: 'Si prega di scrivere un codice invito corretto',
    invalidEmail: 'Si prega di fornire un email valido',
    passwordReset: {
      invalidToken:
        'Il link di reimpostazione password non è valido o è scaduto',
      error: `Email non riconosciuta`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Il link di verifica email non è valido o è scaduto.',
      error: `Email non riconosciuta.`,
      signedInAsWrongUser: `Questa conferma email è stata inviata a {0} ma hai effettuato l'accesso come {1}.`,
    },
    passwordChange: {
      invalidPassword: 'La vecchia password non è valida',
    },
  },

  futures: {
    alreadyFinalized: 'Questa posizione futures è già finalizzata e non può essere modificata.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Utente con questa email già esistente.',
      userNotFound: 'Utente non trovato.',
      destroyingHimself: `Non puoi eliminare te stesso.`,
      revokingOwnPermission: `Non puoi revocare i tuoi permessi di amministratore.`,
      revokingPlanUser: `Non puoi revocare i permessi di amministratore del gestore piano.`,
      destroyingPlanUser: `Non puoi eliminare il gestore piano.`,
    },
  },

  tenant: {
    exists:
      'Esiste già un workspace su questa applicazione.',
    url: {
      exists: 'Questo URL workspace è già in uso.',
    },
    invitation: {
      notSameEmail: `Questo invito è stato inviato a {0} ma hai effettuato l'accesso come {1}.`,
    },
    planActive: `C\'è un piano attivo per questo workspace. Si prega di cancellare prima il piano.`,
    stripeNotConfigured: 'Stripe non è configurato.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Il file è vuoto',
      invalidFileExcel:
        'Sono consentiti solo file Excel (.xlsx)',
      invalidFileUpload:
        'File non valido. Assicurati di utilizzare l\'ultima versione del template.',
      importHashRequired: 'Hash di importazione richiesto',
      importHashExistent: 'Dati già importati',
    },
  },

  errors: {
    futuresAlreadyFinalized: "Questa posizione futures è già finalizzata e non può essere modificata.",
    usdtWalletNotFound: "Portafoglio USDT non trovato",
    usdtWalletNotFoundForUser: "Portafoglio USDT non trovato per l'utente {{userId}}",
    closingPriceExceedLimit: "Il prezzo di chiusura non può superare $100",
    profitAmountInvalid: "L'importo del profitto è zero o non valido.",
    lossAmountInvalid: "L'importo della perdita è zero o non valido.",
    passwordNotMatching: "La password non corrisponde",
    insufficientBalanceUpgrade: "Saldo insufficiente. Si prega di effettuare l'upgrade.",
    walletNotFoundForCurrency: "Portafoglio non trovato per {{currency}}",
    insufficientBalanceWithAmounts: "Saldo insufficiente. Hai {{currentAmount}} {{currency}} ma stai tentando di stake {{tryingAmount}} {{currency}}",
    stakingPlanNotAvailable: "Questo piano di staking non è ancora disponibile",
    stakingPlanExpired: "Questo piano di staking è scaduto",
    invalidUserBalance: "Saldo non valido per l'utente corrente",
    invalidRequestAmount: "Importo richiesta non valido",
    unsupportedCurrency: "Valuta non supportata",
    alreadySubscribedToVip: "Sei già iscritto a questo vip",
    insufficientBalancePleaseUpgrade: "Saldo insufficiente si prega di effettuare l'upgrade",
    resetAccountContactSupport: "Si prega di reimpostare il proprio account. contattare l'assistenza clienti",
    contactCustomerService: "Si dovrebbe contattare il servizio clienti per questo",
    pleaseWriteAmount: "Si prega di scrivere l'importo",
    withdrawalExceedsBalance: "Sembra che l'importo del prelievo superi il tuo saldo",
    withdrawPasswordIncorrect: "La tua password di prelievo non è corretta, si prega di controllare nuovamente",
    notFound: {
      message: 'Non trovato',
    },
    forbidden: {
      message: 'Vietato',
    },
    validation: {
      message: 'Si è verificato un errore',
    },
  },

  email: {
    error: `Il provider email non è configurato.`,
  },

  preview: {
    error:
      'Spiacenti, questa operazione non è consentita in modalità anteprima.',
  },

};

export default it;
