const en = {


  common: {
    or: "Or",
    cancel: "Cancel",
    reset: "Reset",
    save: "Save",
    search: "Search",
    edit: "Edit",
    new: "New",
    export: "Export to Excel",
    noDataToExport: "No data to export",
    import: "Import",
    discard: "Discard",
    yes: "Yes",
    no: "No",
    pause: "Pause",
    areYouSure: "Are you sure?",
    view: "View",
    destroy: "Delete",
    mustSelectARow: "Must select a row",
    start: "Start",
    end: "End",
    select: "Select",
    continue: "Continue",
    filters: "Filters",
    gallery: "Gallery Imgaes",
    hightlight: "Hightlight",
    attributes: "Attributes",
    attributeoptions: "Attribute options",
    administration: "Administration",
    community: "Community",
    news: "News",
    membership: "MemberShip",
    accounting: "Accounting",
    selectbank: "Select bank",
    selectsize: "select size",
    writeamount: "write amount",
    tools: "tools",
    brushsize: "Brush size",
    configurations: "Configurations",
    logout: "Logout",
  },

  app: {
    title: "Nexus Exchange",
  },

  api: {
    menu: "API",
  },



    stake: {
      enterAmount: "Enter an amount",
      insufficientBalance: "Insufficient balance",
      minAmount: "Min: {{min}}",
      maxAmount: "Max: {{max}}",
      confirmStake: "Confirm Stake"
    },

  pages: {

    futures: {
      title: "Futures",
      actions: {
        buyUp: "BUY UP",
        buyDown: "BUY DOWN"
      },
      tabs: {
        openOrders: "Open Orders",
        recentOrders: "Recent Orders"
      },
      orderDetails: {
        title: "Order Details",
        open: "Open",
        closed: "Closed",
        completed: "Completed",
        futuresAmount: "Futures Amount:",
        contractDuration: "Contract Duration:",
        seconds: "Seconds",
        futuresStatus: "Futures Status:",
        openPositionPrice: "Open Position Price:",
        openPositionTime: "Open Position Time:",
        closePositionPrice: "Close Position Price:",
        closePositionTime: "Close Position Time:",
        profitLossAmount: "Profit And Loss Amount:",
        leverage: "Leverage:",
        done: "Done"
      },
      status: {
        open: "Open",
        closed: "Closed",
        completed: "Completed"
      },
      list: {
        noOrders: "No orders"
      }
    },
    proof: {
      title: "Identity Verification",
      instructions: "Verify your identity to access all features of your Nexus Exchange",
      sections: {
        documentInfo: "Document Information",
        documentUpload: "Document Upload"
      },
      fields: {
        documentType: "Document Type",
        fullName: "Full Name",
        documentNumber: "Document Number",
        address: "Address",
        frontSide: "Front of Document",
        backSide: "Back of Document",
        selfie: "Selfie with Document"
      },
      placeholders: {
        fullName: "Enter your full name",
        documentNumber: "Enter your document number",
        address: "Enter your complete address"
      },
      uploadTexts: {
        frontSide: "Upload front side of your document",
        backSide: "Upload back side of your document",
        selfie: "Upload a selfie holding your document"
      },
      documentTypes: {
        passport: "Passport",
        idCard: "ID Card",
        driversLicense: "Driver's License"
      },
      security: {
        title: "Security Notice",
        text: "Your information is encrypted and secure. We use bank-level protection and manually verify each document for your safety."
      },
      buttons: {
        validateDocuments: "VALIDATE DOCUMENTS"
      },
      footer: {
        copyright: "© 2025 CryptoWallet. All rights reserved.",
        privacyPolicy: "Privacy Policy"
      }
    },

    withdrawPassword: {
      title: "Withdraw Password",
      cardTitle: "CHANGE WITHDRAW PASSWORD",
      fields: {
        currentPassword: "Current Password",
        newPassword: "New Password"
      },
      placeholders: {
        currentPassword: "Enter your Old password",
        newPassword: "Confirm your new password"
      },
      buttons: {
        saveChanges: "SAVE CHANGES"
      },
      warningMessage: "For the safety of your funds, withdrawals are not allowed within 24 hours after the login password has been changed."
    },

    loginPassword: {
      title: "Login Password",
      cardTitle: "CHANGE LOGIN PASSWORD",
      fields: {
        oldPassword: "Old Password",
        newPassword: "New Password",
        newPasswordConfirmation: "Confirm Password"
      },
      placeholders: {
        oldPassword: "Enter your current password",
        newPassword: "Create a new password",
        confirmPassword: "Confirm your new password"
      },
      buttons: {
        saveChanges: "SAVE CHANGES"
      },
      warningMessage: "For the safety of your funds, withdrawals are not allowed within 24 hours after the login password has been changed.",
      validation: {
        mustMatch: "Passwords must match"
      }
    },

    passwordType: {
      title: "Password Type",
      cardTitle: "SELECT PASSWORD TYPE",
      options: {
        login: {
          title: "Login Password",
          description: "Change your account login password"
        },
        withdrawal: {
          title: "Withdrawal Password",
          description: "Change your crypto withdrawal password"
        }
      }
    },

    withdrawAddressForm: {
      title: "Withdrawal Address",
      currencyType: "CURRENCY TYPE",
      withdrawalAddress: "WITHDRAWAL ADDRESS",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        usdt: "USDT (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      },
      fields: {
        address: "Address",
        password: "Crypto Withdrawal Password"
      },
      placeholders: {
        address: "Enter your wallet address",
        password: "Enter your current password"
      },
      buttons: {
        save: "SAVE"
      },
      notification: {
        success: "Address saved successfully!"
      }
    },

    withdrawAddress: {
      title: "Withdrawal Address",
      cardTitle: "CURRENCY TYPE",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        usdt: "USDT (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      }
    },

    privacy: {
      title: "Privacy Portal",
      hero: {
        title: "Nexus Privacy Portal",
        subtitle: "Protecting your data and privacy with strict guidelines, legal compliance, and industry best practices."
      },
      principles: {
        title: "Our Privacy Principles",
        corePrinciples: "Core Principles",
        transparency: {
          title: "Transparency",
          description: "Regular updates and clear information about how we handle your data."
        },
        accountability: {
          title: "Accountability & Compliance",
          description: "Regular audits, certifications, and adherence to global privacy laws."
        },
        dataSecurity: {
          title: "Data Security",
          description: "Advanced encryption, strict access controls, and identity verification protocols."
        },
        dataMinimization: {
          title: "Data Minimization & Purpose Limitation",
          description: "We collect only what's necessary for specific, legitimate purposes."
        },
        privacyByDesign: {
          title: "Privacy by Design",
          description: "Privacy is built into all our products and services from the ground up."
        }
      },
      userRights: {
        title: "Your Privacy Rights",
        content: "You have tools to access and manage your data via our app or webform, with detailed information available in our Privacy Notice.",
        note: "Exercise your rights to access, correct, or delete your personal information at any time."
      },
      personalData: {
        title: "What Is Personal Data?",
        definition: "Personal data refers to any information that identifies an individual.",
        examples: "Examples include: name, Nexus ID, email address, location data, transaction history, and device information."
      },
      dataUsage: {
        title: "How We Use Your Data",
        accountManagement: {
          title: "Account Management",
          description: "To create and maintain your account, provide services, and communicate with you."
        },
        legalCompliance: {
          title: "Legal Compliance",
          description: "To fulfill our obligations under applicable laws including Anti-Money Laundering (AML) regulations."
        },
        securityFraud: {
          title: "Security & Fraud Prevention",
          description: "To protect your account, detect and prevent fraud, and ensure platform security."
        },
        customerSupport: {
          title: "Customer Support",
          description: "To respond to your inquiries and provide technical assistance when needed."
        },
        marketing: {
          title: "Marketing & Communications",
          description: "To send you relevant updates, product information, and promotional materials (with your consent)."
        },
        transactionProcessing: {
          title: "Transaction Processing",
          description: "To facilitate cryptocurrency transactions and maintain transaction records."
        }
      },
      dataRetention: {
        title: "Data Retention",
        content: "We retain your data for as long as necessary to provide our services, comply with legal obligations (such as tax and AML requirements), resolve disputes, and enforce our agreements."
      },
      dataSharing: {
        title: "Data Sharing",
        content: "We may share your data with other Nexus entities or trusted third parties under strict contractual safeguards, only when necessary for the purposes outlined in our Privacy Notice."
      },
      cookies: {
        title: "Cookies & Tracking",
        content: "We use cookies and similar technologies to enhance your user experience, provide personalized marketing, and analyze how our services are used.",
        link: "View our complete Cookie Policy"
      },
      actionCards: {
        privacyNotice: {
          title: "Privacy Notice",
          description: "Read our full privacy policy"
        },
        manageData: {
          title: "Manage Data",
          description: "Access and control your information"
        },
        cookieSettings: {
          title: "Cookie Settings",
          description: "Adjust your tracking preferences"
        },
        helpCenter: {
          title: "Help Center",
          description: "Get answers to privacy questions"
        }
      },
      notification: "Action completed successfully!"
    },

    termsOfUse: {
      title: "Terms of Use",
      hero: {
        title: "Nexus Terms of Use"
      },
      agreement: {
        title: "Agreement",
        content: "This is a binding agreement between you (the user) and Nexus. It covers all Nexus Services you access or use."
      },
      riskWarning: {
        title: "Risk Warning",
        content: "Digital assets are volatile and can fluctuate significantly in value. Nexus is not a broker, financial advisor, or investment advisor. You must conduct your own due diligence before making any financial decisions."
      },
      aboutServices: {
        title: "About Our Services",
        aboutNexus: {
          title: "About Nexus",
          content: "Nexus provides digital asset exchange, custody services, and related financial services through our platform."
        },
        eligibility: {
          title: "Eligibility",
          content: "You must be at least 18 years old, legally able to enter into contracts, not restricted from using our services, and not located in prohibited jurisdictions."
        },
        communication: {
          title: "Communication",
          content: "You must keep your contact information updated. Nexus will contact you via email, SMS, or phone regarding your account and our services."
        }
      },
      services: {
        title: "Our Services",
        servicesProvided: {
          title: "Services Provided",
          content: "Nexus offers digital asset trading, secure custody solutions, and customer support through both automated bots and human representatives. User chat functionality is also available."
        },
        fees: {
          title: "Fees",
          content: "All applicable fees are listed on our Fee Structure page and are subject to updates. You are responsible for reviewing the current fee schedule before conducting transactions."
        }
      },
      accountManagement: {
        title: "Account Management",
        accountCreation: {
          title: "Account Creation",
          content: "You must open an account (individual or corporate) to access our services. This requires completing identity verification procedures (KYC/AML) as required by law."
        },
        identityVerification: {
          title: "Identity Verification",
          content: "You must complete our Know Your Customer (KYC) and Anti-Money Laundering (AML) verification processes before using certain services."
        },
        accountRecords: {
          title: "Account Records",
          content: "You may maintain records and create sub-accounts under specific conditions outlined in our account management policies."
        }
      },
      transactions: {
        title: "Transactions",
        sufficientBalance: {
          title: "Sufficient Balance",
          content: "You must maintain sufficient balance in your account for any transactions you initiate. Transactions may fail or incur additional fees if insufficient funds are available."
        },
        transactionCancellation: {
          title: "Transaction Cancellation",
          content: "Nexus reserves the right to cancel or amend transactions in cases of suspected fraud, errors, or violations of these Terms."
        },
        unauthorizedTransactions: {
          title: "Unauthorized Transactions",
          content: "You are responsible for any unauthorized transactions unless you can prove otherwise through our dispute resolution process."
        }
      },
      digitalAssets: {
        title: "Digital Assets",
        supportedAssets: {
          title: "Supported Assets",
          content: "You may only transact with digital assets explicitly supported by Nexus. Attempting to deposit unsupported assets may result in permanent loss."
        },
        forksAirdrops: {
          title: "Forks & Airdrops",
          content: "Nexus does not guarantee support for blockchain forks, airdrops, or other similar events. Support decisions are made at our sole discretion."
        }
      },
      accountSecurity: {
        title: "Account Security",
        securityRequirements: {
          title: "Security Requirements",
          content: "You must use a strong password, enable multi-factor authentication (MFA), never share credentials, monitor account activity regularly, and immediately report any security breaches."
        }
      },
      privacy: {
        title: "Privacy",
        content: "Your privacy is governed by the Nexus Privacy Notice, which explains how we collect, use, and protect your personal information."
      },
      termination: {
        title: "Account Termination",
        terminationSuspension: {
          title: "Termination/Suspension",
          content: "Nexus may restrict, suspend, or terminate accounts for fraud, law violations, suspicious activity, or Terms violations. Users may close accounts unless frozen or dormant."
        }
      },
      prohibitedUse: {
        title: "Prohibited Use",
        content: "You may not use Nexus services for fraud, market manipulation, illegal activities, unauthorized access, or any purpose that violates applicable laws or these Terms."
      },
      liability: {
        title: "Liability & Intellectual Property",
        liability: {
          title: "Liability",
          content: "Nexus is not responsible for losses except in cases of proven gross negligence or fraud. We are not liable for market fluctuations, technical issues, or third-party actions."
        },
        intellectualProperty: {
          title: "Intellectual Property",
          content: "Nexus retains all intellectual property rights to our platform, technology, and branding. Users receive a limited license to use our services as outlined in these Terms."
        },
        indemnity: {
          title: "Indemnity",
          content: "You agree to indemnify and hold Nexus harmless against any claims, losses, or damages resulting from your misuse of our services or violation of these Terms."
        }
      },
      importantNotice: {
        title: "Important Notice",
        content: "By using Nexus services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree, you must discontinue use of our services immediately."
      },
      actionCards: {
        security: {
          title: "Security",
          description: "Keep your account safe."
        },
        helpCenter: {
          title: "Help Center",
          description: "Get answers to your questions"
        },
        privacyPolicy: {
          title: "Privacy Policy",
          description: "Review our privacy practices"
        },
        legal: {
          title: "Legal",
          description: "View all legal documents"
        }
      },
      footer: {
        copyright: "© 2025 Nexus Exchange. All rights reserved.",
        lastUpdated: "Last updated: 6 May 2025"
      }
    },
    marketDetail: {
      stats: {
        high: "24h High",
        low: "24h Low",
        volume: "24h Vol"
      },
      volume: {
        billion: "B",
        million: "M"
      },
      actions: {
        buy: "BUY",
        sell: "SELL"
      },
      recentTrades: {
        title: "Recent Trades (Live)",
        price: "Price (USDT)",
        amount: "Amount",
        time: "Time"
      }
    },
    assetsDetail: {
      title: "Asset Details",
      today: "Today",
      yesterday: "Yesterday",
      filter: "Filter",
      transactionHistory: {
        title: "Transaction History"
      },
      noTransactions: {
        title: "No Transactions Yet",
        description: "Your transaction history will appear here once you start trading."
      },
      status: {
        completed: "Completed",
        pending: "Pending",
        canceled: "Canceled"
      },
      filterModal: {
        title: "Filter Transactions",
        status: "Status",
        type: "Type",
        direction: "Direction",
        startDate: "Start Date",
        endDate: "End Date",
        allStatuses: "All Statuses",
        allTypes: "All Types",
        bothDirections: "Both Directions",
        incoming: "Incoming",
        outgoing: "Outgoing",
        completed: "Completed",
        pending: "Pending",
        canceled: "Canceled",
        resetFilters: "Reset Filters",
        applyFilters: "Apply Filters"
      },
      actions: {
        deposit: "Deposit",
        withdraw: "Withdraw"
      },
      transactionTypes: {
        transaction: "Transaction",
        deposit: "Deposit",
        withdrawal: "Withdrawal",
        convertedFrom: "Converted from {{asset}}",
        convertedTo: "Converted to {{asset}}",
        conversionIn: "Conversion In",
        conversionOut: "Conversion Out",
        stakedAmount: "Staked Amount",
        stakingRewards: "Staking Rewards",
        futuresReserved: "Futures Reserved",
        futuresProfit: "Futures Profit",
        futuresLoss: "Futures Loss",
        futuresSettlement: "Futures Settlement",
        futuresFee: "Futures Fee",
        futuresRefund: "Futures Refund",
        futuresBonus: "Futures Bonus",
        futuresCommission: "Futures Commission",
        manualProfit: "Manual Profit",
        manualLoss: "Manual Loss",
        manualAdjustment: "Manual Adjustment",
        spotTradingProfit: "Spot Trading Profit",
        spotTradingLoss: "Spot Trading Loss",
        referralReward: "Referral Reward",
        bonus: "Bonus",
        referralCommission: "Referral Commission",
        orderReserved: "Order Reserved",
        orderCancelled: "Order Cancelled",
        orderPartialFill: "Order Partial Fill",
        orderCompleted: "Order Completed",
        feePayment: "Fee Payment",
        balanceAdjustment: "Balance Adjustment",
        transfer: "Transfer"
      }
    },

    invitation: {
      title: "Invite Friends",
      earnTogether: "Earn Together",
      description: "Invite friends to join NEXUS and earn rewards when they sign up and start trading.",
      yourReferralCode: "YOUR REFERRAL CODE",
      loading: "Loading...",
      copied: "COPIED!",
      copyCode: "COPY CODE",
      totalEarned: "Total Earned",
      allTimeCommission: "All Time Commission",
      generationMembers: "Generation Members",
      noGenerationData: "No generation data available",
      approvedMembers: "Approved Members",
      pendingMembers: "Pending Members",
      commissionStructure: "Commission Structure",
      firstGeneration: "1st Generation",
      secondGeneration: "2nd Generation",
      thirdGeneration: "3rd Generation",
      firstDepositCommission: "First Deposit Commission",
      stakingProfitsCommission: "Staking Profits Commission",
      howItWorks: "How It Works",
      steps: {
        shareCode: {
          title: "Share Your Referral Code",
          description: "Send your unique code to friends or share it on social media."
        },
        friendsSignUp: {
          title: "Friends Sign Up",
          description: "Your friends sign up using your referral code and verify their accounts."
        },
        earnCommissions: {
          title: "Earn Commissions",
          description: "Earn commissions from your network's first deposits and staking profits."
        }
      },
      referralCopied: "Referral code copied to clipboard!",
      loadingMembers: "Loading members...",
      approved: "Approved",
      joined: "Joined",
      noMembersFound: "No members found"
    },

    securityTips: {
      title: "Security Center",
      essentialTips: "Essential Security Tips",
      categories: {
        passwordSecurity: "Password Security",
        deviceSecurity: "Device Security",
        accountSecurity: "Account Security"
      },
      tips: {
        strongPasswords: {
          title: "Use Strong, Unique Passwords",
          description: "Create complex passwords with uppercase, lowercase, numbers, and symbols."
        },
        enable2FA: {
          title: "Enable Two-Factor Authentication",
          description: "Add an extra layer of security to your account with 2FA."
        },
        changePasswords: {
          title: "Change Passwords Regularly",
          description: "Update your passwords every 3-6 months."
        },
        softwareUpdated: {
          title: "Keep Software Updated",
          description: "Regularly update your OS, browser, and wallet software."
        },
        antivirus: {
          title: "Use Antivirus Protection",
          description: "Install reputable antivirus and anti-malware software."
        },
        publicWifi: {
          title: "Avoid Public Wi-Fi",
          description: "Never access your wallet on public networks without a VPN."
        },
        loginNotifications: {
          title: "Enable Login Notifications",
          description: "Get alerts for new logins to your account."
        },
        reviewActivity: {
          title: "Review Account Activity",
          description: "Regularly check your account for suspicious activity."
        },
        whitelisting: {
          title: "Use Whitelisting",
          description: "Whitelist trusted withdrawal addresses for added security."
        }
      },
      actions: {
        enable2FA: "Enable 2FA",
        enable2FADesc: "Add an extra layer of security",
        activityLog: "Activity Log",
        activityLogDesc: "Review recent account activity",
        settings: "Settings",
        settingsDesc: "Configure security preferences",
        backupCodes: "Backup Codes",
        backupCodesDesc: "Save your recovery codes"
      },
      emergency: {
        title: "Emergency Procedures",
        unauthorizedAccess: "If you suspect unauthorized access to your account, immediately change your password and enable 2FA if not already active.",
        lostDevice: "If your device is lost or stolen, immediately revoke session access from your account settings.",
        phishing: "If you've fallen victim to a phishing attempt, freeze your account and contact support immediately.",
        supportTitle: "24/7 Security Support",
        supportEmail: "support@nexus-exchange.com"
      },
      resources: {
        title: "Security Resources",
        securityGuide: "Security Guide",
        securityGuideLink: "Read comprehensive security documentation",
        learningCenter: "Learning Center",
        learningCenterLink: "Learn about crypto security best practices",
        faq: "FAQ",
        faqLink: "Find answers to common security questions"
      }
    },
    profile: {
      title: "Profile",
      settings: "Settings",
      status: {
        verified: "VERIFIED",
        unverified: "UNVERIFIED"
      },
      accountInfo: {
        title: "ACCOUNT INFO",
        email: "Email",
        creditScore: "Credit Score",
        invitationCode: "Invitation Code"
      },
      verification: {
        pending: {
          title: "Verification Pending",
          description: "Your account verification is in progress. This usually takes 1-3 business days."
        },
        alert: {
          title: "Account Not Verified",
          description: "Verify your account to unlock all features and higher limits",
          verifyNow: "Verify Now"
        }
      },
      pendingVerifications: {
        title: "PENDING VERIFICATIONS",
        identity: {
          title: "Identity Verification",
          description: "Submit your government ID"
        },
        address: {
          title: "Address Verification",
          description: "Verify your residence"
        },
        status: {
          pending: "Pending"
        }
      },
      approvedVerifications: {
        title: "VERIFICATIONS APPROVED",
        identity: {
          title: "Identity Verification"
        },
        address: {
          title: "Address Verification"
        },
        status: {
          completed: "Completed"
        }
      },
      limitations: {
        title: "Account Limitations",
        withdrawalLimit: "Withdrawal limit: $1,000 per day",
        stakingLimited: "Staking options limited",
        advancedTrading: "Advanced trading features disabled",
        fiatDeposits: "Fiat currency deposits not available"
      },
      menu: {
        withdrawalAddress: "Withdrawal Address",
        password: "Password",
        notifications: "Notifications",
        myInvitation: "My Invitation",
        language: "Language",
        termsOfUse: "Terms of Use",
        privacyPortal: "Privacy Portal",
        aboutUs: "About Us",
        msbApproval: "MSB Approval",
        customerSupport: "Customer Support",
        downloadApp: "Download App",
        logout: "Logout"
      }
    },
    notification: {
      title: "Notification",
      loading: "Loading",
      filters: {
        all: "All",
        unread: "Unread",
        read: "Read"
      },
      emptyState: {
        title: "No notifications yet",
        noNotifications: "You don't have any notifications yet",
        noFilteredNotifications: "No {0} notifications found"
      },
      types: {
        deposit: {
          title: "Deposit Received",
          message: "Your deposit of {0} has been confirmed and credited to your wallet."
        },
        withdraw: {
          title: "Withdrawal Successful",
          message: "Your withdrawal of {0} has been processed successfully."
        },
        staking: {
          title: "Staking Profit",
          message: "You earned {0} from your staking rewards."
        },
        kyc: {
          title: "KYC Update",
          defaultMessage: "Your account has been activated."
        },
        commission: {
          title: "Commission Received",
          message: "You received a commission of {0}."
        },
        futures: {
          title: "Futures Update",
          message: "Your futures transaction amount {0} has been executed."
        },
        accountActivated: {
          title: "KYC Verification",
          message: "Hello {0} your KYC documents have been verified you can now enjoy unlimited features on Nexus Exchange"
        },
        custom: {
          title: "Notification",
          defaultMessage: "You have a new notification."
        },
        cancelDeposit: {
          title: "Deposit Cancelled",
          message: "Your deposit of {0} has been cancelled."
        },
        cancelWithdraw: {
          title: "Withdrawal Cancelled",
          message: "Your withdrawal of {0} has been cancelled."
        },
        cancelActivated: {
          title: "Activation Cancelled",
          message: "Your KYC was declined by system please try again or contact Customer Support for help"
        }
      }
    },


    staking: {
      title: "Staking",
      totalStakedBalance: "Total Staked Balance",
      earned: "earned",
      tabs: {
        options: "Options",
        active: "Active Stakes",
        completed: "Completed"
      },
      daily: "Daily",
      minimumStake: "Minimum Stake",
      unstakingPeriod: "Unstaking Period",
      days: "days",
      stakeButton: "Stake {0}",
      status: {
        active: "ACTIVE",
        completed: "COMPLETED"
      },
      remaining: "Remaining",
      dailyRate: "Daily Rate",
      duration: "Duration",
      createdAt: "Created At",
      dateFinish: "Date finish",
      totalCompletedRewards: "TOTAL COMPLETED REWARDS",
      stake: "STAKE",
      stakes: "STAKES",
      allRewardsFromCompleted: "All rewards from completed stakes",
      totalRewardsEarned: "TOTAL REWARDS EARNED",
      balance: "Balance",
      maximumStake: "Maximum Stake",
      estimatedTotalRewards: "Estimated Total Rewards",
      exploreStakingOptions: "Explore Staking Options",
      startStaking: "Start Staking",
      emptyStates: {
        options: {
          title: "No Staking Plans Available",
          message: "There are currently no staking plans available. Please check back later for new staking opportunities."
        },
        active: {
          title: "No Active Stakes",
          message: "You don't have any active stakes yet. Start staking to earn rewards on your crypto assets."
        },
        completed: {
          title: "No Completed Stakes",
          message: "You haven't completed any stakes yet. Your completed stakes will appear here once they finish."
        }
      },
      stakeModal: {
        title: "Stake",
        amountToStake: "Amount to Stake",
        enterAmount: "Enter The Amount"
      }
    },
    conversion: {
      title: "Convert Crypto",
      loading: "Loading latest prices...",
      youSend: "You send",
      youReceive: "You receive",
      balance: "Balance",
      max: "MAX",
      insufficientBalance: "Insufficient balance",
      estimatedConversion: "Estimated conversion",
      selectDifferentCurrencies: "Select different currencies",
      convertNow: "Convert Now",
      pricesUpdate: "Prices update in real-time",
      selectCurrency: "Select Currency",
      searchCurrencies: "Search currencies...",
      confirmConversion: "Confirm Conversion",
      conversionDetails: "Conversion Details",
      exchangeRate: "Exchange Rate",
      networkFee: "Network Fee",
      estimatedArrival: "Estimated Arrival",
      arrivalTime: "~30 seconds",
      processingConversion: "Processing Conversion...",
      cancel: "Cancel"
    },

    history: {
      title: "Transaction History",
      emptyState: {
        title: "No transactions found",
        description: "Try changing your filters to see more transactions"
      },
      filters: {
        all: "All",
        deposits: "Deposits",
        withdrawals: "Withdrawals",
        profits: "Profits",
        losses: "Losses",
        conversions: "Conversions",
        stacking: "Stacking"
      },
      statusFilters: {
        allStatus: "All Status",
        completed: "Completed",
        pending: "Pending",
        canceled: "Canceled"
      },
      timeFilters: {
        allTime: "All Time",
        today: "Today",
        week: "Week",
        month: "Month",
        year: "Year"
      },
      status: {
        completed: "Completed",
        pending: "Pending",
        canceled: "Canceled"
      },
      dateFormats: {
        today: "Today, {0}",
        yesterday: "Yesterday, {0}"
      },
      transactionTypes: {
        transaction: "Transaction",
        deposit: "Deposit",
        withdrawal: "Withdrawal",
        convertedFrom: "Converted from {0}",
        convertedTo: "Converted to {0}",
        conversionIn: "Conversion In",
        conversionOut: "Conversion Out",
        stakedAmount: "Staked Amount",
        stakingRewards: "Staking Rewards",
        futuresReserved: "Futures Reserved",
        futuresProfit: "Futures Profit",
        futuresLoss: "Futures Loss",
        futuresSettlement: "Futures Settlement",
        futuresFee: "Futures Fee",
        futuresRefund: "Futures Refund",
        futuresBonus: "Futures Bonus",
        futuresCommission: "Futures Commission",
        manualProfit: "Manual Profit",
        manualLoss: "Manual Loss",
        manualAdjustment: "Manual Adjustment",
        spotTradingProfit: "Spot Trading Profit",
        spotTradingLoss: "Spot Trading Loss",
        referralReward: "Referral Reward",
        bonus: "Bonus",
        referralCommission: "Referral Commission",
        orderReserved: "Order Reserved",
        orderCancelled: "Order Cancelled",
        orderPartialFill: "Order Partial Fill",
        orderCompleted: "Order Completed",
        feePayment: "Fee Payment",
        balanceAdjustment: "Balance Adjustment",
        transfer: "Transfer"
      }
    },

    withdraw: {
      title: "Withdraw Crypto",
      selectCurrency: "Select Currency",
      selectPlaceholder: "Select a currency",
      selectHint: "Please select a currency to continue",
      withdrawalAddress: "Withdrawal Address",
      withdrawalAmount: "Withdrawal Amount",
      withdrawalPassword: "Withdrawal Password",
      passwordPlaceholder: "Enter withdrawal password",
      available: "Available",
      amountWithdrawal: "Amount withdrawal",
      minimumWithdrawal: "Minimum withdrawal",
      networkFee: "Network fee",
      youWillReceive: "You will receive",
      confirmWithdrawal: "Confirm Withdrawal",
      processing: "Processing...",
      securityVerification: "Security Verification",
      securityMessage: "For your security, withdrawals require password confirmation and may be subject to review. Withdrawals to incorrect addresses cannot be reversed.",
      networkInfo: "Network: {0} ({1})",
      noWalletAddress: "(No wallet address)",
      noWallet: {
        title: "No Wallet Address Found",
        description: "You haven't added any wallet addresses yet. Please add a withdrawal address to proceed with your transaction.",
        addButton: "Add Wallet Address"
      },
      security: {
        title: "Security First",
        description: "For your security, we require a verified withdrawal address for each cryptocurrency. This helps prevent errors and ensures your funds reach the correct destination."
      },
      errors: {
        amountNumber: "Withdrawal amount must be a number",
        amountRequired: "Withdrawal amount is required",
        amountPositive: "Withdrawal amount must be greater than 0",
        amountMin: "Amount is below the minimum withdrawal for this currency",
        passwordRequired: "Withdrawal password is required",
        noWalletAddress: "No wallet address found for {0}. Please add a wallet address first.",
        minimumWithdraw: "Minimum withdraw for {0}: {1} {2}",
        insufficientForFee: "Not enough balance to cover fee ({0} {1})"
      },
      validation: {
        selectCurrency: "Select currency",
        enterAmount: "Enter amount",
        belowMin: "Below minimum ({0} {1})",
        insufficientBalance: "Insufficient balance",
        insufficientForFee: "Insufficient balance (including fee)",
        enterPassword: "Enter password"
      }
    },
    deposit: {
      title: "Deposit Crypto",
      loading: "Deposit method loading ...",
      selectNetwork: "Select Network",
      depositAddress: "Your deposit address",
      copyAddress: "Copy Address",
      amountLabel: "Deposit amount ({0})",
      amountPlaceholder: "Minimum: {0} {1}",
      txidLabel: "Transaction ID (TXID)",
      txidPlaceholder: "Enter The TXID",
      minimumDeposit: "Minimum deposit",
      importantNotice: "Important Notice",
      warningMessage: "Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered.",
      confirmDeposit: "Confirm Deposit",
      network: "Network",
      estimatedArrival: "Estimated arrival",
      networkConfirmations: "3 network confirmations",
      processingTime: "Processing time",
      processingTimeValue: "10-30 minutes",
      noMethods: "No deposit methods available at the moment.",
      addressCopied: "Address copied to clipboard!",
      unknownNetwork: "Unknown Network"
    },

    wallet: {
      totalPortfolioValue: "Total Portfolio Value",
      myAssets: "My Assets",
      manage: "Manage",
      noAssets: "No assets found",
      quickActions: {
        deposit: "Deposit",
        withdraw: "Withdraw",
        history: "History",
        convert: "Convert",
        staking: "Staking"
      }
    },

    trade: {
      title: "SPOT",
      buy: "BUY",
      sell: "SELL",
      limit: "LIMIT",
      market: "MARKET",
      orderType: "Order Type",
      price: "Price (USDT)",
      amount: "Amount",
      available: "Available",
      placing: "Placing...",
      increasePrice: "increase price",
      decreasePrice: "decrease price",
      errors: {
        invalidQuantity: "Please enter a valid quantity.",
        invalidPrice: "Please enter a valid price.",
        insufficientUSDT: "Insufficient USDT balance. Available: {0} USDT",
        insufficientCoin: "Insufficient {1} balance. Available: {0} {1}",
        failedOrder: "Failed to place order. Please try again."
      },
      orderBook: {
        price: "Price (USDT)",
        amount: "Amount"
      },
      openOrders: {
        title: "OPEN ORDERS",
        viewAll: "view all orders",
        status: "Status",
        price: "Price",
        amount: "Amount",
        total: "Total",
        cancel: "Cancel",
        noOrders: "No open orders yet",
        noOrdersSubtext: "Your open orders will appear here"
      }
    },

    market: {
      title: "USDT MARKET",
      noResults: "No cryptocurrencies found",
      volume: "Vol",
      search: {
        placeholder: "Search crypto",
        clear: "Clear search"
      },
      tabs: {
        all: "All",
        gainers: "Gainers",
        losers: "Losers",
        favorites: "Favorites"
      }
    },
    signup: {
      title: "SIGN UP",
      creatingAccount: "CREATING...",
      createAccount: "CREATE ACCOUNT",
      refresh: "Refresh",
      captchaMismatch: "Captcha does not match",
      alreadyHaveAccount: "Already have an account? Log in",
      terms: {
        text: "By creating an account, you agree to our",
        link: "Terms of Service"
      },
      labels: {
        email: "Email",
        phoneNumber: "Phone Number",
        captcha: "Graphical Captcha",
        password: "Password",
        confirmPassword: "Confirm Password",
        withdrawPassword: "Withdraw Password",
        invitationCode: "Invitation Code"
      },
      placeholders: {
        email: "Enter your email",
        phoneNumber: "Enter your phone number",
        captcha: "Enter code",
        password: "Create a password",
        confirmPassword: "Confirm your password",
        withdrawPassword: "Enter the withdraw Password",
        invitationCode: "Enter invitation code"
      }
    },
    home: {
      quickAccess: {
        title: "Quick Access",
        deposit: "Deposit",
        security: "Security",
        faqCenter: "FAQ Center",
        invitation: "Invitation",
        staking: "Staking"
      },
      popularCryptos: "Popular Cryptocurrencies",
      seeAll: "See all",
      volume: "Vol",
      loading: "Loading...",
      notifications: {
        btcAlert: "BTC Price Alert",
        btcReached: "Bitcoin reached $45,000",
        fiveMinAgo: "5 min ago",
        depositSuccess: "Deposit Successful",
        depositConfirmed: "Your deposit of 0.5 ETH is confirmed",
        oneHourAgo: "1 hour ago",
        securityUpdate: "Security Update",
        newSecurityFeatures: "New security features available",
        twoHoursAgo: "2 hours ago",
        marketNews: "Market News",
        ethUpgrade: "Ethereum upgrade completed successfully",
        fiveHoursAgo: "5 hours ago"
      }
    },
    faq: {
      title: "FAQ Center",
      hero: {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about using Nexus"
      },
      search: {
        placeholder: "Search for answers..."
      },
      categories: {
        gettingStarted: "Getting Started",
        managingAccount: "Managing Your Account"
      },
      questions: {
        howToCreateAccount: "How do I create an account?",
        howToCompleteVerification: "How do I complete verification?",
        howToBuyCrypto: "How do I buy cryptocurrency?",
        howToTrade: "How do I trade cryptocurrencies?",
        howToSendReceive: "How do I receive and send crypto?",
        howToBecomeP2PMerchant: "How do I become a P2P Merchant?",
        howStakingWorks: "How does staking work?"
      },
      answers: {
        verificationProcess: "Upload a government-issued ID and a selfie photo. Verification is usually approved within hours."
      },
      steps: {
        goToWebsite: "Go to https://nexus-exchange.com",
        clickSignUp: 'Click "Sign Up"',
        enterDetails: "Enter your details",
        verifyEmail: "Verify your email address",
        completeVerification: "Complete verification first",
        clickBuyCrypto: 'Click "Buy Crypto"',
        selectCoinAndPayment: "Select coin and payment method",
        confirmTransaction: "Confirm transaction",
        cryptoInWallet: "Crypto will appear in your wallet",
        goToTradeMarkets: 'Go to "Trade/Markets"',
        pickTradingPair: "Pick a trading pair (e.g., BTC/USDT)",
        placeOrders: "Place market or limit orders",
        receiveCrypto: "Go to Wallet > Receive → copy address or QR code",
        sendCrypto: "Go to Wallet > Send → enter address/amount → confirm",
        applyP2P: 'Apply under "P2P" section',
        meetCriteria: "Meet eligibility criteria",
        createOffers: "Once approved, create offers & trade",
        goToStaking: "Go to Wallets > Staking",
        pickStakingPlan: "Pick a staking plan",
        selectAmount: "Select amount to stake",
        confirmStaking: "Confirm transaction",
        rewardsProcessed: "Rewards processed automatically at end of period"
      },
      labels: {
        toReceive: "To receive:",
        toSend: "To send:"
      },
      futures: {
        title: "Futures Trading Explained",
        whatAreFutures: "What are futures contracts?",
        futuresExplanation: "Agreements to buy or sell crypto at a predetermined price on a future date (cash-settled).",
        whatIsLeverage: "What is leverage?",
        leverageExplanation: "Ability to trade with more capital than you have (e.g., 10x, 20x, 50x leverage).",
        longShortPositions: "What are Long and Short positions?",
        long: "Long",
        longExplanation: "= betting the price will go up",
        short: "Short",
        shortExplanation: "= betting the price will go down",
        marginLiquidation: "What are Margin & Liquidation?",
        marginExplanation: "Risk of position liquidation if your collateral drops too low to maintain the position.",
        fundingRate: "What is the Funding Rate?",
        fundingRateExplanation: "Fee exchanged every 8 hours between long and short traders to balance perpetual contract prices with spot prices.",
        profitLossCalculation: "How is Profit/Loss calculated?",
        profitLossExplanation: "Calculated based on price difference multiplied by your leverage and position size."
      },
      benefits: {
        title: "Why Choose Nexus Futures?",
        hedge: "Hedge against market volatility",
        multiplyProfits: "Multiply profits with leverage",
        tradeBothMarkets: "Trade both rising and falling markets",
        advancedStrategies: "Implement advanced trading strategies"
      },
      actionCards: {
        contactSupport: "Contact Support",
        getHelp: "Get help from our team",
        community: "Community",
        joinDiscussions: "Join discussions"
      },
      footer: {
        copyright: "© 2025 Nexus Exchange. All rights reserved.",
        needHelp: "Need more help? Contact support@nexus-exchange.com"
      }
    },

    tabBottomNavigator: {
      home: "home",
      grap: "grap",
      records: "records",
      starting: "starting"
    },

    language: {
      title: "App Language",
      selectLanguage: "Select Language",
      choosePreferred: "Choose your preferred language",
      searchPlaceholder: "Search languages...",
      currentLanguage: "Current Language",

      languages: {
        english: "English",
        french: "French",
        russian: "Russian",
        german: "German",
        spanish: "Spanish"
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
      menu: "Records",
      fields: {
        user: "user",
        product: "product",
        number: "record Number",
        status: "status",
      },
      list: {
        title: "List of records",
      },
      view: {
        title: "Record Detail",
      },
      edit: {
        title: "Edit Record",
      },
      create: {
        success: "Product submitted successfully.",
      },
      update: {
        success: "Product submitted successfully.",
      },
      destroy: {
        success: "Record successfully deleted",
      },
      destroyAll: {
        success: "Record successfully deleted",
      },
      enumerators: {
        status: {
          pending: "Pending",
          completed: "Completed",
          canceled: "Canceled",
        },
      },
    },

    category: {
      name: "category",
      label: "Categories",
      menu: "Categories",
      exporterFileName: "category_export",
      list: {
        menu: "Categories",
        title: "Categories",
      },
      create: {
        success: "Category successfully saved",
      },
      update: {
        success: "Category successfully saved",
      },
      destroy: {
        success: "Category successfully deleted",
      },
      destroyAll: {
        success: "Category(s) successfully deleted",
      },
      edit: {
        title: "Edit Category",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        photo: "Photo",
        metaKeywords: "MetaKeywords",
        metaDescriptions: "MetaDescriptions",
        status: "Status",
        isFeature: "IsFeature",
        serialRange: "Serial",
        serial: "Serial",
        createdAt: "Created at",
        updatedAt: "Updated at",
        createdAtRange: "Created at",
      },
      enumerators: {
        status: {
          enable: "Enable",
          disable: "Disable",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "New Category",
      },
      view: {
        title: "View Category",
      },
      importer: {
        title: "Import Categories",
        fileName: "category_import_template",
        hint: "Files/Images columns must be the URLs of the files separated by space.",
      },
    },

    product: {
      name: "product",
      label: "Products",
      menu: "Products",
      exporterFileName: "product_export",
      list: {
        menu: "Products",
        title: "Products",
      },
      create: {
        success: "Product successfully saved",
      },
      update: {
        success: "Product successfully saved",
      },
      destroy: {
        success: "Product successfully deleted",
      },
      destroyAll: {
        success: "Product(s) successfully deleted",
      },
      edit: {
        title: "Edit Product",
      },
      fields: {
        id: "Id",
        name: "Name",
        slug: "Slug",
        tags: "Tags",
        video: "Video",
        specificationName: "Specification Name",
        specificationDesciption: "Specification Desciption",
        isSpecification: "Is Specification",
        details: "Details",
        photo: "Photo",
        discountPriceRange: "Discount Price",
        discountPrice: "Current Price",
        previousPriceRange: "Previous Price",
        previousPrice: "Previous Price",
        stockRange: "Stock",
        stock: "Stock",
        metaKeywords: "MetaKeywords",
        metaDesctiption: "Short Description",
        status: "Status",
        isType: "Type",
        dateRange: "Date",
        date: "Date",
        itemType: "Item Type",
        file: "File",
        link: "Link",
        fileType: "File Type",
        taxe: "Taxe",
        category: "Category",
        subcategory: "Sub Category",
        childcategory: "Child Category",
        brand: "Brand",
        gallery: "Gallery",
        createdAt: "Created at",
        updatedAt: "Updated at",
        createdAtRange: "Created at",
      },
      enumerators: {
        status: {
          enable: "Enable",
          disable: "Disable",
        },
        itemType: {
          physical: "physical",
          digitale: "Digitale",
        },
        fileType: {
          file: "File",
          link: "Link",
        },
        isType: {
          new_arrival: "New Arrival",
          feature_product: "Features Product",
          top_pdroduct: "Top Product",
          best_product: "Best Product",
          flash_deal_product: "Flash Deal Product",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "New Product",
      },
      view: {
        title: "View Product",
      },
      importer: {
        title: "Import Products",
        fileName: "product_import_template",
        hint: "Files/Images columns must be the URLs of the files separated by space.",
      },
    },


    transaction: {
      name: "transaction",
      label: "Transactions",
      menu: "Transactions",
      exporterFileName: "transaction_export",
      list: {
        menu: "Transactions",
        title: "Transactions",
      },
      create: {
        success: "Transaction successfully send",
      },
      update: {
        success: "Transaction successfully saved",
      },
      destroy: {
        success: "Transaction successfully deleted",
      },
      destroyAll: {
        success: "Transaction(s) successfully deleted",
      },
      edit: {
        title: "Edit Transaction",
      },
      fields: {
        id: "Id",
        amountRange: "Amount",
        amount: "Amount",
        email: "Email",
        tax: "Tax",
        currencySign: "CurrencySign",
        currencyValue: "CurrencyValue",
        orderId: "OrderId",
        createdAt: "Created at",
        updatedAt: "Updated at",
        createdAtRange: "Created at",
      },
      enumerators: {
        status: {
          pending: "Pending",
          completed: "Success",
          canceled: "Canceled",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "New Transaction",
      },
      view: {
        title: "View Transaction",
      },
      importer: {
        title: "Import Transactions",
        fileName: "transaction_import_template",
        hint: "Files/Images columns must be the URLs of the files separated by space.",
      },
    },


    order: {
      name: "order",
      label: "Orders",
      menu: "Orders",
      exporterFileName: "order_export",
      list: {
        menu: "Orders",
        title: "Orders",
      },
      create: {
        success: "Order successfully saved",
      },
      update: {
        success: "Order successfully saved",
      },
      destroy: {
        success: "Order successfully deleted",
      },
      destroyAll: {
        success: "Order(s) successfully deleted",
      },
      edit: {
        title: "Edit Order",
      },
      fields: {
        id: "Id",
        userId: "User",
        cart: "Cart",
        shipping: "Shipping",
        discountRange: "Discount",
        discount: "Discount",
        paymentMethod: "PaymentMethod",
        taxe: "Taxe",
        transactionNumber: "TransactionNumber",
        orderStatus: "OrderStatus",
        createdAt: "Created at",
        updatedAt: "Updated at",
        createdAtRange: "Created at",
      },
      enumerators: {
        orderStatus: {
          pending: "Pending",
          in_progress: "In_progress",
          delivered: "Delivered",
          canceled: "Canceled",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "New Order",
      },
      view: {
        title: "View Order",
      },
      importer: {
        title: "Import Orders",
        fileName: "order_import_template",
        hint: "Files/Images columns must be the URLs of the files separated by space.",
      },
    },



  },


  roles: {
    admin: {
      label: "Admin",
      description: "Full access to all resources",
    },
    adherent: {
      label: "adherent Role",
      description: "adherent role access",
    },
    member: {
      label: "Member",
      description: "Member role access",
    },
  },

  components: {
    bottomNav: {
      home: "Home",
      market: "Market",
      trade: "Trade",
      futures: "Futures",
      wallets: "Wallets"
    },
    coinListModal: {
      title: "Select Cryptocurrency",
      loading: "Loading cryptocurrency data...",
      noResults: "No cryptocurrencies found",
      popular: "Popular",
      search: {
        placeholder: "Search cryptocurrencies..."
      }
    }
  },

  auth: {
    signin: {
      title: "LOGIN",
      button: "Login",
      signingIn: "Logging in...",
      forgotPassword: "FORGOT PASSWORD?",
      signUp: "SIGN UP",
      orContinueWith: "or continue with",
      downloadApp: "DOWNLOAD OUR APP",
      appDescription: "Get the best crypto experience on your mobile device",
      googlePlay: "Google Play"
    },
    fields: {
      emailOrPhone: "Email/Phone Number",
      password: "Password"
    },
    tenants: "Workspaces",
    singindesc: "Enter your email and password to sign in",
    signupdesc: "Enter your email and password to sign up",
    profile: {
      title: "Profile",
      success: "Profile successfully updated",
      vip: "Congratulations on subscribing",
      wallet: "Withdrawal settings completed.",
    },
    createAnAccount: "Create an account",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password",

    signup: "Sign up",
    signout: "Sign out",
    alreadyHaveAnAccount: "Already have an account? Sign in.",
    social: {
      errors: {
        "auth-invalid-provider":
          "This email is already registered to another provider.",
        "auth-no-email": `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount: "Sign in with another account",
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: "Send password reset email",
      error: `Email not recognized`,
    },
    passwordReset: {
      message: "Reset password",
    },
    passwordChange: {
      title: "Change Password",
      success: "Password successfully changed",
      mustMatch: "Passwords must match",
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: "Email successfully verified.",
      message: "Just a moment, your email is being verified...",
    },
  },

  user: {
    fields: {
      gender: "Gender",
      captcha: "Captcha",
      username: "Username",
      walletName: "wallet Name",
      id: "Id",
      confirmPassword: "confirm Password",
      avatars: "Avatar",
      invitationcode: "Invitation Code",
      email: "Email",
      emails: "Email(s)",
      erc20: "ERC20 wallet address ",
      trc20: "TRC20 wallet address",
      fullName: "Name",
      balance: "Balance",
      firstName: "First Name",
      lastName: "Last Name",
      status: "Status",
      phoneNumber: "Phone Number",
      withdrawPassword: "Withdraw Password",
      sector: "Sector",
      employer: "Employer",
      profession: "Profession",
      address: "Address",
      birthDate: "Birth Date",
      maritalStatus: "Marital Status",
      facebookLink: "Facebook Link",
      sponsor: "Sponsor",
      role: "Role",
      createdAt: "Created at",
      updatedAt: "Updated at",
      roleUser: "Role/User",
      roles: "Roles",
      createdAtRange: "Created at",
      password: "Password",
      oldPassword: "Old Password",
      newPassword: "New Password",
      newPasswordConfirmation: "New Password Confirmation",
      rememberMe: "Remember me",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Food industry",
      ASSURANCES: "Assurance",
      AUDIOVISUEL: "Audio-visual",
      BANCAIRE: "Banking",
      CHIMIE: "Chemistry",
      COMPOSANTS_AUTOMOBILES: "Automotive components",
      DISTRIBUTION: "Distribution",
      DISTRIBUTION_AUTOMOBILE: "Automotive Distribution",
      DIVERS: "Various",
      FINANCIER: "Financial",
      HOLDING: "Holding",
      IMMOBILIER: "Real estate",
      INDUSTRIEL: "Industrial",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistics and transport",
      PHARMACEUTIQUE: "Pharmaceutical",
      SANTÉ: "Health",
      TOURSIME: "Tourism",
      INFORMATION_TECHNOLOGY: "Information Technology",
    },
    maritalStatus: {
      célébataire: "Single",
      marié: "Married",
    },
    status: {
      active: "Active",
      invited: "Invited",
      "empty-permissions": "Waiting for Permissions",
      inactive: "Inactive",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",

      },
      gender: {
        male: "male",
        female: "female",

      }
    },
    invite: "Invite",
    validations: {
      // eslint-disable-next-line
      email: "Email ${value} is invalid",
    },
    title: "Users",
    menu: "Users",
    doAddSuccess: "User(s) successfully saved",
    doUpdateSuccess: "User successfully saved",
    exporterFileName: "users_export",
    doDestroySuccess: "User successfully deleted",
    doDestroyAllSelectedSuccess: "Users successfully deleted",
    edit: {
      title: "Edit User",
    },
    new: {
      title: "Invite User(s)",
      titleModal: "Invite User",
      emailsHint:
        "Separate multiple email addresses using the comma character.",
    },
    view: {
      title: "View User",
      activity: "Activity",
    },
    importer: {
      title: "Import Users",
      fileName: "users_import_template",
      hint: "Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.",
    },
    errors: {
      userAlreadyExists: "User with this email already exists",
      userNotFound: "User not found",
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },


  settings: {
    title: "Settings",
    menu: "Settings",
    save: {
      success:
        "Settings successfully saved. The page will reload in {0} seconds for changes to take effect.",
    },
    fields: {
      theme: "Theme",
      logos: "Logo",
      backgroundImages: "Background Image",
    },
    colors: {
      default: "Dark",
      light: "Light",
      cyan: "Cyan",
      "geek-blue": "Geek Blue",
      gold: "Gold",
      lime: "Lime",
      magenta: "Magenta",
      orange: "Orange",
      "polar-green": "Polar Green",
      purple: "Purple",
      red: "Red",
      volcano: "Volcano",
      yellow: "Yellow",
    },
  },
  dashboard: {
    menu: "Dashboard",
    valider: "validate",
    file: "No file selected",
    typecsv: "Invalid file type. Please select a CSV file.",
    reset: "Reset",
    phone: "Uplaod Numbers",
    check: "Check Number",
    labelphone: "Write the Phone number",
    add: "Add Number",
    download: "Download the template",
    added: "Number Adedd",
    duplicated: "Number Duplicated",
    Wrong: "Number Wrong",
    notFound: "Sorry, We couldn’t find the items you are looking for.",
    validation: "Number added with Success",
    Success: "Number added With Success",
    numberValidation: "Write a valid number. Thank you.",
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: "Day",
      red: "Red",
      green: "Green",
      yellow: "Yellow",
      grey: "Grey",
      blue: "Blue",
      orange: "Orange",
      months: {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "Novembre",
        12: "December",
      },
      eating: "Eating",
      drinking: "Drinking",
      sleeping: "Sleeping",
      designing: "Designing",
      coding: "Coding",
      cycling: "Cycling",
      running: "Running",
      customer: "Customer",
      objectif: "Objectives by status",
      projectS: "Projects by status",
      projectT: "Projects by type",
      adherent: "Number of members",
      news: "Number of news",
      project: "Number of projects",
      partner: "Number of partners",
      nodata: "no data to display",
    },
  },



  errors: {
    backToHome: "Back to home",
    403: `Sorry, you don't have access to this page`,
    404: "Sorry, the page you visited does not exist",
    500: "Sorry, the server is reporting an error",
    429: "Too many requests. Please try again later.",
    forbidden: {
      message: "Forbidden",
    },
    validation: {
      message: "An error occurred",
    },
    defaultErrorMessage: "Ops, an error occurred",
  },

  preview: {
    error: "Sorry, this operation is not allowed in preview mode.",
  },

  // See https://github.com/jquense/yup#using-a-adherent-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: "${path} is invalid",
      required: "${path} is required",
      oneOf: "${path} must be one of the following values: ${values}",
      notOneOf: "${path} must not be one of the following values: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length: "${path} must be exactly ${length} characters",
      min: "${path} must be at least ${min} characters",
      max: "${path} must be at most ${max} characters",
      matches: '${path} must match the following: "${regex}"',
      email: "${path} must be a valid email",
      url: "${path} must be a valid URL",
      trim: "${path} must be a trimmed string",
      lowercase: "${path} must be a lowercase string",
      uppercase: "${path} must be a upper case string",
      selected: "${path} must be selected",
    },
    number: {
      min: "${path} must be greater than or equal to ${min}",
      max: "${path} must be less than or equal to ${max}",
      lessThan: "${path} must be less than ${less}",
      moreThan: "${path} must be greater than ${more}",
      notEqual: "${path} must be not equal to ${notEqual}",
      positive: "${path} must be a positive number",
      negative: "${path} must be a negative number",
      integer: "${path} must be an integer",
    },
    date: {
      min: "${path} field must be later than ${min}",
      max: "${path} field must be at earlier than ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} field cannot have keys not specified in the object shape",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: "${path} field must have less than or equal to ${max} items",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Upload",
    image: "You must upload an image",
    size: "File is too big. Max allowed size is {0}",
    formats: `Invalid format. Must be one of: {0}.`,
  },
  importer: {
    line: "Line",
    status: "Status",
    pending: "Pending",
    imported: "Imported",
    error: "Error",
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      "Do not navigate away from this page or import will be stopped.",
    completed: {
      success: "Import completed. All rows were successfully imported.",
      someErrors:
        "Processing completed, but some rows were unable to be imported.",
      allErrors: "Import failed. There are no valid rows.",
    },
    form: {
      downloadTemplate: "Download the template",
      hint: "Click or drag the file to this area to continue",
    },
    list: {
      discardConfirm: "Are you sure? Non-imported data will be lost.",
    },
    errors: {
      invalidFileEmpty: "The file is empty",
      invalidFileExcel: "Only excel (.xlsx) files are allowed",
      invalidFileUpload:
        "Invalid file. Make sure you are using the last version of the template.",
      importHashRequired: "Import hash is required",
      importHashExistent: "Data has already been imported",
    },
  },

  autocomplete: {
    loading: "Loading...",
    noOptions: "No data found",
  },

  imagesViewer: {
    noImage: "No image",
  },

  table: {
    noData: "No records found",
    loading: "Loading...",
  },


};

export default en;
