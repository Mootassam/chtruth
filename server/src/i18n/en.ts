/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Nexus Exchanage'
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    depositExist: 'Deposit methods already initialized',
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Username is already in use',
    invitationCode: 'please write a correct invitationCode',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  futures: {
    alreadyFinalized: 'This futures entry is already finalized and cannot be changed.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    futuresAlreadyFinalized: "This futures entry is already finalized and cannot be changed.",
    usdtWalletNotFound: "USDT wallet not found",
    usdtWalletNotFoundForUser: "USDT wallet not found for user {{userId}}",
    closingPriceExceedLimit: "Closing price cannot exceed $100",
    profitAmountInvalid: "Profit amount is zero or invalid.",
    lossAmountInvalid: "Loss amount is zero or invalid.",
    passwordNotMatching: "Password not matching",
    insufficientBalanceUpgrade: "Insufficient balance. Please upgrade.",
    walletNotFoundForCurrency: "Wallet not found for {{currency}}",
    insufficientBalanceWithAmounts: "Insufficient balance. You have {{currentAmount}} {{currency}} but trying to stake {{tryingAmount}} {{currency}}",
    stakingPlanNotAvailable: "This staking plan is not yet available",
    stakingPlanExpired: "This staking plan has expired",
    invalidUserBalance: "Invalid balance for the current user",
    invalidRequestAmount: "Invalid request amount",
    unsupportedCurrency: "Unsupported currency",
    alreadySubscribedToVip: "You are already subscribed to this vip",
    insufficientBalancePleaseUpgrade: "Insufficient balance please upgrade",
    resetAccountContactSupport: "Please reset your account. contact customer support",
    contactCustomerService: "Should be contact the customer service about this",
    pleaseWriteAmount: "Please write amount",
    withdrawalExceedsBalance: "It looks like your withdrawal amount exceeds your balance",
    withdrawPasswordIncorrect: "Your withdraw Password is not correct please check again",
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

};

export default en;
