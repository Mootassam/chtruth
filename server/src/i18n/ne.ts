/**
 * I18n dictionary for the ne.
 */

const ne = {
  app: {
    title: 'नेक्सस एक्सचेंज'
  },

  auth: {
    userNotFound: `माफ गर्नुहोस्, हामी तपाईंको क्रेडेन्शियलहरू चिन्न सक्दैनौं`,
    wrongPassword: `माफ गर्नुहोस्, हामी तपाईंको क्रेडेन्शियलहरू चिन्न सक्दैनौं`,
    depositExist: 'डिपोजिट विधिहरू पहिले नै सुरु गरिएको छ',
    weakPassword: 'यो पासवर्ड धेरै कमजोर छ',
    emailAlreadyInUse: 'यो यूजरनेम पहिले नै प्रयोगमा छ',
    invitationCode: 'कृपया सहि आमन्त्रण कोड लेख्नुहोस्',
    invalidEmail: 'कृपया वैध इमेल प्रदान गर्नुहोस्',
    passwordReset: {
      invalidToken:
        'पासवर्ड रिसेट लिङ्क अवैध वा म्याद सकिएको छ',
      error: `इमेल चिन्न सकिएन`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'इमेल सत्यापन लिङ्क अवैध वा म्याद सकिएको छ।',
      error: `इमेल चिन्न सकिएन।`,
      signedInAsWrongUser: `यो इमेल पुष्टिकरण {0} मा पठाइएको थियो तर तपाईंले {1} को रूपमा लगइन गर्नुभएको छ।`,
    },
    passwordChange: {
      invalidPassword: 'पुरानो पासवर्ड अवैध छ',
    },
  },

  futures: {
    alreadyFinalized: 'यो फ्युचर्स प्रविष्टि पहिले नै अन्तिम गरिएको छ र परिवर्तन गर्न सकिदैन।'
  },

  user: {
    errors: {
      userAlreadyExists:
        'यस इमेलसँग पहिले नै प्रयोगकर्ता अवस्थित छ।',
      userNotFound: 'प्रयोगकर्ता भेटिएन।',
      destroyingHimself: `तपाईं आफैलाई मेटाउन सक्नुहुन्न।`,
      revokingOwnPermission: `तपाईं आफ्नो आफ्नै प्रशासकीय अनुमतिहरू रद्द गर्न सक्नुहुन्न।`,
      revokingPlanUser: `तपाईं योजना प्रबन्धकको प्रशासकीय अनुमतिहरू रद्द गर्न सक्नुहुन्न।`,
      destroyingPlanUser: `तपाईं योजना प्रबन्धकलाई मेटाउन सक्नुहुन्न।`,
    },
  },

  tenant: {
    exists:
      'यस अनुप्रयोगमा पहिले नै कार्यक्षेत्र अवस्थित छ।',
    url: {
      exists: 'यो कार्यक्षेत्र URL पहिले नै प्रयोगमा छ।',
    },
    invitation: {
      notSameEmail: `यो आमन्त्रण {0} मा पठाइएको थियो तर तपाईंले {1} को रूपमा लगइन गर्नुभएको छ।`,
    },
    planActive: `यस कार्यक्षेत्रको लागि सक्रिय योजना छ। कृपया पहिले योजना रद्द गर्नुहोस्।`,
    stripeNotConfigured: 'स्ट्राइप कन्फिगर गरिएको छैन।',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'फाइल खाली छ',
      invalidFileExcel:
        'एक्सेल फाइलहरू मात्र अनुमति छ (.xlsx)',
      invalidFileUpload:
        'अवैध फाइल। निश्चित गर्नुहोस् कि तपाईं टेम्पलेटको नवीनतम संस्करण प्रयोग गर्दै हुनुहुन्छ।',
      importHashRequired: 'आयात ह्याश आवश्यक छ',
      importHashExistent: 'डाटा पहिले नै आयात गरिएको छ',
    },
  },

  errors: {
    futuresAlreadyFinalized: "यो फ्युचर्स प्रविष्टि पहिले नै अन्तिम गरिएको छ र परिवर्तन गर्न सकिदैन।",
    usdtWalletNotFound: "USDT वालेट भेटिएन",
    usdtWalletNotFoundForUser: "प्रयोगकर्ता {{userId}} को लागि USDT वालेट भेटिएन",
    closingPriceExceedLimit: "बन्द मूल्य $100 भन्दा बढी हुन सक्दैन",
    profitAmountInvalid: "नाफाको रकम शून्य वा अवैध छ।",
    lossAmountInvalid: "नोक्सानको रकम शून्य वा अवैध छ।",
    passwordNotMatching: "पासवर्ड मेल खाँदैन",
    insufficientBalanceUpgrade: "पर्याप्त ब्यालेन्स छैन। कृपया अपग्रेड गर्नुहोस्।",
    walletNotFoundForCurrency: "{{currency}} को लागि वालेट भेटिएन",
    insufficientBalanceWithAmounts: "पर्याप्त ब्यालेन्स छैन। तपाईंसँग {{currentAmount}} {{currency}} छ तर तपाईंले {{tryingAmount}} {{currency}} स्टेक गर्न प्रयास गर्दै हुनुहुन्छ",
    stakingPlanNotAvailable: "यो स्टेकिंग योजना अहिले सम्म उपलब्ध छैन",
    stakingPlanExpired: "यो स्टेकिंग योजना को म्याद सकिएको छ",
    invalidUserBalance: "वर्तमान प्रयोगकर्ताको लागि अवैध ब्यालेन्स",
    invalidRequestAmount: "अनुरोध रकम अवैध छ",
    unsupportedCurrency: "असमर्थित मुद्रा",
    alreadySubscribedToVip: "तपाईं पहिले नै यो VIP मा सदस्यता लिनुभएको छ",
    insufficientBalancePleaseUpgrade: "पर्याप्त ब्यालेन्स छैन कृपया अपग्रेड गर्नुहोस्",
    resetAccountContactSupport: "कृपया तपाईंको खाता रिसेट गर्नुहोस्। ग्राहक सेवासँग सम्पर्क गर्नुहोस्",
    contactCustomerService: "तपाईंले यसबारे ग्राहक सेवासँग सम्पर्क गर्नुपर्छ",
    pleaseWriteAmount: "कृपया रकम लेख्नुहोस्",
    withdrawalExceedsBalance: "यस्तो लाग्छ कि तपाईंको निकासी रकम तपाईंको ब्यालेन्स भन्दा बढी छ",
    withdrawPasswordIncorrect: "तपाईंको निकासी पासवर्ड सही छैन, कृपया फेरि जाँच गर्नुहोस्",
    notFound: {
      message: 'भेटिएन',
    },
    forbidden: {
      message: 'निषेधित',
    },
    validation: {
      message: 'एउटा त्रुटि भयो',
    },
  },

  email: {
    error: `इमेल प्रदायक कन्फिगर गरिएको छैन।`,
  },

  preview: {
    error:
      'माफ गर्नुहोस्, यो अपरेशन पूर्वावलोकन मोडमा अनुमति छैन।',
  },

};

export default ne;