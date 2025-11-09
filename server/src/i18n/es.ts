/**
 * I18n dictionary for the es.
 */

const es = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Lo sentimos, no reconocemos tus credenciales`,
    wrongPassword: `Lo sentimos, no reconocemos tus credenciales`,
    depositExist: 'Los métodos de depósito ya están inicializados',
    weakPassword: 'Esta contraseña es demasiado débil',
    emailAlreadyInUse: 'El nombre de usuario ya está en uso',
    invitationCode: 'Por favor escribe un código de invitación correcto',
    invalidEmail: 'Por favor proporciona un email válido',
    passwordReset: {
      invalidToken:
        'El enlace de restablecimiento de contraseña no es válido o ha expirado',
      error: `Email no reconocido`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'El enlace de verificación de email no es válido o ha expirado.',
      error: `Email no reconocido.`,
      signedInAsWrongUser: `Esta confirmación de email fue enviada a {0} pero has iniciado sesión como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'La contraseña anterior no es válida',
    },
  },

  futures: {
    alreadyFinalized: 'Esta entrada de futuros ya está finalizada y no se puede cambiar.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Ya existe un usuario con este email.',
      userNotFound: 'Usuario no encontrado.',
      destroyingHimself: `No puedes eliminarte a ti mismo.`,
      revokingOwnPermission: `No puedes revocar tus propios permisos de administrador.`,
      revokingPlanUser: `No puedes revocar los permisos de administrador del gestor del plan.`,
      destroyingPlanUser: `No puedes eliminar al gestor del plan.`,
    },
  },

  tenant: {
    exists:
      'Ya existe un espacio de trabajo en esta aplicación.',
    url: {
      exists: 'Esta URL de espacio de trabajo ya está en uso.',
    },
    invitation: {
      notSameEmail: `Esta invitación fue enviada a {0} pero has iniciado sesión como {1}.`,
    },
    planActive: `Hay un plan activo para este espacio de trabajo. Por favor cancela el plan primero.`,
    stripeNotConfigured: 'Stripe no está configurado.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'El archivo está vacío',
      invalidFileExcel:
        'Solo se permiten archivos de Excel (.xlsx)',
      invalidFileUpload:
        'Archivo no válido. Asegúrate de estar usando la última versión de la plantilla.',
      importHashRequired: 'Se requiere hash de importación',
      importHashExistent: 'Los datos ya han sido importados',
    },
  },

  errors: {
    futuresAlreadyFinalized: "Esta entrada de futuros ya está finalizada y no se puede cambiar.",
    usdtWalletNotFound: "Billetera USDT no encontrada",
    usdtWalletNotFoundForUser: "Billetera USDT no encontrada para el usuario {{userId}}",
    closingPriceExceedLimit: "El precio de cierre no puede exceder $100",
    profitAmountInvalid: "El monto de ganancia es cero o no válido.",
    lossAmountInvalid: "El monto de pérdida es cero o no válido.",
    passwordNotMatching: "La contraseña no coincide",
    insufficientBalanceUpgrade: "Saldo insuficiente. Por favor actualiza.",
    walletNotFoundForCurrency: "Billetera no encontrada para {{currency}}",
    insufficientBalanceWithAmounts: "Saldo insuficiente. Tienes {{currentAmount}} {{currency}} pero intentas hacer stake de {{tryingAmount}} {{currency}}",
    stakingPlanNotAvailable: "Este plan de staking aún no está disponible",
    stakingPlanExpired: "Este plan de staking ha expirado",
    invalidUserBalance: "Saldo no válido para el usuario actual",
    invalidRequestAmount: "Monto de solicitud no válido",
    unsupportedCurrency: "Moneda no compatible",
    alreadySubscribedToVip: "Ya estás suscrito a este vip",
    insufficientBalancePleaseUpgrade: "Saldo insuficiente por favor actualiza",
    resetAccountContactSupport: "Por favor restablece tu cuenta. contacta al servicio al cliente",
    contactCustomerService: "Deberías contactar al servicio al cliente sobre esto",
    pleaseWriteAmount: "Por favor escribe el monto",
    withdrawalExceedsBalance: "Parece que tu monto de retiro excede tu saldo",
    withdrawPasswordIncorrect: "Tu contraseña de retiro no es correcta, por favor verifica nuevamente",
    notFound: {
      message: 'No encontrado',
    },
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
  },

  email: {
    error: `El proveedor de email no está configurado.`,
  },

  preview: {
    error:
      'Lo sentimos, esta operación no está permitida en modo de vista previa.',
  },

};

export default es;