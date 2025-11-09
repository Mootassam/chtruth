const In = {
  common: {
    or: "या",
    cancel: "रद्द करें",
    reset: "रीसेट करें",
    save: "सहेजें",
    search: "खोजें",
    edit: "संपादित करें",
    new: "नया",
    export: "एक्सेल में निर्यात करें",
    noDataToExport: "निर्यात करने के लिए कोई डेटा नहीं",
    import: "आयात करें",
    discard: "खारिज करें",
    yes: "हाँ",
    no: "नहीं",
    pause: "रोकें",
    areYouSure: "क्या आप सुनिश्चित हैं?",
    view: "देखें",
    destroy: "हटाएं",
    mustSelectARow: "एक पंक्ति चुननी होगी",
    start: "शुरू",
    end: "समाप्त",
    select: "चुनें",
    continue: "जारी रखें",
    filters: "फ़िल्टर",
    gallery: "गैलरी छवियां",
    hightlight: "हाइलाइट",
    attributes: "विशेषताएं",
    attributeoptions: "विशेषता विकल्प",
    administration: "प्रशासन",
    community: "समुदाय",
    news: "समाचार",
    membership: "सदस्यता",
    accounting: "लेखांकन",
    selectbank: "बैंक चुनें",
    selectsize: "आकार चुनें",
    writeamount: "राशि लिखें",
    tools: "उपकरण",
    brushsize: "ब्रश का आकार",
    configurations: "कॉन्फ़िगरेशन",
    logout: "लॉग आउट",
  },

  app: {
    title: "नेक्सस एक्सचेंज",
  },

  api: {
    menu: "एपीआई",
  },

  stake: {
    enterAmount: "एक राशि दर्ज करें",
    insufficientBalance: "अपर्याप्त बैलेंस",
    minAmount: "न्यूनतम: {{min}}",
    maxAmount: "अधिकतम: {{max}}",
    confirmStake: "स्टेक की पुष्टि करें"
  },

  pages: {
    futures: {
      title: "फ्यूचर्स",
      actions: {
        buyUp: "खरीदें (ऊपर)",
        buyDown: "खरीदें (नीचे)"
      },
      tabs: {
        openOrders: "खुले ऑर्डर",
        recentOrders: "हाल के ऑर्डर"
      },
      orderDetails: {
        title: "ऑर्डर विवरण",
        open: "खुला",
        closed: "बंद",
        completed: "पूर्ण",
        futuresAmount: "फ्यूचर्स राशि:",
        contractDuration: "अनुबंध अवधि:",
        seconds: "सेकंड",
        futuresStatus: "फ्यूचर्स स्थिति:",
        openPositionPrice: "ओपन पोजीशन मूल्य:",
        openPositionTime: "ओपन पोजीशन समय:",
        closePositionPrice: "क्लोज पोजीशन मूल्य:",
        closePositionTime: "क्लोज पोजीशन समय:",
        profitLossAmount: "लाभ और हानि राशि:",
        leverage: "लिवरेज:",
        done: "पूर्ण"
      },
      status: {
        open: "खुला",
        closed: "बंद",
        completed: "पूर्ण"
      },
      list: {
        noOrders: "कोई ऑर्डर नहीं"
      }
    },
    proof: {
      title: "पहचान सत्यापन",
      instructions: "नेक्सस एक्सचेंज की सभी सुविधाओं तक पहुंचने के लिए अपनी पहचान सत्यापित करें",
      sections: {
        documentInfo: "दस्तावेज़ जानकारी",
        documentUpload: "दस्तावेज़ अपलोड"
      },
      fields: {
        documentType: "दस्तावेज़ प्रकार",
        fullName: "पूरा नाम",
        documentNumber: "दस्तावेज़ नंबर",
        address: "पता",
        frontSide: "दस्तावेज़ का सामने का हिस्सा",
        backSide: "दस्तावेज़ का पिछला हिस्सा",
        selfie: "दस्तावेज़ के साथ सेल्फी"
      },
      placeholders: {
        fullName: "अपना पूरा नाम दर्ज करें",
        documentNumber: "अपना दस्तावेज़ नंबर दर्ज करें",
        address: "अपना पूरा पता दर्ज करें"
      },
      uploadTexts: {
        frontSide: "अपने दस्तावेज़ का सामने का हिस्सा अपलोड करें",
        backSide: "अपने दस्तावेज़ का पिछला हिस्सा अपलोड करें",
        selfie: "अपने दस्तावेज़ को पकड़े हुए एक सेल्फी अपलोड करें"
      },
      documentTypes: {
        passport: "पासपोर्ट",
        idCard: "आईडी कार्ड",
        driversLicense: "ड्राइवर लाइसेंस"
      },
      security: {
        title: "सुरक्षा सूचना",
        text: "आपकी जानकारी एन्क्रिप्टेड और सुरक्षित है। आपकी सुरक्षा के लिए हम बैंक-स्तरीय सुरक्षा का उपयोग करते हैं और प्रत्येक दस्तावेज़ को मैन्युअल रूप से सत्यापित करते हैं।"
      },
      buttons: {
        validateDocuments: "दस्तावेज़ सत्यापित करें"
      },
      footer: {
        copyright: "© 2025 क्रिप्टोवॉलेट। सर्वाधिकार सुरक्षित।",
        privacyPolicy: "गोपनीयता नीति"
      }
    },

    withdrawPassword: {
      title: "निकासी पासवर्ड",
      cardTitle: "निकासी पासवर्ड बदलें",
      fields: {
        currentPassword: "वर्तमान पासवर्ड",
        newPassword: "नया पासवर्ड"
      },
      placeholders: {
        currentPassword: "अपना पुराना पासवर्ड दर्ज करें",
        newPassword: "अपना नया पासवर्ड पुष्टि करें"
      },
      buttons: {
        saveChanges: "परिवर्तन सहेजें"
      },
      warningMessage: "आपके फंड की सुरक्षा के लिए, लॉगिन पासवर्ड बदलने के 24 घंटे के भीतर निकासी की अनुमति नहीं है।"
    },

    loginPassword: {
      title: "लॉगिन पासवर्ड",
      cardTitle: "लॉगिन पासवर्ड बदलें",
      fields: {
        oldPassword: "पुराना पासवर्ड",
        newPassword: "नया पासवर्ड",
        newPasswordConfirmation: "पासवर्ड पुष्टि करें"
      },
      placeholders: {
        oldPassword: "अपना वर्तमान पासवर्ड दर्ज करें",
        newPassword: "एक नया पासवर्ड बनाएं",
        confirmPassword: "अपना नया पासवर्ड पुष्टि करें"
      },
      buttons: {
        saveChanges: "परिवर्तन सहेजें"
      },
      warningMessage: "आपके फंड की सुरक्षा के लिए, लॉगिन पासवर्ड बदलने के 24 घंटे के भीतर निकासी की अनुमति नहीं है।",
      validation: {
        mustMatch: "पासवर्ड मेल खाने चाहिए"
      }
    },

    passwordType: {
      title: "पासवर्ड प्रकार",
      cardTitle: "पासवर्ड प्रकार चुनें",
      options: {
        login: {
          title: "लॉगिन पासवर्ड",
          description: "अपना अकाउंट लॉगिन पासवर्ड बदलें"
        },
        withdrawal: {
          title: "निकासी पासवर्ड",
          description: "अपना क्रिप्टो निकासी पासवर्ड बदलें"
        }
      }
    },

    withdrawAddressForm: {
      title: "निकासी पता",
      currencyType: "मुद्रा प्रकार",
      withdrawalAddress: "निकासी पता",
      currencies: {
        btc: "BTC (बिटकॉइन)",
        eth: "ETH (एथेरियम)",
        usdt: "USDT (टेदर)",
        sol: "SOL (सोलाना)",
        xrp: "XRP (रिपल)"
      },
      fields: {
        address: "पता",
        password: "क्रिप्टो निकासी पासवर्ड"
      },
      placeholders: {
        address: "अपना वॉलेट पता दर्ज करें",
        password: "अपना वर्तमान पासवर्ड दर्ज करें"
      },
      buttons: {
        save: "सहेजें"
      },
      notification: {
        success: "पता सफलतापूर्वक सहेजा गया!"
      }
    },

    withdrawAddress: {
      title: "निकासी पता",
      cardTitle: "मुद्रा प्रकार",
      currencies: {
        btc: "BTC (बिटकॉइन)",
        eth: "ETH (एथेरियम)",
        usdt: "USDT (टेदर)",
        sol: "SOL (सोलाना)",
        xrp: "XRP (रिपल)"
      }
    },

    privacy: {
      title: "गोपनीयता पोर्टल",
      hero: {
        title: "नेक्सस गोपनीयता पोर्टल",
        subtitle: "सख्त दिशानिर्देशों, कानूनी अनुपालन और उद्योग की सर्वोत्तम प्रथाओं के साथ आपके डेटा और गोपनीयता की सुरक्षा।"
      },
      principles: {
        title: "हमारे गोपनीयता सिद्धांत",
        corePrinciples: "मुख्य सिद्धांत",
        transparency: {
          title: "पारदर्शिता",
          description: "हम आपके डेटा को कैसे संभालते हैं, इसके बारे में नियमित अपडेट और स्पष्ट जानकारी।"
        },
        accountability: {
          title: "जवाबदेही और अनुपालन",
          description: "नियमित ऑडिट, प्रमाणपत्र और वैश्विक गोपनीयता कानूनों का पालन।"
        },
        dataSecurity: {
          title: "डेटा सुरक्षा",
          description: "उन्नत एन्क्रिप्शन, सख्त एक्सेस नियंत्रण और पहचान सत्यापन प्रोटोकॉल।"
        },
        dataMinimization: {
          title: "डेटा न्यूनीकरण और उद्देश्य सीमा",
          description: "हम केवल विशिष्ट, वैध उद्देश्यों के लिए आवश्यक डेटा एकत्र करते हैं।"
        },
        privacyByDesign: {
          title: "डिजाइन द्वारा गोपनीयता",
          description: "गोपनीयता हमारे सभी उत्पादों और सेवाओं में शुरू से ही निर्मित है।"
        }
      },
      userRights: {
        title: "आपके गोपनीयता अधिकार",
        content: "हमारे ऐप या वेबफॉर्म के माध्यम से अपने डेटा तक पहुंचने और प्रबंधित करने के लिए आपके पास उपकरण हैं, हमारी गोपनीयता नोटिस में विस्तृत जानकारी उपलब्ध है।",
        note: "किसी भी समय अपनी व्यक्तिगत जानकारी तक पहुंचने, सही करने या हटाने के अपने अधिकारों का प्रयोग करें।"
      },
      personalData: {
        title: "व्यक्तिगत डेटा क्या है?",
        definition: "व्यक्तिगत डेटा किसी भी ऐसी जानकारी को संदर्भित करता है जो किसी व्यक्ति की पहचान करती है।",
        examples: "उदाहरणों में शामिल हैं: नाम, नेक्सस आईडी, ईमेल पता, स्थान डेटा, लेनदेन इतिहास और डिवाइस जानकारी।"
      },
      dataUsage: {
        title: "हम आपके डेटा का उपयोग कैसे करते हैं",
        accountManagement: {
          title: "खाता प्रबंधन",
          description: "आपका खाता बनाने और बनाए रखने, सेवाएं प्रदान करने और आपके साथ संचार करने के लिए।"
        },
        legalCompliance: {
          title: "कानूनी अनुपालन",
          description: "एंटी-मनी लॉन्ड्रिंग (एएमएल) विनियमों सहित लागू कानूनों के तहत हमारे दायित्वों को पूरा करने के लिए।"
        },
        securityFraud: {
          title: "सुरक्षा और धोखाधड़ी रोकथाम",
          description: "आपके खाते की सुरक्षा करने, धोखाधड़ी का पता लगाने और रोकने और प्लेटफॉर्म सुरक्षा सुनिश्चित करने के लिए।"
        },
        customerSupport: {
          title: "ग्राहक सहायता",
          description: "आपकी पूछताछ का जवाब देने और जरूरत पड़ने पर तकनीकी सहायता प्रदान करने के लिए।"
        },
        marketing: {
          title: "मार्केटिंग और संचार",
          description: "आपको प्रासंगिक अपडेट, उत्पाद जानकारी और प्रचार सामग्री भेजने के लिए (आपकी सहमति से)।"
        },
        transactionProcessing: {
          title: "लेनदेन प्रसंस्करण",
          description: "क्रिप्टोकरेंसी लेनदेन सुविधाजनक बनाने और लेनदेन रिकॉर्ड बनाए रखने के लिए।"
        }
      },
      dataRetention: {
        title: "डेटा प्रतिधारण",
        content: "हम आपके डेटा को तब तक बनाए रखते हैं जब तक कि हमारी सेवाएं प्रदान करने, कानूनी दायित्वों (जैसे कर और एएमएल आवश्यकताओं) का पालन करने, विवादों को हल करने और हमारे समझौतों को लागू करने के लिए आवश्यक हो।"
      },
      dataSharing: {
        title: "डेटा साझाकरण",
        content: "हम आपके डेटा को अन्य नेक्सस इकाइयों या विश्वसनीय तृतीय पक्षों के साथ सख्त संविदात्मक सुरक्षा उपायों के तहत साझा कर सकते हैं, केवल तब जब हमारी गोपनीयता नोटिस में बताए गए उद्देश्यों के लिए आवश्यक हो।"
      },
      cookies: {
        title: "कुकीज़ और ट्रैकिंग",
        content: "हम आपके उपयोगकर्ता अनुभव को बढ़ाने, व्यक्तिगत मार्केटिंग प्रदान करने और विश्लेषण करने के लिए कि हमारी सेवाओं का उपयोग कैसे किया जाता है, कुकीज़ और समान तकनीकों का उपयोग करते हैं।",
        link: "हमारी पूरी कुकी नीति देखें"
      },
      actionCards: {
        privacyNotice: {
          title: "गोपनीयता नोटिस",
          description: "हमारी पूरी गोपनीयता नीति पढ़ें"
        },
        manageData: {
          title: "डेटा प्रबंधित करें",
          description: "अपनी जानकारी तक पहुंचें और नियंत्रित करें"
        },
        cookieSettings: {
          title: "कुकी सेटिंग्स",
          description: "अपनी ट्रैकिंग प्राथमिकताएं समायोजित करें"
        },
        helpCenter: {
          title: "सहायता केंद्र",
          description: "गोपनीयता प्रश्नों के उत्तर प्राप्त करें"
        }
      },
      notification: "क्रिया सफलतापूर्वक पूरी हुई!"
    },

    termsOfUse: {
      title: "उपयोग की शर्तें",
      hero: {
        title: "नेक्सस उपयोग की शर्तें"
      },
      agreement: {
        title: "समझौता",
        content: "यह आप (उपयोगकर्ता) और नेक्सस के बीच एक बाध्यकारी समझौता है। यह आपके द्वारा एक्सेस या उपयोग की जाने वाली सभी नेक्सस सेवाओं को कवर करता है।"
      },
      riskWarning: {
        title: "जोखिम चेतावनी",
        content: "डिजिटल परिसंपत्तियां अस्थिर होती हैं और मूल्य में महत्वपूर्ण रूप से उतार-चढ़ाव हो सकता है। नेक्सस ब्रोकर, वित्तीय सलाहकार, या निवेश सलाहकार नहीं है। कोई भी वित्तीय निर्णय लेने से पहले आपको अपनी स्वयं की उचित जांच करनी होगी।"
      },
      aboutServices: {
        title: "हमारी सेवाओं के बारे में",
        aboutNexus: {
          title: "नेक्सस के बारे में",
          content: "नेक्सस हमारे प्लेटफॉर्म के माध्यम से डिजिटल परिसंपत्ति एक्सचेंज, कस्टडी सेवाएं और संबंधित वित्तीय सेवाएं प्रदान करता है।"
        },
        eligibility: {
          title: "पात्रता",
          content: "आपकी आयु कम से कम 18 वर्ष होनी चाहिए, कानूनी रूप से अनुबंध करने में सक्षम होना चाहिए, हमारी सेवाओं का उपयोग करने से प्रतिबंधित नहीं होना चाहिए, और प्रतिबंधित क्षेत्राधिकार में स्थित नहीं होना चाहिए।"
        },
        communication: {
          title: "संचार",
          content: "आपको अपनी संपर्क जानकारी अपडेट रखनी होगी। नेक्सस आपके खाते और हमारी सेवाओं के संबंध में ईमेल, एसएमएस, या फोन के माध्यम से आपसे संपर्क करेगा।"
        }
      },
      services: {
        title: "हमारी सेवाएं",
        servicesProvided: {
          title: "प्रदान की गई सेवाएं",
          content: "नेक्सस डिजिटल परिसंपत्ति ट्रेडिंग, सुरक्षित कस्टडी समाधान और स्वचालित बॉट्स और मानव प्रतिनिधियों दोनों के माध्यम से ग्राहक सहायता प्रदान करता है। उपयोगकर्ता चैट कार्यक्षमता भी उपलब्ध है।"
        },
        fees: {
          title: "शुल्क",
          content: "सभी लागू शुल्क हमारे शुल्क संरचना पृष्ठ पर सूचीबद्ध हैं और अपडेट के अधीन हैं। लेनदेन करने से पहले वर्तमान शुल्क अनुसूची की समीक्षा करने के लिए आप जिम्मेदार हैं।"
        }
      },
      accountManagement: {
        title: "खाता प्रबंधन",
        accountCreation: {
          title: "खाता निर्माण",
          content: "हमारी सेवाओं तक पहुंचने के लिए आपको एक खाता (व्यक्तिगत या कॉर्पोरेट) खोलना होगा। इसके लिए कानून द्वारा आवश्यक पहचान सत्यापन प्रक्रियाओं (KYC/AML) को पूरा करना आवश्यक है।"
        },
        identityVerification: {
          title: "पहचान सत्यापन",
          content: "कुछ सेवाओं का उपयोग करने से पहले आपको हमारी नो योर कस्टमर (KYC) और एंटी-मनी लॉन्ड्रिंग (AML) सत्यापन प्रक्रियाओं को पूरा करना होगा।"
        },
        accountRecords: {
          title: "खाता रिकॉर्ड",
          content: "आप हमारी खाता प्रबंधन नीतियों में बताई गई विशिष्ट शर्तों के तहत रिकॉर्ड रख सकते हैं और उप-खाते बना सकते हैं।"
        }
      },
      transactions: {
        title: "लेनदेन",
        sufficientBalance: {
          title: "पर्याप्त बैलेंस",
          content: "आपको अपने द्वारा शुरू किए गए किसी भी लेनदेन के लिए अपने खाते में पर्याप्त बैलेंस बनाए रखना होगा। यदि अपर्याप्त फंड उपलब्ध हैं तो लेनदेन विफल हो सकते हैं या अतिरिक्त शुल्क लग सकते हैं।"
        },
        transactionCancellation: {
          title: "लेनदेन रद्दीकरण",
          content: "संदिग्ध धोखाधड़ी, त्रुटियों, या इन नियमों के उल्लंघन के मामलों में नेक्सस लेनदेन को रद्द या संशोधित करने का अधिकार सुरक्षित रखता है।"
        },
        unauthorizedTransactions: {
          title: "अनधिकृत लेनदेन",
          content: "जब तक आप हमारी विवाद समाधान प्रक्रिया के माध्यम से अन्यथा साबित नहीं कर सकते, तब तक आप किसी भी अनधिकृत लेनदेन के लिए जिम्मेदार हैं।"
        }
      },
      digitalAssets: {
        title: "डिजिटल परिसंपत्तियां",
        supportedAssets: {
          title: "समर्थित परिसंपत्तियां",
          content: "आप केवल नेक्सस द्वारा स्पष्ट रूप से समर्थित डिजिटल परिसंपत्तियों के साथ लेनदेन कर सकते हैं। असमर्थित परिसंपत्तियों को जमा करने का प्रयास स्थायी नुकसान का कारण बन सकता है।"
        },
        forksAirdrops: {
          title: "फोर्क्स और एयरड्रॉप्स",
          content: "नेक्सस ब्लॉकचेन फोर्क्स, एयरड्रॉप्स, या अन्य समान घटनाओं के लिए समर्थन की गारंटी नहीं देता है। समर्थन निर्णय हमारे विवेक पर किए जाते हैं।"
        }
      },
      accountSecurity: {
        title: "खाता सुरक्षा",
        securityRequirements: {
          title: "सुरक्षा आवश्यकताएं",
          content: "आपको एक मजबूत पासवर्ड का उपयोग करना होगा, मल्टी-फैक्टर ऑथेंटिकेशन (MFA) सक्षम करना होगा, क्रेडेंशियल्स कभी साझा नहीं करना होगा, खाता गतिविधि की नियमित निगरानी करना होगा, और किसी भी सुरक्षा उल्लंघन की तुरंत रिपोर्ट करना होगा।"
        }
      },
      privacy: {
        title: "गोपनीयता",
        content: "आपकी गोपनीयता नेक्सस गोपनीयता नोटिस द्वारा शासित है, जो बताती है कि हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।"
      },
      termination: {
        title: "खाता समाप्ति",
        terminationSuspension: {
          title: "समाप्ति/निलंबन",
          content: "नेक्सस धोखाधड़ी, कानून उल्लंघन, संदिग्ध गतिविधि, या नियम उल्लंघन के लिए खातों को प्रतिबंधित, निलंबित या समाप्त कर सकता है। उपयोगकर्ता जब तक फ्रीज या निष्क्रिय नहीं हैं, खाते बंद कर सकते हैं।"
        }
      },
      prohibitedUse: {
        title: "निषिद्ध उपयोग",
        content: "आप नेक्सस सेवाओं का उपयोग धोखाधड़ी, बाजार में हेराफेरी, अवैध गतिविधियों, अनधिकृत पहुंच, या किसी भी उद्देश्य के लिए नहीं कर सकते हैं जो लागू कानूनों या इन नियमों का उल्लंघन करता है।"
      },
      liability: {
        title: "दायित्व और बौद्धिक संपदा",
        liability: {
          title: "दायित्व",
          content: "नेक्सस सिद्ध गंभीर लापरवाही या धोखाधड़ी के मामलों को छोड़कर नुकसान के लिए जिम्मेदार नहीं है। हम बाजार में उतार-चढ़ाव, तकनीकी मुद्दों, या तृतीय पक्ष की कार्रवाइयों के लिए उत्तरदायी नहीं हैं।"
        },
        intellectualProperty: {
          title: "बौद्धिक संपदा",
          content: "नेक्सस हमारे प्लेटफॉर्म, प्रौद्योगिकी और ब्रांडिंग के सभी बौद्धिक संपदा अधिकारों को बरकरार रखता है। उपयोगकर्ताओं को इन नियमों में बताए अनुसार हमारी सेवाओं का उपयोग करने के लिए एक सीमित लाइसेंस प्राप्त होता है।"
        },
        indemnity: {
          title: "क्षतिपूर्ति",
          content: "आप हमारी सेवाओं के दुरुपयोग या इन नियमों के उल्लंघन के परिणामस्वरूप किसी भी दावे, नुकसान, या क्षति के खिलाफ नेक्सस को क्षतिपूर्ति और हानिरहित रखने के लिए सहमत होते हैं।"
        }
      },
      importantNotice: {
        title: "महत्वपूर्ण सूचना",
        content: "नेक्सस सेवाओं का उपयोग करके, आप स्वीकार करते हैं कि आपने इन उपयोग की शर्तों को पढ़, समझ लिया है और इनसे बाध्य होने के लिए सहमत हैं। यदि आप सहमत नहीं हैं, तो आपको तुरंत हमारी सेवाओं का उपयोग बंद करना होगा।"
      },
      actionCards: {
        security: {
          title: "सुरक्षा",
          description: "अपने खाते को सुरक्षित रखें।"
        },
        helpCenter: {
          title: "सहायता केंद्र",
          description: "अपने प्रश्नों के उत्तर प्राप्त करें"
        },
        privacyPolicy: {
          title: "गोपनीयता नीति",
          description: "हमारी गोपनीयता प्रथाओं की समीक्षा करें"
        },
        legal: {
          title: "कानूनी",
          description: "सभी कानूनी दस्तावेज देखें"
        }
      },
      footer: {
        copyright: "© 2025 नेक्सस एक्सचेंज। सर्वाधिकार सुरक्षित।",
        lastUpdated: "अंतिम अद्यतन: 6 मई 2025"
      }
    },
    marketDetail: {
      stats: {
        high: "24 घंटे उच्च",
        low: "24 घंटे निम्न",
        volume: "24 घंटे वॉल्यूम"
      },
      volume: {
        billion: "बी",
        million: "एम"
      },
      actions: {
        buy: "खरीदें",
        sell: "बेचें"
      },
      recentTrades: {
        title: "हाल के ट्रेड (लाइव)",
        price: "मूल्य (USDT)",
        amount: "राशि",
        time: "समय"
      }
    },
    assetsDetail: {
      title: "परिसंपत्ति विवरण",
      today: "आज",
      yesterday: "कल",
      filter: "फ़िल्टर",
      transactionHistory: {
        title: "लेनदेन इतिहास"
      },
      noTransactions: {
        title: "अभी तक कोई लेनदेन नहीं",
        description: "जब आप ट्रेडिंग शुरू करेंगे तो आपका लेनदेन इतिहास यहां दिखाई देगा।"
      },
      status: {
        completed: "पूर्ण",
        pending: "लंबित",
        canceled: "रद्द"
      },
      filterModal: {
        title: "लेनदेन फ़िल्टर करें",
        status: "स्थिति",
        type: "प्रकार",
        direction: "दिशा",
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        allStatuses: "सभी स्थितियां",
        allTypes: "सभी प्रकार",
        bothDirections: "दोनों दिशाएं",
        incoming: "आने वाला",
        outgoing: "जाने वाला",
        completed: "पूर्ण",
        pending: "लंबित",
        canceled: "रद्द",
        resetFilters: "फ़िल्टर रीसेट करें",
        applyFilters: "फ़िल्टर लागू करें"
      },
      actions: {
        deposit: "जमा करें",
        withdraw: "निकालें"
      },
      transactionTypes: {
        transaction: "लेनदेन",
        deposit: "जमा",
        withdrawal: "निकासी",
        convertedFrom: "{{asset}} से परिवर्तित",
        convertedTo: "{{asset}} में परिवर्तित",
        conversionIn: "रूपांतरण इन",
        conversionOut: "रूपांतरण आउट",
        stakedAmount: "स्टेक की गई राशि",
        stakingRewards: "स्टेकिंग पुरस्कार",
        futuresReserved: "फ्यूचर्स आरक्षित",
        futuresProfit: "फ्यूचर्स लाभ",
        futuresLoss: "फ्यूचर्स हानि",
        futuresSettlement: "फ्यूचर्स सेटलमेंट",
        futuresFee: "फ्यूचर्स शुल्क",
        futuresRefund: "फ्यूचर्स धनवापसी",
        futuresBonus: "फ्यूचर्स बोनस",
        futuresCommission: "फ्यूचर्स कमीशन",
        manualProfit: "मैनुअल लाभ",
        manualLoss: "मैनुअल हानि",
        manualAdjustment: "मैनुअल समायोजन",
        spotTradingProfit: "स्पॉट ट्रेडिंग लाभ",
        spotTradingLoss: "स्पॉट ट्रेडिंग हानि",
        referralReward: "रेफरल पुरस्कार",
        bonus: "बोनस",
        referralCommission: "रेफरल कमीशन",
        orderReserved: "ऑर्डर आरक्षित",
        orderCancelled: "ऑर्डर रद्द",
        orderPartialFill: "ऑर्डर आंशिक भरा",
        orderCompleted: "ऑर्डर पूर्ण",
        feePayment: "शुल्क भुगतान",
        balanceAdjustment: "बैलेंस समायोजन",
        transfer: "स्थानांतरण"
      }
    },

    invitation: {
      title: "दोस्तों को आमंत्रित करें",
      earnTogether: "एक साथ कमाएं",
      description: "दोस्तों को नेक्सस में शामिल होने के लिए आमंत्रित करें और जब वे साइन अप करें और ट्रेडिंग शुरू करें तो पुरस्कार अर्जित करें।",
      yourReferralCode: "आपका रेफरल कोड",
      loading: "लोड हो रहा है...",
      copied: "कॉपी किया गया!",
      copyCode: "कोड कॉपी करें",
      totalEarned: "कुल कमाया",
      allTimeCommission: "सभी समय का कमीशन",
      generationMembers: "पीढ़ी के सदस्य",
      noGenerationData: "कोई पीढ़ी डेटा उपलब्ध नहीं",
      approvedMembers: "स्वीकृत सदस्य",
      pendingMembers: "लंबित सदस्य",
      commissionStructure: "कमीशन संरचना",
      firstGeneration: "पहली पीढ़ी",
      secondGeneration: "दूसरी पीढ़ी",
      thirdGeneration: "तीसरी पीढ़ी",
      firstDepositCommission: "पहली जमा कमीशन",
      stakingProfitsCommission: "स्टेकिंग लाभ कमीशन",
      howItWorks: "यह कैसे काम करता है",
      steps: {
        shareCode: {
          title: "अपना रेफरल कोड साझा करें",
          description: "अपना अद्वितीय कोड दोस्तों को भेजें या इसे सोशल मीडिया पर साझा करें।"
        },
        friendsSignUp: {
          title: "दोस्त साइन अप करें",
          description: "आपके दोस्त आपके रेफरल कोड का उपयोग करके साइन अप करते हैं और अपने खातों को सत्यापित करते हैं।"
        },
        earnCommissions: {
          title: "कमीशन अर्जित करें",
          description: "अपने नेटवर्क की पहली जमा राशि और स्टेकिंग लाभ से कमीशन अर्जित करें।"
        }
      },
      referralCopied: "रेफरल कोड क्लिपबोर्ड पर कॉपी किया गया!",
      loadingMembers: "सदस्य लोड हो रहे हैं...",
      approved: "स्वीकृत",
      joined: "शामिल हुए",
      noMembersFound: "कोई सदस्य नहीं मिले"
    },

    securityTips: {
      title: "सुरक्षा केंद्र",
      essentialTips: "आवश्यक सुरक्षा युक्तियाँ",
      categories: {
        passwordSecurity: "पासवर्ड सुरक्षा",
        deviceSecurity: "डिवाइस सुरक्षा",
        accountSecurity: "खाता सुरक्षा"
      },
      tips: {
        strongPasswords: {
          title: "मजबूत, अद्वितीय पासवर्ड का उपयोग करें",
          description: "बड़े और छोटे अक्षरों, संख्याओं और प्रतीकों के साथ जटिल पासवर्ड बनाएं।"
        },
        enable2FA: {
          title: "दो-चरणीय प्रमाणीकरण सक्षम करें",
          description: "2FA के साथ अपने खाते में एक अतिरिक्त सुरक्षा परत जोड़ें।"
        },
        changePasswords: {
          title: "नियमित रूप से पासवर्ड बदलें",
          description: "हर 3-6 महीने में अपने पासवर्ड अपडेट करें।"
        },
        softwareUpdated: {
          title: "सॉफ्टवेयर अपडेट रखें",
          description: "अपने ओएस, ब्राउज़र और वॉलेट सॉफ्टवेयर को नियमित रूप से अपडेट करें।"
        },
        antivirus: {
          title: "एंटीवायरस सुरक्षा का उपयोग करें",
          description: "प्रतिष्ठित एंटीवायरस और एंटी-मालवेयर सॉफ्टवेयर इंस्टॉल करें।"
        },
        publicWifi: {
          title: "सार्वजनिक वाई-फाई से बचें",
          description: "बिना वीपीएन के सार्वजनिक नेटवर्क पर अपने वॉलेट को एक्सेस न करें।"
        },
        loginNotifications: {
          title: "लॉगिन सूचनाएं सक्षम करें",
          description: "अपने खाते में नए लॉगिन के लिए अलर्ट प्राप्त करें।"
        },
        reviewActivity: {
          title: "खाता गतिविधि की समीक्षा करें",
          description: "संदिग्ध गतिविधि के लिए नियमित रूप से अपने खाते की जांच करें।"
        },
        whitelisting: {
          title: "व्हाइटलिस्टिंग का उपयोग करें",
          description: "अतिरिक्त सुरक्षा के लिए विश्वसनीय निकासी पतों को व्हाइटलिस्ट करें।"
        }
      },
      actions: {
        enable2FA: "2FA सक्षम करें",
        enable2FADesc: "एक अतिरिक्त सुरक्षा परत जोड़ें",
        activityLog: "गतिविधि लॉग",
        activityLogDesc: "हाल की खाता गतिविधि की समीक्षा करें",
        settings: "सेटिंग्स",
        settingsDesc: "सुरक्षा प्राथमिकताएं कॉन्फ़िगर करें",
        backupCodes: "बैकअप कोड",
        backupCodesDesc: "अपने रिकवरी कोड सहेजें"
      },
      emergency: {
        title: "आपातकालीन प्रक्रियाएं",
        unauthorizedAccess: "यदि आपको अपने खाते में अनधिकृत पहुंच पर संदेह है, तो तुरंत अपना पासवर्ड बदलें और यदि पहले से सक्रिय नहीं है तो 2FA सक्षम करें।",
        lostDevice: "यदि आपका डिवाइस खो जाता है या चोरी हो जाता है, तो तुरंत अपनी खाता सेटिंग्स से सत्र पहुंच रद्द करें।",
        phishing: "यदि आप फ़िशिंग के शिकार हुए हैं, तो अपना खाता फ्रीज करें और तुरंत सहायता से संपर्क करें।",
        supportTitle: "24/7 सुरक्षा सहायता",
        supportEmail: "support@nexus-exchange.com"
      },
      resources: {
        title: "सुरक्षा संसाधन",
        securityGuide: "सुरक्षा गाइड",
        securityGuideLink: "व्यापक सुरक्षा दस्तावेज़ीकरण पढ़ें",
        learningCenter: "सीखने का केंद्र",
        learningCenterLink: "क्रिप्टो सुरक्षा की सर्वोत्तम प्रथाओं के बारे में जानें",
        faq: "सामान्य प्रश्न",
        faqLink: "सामान्य सुरक्षा प्रश्नों के उत्तर खोजें"
      }
    },
    profile: {
      title: "प्रोफाइल",
      settings: "सेटिंग्स",
      status: {
        verified: "सत्यापित",
        unverified: "असत्यापित"
      },
      accountInfo: {
        title: "खाता जानकारी",
        email: "ईमेल",
        creditScore: "क्रेडिट स्कोर",
        invitationCode: "आमंत्रण कोड"
      },
      verification: {
        pending: {
          title: "सत्यापन लंबित",
          description: "आपका खाता सत्यापन प्रगति में है। इसमें आमतौर पर 1-3 कार्यदिवस लगते हैं।"
        },
        alert: {
          title: "खाता सत्यापित नहीं",
          description: "सभी सुविधाओं और उच्च सीमाओं को अनलॉक करने के लिए अपना खाता सत्यापित करें",
          verifyNow: "अभी सत्यापित करें"
        }
      },
      pendingVerifications: {
        title: "लंबित सत्यापन",
        identity: {
          title: "पहचान सत्यापन",
          description: "अपनी सरकारी आईडी जमा करें"
        },
        address: {
          title: "पता सत्यापन",
          description: "अपने निवास स्थान को सत्यापित करें"
        },
        status: {
          pending: "लंबित"
        }
      },
      approvedVerifications: {
        title: "सत्यापन स्वीकृत",
        identity: {
          title: "पहचान सत्यापन"
        },
        address: {
          title: "पता सत्यापन"
        },
        status: {
          completed: "पूर्ण"
        }
      },
      limitations: {
        title: "खाता सीमाएं",
        withdrawalLimit: "निकासी सीमा: प्रति दिन $1,000",
        stakingLimited: "स्टेकिंग विकल्प सीमित",
        advancedTrading: "उन्नत ट्रेडिंग सुविधाएं अक्षम",
        fiatDeposits: "फिएट मुद्रा जमा उपलब्ध नहीं"
      },
      menu: {
        withdrawalAddress: "निकासी पता",
        password: "पासवर्ड",
        notifications: "सूचनाएं",
        myInvitation: "मेरा आमंत्रण",
        language: "भाषा",
        termsOfUse: "उपयोग की शर्तें",
        privacyPortal: "गोपनीयता पोर्टल",
        aboutUs: "हमारे बारे में",
        msbApproval: "एमएसबी अनुमोदन",
        customerSupport: "ग्राहक सहायता",
        downloadApp: "ऐप डाउनलोड करें",
        logout: "लॉग आउट"
      }
    },
    notification: {
      title: "सूचना",
      loading: "लोड हो रहा है",
      filters: {
        all: "सभी",
        unread: "अपठित",
        read: "पढ़ा हुआ"
      },
      emptyState: {
        title: "अभी तक कोई सूचना नहीं",
        noNotifications: "आपके पास अभी तक कोई सूचना नहीं है",
        noFilteredNotifications: "कोई {0} सूचना नहीं मिली"
      },
      types: {
        deposit: {
          title: "जमा प्राप्त",
          message: "{0} की आपकी जमा राशि की पुष्टि हो गई है और आपके वॉलेट में जमा कर दी गई है।"
        },
        withdraw: {
          title: "निकासी सफल",
          message: "{0} की आपकी निकासी सफलतापूर्वक संसाधित हो गई है।"
        },
        staking: {
          title: "स्टेकिंग लाभ",
          message: "आपने अपने स्टेकिंग पुरस्कारों से {0} अर्जित किया।"
        },
        kyc: {
          title: "KYC अपडेट",
          defaultMessage: "आपका खाता सक्रिय कर दिया गया है।"
        },
        commission: {
          title: "कमीशन प्राप्त",
          message: "आपको {0} का कमीशन प्राप्त हुआ।"
        },
        futures: {
          title: "फ्यूचर्स अपडेट",
          message: "आपका फ्यूचर्स लेनदेन राशि {0} निष्पादित हो गई है।"
        },
        accountActivated: {
          title: "KYC सत्यापन",
          message: "नमस्ते {0} आपके KYC दस्तावेज़ सत्यापित हो गए हैं अब आप नेक्सस एक्सचेंज पर असीमित सुविधाओं का आनंद ले सकते हैं"
        },
        custom: {
          title: "सूचना",
          defaultMessage: "आपके पास एक नई सूचना है।"
        },
        cancelDeposit: {
          title: "जमा रद्द",
          message: "{0} की आपकी जमा राशि रद्द कर दी गई है।"
        },
        cancelWithdraw: {
          title: "निकासी रद्द",
          message: "{0} की आपकी निकासी रद्द कर दी गई है।"
        },
        cancelActivated: {
          title: "सक्रियण रद्द",
          message: "आपका KYC सिस्टम द्वारा अस्वीकार कर दिया गया था कृपया पुनः प्रयास करें या सहायता के लिए ग्राहक सहायता से संपर्क करें"
        }
      }
    },

    staking: {
      title: "स्टेकिंग",
      totalStakedBalance: "कुल स्टेक बैलेंस",
      earned: "अर्जित",
      tabs: {
        options: "विकल्प",
        active: "सक्रिय स्टेक",
        completed: "पूर्ण"
      },
      daily: "दैनिक",
      minimumStake: "न्यूनतम स्टेक",
      unstakingPeriod: "अनस्टेकिंग अवधि",
      days: "दिन",
      stakeButton: "{0} स्टेक करें",
      status: {
        active: "सक्रिय",
        completed: "पूर्ण"
      },
      remaining: "शेष",
      dailyRate: "दैनिक दर",
      duration: "अवधि",
      createdAt: "निर्माण तिथि",
      dateFinish: "समाप्ति तिथि",
      totalCompletedRewards: "कुल पूर्ण पुरस्कार",
      stake: "स्टेक",
      stakes: "स्टेक",
      allRewardsFromCompleted: "पूर्ण स्टेक से सभी पुरस्कार",
      totalRewardsEarned: "कुल अर्जित पुरस्कार",
      balance: "बैलेंस",
      maximumStake: "अधिकतम स्टेक",
      estimatedTotalRewards: "अनुमानित कुल पुरस्कार",
      exploreStakingOptions: "स्टेकिंग विकल्पों का अन्वेषण करें",
      startStaking: "स्टेकिंग शुरू करें",
      emptyStates: {
        options: {
          title: "कोई स्टेकिंग योजना उपलब्ध नहीं",
          message: "वर्तमान में कोई स्टेकिंग योजना उपलब्ध नहीं है। कृपया नए स्टेकिंग अवसरों के लिए बाद में जांचें।"
        },
        active: {
          title: "कोई सक्रिय स्टेक नहीं",
          message: "आपके पास अभी तक कोई सक्रिय स्टेक नहीं है। अपनी क्रिप्टो परिसंपत्तियों पर पुरस्कार अर्जित करने के लिए स्टेकिंग शुरू करें।"
        },
        completed: {
          title: "कोई पूर्ण स्टेक नहीं",
          message: "आपने अभी तक कोई स्टेक पूरा नहीं किया है। आपके पूर्ण स्टेक यहां दिखाई देंगे जब वे समाप्त हो जाएंगे।"
        }
      },
      stakeModal: {
        title: "स्टेक",
        amountToStake: "स्टेक करने के लिए राशि",
        enterAmount: "राशि दर्ज करें"
      }
    },
    conversion: {
      title: "क्रिप्टो परिवर्तित करें",
      loading: "नवीनतम मूल्य लोड हो रहे हैं...",
      youSend: "आप भेजते हैं",
      youReceive: "आप प्राप्त करते हैं",
      balance: "बैलेंस",
      max: "अधिकतम",
      insufficientBalance: "अपर्याप्त बैलेंस",
      estimatedConversion: "अनुमानित रूपांतरण",
      selectDifferentCurrencies: "विभिन्न मुद्राएं चुनें",
      convertNow: "अभी परिवर्तित करें",
      pricesUpdate: "मूल्य रीयल-टाइम में अपडेट होते हैं",
      selectCurrency: "मुद्रा चुनें",
      searchCurrencies: "मुद्राएं खोजें...",
      confirmConversion: "रूपांतरण की पुष्टि करें",
      conversionDetails: "रूपांतरण विवरण",
      exchangeRate: "विनिमय दर",
      networkFee: "नेटवर्क शुल्क",
      estimatedArrival: "अनुमानित आगमन",
      arrivalTime: "~30 सेकंड",
      processingConversion: "रूपांतरण संसाधित हो रहा है...",
      cancel: "रद्द करें"
    },

    history: {
      title: "लेनदेन इतिहास",
      emptyState: {
        title: "कोई लेनदेन नहीं मिला",
        description: "अधिक लेनदेन देखने के लिए अपने फ़िल्टर बदलने का प्रयास करें"
      },
      filters: {
        all: "सभी",
        deposits: "जमा",
        withdrawals: "निकासी",
        profits: "लाभ",
        losses: "हानि",
        conversions: "रूपांतरण",
        stacking: "स्टेकिंग"
      },
      statusFilters: {
        allStatus: "सभी स्थितियां",
        completed: "पूर्ण",
        pending: "लंबित",
        canceled: "रद्द"
      },
      timeFilters: {
        allTime: "सभी समय",
        today: "आज",
        week: "सप्ताह",
        month: "महीना",
        year: "वर्ष"
      },
      status: {
        completed: "पूर्ण",
        pending: "लंबित",
        canceled: "रद्द"
      },
      dateFormats: {
        today: "आज, {0}",
        yesterday: "कल, {0}"
      },
      transactionTypes: {
        transaction: "लेनदेन",
        deposit: "जमा",
        withdrawal: "निकासी",
        convertedFrom: "{0} से परिवर्तित",
        convertedTo: "{0} में परिवर्तित",
        conversionIn: "रूपांतरण इन",
        conversionOut: "रूपांतरण आउट",
        stakedAmount: "स्टेक की गई राशि",
        stakingRewards: "स्टेकिंग पुरस्कार",
        futuresReserved: "फ्यूचर्स आरक्षित",
        futuresProfit: "फ्यूचर्स लाभ",
        futuresLoss: "फ्यूचर्स हानि",
        futuresSettlement: "फ्यूचर्स सेटलमेंट",
        futuresFee: "फ्यूचर्स शुल्क",
        futuresRefund: "फ्यूचर्स धनवापसी",
        futuresBonus: "फ्यूचर्स बोनस",
        futuresCommission: "फ्यूचर्स कमीशन",
        manualProfit: "मैनुअल लाभ",
        manualLoss: "मैनुअल हानि",
        manualAdjustment: "मैनुअल समायोजन",
        spotTradingProfit: "स्पॉट ट्रेडिंग लाभ",
        spotTradingLoss: "स्पॉट ट्रेडिंग हानि",
        referralReward: "रेफरल पुरस्कार",
        bonus: "बोनस",
        referralCommission: "रेफरल कमीशन",
        orderReserved: "ऑर्डर आरक्षित",
        orderCancelled: "ऑर्डर रद्द",
        orderPartialFill: "ऑर्डर आंशिक भरा",
        orderCompleted: "ऑर्डर पूर्ण",
        feePayment: "शुल्क भुगतान",
        balanceAdjustment: "बैलेंस समायोजन",
        transfer: "स्थानांतरण"
      }
    },

    withdraw: {
      title: "क्रिप्टो निकालें",
      selectCurrency: "मुद्रा चुनें",
      selectPlaceholder: "एक मुद्रा चुनें",
      selectHint: "जारी रखने के लिए कृपया एक मुद्रा चुनें",
      withdrawalAddress: "निकासी पता",
      withdrawalAmount: "निकासी राशि",
      withdrawalPassword: "निकासी पासवर्ड",
      passwordPlaceholder: "निकासी पासवर्ड दर्ज करें",
      available: "उपलब्ध",
      amountWithdrawal: "निकासी राशि",
      minimumWithdrawal: "न्यूनतम निकासी",
      networkFee: "नेटवर्क शुल्क",
      youWillReceive: "आपको प्राप्त होगा",
      confirmWithdrawal: "निकासी की पुष्टि करें",
      processing: "संसाधित हो रहा है...",
      securityVerification: "सुरक्षा सत्यापन",
      securityMessage: "आपकी सुरक्षा के लिए, निकासी के लिए पासवर्ड पुष्टि की आवश्यकता होती है और समीक्षा के अधीन हो सकती है। गलत पतों पर निकासी को वापस नहीं किया जा सकता है।",
      networkInfo: "नेटवर्क: {0} ({1})",
      noWalletAddress: "(कोई वॉलेट पता नहीं)",
      noWallet: {
        title: "कोई वॉलेट पता नहीं मिला",
        description: "आपने अभी तक कोई वॉलेट पता नहीं जोड़ा है। कृपया अपना लेनदेन जारी रखने के लिए एक निकासी पता जोड़ें।",
        addButton: "वॉलेट पता जोड़ें"
      },
      security: {
        title: "सुरक्षा पहले",
        description: "आपकी सुरक्षा के लिए, हम प्रत्येक क्रिप्टोकरेंसी के लिए एक सत्यापित निकासी पते की आवश्यकता होती है। यह त्रुटियों को रोकने में मदद करता है और सुनिश्चित करता है कि आपके फंड सही गंतव्य तक पहुंचें।"
      },
      errors: {
        amountNumber: "निकासी राशि एक संख्या होनी चाहिए",
        amountRequired: "निकासी राशि आवश्यक है",
        amountPositive: "निकासी राशि 0 से अधिक होनी चाहिए",
        amountMin: "राशि इस मुद्रा के लिए न्यूनतम निकासी से कम है",
        passwordRequired: "निकासी पासवर्ड आवश्यक है",
        noWalletAddress: "{0} के लिए कोई वॉलेट पता नहीं मिला। कृपया पहले एक वॉलेट पता जोड़ें।",
        minimumWithdraw: "{0} के लिए न्यूनतम निकासी: {1} {2}",
        insufficientForFee: "शुल्क ({0} {1}) को कवर करने के लिए पर्याप्त बैलेंस नहीं"
      },
      validation: {
        selectCurrency: "मुद्रा चुनें",
        enterAmount: "राशि दर्ज करें",
        belowMin: "न्यूनतम ({0} {1}) से नीचे",
        insufficientBalance: "अपर्याप्त बैलेंस",
        insufficientForFee: "अपर्याप्त बैलेंस (शुल्क सहित)",
        enterPassword: "पासवर्ड दर्ज करें"
      }
    },
    deposit: {
      title: "क्रिप्टो जमा करें",
      loading: "जमा विधि लोड हो रही है ...",
      selectNetwork: "नेटवर्क चुनें",
      depositAddress: "आपका जमा पता",
      copyAddress: "पता कॉपी करें",
      amountLabel: "जमा राशि ({0})",
      amountPlaceholder: "न्यूनतम: {0} {1}",
      txidLabel: "लेनदेन आईडी (TXID)",
      txidPlaceholder: "TXID दर्ज करें",
      minimumDeposit: "न्यूनतम जमा",
      importantNotice: "महत्वपूर्ण सूचना",
      warningMessage: "कृपया सुनिश्चित करें कि आप अपनी जमा राशि के लिए सही नेटवर्क चुनते हैं। गलत नेटवर्क के माध्यम से फंड भेजने से आपकी परिसंपत्तियों का स्थायी नुकसान हो सकता है, जिसे पुनर्प्राप्त नहीं किया जा सकता है।",
      confirmDeposit: "जमा की पुष्टि करें",
      network: "नेटवर्क",
      estimatedArrival: "अनुमानित आगमन",
      networkConfirmations: "3 नेटवर्क पुष्टिकरण",
      processingTime: "संसाधन समय",
      processingTimeValue: "10-30 मिनट",
      noMethods: "फिलहाल कोई जमा विधि उपलब्ध नहीं है।",
      addressCopied: "पता क्लिपबोर्ड पर कॉपी किया गया!",
      unknownNetwork: "अज्ञात नेटवर्क"
    },

    wallet: {
      totalPortfolioValue: "कुल पोर्टफोलियो मूल्य",
      myAssets: "मेरी परिसंपत्तियां",
      manage: "प्रबंधित करें",
      noAssets: "कोई परिसंपत्ति नहीं मिली",
      quickActions: {
        deposit: "जमा",
        withdraw: "निकालें",
        history: "इतिहास",
        convert: "परिवर्तित करें",
        staking: "स्टेकिंग"
      }
    },

    trade: {
      title: "स्पॉट",
      buy: "खरीदें",
      sell: "बेचें",
      limit: "लिमिट",
      market: "मार्केट",
      orderType: "ऑर्डर प्रकार",
      price: "मूल्य (USDT)",
      amount: "राशि",
      available: "उपलब्ध",
      placing: "रखा जा रहा है...",
      increasePrice: "मूल्य बढ़ाएं",
      decreasePrice: "मूल्य घटाएं",
      errors: {
        invalidQuantity: "कृपया एक वैध मात्रा दर्ज करें।",
        invalidPrice: "कृपया एक वैध मूल्य दर्ज करें।",
        insufficientUSDT: "अपर्याप्त USDT बैलेंस। उपलब्ध: {0} USDT",
        insufficientCoin: "अपर्याप्त {1} बैलेंस। उपलब्ध: {0} {1}",
        failedOrder: "ऑर्डर रखने में विफल। कृपया पुनः प्रयास करें।"
      },
      orderBook: {
        price: "मूल्य (USDT)",
        amount: "राशि"
      },
      openOrders: {
        title: "खुले ऑर्डर",
        viewAll: "सभी ऑर्डर देखें",
        status: "स्थिति",
        price: "मूल्य",
        amount: "राशि",
        total: "कुल",
        cancel: "रद्द करें",
        noOrders: "अभी तक कोई खुला ऑर्डर नहीं",
        noOrdersSubtext: "आपके खुले ऑर्डर यहां दिखाई देंगे"
      }
    },

    market: {
      title: "USDT मार्केट",
      noResults: "कोई क्रिप्टोकरेंसी नहीं मिली",
      volume: "वॉल्यूम",
      search: {
        placeholder: "क्रिप्टो खोजें",
        clear: "खोज साफ करें"
      },
      tabs: {
        all: "सभी",
        gainers: "बढ़त",
        losers: "गिरावट",
        favorites: "पसंदीदा"
      }
    },
    signup: {
      title: "साइन अप",
      creatingAccount: "बनाया जा रहा है...",
      createAccount: "खाता बनाएं",
      refresh: "ताज़ा करें",
      captchaMismatch: "कैप्चा मेल नहीं खाता",
      alreadyHaveAccount: "पहले से ही एक खाता है? लॉग इन करें",
      terms: {
        text: "खाता बनाकर, आप हमारी",
        link: "सेवा की शर्तें"
      },
      labels: {
        email: "ईमेल",
        phoneNumber: "फोन नंबर",
        captcha: "ग्राफिकल कैप्चा",
        password: "पासवर्ड",
        confirmPassword: "पासवर्ड पुष्टि करें",
        withdrawPassword: "निकासी पासवर्ड",
        invitationCode: "आमंत्रण कोड"
      },
      placeholders: {
        email: "अपना ईमेल दर्ज करें",
        phoneNumber: "अपना फोन नंबर दर्ज करें",
        captcha: "कोड दर्ज करें",
        password: "एक पासवर्ड बनाएं",
        confirmPassword: "अपना पासवर्ड पुष्टि करें",
        withdrawPassword: "निकासी पासवर्ड दर्ज करें",
        invitationCode: "आमंत्रण कोड दर्ज करें"
      }
    },
    home: {
      quickAccess: {
        title: "त्वरित पहुंच",
        deposit: "जमा",
        security: "सुरक्षा",
        faqCenter: "सामान्य प्रश्न केंद्र",
        invitation: "आमंत्रण",
        staking: "स्टेकिंग"
      },
      popularCryptos: "लोकप्रिय क्रिप्टोकरेंसी",
      seeAll: "सभी देखें",
      volume: "वॉल्यूम",
      loading: "लोड हो रहा है...",
      notifications: {
        btcAlert: "BTC मूल्य अलर्ट",
        btcReached: "बिटकॉइन $45,000 तक पहुंच गया",
        fiveMinAgo: "5 मिनट पहले",
        depositSuccess: "जमा सफल",
        depositConfirmed: "0.5 ETH की आपकी जमा राशि की पुष्टि हो गई है",
        oneHourAgo: "1 घंटा पहले",
        securityUpdate: "सुरक्षा अपडेट",
        newSecurityFeatures: "नई सुरक्षा सुविधाएं उपलब्ध",
        twoHoursAgo: "2 घंटे पहले",
        marketNews: "बाजार समाचार",
        ethUpgrade: "एथेरियम अपग्रेड सफलतापूर्वक पूरा हुआ",
        fiveHoursAgo: "5 घंटे पहले"
      }
    },
    faq: {
      title: "सामान्य प्रश्न केंद्र",
      hero: {
        title: "अक्सर पूछे जाने वाले प्रश्न",
        subtitle: "नेक्सस का उपयोग करने के बारे में सामान्य प्रश्नों के उत्तर खोजें"
      },
      search: {
        placeholder: "उत्तर खोजें..."
      },
      categories: {
        gettingStarted: "शुरुआत करना",
        managingAccount: "अपने खाते का प्रबंधन"
      },
      questions: {
        howToCreateAccount: "मैं एक खाता कैसे बनाऊं?",
        howToCompleteVerification: "मैं सत्यापन कैसे पूरा करूं?",
        howToBuyCrypto: "मैं क्रिप्टोकरेंसी कैसे खरीदूं?",
        howToTrade: "मैं क्रिप्टोकरेंसी का व्यापार कैसे करूं?",
        howToSendReceive: "मैं क्रिप्टो कैसे प्राप्त और भेजूं?",
        howToBecomeP2PMerchant: "मैं P2P व्यापारी कैसे बनूं?",
        howStakingWorks: "स्टेकिंग कैसे काम करती है?"
      },
      answers: {
        verificationProcess: "एक सरकारी आईडी और एक सेल्फी फोटो अपलोड करें। सत्यापन आमतौर पर कुछ घंटों के भीतर स्वीकृत हो जाता है।"
      },
      steps: {
        goToWebsite: "https://nexus-exchange.com पर जाएं",
        clickSignUp: '"साइन अप" पर क्लिक करें',
        enterDetails: "अपना विवरण दर्ज करें",
        verifyEmail: "अपने ईमेल पते को सत्यापित करें",
        completeVerification: "पहले सत्यापन पूरा करें",
        clickBuyCrypto: '"क्रिप्टो खरीदें" पर क्लिक करें',
        selectCoinAndPayment: "सिक्का और भुगतान विधि चुनें",
        confirmTransaction: "लेनदेन की पुष्टि करें",
        cryptoInWallet: "क्रिप्टो आपके वॉलेट में दिखाई देगा",
        goToTradeMarkets: '"ट्रेड/मार्केट" पर जाएं',
        pickTradingPair: "एक ट्रेडिंग जोड़ी चुनें (उदाहरण: BTC/USDT)",
        placeOrders: "मार्केट या लिमिट ऑर्डर दें",
        receiveCrypto: "वॉलेट > प्राप्त करें → पता या QR कोड कॉपी करें",
        sendCrypto: "वॉलेट > भेजें → पता/राशि दर्ज करें → पुष्टि करें",
        applyP2P: '"P2P" सेक्शन के तहत आवेदन करें',
        meetCriteria: "पात्रता मानदंड पूरा करें",
        createOffers: "एक बार स्वीकृत होने पर, ऑफ़र बनाएं और व्यापार करें",
        goToStaking: "वॉलेट > स्टेकिंग पर जाएं",
        pickStakingPlan: "एक स्टेकिंग योजना चुनें",
        selectAmount: "स्टेक करने के लिए राशि चुनें",
        confirmStaking: "लेनदेन की पुष्टि करें",
        rewardsProcessed: "पुरस्कार अवधि के अंत में स्वचालित रूप से संसाधित किए जाते हैं"
      },
      labels: {
        toReceive: "प्राप्त करने के लिए:",
        toSend: "भेजने के लिए:"
      },
      futures: {
        title: "फ्यूचर्स ट्रेडिंग समझाया गया",
        whatAreFutures: "फ्यूचर्स कॉन्ट्रैक्ट क्या हैं?",
        futuresExplanation: "भविष्य की तारीख (कैश-सेटल्ड) पर एक पूर्व निर्धारित मूल्य पर क्रिप्टो खरीदने या बेचने के समझौते।",
        whatIsLeverage: "लिवरेज क्या है?",
        leverageExplanation: "आपके पास मौजूद पूंजी से अधिक पूंजी के साथ व्यापार करने की क्षमता (उदाहरण: 10x, 20x, 50x लिवरेज)।",
        longShortPositions: "लॉन्ग और शॉर्ट पोजीशन क्या हैं?",
        long: "लॉन्ग",
        longExplanation: "= दांव लगाना कि मूल्य ऊपर जाएगा",
        short: "शॉर्ट",
        shortExplanation: "= दांव लगाना कि मूल्य नीचे जाएगा",
        marginLiquidation: "मार्जिन और लिक्विडेशन क्या हैं?",
        marginExplanation: "यदि आपकी संपार्श्विक पोजीशन बनाए रखने के लिए बहुत कम हो जाती है तो पोजीशन लिक्विडेशन का जोखिम।",
        fundingRate: "फंडिंग रेट क्या है?",
        fundingRateExplanation: "हर 8 घंटे में लॉन्ग और शॉर्ट ट्रेडर्स के बीच एक्सचेंज किया जाने वाला शुल्क जो स्पॉट मूल्यों के साथ परपेचुअल कॉन्ट्रैक्ट मूल्यों को संतुलित करने के लिए होता है।",
        profitLossCalculation: "लाभ/हानि की गणना कैसे की जाती है?",
        profitLossExplanation: "मूल्य अंतर को आपके लिवरेज और पोजीशन आकार से गुणा करके गणना की जाती है।"
      },
      benefits: {
        title: "नेक्सस फ्यूचर्स क्यों चुनें?",
        hedge: "बाजार की अस्थिरता के खिलाफ हेज करें",
        multiplyProfits: "लिवरेज के साथ लाभ को गुणा करें",
        tradeBothMarkets: "बढ़ते और गिरते दोनों बाजारों में व्यापार करें",
        advancedStrategies: "उन्नत ट्रेडिंग रणनीतियों को लागू करें"
      },
      actionCards: {
        contactSupport: "सहायता से संपर्क करें",
        getHelp: "हमारी टीम से सहायता प्राप्त करें",
        community: "समुदाय",
        joinDiscussions: "चर्चाओं में शामिल हों"
      },
      footer: {
        copyright: "© 2025 नेक्सस एक्सचेंज। सर्वाधिकार सुरक्षित।",
        needHelp: "अधिक सहायता चाहिए? support@nexus-exchange.com से संपर्क करें"
      }
    },

    tabBottomNavigator: {
      home: "होम",
      grap: "ग्राफ",
      records: "रिकॉर्ड्स",
      starting: "शुरुआत"
    },

    language: {
      title: "ऐप भाषा",
      selectLanguage: "भाषा चुनें",
      choosePreferred: "अपनी पसंदीदा भाषा चुनें",
      searchPlaceholder: "भाषाएं खोजें...",
      currentLanguage: "वर्तमान भाषा",

      // Language names (if needed for dynamic content)
      languages: {
        english: "अंग्रेज़ी",
        french: "फ्रेंच",
        russian: "रूसी",
        german: "जर्मन",
        spanish: "स्पेनिश"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    },
  },

  entities: {
    record: {
      menu: "रिकॉर्ड्स",
      fields: {
        user: "उपयोगकर्ता",
        product: "उत्पाद",
        number: "रिकॉर्ड नंबर",
        status: "स्थिति",
      },
      list: {
        title: "रिकॉर्ड्स की सूची",
      },
      view: {
        title: "रिकॉर्ड विवरण",
      },
      edit: {
        title: "रिकॉर्ड संपादित करें",
      },
      create: {
        success: "उत्पाद सफलतापूर्वक जमा किया गया।",
      },
      update: {
        success: "उत्पाद सफलतापूर्वक जमा किया गया।",
      },
      destroy: {
        success: "रिकॉर्ड सफलतापूर्वक हटाया गया",
      },
      destroyAll: {
        success: "रिकॉर्ड सफलतापूर्वक हटाया गया",
      },
      enumerators: {
        status: {
          pending: "लंबित",
          completed: "पूर्ण",
          canceled: "रद्द",
        },
      },
    },

    category: {
      name: "श्रेणी",
      label: "श्रेणियाँ",
      menu: "श्रेणियाँ",
      exporterFileName: "category_export",
      list: {
        menu: "श्रेणियाँ",
        title: "श्रेणियाँ",
      },
      create: {
        success: "श्रेणी सफलतापूर्वक सहेजी गई",
      },
      update: {
        success: "श्रेणी सफलतापूर्वक सहेजी गई",
      },
      destroy: {
        success: "श्रेणी सफलतापूर्वक हटाई गई",
      },
      destroyAll: {
        success: "श्रेणी(याँ) सफलतापूर्वक हटाई गई",
      },
      edit: {
        title: "श्रेणी संपादित करें",
      },
      fields: {
        id: "आईडी",
        name: "नाम",
        slug: "स्लग",
        photo: "फोटो",
        metaKeywords: "मेटा कीवर्ड्स",
        metaDescriptions: "मेटा विवरण",
        status: "स्थिति",
        isFeature: "फीचर है",
        serialRange: "सीरियल",
        serial: "सीरियल",
        createdAt: "निर्माण तिथि",
        updatedAt: "अद्यतन तिथि",
        createdAtRange: "निर्माण तिथि",
      },
      enumerators: {
        status: {
          enable: "सक्षम",
          disable: "अक्षम",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "नई श्रेणी",
      },
      view: {
        title: "श्रेणी देखें",
      },
      importer: {
        title: "श्रेणियाँ आयात करें",
        fileName: "category_import_template",
        hint: "फाइलों/छवियों के कॉलम फाइलों के URL होने चाहिए जो स्पेस से अलग किए गए हों।",
      },
    },

    product: {
      name: "उत्पाद",
      label: "उत्पाद",
      menu: "उत्पाद",
      exporterFileName: "product_export",
      list: {
        menu: "उत्पाद",
        title: "उत्पाद",
      },
      create: {
        success: "उत्पाद सफलतापूर्वक सहेजा गया",
      },
      update: {
        success: "उत्पाद सफलतापूर्वक सहेजा गया",
      },
      destroy: {
        success: "उत्पाद सफलतापूर्वक हटाया गया",
      },
      destroyAll: {
        success: "उत्पाद सफलतापूर्वक हटाया गया",
      },
      edit: {
        title: "उत्पाद संपादित करें",
      },
      fields: {
        id: "आईडी",
        name: "नाम",
        slug: "स्लग",
        tags: "टैग्स",
        video: "वीडियो",
        specificationName: "विशिष्टता नाम",
        specificationDesciption: "विशिष्टता विवरण",
        isSpecification: "विशिष्टता है",
        details: "विवरण",
        photo: "फोटो",
        discountPriceRange: "छूट मूल्य",
        discountPrice: "वर्तमान मूल्य",
        previousPriceRange: "पिछला मूल्य",
        previousPrice: "पिछला मूल्य",
        stockRange: "स्टॉक",
        stock: "स्टॉक",
        metaKeywords: "मेटा कीवर्ड्स",
        metaDesctiption: "संक्षिप्त विवरण",
        status: "स्थिति",
        isType: "प्रकार",
        dateRange: "तिथि",
        date: "तिथि",
        itemType: "आइटम प्रकार",
        file: "फाइल",
        link: "लिंक",
        fileType: "फाइल प्रकार",
        taxe: "कर",
        category: "श्रेणी",
        subcategory: "उप श्रेणी",
        childcategory: "चाइल्ड श्रेणी",
        brand: "ब्रांड",
        gallery: "गैलरी",
        createdAt: "निर्माण तिथि",
        updatedAt: "अद्यतन तिथि",
        createdAtRange: "निर्माण तिथि",
      },
      enumerators: {
        status: {
          enable: "सक्षम",
          disable: "अक्षम",
        },
        itemType: {
          physical: "भौतिक",
          digitale: "डिजिटल",
        },
        fileType: {
          file: "फाइल",
          link: "लिंक",
        },
        isType: {
          new_arrival: "नया आगमन",
          feature_product: "फीचर उत्पाद",
          top_pdroduct: "टॉप उत्पाद",
          best_product: "सर्वश्रेष्ठ उत्पाद",
          flash_deal_product: "फ्लैश डील उत्पाद",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "नया उत्पाद",
      },
      view: {
        title: "उत्पाद देखें",
      },
      importer: {
        title: "उत्पाद आयात करें",
        fileName: "product_import_template",
        hint: "फाइलों/छवियों के कॉलम फाइलों के URL होने चाहिए जो स्पेस से अलग किए गए हों।",
      },
    },

    transaction: {
      name: "लेनदेन",
      label: "लेनदेन",
      menu: "लेनदेन",
      exporterFileName: "transaction_export",
      list: {
        menu: "लेनदेन",
        title: "लेनदेन",
      },
      create: {
        success: "लेनदेन सफलतापूर्वक भेजा गया",
      },
      update: {
        success: "लेनदेन सफलतापूर्वक सहेजा गया",
      },
      destroy: {
        success: "लेनदेन सफलतापूर्वक हटाया गया",
      },
      destroyAll: {
        success: "लेनदेन सफलतापूर्वक हटाया गया",
      },
      edit: {
        title: "लेनदेन संपादित करें",
      },
      fields: {
        id: "आईडी",
        amountRange: "राशि",
        amount: "राशि",
        email: "ईमेल",
        tax: "कर",
        currencySign: "मुद्रा चिह्न",
        currencyValue: "मुद्रा मूल्य",
        orderId: "ऑर्डर आईडी",
        createdAt: "निर्माण तिथि",
        updatedAt: "अद्यतन तिथि",
        createdAtRange: "निर्माण तिथि",
      },
      enumerators: {
        status: {
          pending: "लंबित",
          completed: "सफल",
          canceled: "रद्द",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "नया लेनदेन",
      },
      view: {
        title: "लेनदेन देखें",
      },
      importer: {
        title: "लेनदेन आयात करें",
        fileName: "transaction_import_template",
        hint: "फाइलों/छवियों के कॉलम फाइलों के URL होने चाहिए जो स्पेस से अलग किए गए हों।",
      },
    },

    order: {
      name: "ऑर्डर",
      label: "ऑर्डर",
      menu: "ऑर्डर",
      exporterFileName: "order_export",
      list: {
        menu: "ऑर्डर",
        title: "ऑर्डर",
      },
      create: {
        success: "ऑर्डर सफलतापूर्वक सहेजा गया",
      },
      update: {
        success: "ऑर्डर सफलतापूर्वक सहेजा गया",
      },
      destroy: {
        success: "ऑर्डर सफलतापूर्वक हटाया गया",
      },
      destroyAll: {
        success: "ऑर्डर सफलतापूर्वक हटाया गया",
      },
      edit: {
        title: "ऑर्डर संपादित करें",
      },
      fields: {
        id: "आईडी",
        userId: "उपयोगकर्ता",
        cart: "कार्ट",
        shipping: "शिपिंग",
        discountRange: "छूट",
        discount: "छूट",
        paymentMethod: "भुगतान विधि",
        taxe: "कर",
        transactionNumber: "लेनदेन नंबर",
        orderStatus: "ऑर्डर स्थिति",
        createdAt: "निर्माण तिथि",
        updatedAt: "अद्यतन तिथि",
        createdAtRange: "निर्माण तिथि",
      },
      enumerators: {
        orderStatus: {
          pending: "लंबित",
          in_progress: "प्रगति में",
          delivered: "वितरित",
          canceled: "रद्द",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "नया ऑर्डर",
      },
      view: {
        title: "ऑर्डर देखें",
      },
      importer: {
        title: "ऑर्डर आयात करें",
        fileName: "order_import_template",
        hint: "फाइलों/छवियों के कॉलम फाइलों के URL होने चाहिए जो स्पेस से अलग किए गए हों।",
      },
    },
  },

  roles: {
    admin: {
      label: "व्यवस्थापक",
      description: "सभी संसाधनों तक पूर्ण पहुंच",
    },
    adherent: {
      label: "सदस्य भूमिका",
      description: "सदस्य भूमिका पहुंच",
    },
    member: {
      label: "सदस्य",
      description: "सदस्य भूमिका पहुंच",
    },
  },

  components: {
    bottomNav: {
      home: "होम",
      market: "मार्केट",
      trade: "ट्रेड",
      futures: "फ्यूचर्स",
      wallets: "वॉलेट"
    },
    coinListModal: {
      title: "क्रिप्टोकरेंसी चुनें",
      loading: "क्रिप्टोकरेंसी डेटा लोड हो रहा है...",
      noResults: "कोई क्रिप्टोकरेंसी नहीं मिली",
      popular: "लोकप्रिय",
      search: {
        placeholder: "क्रिप्टोकरेंसी खोजें..."
      }
    }
  },

  auth: {
    signin: {
      title: "लॉग इन",
      button: "लॉग इन",
      signingIn: "लॉग इन हो रहा है...",
      forgotPassword: "पासवर्ड भूल गए?",
      signUp: "साइन अप",
      orContinueWith: "या जारी रखें",
      downloadApp: "हमारा ऐप डाउनलोड करें",
      appDescription: "अपने मोबाइल डिवाइस पर सर्वश्रेष्ठ क्रिप्टो अनुभव प्राप्त करें",
      googlePlay: "Google Play"
    },
    fields: {
      emailOrPhone: "ईमेल/फोन नंबर",
      password: "पासवर्ड"
    },
    tenants: "कार्यक्षेत्र",
    singindesc: "साइन इन करने के लिए अपना ईमेल और पासवर्ड दर्ज करें",
    signupdesc: "साइन अप करने के लिए अपना ईमेल और पासवर्ड दर्ज करें",
    profile: {
      title: "प्रोफाइल",
      success: "प्रोफाइल सफलतापूर्वक अपडेट की गई",
      vip: "सदस्यता लेने पर बधाई",
      wallet: "निकासी सेटिंग्स पूरी हो गईं।",
    },
    createAnAccount: "एक खाता बनाएं",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए",

    signup: "साइन अप",
    signout: "साइन आउट",
    alreadyHaveAnAccount: "पहले से ही एक खाता है? साइन इन करें।",
    social: {
      errors: {
        "auth-invalid-provider":
          "यह ईमेल पहले से ही किसी अन्य प्रदाता के साथ पंजीकृत है।",
        "auth-no-email": `इस खाते से जुड़ा ईमेल निजी या अस्तित्वहीन है।`,
      },
    },
    signinWithAnotherAccount: "किसी अन्य खाते से साइन इन करें",
    emailUnverified: {
      message: `जारी रखने के लिए कृपया <strong>{0}</strong> पर अपने ईमेल की पुष्टि करें।`,
      submit: `ईमेल सत्यापन पुनः भेजें`,
    },
    emptyPermissions: {
      message: `आपके पास अभी तक कोई अनुमति नहीं है। व्यवस्थापक द्वारा आपको विशेषाधिकार प्रदान करने की प्रतीक्षा करें।`,
    },
    passwordResetEmail: {
      message: "पासवर्ड रीसेट ईमेल भेजें",
      error: `ईमेल पहचाना नहीं गया`,
    },
    passwordReset: {
      message: "पासवर्ड रीसेट",
    },
    passwordChange: {
      title: "पासवर्ड बदलें",
      success: "पासवर्ड सफलतापूर्वक बदला गया",
      mustMatch: "पासवर्ड मेल खाने चाहिए",
    },
    emailAddressVerificationEmail: {
      error: `ईमेल पहचाना नहीं गया`,
    },
    verificationEmailSuccess: `सत्यापन ईमेल सफलतापूर्वक भेजा गया`,
    passwordResetEmailSuccess: `पासवर्ड रीसेट ईमेल सफलतापूर्वक भेजा गया`,
    passwordResetSuccess: `पासवर्ड सफलतापूर्वक बदला गया`,
    verifyEmail: {
      success: "ईमेल सफलतापूर्वक सत्यापित हो गया।",
      message: "बस एक पल, आपका ईमेल सत्यापित किया जा रहा है...",
    },
  },

  user: {
    fields: {
      gender: "लिंग",
      captcha: "कैप्चा",
      username: "उपयोगकर्ता नाम",
      walletName: "वॉलेट नाम",
      id: "आईडी",
      confirmPassword: "पासवर्ड पुष्टि करें",
      avatars: "अवतार",
      invitationcode: "आमंत्रण कोड",
      email: "ईमेल",
      emails: "ईमेल(एस)",
      erc20: "ERC20 वॉलेट पता",
      trc20: "TRC20 वॉलेट पता",
      fullName: "नाम",
      balance: "बैलेंस",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      status: "स्थिति",
      phoneNumber: "फोन नंबर",
      withdrawPassword: "निकासी पासवर्ड",
      sector: "क्षेत्र",
      employer: "नियोक्ता",
      profession: "पेशा",
      address: "पता",
      birthDate: "जन्म तिथि",
      maritalStatus: "वैवाहिक स्थिति",
      facebookLink: "फेसबुक लिंक",
      sponsor: "प्रायोजक",
      role: "भूमिका",
      createdAt: "निर्माण तिथि",
      updatedAt: "अद्यतन तिथि",
      roleUser: "भूमिका/उपयोगकर्ता",
      roles: "भूमिकाएं",
      createdAtRange: "निर्माण तिथि",
      password: "पासवर्ड",
      oldPassword: "पुराना पासवर्ड",
      newPassword: "नया पासवर्ड",
      newPasswordConfirmation: "नए पासवर्ड की पुष्टि करें",
      rememberMe: "मुझे याद रखें",
    },
    sector: {
      AGRO_ALIMENTAIRE: "खाद्य उद्योग",
      ASSURANCES: "बीमा",
      AUDIOVISUEL: "ऑडियो-विजुअल",
      BANCAIRE: "बैंकिंग",
      CHIMIE: "रसायन",
      COMPOSANTS_AUTOMOBILES: "ऑटोमोटिव घटक",
      DISTRIBUTION: "वितरण",
      DISTRIBUTION_AUTOMOBILE: "ऑटोमोटिव वितरण",
      DIVERS: "विविध",
      FINANCIER: "वित्तीय",
      HOLDING: "होल्डिंग",
      IMMOBILIER: "रियल एस्टेट",
      INDUSTRIEL: "औद्योगिक",
      LEASING: "लीजिंग",
      LOGISTIQUE_TRANSPORT: "लॉजिस्टिक्स और परिवहन",
      PHARMACEUTIQUE: "फार्मास्यूटिकल",
      SANTÉ: "स्वास्थ्य",
      TOURSIME: "पर्यटन",
      INFORMATION_TECHNOLOGY: "सूचना प्रौद्योगिकी",
    },
    maritalStatus: {
      célébataire: "अविवाहित",
      marié: "विवाहित",
    },
    status: {
      active: "सक्रिय",
      invited: "आमंत्रित",
      "empty-permissions": "अनुमतियों की प्रतीक्षा",
      inactive: "निष्क्रिय",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "पुरुष",
        female: "महिला",
      }
    },
    invite: "आमंत्रित करें",
    validations: {
      // eslint-disable-next-line
      email: "ईमेल ${value} अमान्य है",
    },
    title: "उपयोगकर्ता",
    menu: "उपयोगकर्ता",
    doAddSuccess: "उपयोगकर्ता सफलतापूर्वक सहेजे गए",
    doUpdateSuccess: "उपयोगकर्ता सफलतापूर्वक सहेजा गया",
    exporterFileName: "users_export",
    doDestroySuccess: "उपयोगकर्ता सफलतापूर्वक हटाया गया",
    doDestroyAllSelectedSuccess: "उपयोगकर्ता सफलतापूर्वक हटाए गए",
    edit: {
      title: "उपयोगकर्ता संपादित करें",
    },
    new: {
      title: "उपयोगकर्ता आमंत्रित करें",
      titleModal: "उपयोगकर्ता आमंत्रित करें",
      emailsHint:
        "कॉमा कैरेक्टर का उपयोग करके एकाधिक ईमेल पते अलग करें।",
    },
    view: {
      title: "उपयोगकर्ता देखें",
      activity: "गतिविधि",
    },
    importer: {
      title: "उपयोगकर्ता आयात करें",
      fileName: "users_import_template",
      hint: "फाइलों/छवियों के कॉलम फाइलों के URL होने चाहिए जो स्पेस से अलग किए गए हों। रिश्ते संदर्भित रिकॉर्ड्स की आईडी होनी चाहिए जो स्पेस से अलग की गई हों। भूमिकाएं भूमिका आईडी होनी चाहिए जो स्पेस से अलग की गई हों।",
    },
    errors: {
      userAlreadyExists: "इस ईमेल वाला उपयोगकर्ता पहले से मौजूद है",
      userNotFound: "उपयोगकर्ता नहीं मिला",
      revokingOwnPermission: `आप अपनी स्वयं की व्यवस्थापक अनुमति नहीं रद्द कर सकते हैं`,
    },
  },

  settings: {
    title: "सेटिंग्स",
    menu: "सेटिंग्स",
    save: {
      success:
        "सेटिंग्स सफलतापूर्वक सहेजी गईं। परिवर्तनों के प्रभावी होने के लिए पृष्ठ {0} सेकंड में पुनः लोड होगा।",
    },
    fields: {
      theme: "थीम",
      logos: "लोगो",
      backgroundImages: "बैकग्राउंड इमेज",
    },
    colors: {
      default: "डार्क",
      light: "लाइट",
      cyan: "सियान",
      "geek-blue": "गीक ब्लू",
      gold: "गोल्ड",
      lime: "लाइम",
      magenta: "मैजेंटा",
      orange: "ऑरेंज",
      "polar-green": "पोलर ग्रीन",
      purple: "पर्पल",
      red: "रेड",
      volcano: "वोलकेनो",
      yellow: "येलो",
    },
  },
  dashboard: {
    menu: "डैशबोर्ड",
    valider: "सत्यापित करें",
    file: "कोई फाइल चयनित नहीं",
    typecsv: "अमान्य फाइल प्रकार। कृपया एक CSV फाइल चुनें।",
    reset: "रीसेट",
    phone: "नंबर अपलोड करें",
    check: "नंबर जांचें",
    labelphone: "फोन नंबर लिखें",
    add: "नंबर जोड़ें",
    download: "टेम्पलेट डाउनलोड करें",
    added: "नंबर जोड़ा गया",
    duplicated: "नंबर डुप्लिकेट",
    Wrong: "नंबर गलत",
    notFound: "क्षमा करें, हमें आपके द्वारा खोजी जा रही वस्तुएं नहीं मिल सकीं।",
    validation: "नंबर सफलतापूर्वक जोड़ा गया",
    Success: "नंबर सफलतापूर्वक जोड़ा गया",
    numberValidation: "एक वैध नंबर लिखें। धन्यवाद।",
    message: `यह पृष्ठ केवल प्रदर्शन उद्देश्यों के लिए नकली डेटा का उपयोग करता है। आप इसे frontend/view/dashboard/DashboardPage.ts पर संपादित कर सकते हैं।`,
    charts: {
      day: "दिन",
      red: "लाल",
      green: "हरा",
      yellow: "पीला",
      grey: "ग्रे",
      blue: "नीला",
      orange: "नारंगी",
      months: {
        1: "जनवरी",
        2: "फरवरी",
        3: "मार्च",
        4: "अप्रैल",
        5: "मई",
        6: "जून",
        7: "जुलाई",
        8: "अगस्त",
        9: "सितंबर",
        10: "अक्टूबर",
        11: "नवंबर",
        12: "दिसंबर",
      },
      eating: "खाना",
      drinking: "पीना",
      sleeping: "सोना",
      designing: "डिजाइनिंग",
      coding: "कोडिंग",
      cycling: "साइकिल चलाना",
      running: "दौड़ना",
      customer: "ग्राहक",
      objectif: "स्थिति के अनुसार उद्देश्य",
      projectS: "स्थिति के अनुसार परियोजनाएं",
      projectT: "प्रकार के अनुसार परियोजनाएं",
      adherent: "सदस्यों की संख्या",
      news: "समाचारों की संख्या",
      project: "परियोजनाओं की संख्या",
      partner: "साझेदारों की संख्या",
      nodata: "प्रदर्शित करने के लिए कोई डेटा नहीं",
    },
  },

  errors: {
    backToHome: "होम पर वापस जाएं",
    403: `क्षमा करें, आपके पास इस पृष्ठ तक पहुंच नहीं है`,
    404: "क्षमा करें, आपके द्वारा देखा गया पृष्ठ मौजूद नहीं है",
    500: "क्षमा करें, सर्वर एक त्रुटि की रिपोर्ट कर रहा है",
    429: "बहुत सारे अनुरोध। कृपया बाद में पुनः प्रयास करें।",
    forbidden: {
      message: "निषिद्ध",
    },
    validation: {
      message: "एक त्रुटि हुई",
    },
    defaultErrorMessage: "ओप्स, एक त्रुटि हुई",
  },

  preview: {
    error: "क्षमा करें, यह ऑपरेशन पूर्वावलोकन मोड में अनुमति नहीं है।",
  },

  // See https://github.com/jquense/yup#using-a-adherent-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: "${path} अमान्य है",
      required: "${path} आवश्यक है",
      oneOf: "${path} निम्नलिखित मानों में से एक होना चाहिए: ${values}",
      notOneOf: "${path} निम्नलिखित मानों में से एक नहीं होना चाहिए: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} एक ${type} होना चाहिए`;
      },
    },
    string: {
      length: "${path} ठीक ${length} वर्णों का होना चाहिए",
      min: "${path} कम से कम ${min} वर्णों का होना चाहिए",
      max: "${path} अधिकतम ${max} वर्णों का होना चाहिए",
      matches: '${path} निम्नलिखित से मेल खाना चाहिए: "${regex}"',
      email: "${path} एक वैध ईमेल होना चाहिए",
      url: "${path} एक वैध URL होना चाहिए",
      trim: "${path} एक ट्रिम किया गया स्ट्रिंग होना चाहिए",
      lowercase: "${path} एक लोअरकेस स्ट्रिंग होना चाहिए",
      uppercase: "${path} एक अपरकेस स्ट्रिंग होना चाहिए",
      selected: "${path} चयनित होना चाहिए",
    },
    number: {
      min: "${path} ${min} से अधिक या बराबर होना चाहिए",
      max: "${path} ${max} से कम या बराबर होना चाहिए",
      lessThan: "${path} ${less} से कम होना चाहिए",
      moreThan: "${path} ${more} से अधिक होना चाहिए",
      notEqual: "${path} ${notEqual} के बराबर नहीं होना चाहिए",
      positive: "${path} एक सकारात्मक संख्या होनी चाहिए",
      negative: "${path} एक नकारात्मक संख्या होनी चाहिए",
      integer: "${path} एक पूर्णांक होना चाहिए",
    },
    date: {
      min: "${path} फ़ील्ड ${min} के बाद होनी चाहिए",
      max: "${path} फ़ील्ड ${max} से पहले होनी चाहिए",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} फ़ील्ड में ऑब्जेक्ट आकार में निर्दिष्ट कुंजियों के अलावा अन्य कुंजियाँ नहीं हो सकतीं",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} आवश्यक है`
          : `${path} फ़ील्ड में कम से कम ${min} आइटम होने चाहिए`,
      max: "${path} फ़ील्ड में ${max} आइटम से कम या बराबर होने चाहिए",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "अपलोड",
    image: "आपको एक छवि अपलोड करनी होगी",
    size: "फाइल बहुत बड़ी है। अधिकतम अनुमत आकार {0} है",
    formats: `अमान्य प्रारूप। निम्न में से एक होना चाहिए: {0}.`,
  },
  importer: {
    line: "लाइन",
    status: "स्थिति",
    pending: "लंबित",
    imported: "आयातित",
    error: "त्रुटि",
    total: `{0} आयातित, {1} लंबित और {2} त्रुटि के साथ`,
    importedMessage: `{1} में से {0} संसाधित।`,
    noNavigateAwayMessage:
      "इस पृष्ठ से दूर न नेविगेट करें या आयात रुक जाएगा।",
    completed: {
      success: "आयात पूरा हुआ। सभी पंक्तियाँ सफलतापूर्वक आयातित की गईं।",
      someErrors:
        "प्रसंस्करण पूरा हुआ, लेकिन कुछ पंक्तियाँ आयातित नहीं की जा सकीं।",
      allErrors: "आयात विफल। कोई वैध पंक्तियाँ नहीं हैं।",
    },
    form: {
      downloadTemplate: "टेम्पलेट डाउनलोड करें",
      hint: "क्लिक करें या फाइल को इस क्षेत्र में खींचें जारी रखने के लिए",
    },
    list: {
      discardConfirm: "क्या आप सुनिश्चित हैं? गैर-आयातित डेटा खो जाएगा।",
    },
    errors: {
      invalidFileEmpty: "फाइल खाली है",
      invalidFileExcel: "केवल एक्सेल (.xlsx) फाइलें अनुमत हैं",
      invalidFileUpload:
        "अमान्य फाइल। सुनिश्चित करें कि आप टेम्पलेट के अंतिम संस्करण का उपयोग कर रहे हैं।",
      importHashRequired: "आयात हैश आवश्यक है",
      importHashExistent: "डेटा पहले ही आयातित किया जा चुका है",
    },
  },

  autocomplete: {
    loading: "लोड हो रहा है...",
    noOptions: "कोई डेटा नहीं मिला",
  },

  imagesViewer: {
    noImage: "कोई छवि नहीं",
  },

  table: {
    noData: "कोई रिकॉर्ड नहीं मिला",
    loading: "लोड हो रहा है...",
  },
};

export default In;