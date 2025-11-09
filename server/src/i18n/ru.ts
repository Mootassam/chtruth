/**
 * I18n dictionary for the ru.
 */

const ru = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Извините, мы не узнаем ваши учетные данные`,
    wrongPassword: `Извините, мы не узнаем ваши учетные данные`,
    depositExist: 'Методы депозита уже инициализированы',
    weakPassword: 'Этот пароль слишком слабый',
    emailAlreadyInUse: 'Имя пользователя уже используется',
    invitationCode: 'Пожалуйста, введите правильный код приглашения',
    invalidEmail: 'Пожалуйста, укажите действительный email',
    passwordReset: {
      invalidToken:
        'Ссылка для сброса пароля недействительна или истекла',
      error: `Email не распознан`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Ссылка для подтверждения email недействительна или истекла.',
      error: `Email не распознан.`,
      signedInAsWrongUser: `Это подтверждение email было отправлено на {0}, но вы вошли как {1}.`,
    },
    passwordChange: {
      invalidPassword: 'Старый пароль недействителен',
    },
  },

  futures: {
    alreadyFinalized: 'Эта позиция фьючерсов уже завершена и не может быть изменена.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Пользователь с таким email уже существует.',
      userNotFound: 'Пользователь не найден.',
      destroyingHimself: `Вы не можете удалить себя.`,
      revokingOwnPermission: `Вы не можете отозвать свои права администратора.`,
      revokingPlanUser: `Вы не можете отозвать права администратора у менеджера плана.`,
      destroyingPlanUser: `Вы не можете удалить менеджера плана.`,
    },
  },

  tenant: {
    exists:
      'В этом приложении уже есть рабочее пространство.',
    url: {
      exists: 'Этот URL рабочего пространства уже используется.',
    },
    invitation: {
      notSameEmail: `Это приглашение было отправлено на {0}, но вы вошли как {1}.`,
    },
    planActive: `Для этого рабочего пространства действует план. Пожалуйста, сначала отмените план.`,
    stripeNotConfigured: 'Stripe не настроен.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Файл пуст',
      invalidFileExcel:
        'Разрешены только файлы Excel (.xlsx)',
      invalidFileUpload:
        'Неверный файл. Убедитесь, что используете последнюю версию шаблона.',
      importHashRequired: 'Требуется хэш импорта',
      importHashExistent: 'Данные уже были импортированы',
    },
  },

  errors: {
    futuresAlreadyFinalized: "Эта позиция фьючерсов уже завершена и не может быть изменена.",
    usdtWalletNotFound: "Кошелек USDT не найден",
    usdtWalletNotFoundForUser: "Кошелек USDT не найден для пользователя {{userId}}",
    closingPriceExceedLimit: "Цена закрытия не может превышать $100",
    profitAmountInvalid: "Сумма прибыли равна нулю или недействительна.",
    lossAmountInvalid: "Сумма убытка равна нулю или недействительна.",
    passwordNotMatching: "Пароль не совпадает",
    insufficientBalanceUpgrade: "Недостаточно средств. Пожалуйста, обновите.",
    walletNotFoundForCurrency: "Кошелек не найден для {{currency}}",
    insufficientBalanceWithAmounts: "Недостаточно средств. У вас есть {{currentAmount}} {{currency}}, но вы пытаетесь сделать стейкинг {{tryingAmount}} {{currency}}",
    stakingPlanNotAvailable: "Этот план стейкинга еще не доступен",
    stakingPlanExpired: "Срок действия этого плана стейкинга истек",
    invalidUserBalance: "Недействительный баланс для текущего пользователя",
    invalidRequestAmount: "Недействительная сумма запроса",
    unsupportedCurrency: "Валюта не поддерживается",
    alreadySubscribedToVip: "Вы уже подписаны на этот vip",
    insufficientBalancePleaseUpgrade: "Недостаточно средств, пожалуйста, обновите",
    resetAccountContactSupport: "Пожалуйста, сбросьте свой аккаунт. свяжитесь со службой поддержки",
    contactCustomerService: "Следует связаться со службой поддержки по этому вопросу",
    pleaseWriteAmount: "Пожалуйста, напишите сумму",
    withdrawalExceedsBalance: "Похоже, сумма вывода превышает ваш баланс",
    withdrawPasswordIncorrect: "Ваш пароль вывода неверен, пожалуйста, проверьте еще раз",
    notFound: {
      message: 'Не найдено',
    },
    forbidden: {
      message: 'Запрещено',
    },
    validation: {
      message: 'Произошла ошибка',
    },
  },

  email: {
    error: `Провайдер email не настроен.`,
  },

  preview: {
    error:
      'Извините, эта операция не разрешена в режиме предварительного просмотра.',
  },

};

export default ru;