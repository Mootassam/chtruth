import Withdraw from "src/view/pages/withdraw/Withdraw";

const fr = {
  app: {
    title: "Nowspeed"
  },
  stake: {
    enterAmount: "Entrez un montant",
    insufficientBalance: "Solde insuffisant",
    minAmount: "Min: {{min}}",
    maxAmount: "Max: {{max}}",
    confirmStake: "Confirmer le Stake"
  },
pages: {
  futures: {
  title: "Futures",
  actions: {
    buyUp: "ACHETER HAUSSE",
    buyDown: "ACHETER BAISSE"
  },
  tabs: {
    openOrders: "Ordres Ouverts",
    recentOrders: "Ordres Récents"
  },
  orderDetails: {
    title: "Détails de l'Ordre",
    open: "Ouvert",
    closed: "Fermé",
    completed: "Terminé",
    futuresAmount: "Montant Futures:",
    contractDuration: "Durée du Contrat:",
    seconds: "Secondes",
    futuresStatus: "Statut Futures:",
    openPositionPrice: "Prix d'Ouverture:",
    openPositionTime: "Heure d'Ouverture:",
    closePositionPrice: "Prix de Fermeture:",
    closePositionTime: "Heure de Fermeture:",
    profitLossAmount: "Montant Profit/Perte:",
    leverage: "Effet de Levier:",
    done: "Terminé"
  },
  status: {
    open: "Ouvert",
    closed: "Fermé",
    completed: "Terminé"
  },
  list: {
    noOrders: "Aucun ordre"
  }
},
    proof: {
        title: "Vérification d'Identité",
        instructions: "Vérifiez votre identité pour accéder à toutes les fonctionnalités de votre Nexus Exchange",
        sections: {
            documentInfo: "Informations du Document",
            documentUpload: "Téléchargement du Document"
        },
        fields: {
            documentType: "Type de Document",
            fullName: "Nom Complet",
            documentNumber: "Numéro du Document",
            address: "Adresse",
            frontSide: "Recto du Document",
            backSide: "Verso du Document",
            selfie: "Selfie avec le Document"
        },
        placeholders: {
            fullName: "Entrez votre nom complet",
            documentNumber: "Entrez votre numéro de document",
            address: "Entrez votre adresse complète"
        },
        uploadTexts: {
            frontSide: "Téléchargez le recto de votre document",
            backSide: "Téléchargez le verso de votre document",
            selfie: "Téléchargez un selfie tenant votre document"
        },
        documentTypes: {
            passport: "Passeport",
            idCard: "Carte d'Identité",
            driversLicense: "Permis de Conduire"
        },
        security: {
            title: "Avis de Sécurité",
            text: "Vos informations sont chiffrées et sécurisées. Nous utilisons une protection de niveau bancaire et vérifions manuellement chaque document pour votre sécurité."
        },
        buttons: {
            validateDocuments: "VALIDER LES DOCUMENTS"
        },
        footer: {
            copyright: "© 2025 CryptoWallet. Tous droits réservés.",
            privacyPolicy: "Politique de Confidentialité"
        }
    },
    withdrawPassword: {
        title: "Mot de Passe de Retrait",
        cardTitle: "MODIFIER LE MOT DE PASSE DE RETRAIT",
        fields: {
            currentPassword: "Mot de Passe Actuel",
            newPassword: "Nouveau Mot de Passe"
        },
        placeholders: {
            currentPassword: "Entrez votre ancien mot de passe",
            newPassword: "Confirmez votre nouveau mot de passe"
        },
        buttons: {
            saveChanges: "SAUVEGARDER LES MODIFICATIONS"
        },
        warningMessage: "Pour la sécurité de vos fonds, les retraits ne sont pas autorisés dans les 24 heures suivant la modification du mot de passe de connexion."
    },
    loginPassword: {
        title: "Mot de Passe de Connexion",
        cardTitle: "MODIFIER LE MOT DE PASSE DE CONNEXION",
        fields: {
            oldPassword: "Ancien Mot de Passe",
            newPassword: "Nouveau Mot de Passe",
            newPasswordConfirmation: "Confirmer le Mot de Passe"
        },
        placeholders: {
            oldPassword: "Entrez votre mot de passe actuel",
            newPassword: "Créez un nouveau mot de passe",
            confirmPassword: "Confirmez votre nouveau mot de passe"
        },
        buttons: {
            saveChanges: "SAUVEGARDER LES MODIFICATIONS"
        },
        warningMessage: "Pour la sécurité de vos fonds, les retraits ne sont pas autorisés dans les 24 heures suivant la modification du mot de passe de connexion.",
        validation: {
            mustMatch: "Les mots de passe doivent correspondre"
        }
    },
    passwordType: {
        title: "Type de Mot de Passe",
        cardTitle: "SÉLECTIONNER LE TYPE DE MOT DE PASSE",
        options: {
            login: {
                title: "Mot de Passe de Connexion",
                description: "Modifiez votre mot de passe de connexion au compte"
            },
            withdrawal: {
                title: "Mot de Passe de Retrait",
                description: "Modifiez votre mot de passe de retrait de crypto"
            }
        }
    },
    withdrawAddressForm: {
        title: "Adresse de Retrait",
        currencyType: "TYPE DE DEVISE",
        withdrawalAddress: "ADRESSE DE RETRAIT",
        currencies: {
            btc: "BTC (Bitcoin)",
            eth: "ETH (Ethereum)",
            usdt: "USDT (Tether)",
            sol: "SOL (Solana)",
            xrp: "XRP (Ripple)"
        },
        fields: {
            address: "Adresse",
            password: "Mot de Passe de Retrait Crypto"
        },
        placeholders: {
            address: "Entrez votre adresse de portefeuille",
            password: "Entrez votre mot de passe actuel"
        },
        buttons: {
            save: "SAUVEGARDER"
        },
        notification: {
            success: "Adresse sauvegardée avec succès !"
        }
    },
    withdrawAddress: {
        title: "Adresse de Retrait",
        cardTitle: "TYPE DE DEVISE",
        currencies: {
            btc: "BTC (Bitcoin)",
            eth: "ETH (Ethereum)",
            usdt: "USDT (Tether)",
            sol: "SOL (Solana)",
            xrp: "XRP (Ripple)"
        }
    },
    privacy: {
        title: "Portail de Confidentialité",
        hero: {
            title: "Portail de Confidentialité Nexus",
            subtitle: "Protection de vos données et de votre vie privée avec des directives strictes, la conformité légale et les meilleures pratiques du secteur."
        },
        principles: {
            title: "Nos Principes de Confidentialité",
            corePrinciples: "Principes Fondamentaux",
            transparency: {
                title: "Transparence",
                description: "Mises à jour régulières et informations claires sur la façon dont nous traitons vos données."
            },
            accountability: {
                title: "Responsabilité et Conformité",
                description: "Audits et certifications réguliers, respect des lois mondiales sur la vie privée."
            },
            dataSecurity: {
                title: "Sécurité des Données",
                description: "Chiffrement avancé, contrôles d'accès stricts et protocoles de vérification d'identité."
            },
            dataMinimization: {
                title: "Minimisation et Limitation des Données",
                description: "Nous collectons uniquement ce qui est nécessaire pour des finalités légitimes spécifiques."
            },
            privacyByDesign: {
                title: "Confidentialité Intégrée",
                description: "La vie privée est intégrée dans tous nos produits et services dès leur conception."
            }
        },
        userRights: {
            title: "Vos Droits en Matière de Vie Privée",
            content: "Vous disposez d'outils pour accéder et gérer vos données via notre application ou notre formulaire web, avec des informations détaillées disponibles dans notre Avis de Confidentialité.",
            note: "Exercez vos droits d'accès, de correction ou de suppression de vos informations personnelles à tout moment."
        },
        personalData: {
            title: "Qu'est-ce qu'une Donnée Personnelle ?",
            definition: "Les données personnelles désignent toute information permettant d'identifier un individu.",
            examples: "Exemples : nom, identifiant Nexus, adresse e-mail, données de localisation, historique des transactions et informations sur l'appareil."
        },
        dataUsage: {
            title: "Comment Nous Utilisons Vos Données",
            accountManagement: {
                title: "Gestion du Compte",
                description: "Pour créer et maintenir votre compte, fournir des services et communiquer avec vous."
            },
            legalCompliance: {
                title: "Conformité Légale",
                description: "Pour remplir nos obligations en vertu des lois applicables, y compris les réglementations Anti-Blanchiment (AML)."
            },
            securityFraud: {
                title: "Sécurité et Prévention de la Fraude",
                description: "Pour protéger votre compte, détecter et prévenir la fraude, et assurer la sécurité de la plateforme."
            },
            customerSupport: {
                title: "Support Client",
                description: "Pour répondre à vos demandes et fournir une assistance technique si nécessaire."
            },
            marketing: {
                title: "Marketing et Communications",
                description: "Pour vous envoyer des mises à jour pertinentes, des informations sur les produits et du matériel promotionnel (avec votre consentement)."
            },
            transactionProcessing: {
                title: "Traitement des Transactions",
                description: "Pour faciliter les transactions de cryptomonnaies et maintenir les registres de transactions."
            }
        },
        dataRetention: {
            title: "Conservation des Données",
            content: "Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services, nous conformer aux obligations légales (telles que les exigences fiscales et AML), résoudre les litiges et faire respecter nos accords."
        },
        dataSharing: {
            title: "Partage des Données",
            content: "Nous pouvons partager vos données avec d'autres entités Nexus ou des tiers de confiance sous stricte confidentialité contractuelle, uniquement lorsque cela est nécessaire aux fins décrites dans notre Avis de Confidentialité."
        },
        cookies: {
            title: "Cookies et Suivi",
            content: "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience utilisateur, fournir un marketing personnalisé et analyser l'utilisation de nos services.",
            link: "Voir notre Politique relative aux Cookies complète"
        },
        actionCards: {
            privacyNotice: {
                title: "Avis de Confidentialité",
                description: "Lire notre politique de confidentialité complète"
            },
            manageData: {
                title: "Gérer les Données",
                description: "Accédez et contrôlez vos informations"
            },
            cookieSettings: {
                title: "Paramètres des Cookies",
                description: "Ajustez vos préférences de suivi"
            },
            helpCenter: {
                title: "Centre d'Aide",
                description: "Obtenez des réponses à vos questions sur la vie privée"
            }
        },
        notification: "Action terminée avec succès !"
    },
    termsOfUse: {
        title: "Conditions d'Utilisation",
        hero: {
            title: "Conditions d'Utilisation Nexus"
        },
        agreement: {
            title: "Accord",
            content: "Ceci est un accord contraignant entre vous (l'utilisateur) et Nexus. Il couvre tous les Services Nexus que vous accédez ou utilisez."
        },
        riskWarning: {
            title: "Avertissement sur les Risques",
            content: "Les actifs numériques sont volatils et peuvent fluctuer considérablement en valeur. Nexus n'est pas un courtier, un conseiller financier ou un conseiller en investissement. Vous devez effectuer votre propre diligence raisonnable avant de prendre toute décision financière."
        },
        aboutServices: {
            title: "À Propos de Nos Services",
            aboutNexus: {
                title: "À Propos de Nexus",
                content: "Nexus fournit un échange d'actifs numériques, des services de garde et des services financiers connexes via notre plateforme."
            },
            eligibility: {
                title: "Éligibilité",
                content: "Vous devez avoir au moins 18 ans, être légalement capable de conclure des contrats, ne pas être restreint d'utiliser nos services et ne pas être situé dans des juridictions interdites."
            },
            communication: {
                title: "Communication",
                content: "Vous devez maintenir vos coordonnées à jour. Nexus vous contactera par e-mail, SMS ou téléphone concernant votre compte et nos services."
            }
        },
        services: {
            title: "Nos Services",
            servicesProvided: {
                title: "Services Fournis",
                content: "Nexus propose le trading d'actifs numériques, des solutions de garde sécurisées et un support client via des bots automatisés et des représentants humains. Une fonctionnalité de chat utilisateur est également disponible."
            },
            fees: {
                title: "Frais",
                content: "Tous les frais applicables sont listés sur notre page Structure des Frais et sont sujets à des mises à jour. Vous êtes responsable de consulter le barème de frais actuel avant d'effectuer des transactions."
            }
        },
        accountManagement: {
            title: "Gestion du Compte",
            accountCreation: {
                title: "Création de Compte",
                content: "Vous devez ouvrir un compte (individuel ou d'entreprise) pour accéder à nos services. Cela nécessite de compléter les procédures de vérification d'identité (KYC/AML) comme l'exige la loi."
            },
            identityVerification: {
                title: "Vérification d'Identité",
                content: "Vous devez compléter nos processus de vérification Connaissez Votre Client (KYC) et Anti-Blanchiment (AML) avant d'utiliser certains services."
            },
            accountRecords: {
                title: "Registres du Compte",
                content: "Vous pouvez conserver des registres et créer des sous-comptes dans des conditions spécifiques décrites dans nos politiques de gestion de compte."
            }
        },
        transactions: {
            title: "Transactions",
            sufficientBalance: {
                title: "Solde Suffisant",
                content: "Vous devez maintenir un solde suffisant sur votre compte pour toute transaction que vous initiez. Les transactions peuvent échouer ou entraîner des frais supplémentaires si les fonds sont insuffisants."
            },
            transactionCancellation: {
                title: "Annulation de Transaction",
                content: "Nexus se réserve le droit d'annuler ou de modifier les transactions en cas de fraude suspectée, d'erreurs ou de violations de ces Conditions."
            },
            unauthorizedTransactions: {
                title: "Transactions Non Autorisées",
                content: "Vous êtes responsable de toute transaction non autorisée, sauf si vous pouvez prouver le contraire via notre processus de résolution des litiges."
            }
        },
        digitalAssets: {
            title: "Actifs Numériques",
            supportedAssets: {
                title: "Actifs Supportés",
                content: "Vous ne pouvez effectuer des transactions qu'avec les actifs numériques explicitement supportés par Nexus. Tenter de déposer des actifs non supportés peut entraîner une perte permanente."
            },
            forksAirdrops: {
                title: "Forks et Airdrops",
                content: "Nexus ne garantit pas le support des forks de blockchain, des airdrops ou autres événements similaires. Les décisions de support sont prises à notre seule discrétion."
            }
        },
        accountSecurity: {
            title: "Sécurité du Compte",
            securityRequirements: {
                title: "Exigences de Sécurité",
                content: "Vous devez utiliser un mot de passe fort, activer l'authentification multi-facteurs (MFA), ne jamais partager vos identifiants, surveiller régulièrement l'activité du compte et signaler immédiatement toute brèche de sécurité."
            }
        },
        privacy: {
            title: "Confidentialité",
            content: "Votre vie privée est régie par l'Avis de Confidentialité de Nexus, qui explique comment nous collectons, utilisons et protégeons vos informations personnelles."
        },
        termination: {
            title: "Résiliation du Compte",
            terminationSuspension: {
                title: "Résiliation/Suspension",
                content: "Nexus peut restreindre, suspendre ou résilier les comptes pour fraude, violation de la loi, activité suspecte ou violation des Conditions. Les utilisateurs peuvent fermer leurs comptes sauf s'ils sont gelés ou inactifs."
            }
        },
        prohibitedUse: {
            title: "Utilisation Interdite",
            content: "Vous ne pouvez pas utiliser les services Nexus pour la fraude, la manipulation de marché, les activités illégales, l'accès non autorisé, ou toute finalité violant les lois applicables ou ces Conditions."
        },
        liability: {
            title: "Responsabilité et Propriété Intellectuelle",
            liability: {
                title: "Responsabilité",
                content: "Nexus n'est pas responsable des pertes sauf en cas de négligence grave avérée ou de fraude. Nous ne sommes pas responsables des fluctuations du marché, des problèmes techniques ou des actions de tiers."
            },
            intellectualProperty: {
                title: "Propriété Intellectuelle",
                content: "Nexus conserve tous les droits de propriété intellectuelle sur notre plateforme, technologie et marque. Les utilisateurs reçoivent une licence limitée pour utiliser nos services comme décrit dans ces Conditions."
            },
            indemnity: {
                title: "Indemnisation",
                content: "Vous acceptez d'indemniser et de dégager Nexus de toute responsabilité concernant toute réclamation, perte ou dommage résultant de votre mauvaise utilisation de nos services ou de la violation de ces Conditions."
            }
        },
        importantNotice: {
            title: "Avis Important",
            content: "En utilisant les services Nexus, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord, vous devez cesser d'utiliser nos services immédiatement."
        },
        actionCards: {
            security: {
                title: "Sécurité",
                description: "Gardez votre compte en sécurité."
            },
            helpCenter: {
                title: "Centre d'Aide",
                description: "Obtenez des réponses à vos questions"
            },
            privacyPolicy: {
                title: "Politique de Confidentialité",
                description: "Consultez nos pratiques de confidentialité"
            },
            legal: {
                title: "Juridique",
                description: "Voir tous les documents juridiques"
            }
        },
        footer: {
            copyright: "© 2025 Nexus Exchange. Tous droits réservés.",
            lastUpdated: "Dernière mise à jour : 6 mai 2025"
        }
    },
    marketDetail: {
        stats: {
            high: "Haut 24h",
            low: "Bas 24h",
            volume: "Vol 24h"
        },
        volume: {
            billion: "Md",
            million: "M"
        },
        actions: {
            buy: "ACHETER",
            sell: "VENDRE"
        },
        recentTrades: {
            title: "Transactions Récentes (En Direct)",
            price: "Prix (USDT)",
            amount: "Montant",
            time: "Heure"
        }
    },
    assetsDetail: {
        title: "Détails de l'Actif",
        today: "Aujourd'hui",
        yesterday: "Hier",
        filter: "Filtrer",
        transactionHistory: {
            title: "Historique des Transactions"
        },
        noTransactions: {
            title: "Aucune Transaction Pour l'Instant",
            description: "Votre historique de transactions apparaîtra ici une fois que vous commencerez à trader."
        },
        status: {
            completed: "Terminé",
            pending: "En Attente",
            canceled: "Annulé"
        },
        filterModal: {
            title: "Filtrer les Transactions",
            status: "Statut",
            type: "Type",
            direction: "Direction",
            startDate: "Date de Début",
            endDate: "Date de Fin",
            allStatuses: "Tous les Statuts",
            allTypes: "Tous les Types",
            bothDirections: "Les Deux Directions",
            incoming: "Entrant",
            outgoing: "Sortant",
            completed: "Terminé",
            pending: "En Attente",
            canceled: "Annulé",
            resetFilters: "Réinitialiser les Filtres",
            applyFilters: "Appliquer les Filtres"
        },
        actions: {
            deposit: "Déposer",
            withdraw: "Retirer"
        },
        transactionTypes: {
            transaction: "Transaction",
            deposit: "Dépôt",
            withdrawal: "Retrait",
            convertedFrom: "Converti depuis {{asset}}",
            convertedTo: "Converti en {{asset}}",
            conversionIn: "Conversion Entrante",
            conversionOut: "Conversion Sortante",
            stakedAmount: "Montant Staké",
            stakingRewards: "Récompenses de Staking",
            futuresReserved: "Réservé Futures",
            futuresProfit: "Profit Futures",
            futuresLoss: "Perte Futures",
            futuresSettlement: "Règlement Futures",
            futuresFee: "Frais Futures",
            futuresRefund: "Remboursement Futures",
            futuresBonus: "Bonus Futures",
            futuresCommission: "Commission Futures",
            manualProfit: "Profit Manuel",
            manualLoss: "Perte Manuelle",
            manualAdjustment: "Ajustement Manuel",
            spotTradingProfit: "Profit Trading Spot",
            spotTradingLoss: "Perte Trading Spot",
            referralReward: "Récompense de Parrainage",
            bonus: "Bonus",
            referralCommission: "Commission de Parrainage",
            orderReserved: "Ordre Réservé",
            orderCancelled: "Ordre Annulé",
            orderPartialFill: "Ordre Partiellement Exécuté",
            orderCompleted: "Ordre Terminé",
            feePayment: "Paiement de Frais",
            balanceAdjustment: "Ajustement du Solde",
            transfer: "Transfert"
        }
    },
    invitation: {
        title: "Inviter des Amis",
        earnTogether: "Gagnez Ensemble",
        description: "Invitez des amis à rejoindre NEXUS et gagnez des récompenses lorsqu'ils s'inscrivent et commencent à trader.",
        yourReferralCode: "VOTRE CODE DE PARRAINAGE",
        loading: "Chargement...",
        copied: "COPIÉ !",
        copyCode: "COPIER LE CODE",
        totalEarned: "Total Gagné",
        allTimeCommission: "Commission Totale",
        generationMembers: "Membres de la Génération",
        noGenerationData: "Aucune donnée de génération disponible",
        approvedMembers: "Membres Approuvés",
        pendingMembers: "Membres en Attente",
        commissionStructure: "Structure des Commissions",
        firstGeneration: "1ère Génération",
        secondGeneration: "2ème Génération",
        thirdGeneration: "3ème Génération",
        firstDepositCommission: "Commission sur Premier Dépôt",
        stakingProfitsCommission: "Commission sur les Profits de Staking",
        howItWorks: "Comment ça Marche",
        steps: {
            shareCode: {
                title: "Partagez Votre Code de Parrainage",
                description: "Envoyez votre code unique à des amis ou partagez-le sur les réseaux sociaux."
            },
            friendsSignUp: {
                title: "Inscription des Amis",
                description: "Vos amis s'inscrivent en utilisant votre code de parrainage et vérifient leurs comptes."
            },
            earnCommissions: {
                title: "Gagnez des Commissions",
                description: "Gagnez des commissions sur les premiers dépôts et les profits de staking de votre réseau."
            }
        },
        referralCopied: "Code de parrainage copié dans le presse-papiers !",
        loadingMembers: "Chargement des membres...",
        approved: "Approuvé",
        joined: "Rejoint",
        noMembersFound: "Aucun membre trouvé"
    },
    securityTips: {
        title: "Centre de Sécurité",
        essentialTips: "Conseils de Sécurité Essentiels",
        categories: {
            passwordSecurity: "Sécurité des Mots de Passe",
            deviceSecurity: "Sécurité des Appareils",
            accountSecurity: "Sécurité du Compte"
        },
        tips: {
            strongPasswords: {
                title: "Utilisez des Mots de Passe Forts et Uniques",
                description: "Créez des mots de passe complexes avec majuscules, minuscules, chiffres et symboles."
            },
            enable2FA: {
                title: "Activez l'Authentification à Deux Facteurs",
                description: "Ajoutez une couche de sécurité supplémentaire à votre compte avec la 2FA."
            },
            changePasswords: {
                title: "Changez Régulièrement les Mots de Passe",
                description: "Mettez à jour vos mots de passe tous les 3-6 mois."
            },
            softwareUpdated: {
                title: "Maintenez les Logiciels à Jour",
                description: "Mettez régulièrement à jour votre OS, votre navigateur et votre logiciel de portefeuille."
            },
            antivirus: {
                title: "Utilisez une Protection Antivirus",
                description: "Installez un logiciel antivirus et anti-malware réputé."
            },
            publicWifi: {
                title: "Évitez le Wi-Fi Public",
                description: "N'accédez jamais à votre portefeuille sur des réseaux publics sans VPN."
            },
            loginNotifications: {
                title: "Activez les Notifications de Connexion",
                description: "Recevez des alertes pour les nouvelles connexions à votre compte."
            },
            reviewActivity: {
                title: "Vérifiez l'Activité du Compte",
                description: "Vérifiez régulièrement votre compte pour toute activité suspecte."
            },
            whitelisting: {
                title: "Utilisez la Liste Blanche",
                description: "Listez les adresses de retrait de confiance pour une sécurité accrue."
            }
        },
        actions: {
            enable2FA: "Activer la 2FA",
            enable2FADesc: "Ajoutez une couche de sécurité supplémentaire",
            activityLog: "Journal d'Activité",
            activityLogDesc: "Vérifiez l'activité récente du compte",
            settings: "Paramètres",
            settingsDesc: "Configurez les préférences de sécurité",
            backupCodes: "Codes de Récupération",
            backupCodesDesc: "Sauvegardez vos codes de récupération"
        },
        emergency: {
            title: "Procédures d'Urgence",
            unauthorizedAccess: "Si vous soupçonnez un accès non autorisé à votre compte, changez immédiatement votre mot de passe et activez la 2FA si ce n'est pas déjà fait.",
            lostDevice: "Si votre appareil est perdu ou volé, révoquez immédiatement l'accès à la session depuis les paramètres de votre compte.",
            phishing: "Si vous avez été victime d'une tentative de hameçonnage, geliez votre compte et contactez immédiatement le support.",
            supportTitle: "Support Sécurité 24h/24 et 7j/7",
            supportEmail: "support@nexus-exchange.com"
        },
        resources: {
            title: "Ressources de Sécurité",
            securityGuide: "Guide de Sécurité",
            securityGuideLink: "Lire la documentation de sécurité complète",
            learningCenter: "Centre d'Apprentissage",
            learningCenterLink: "Apprenez les meilleures pratiques de sécurité crypto",
            faq: "FAQ",
            faqLink: "Trouvez des réponses aux questions de sécurité courantes"
        }
    },
    profile: {
        title: "Profil",
        settings: "Paramètres",
        status: {
            verified: "VÉRIFIÉ",
            unverified: "NON VÉRIFIÉ"
        },
        accountInfo: {
            title: "INFORMATIONS DU COMPTE",
            email: "E-mail",
            creditScore: "Score de Crédit",
            invitationCode: "Code d'Invitation"
        },
        verification: {
            pending: {
                title: "Vérification en Attente",
                description: "La vérification de votre compte est en cours. Cela prend généralement 1 à 3 jours ouvrés."
            },
            alert: {
                title: "Compte Non Vérifié",
                description: "Vérifiez votre compte pour débloquer toutes les fonctionnalités et des limites plus élevées",
                verifyNow: "Vérifier Maintenant"
            }
        },
        pendingVerifications: {
            title: "VÉRIFICATIONS EN ATTENTE",
            identity: {
                title: "Vérification d'Identité",
                description: "Soumettez votre pièce d'identité officielle"
            },
            address: {
                title: "Vérification d'Adresse",
                description: "Vérifiez votre résidence"
            },
            status: {
                pending: "En Attente"
            }
        },
        approvedVerifications: {
            title: "VÉRIFICATIONS APPROUVÉES",
            identity: {
                title: "Vérification d'Identité"
            },
            address: {
                title: "Vérification d'Adresse"
            },
            status: {
                completed: "Terminé"
            }
        },
        limitations: {
            title: "Limitations du Compte",
            withdrawalLimit: "Limite de retrait : 1 000 $ par jour",
            stakingLimited: "Options de staking limitées",
            advancedTrading: "Fonctionnalités de trading avancées désactivées",
            fiatDeposits: "Dépôts en devise fiat non disponibles"
        },
        menu: {
            withdrawalAddress: "Adresse de Retrait",
            password: "Mot de Passe",
            notifications: "Notifications",
            myInvitation: "Mon Invitation",
            language: "Langue",
            termsOfUse: "Conditions d'Utilisation",
            privacyPortal: "Portail de Confidentialité",
            aboutUs: "À Propos de Nous",
            msbApproval: "Approbation MSB",
            customerSupport: "Support Client",
            downloadApp: "Télécharger l'App",
            logout: "Se Déconnecter"
        }
    },
    notification: {
        title: "Notification",
        loading: "Chargement",
        filters: {
            all: "Toutes",
            unread: "Non lues",
            read: "Lues"
        },
        emptyState: {
            title: "Aucune notification pour l'instant",
            noNotifications: "Vous n'avez pas encore de notifications",
            noFilteredNotifications: "Aucune notification {0} trouvée"
        },
        types: {
            deposit: {
                title: "Dépôt Reçu",
                message: "Votre dépôt de {0} a été confirmé et crédité sur votre portefeuille."
            },
            withdraw: {
                title: "Retrait Réussi",
                message: "Votre retrait de {0} a été traité avec succès."
            },
            staking: {
                title: "Profit de Staking",
                message: "Vous avez gagné {0} grâce à vos récompenses de staking."
            },
            kyc: {
                title: "Mise à Jour KYC",
                defaultMessage: "Votre compte a été activé."
            },
            commission: {
                title: "Commission Reçue",
                message: "Vous avez reçu une commission de {0}."
            },
            futures: {
                title: "Mise à Jour Futures",
                message: "Votre montant de transaction futures {0} a été exécuté."
            },
            accountActivated: {
                title: "Vérification KYC",
                message: "Bonjour {0}, vos documents KYC ont été vérifiés, vous pouvez maintenant profiter de toutes les fonctionnalités sur Nexus Exchange"
            },
            custom: {
                title: "Notification",
                defaultMessage: "Vous avez une nouvelle notification."
            },
            cancelDeposit: {
                title: "Dépôt Annulé",
                message: "Votre dépôt de {0} a été annulé."
            },
            cancelWithdraw: {
                title: "Retrait Annulé",
                message: "Votre retrait de {0} a été annulé."
            },
            cancelActivated: {
                title: "Activation Annulée",
                message: "Votre KYC a été refusé par le système, veuillez réessayer ou contacter le Support Client pour obtenir de l'aide"
            }
        }
    },
    staking: {
        title: "Staking",
        totalStakedBalance: "Solde Total Staké",
        earned: "gagné",
        tabs: {
            options: "Options",
            active: "Stakes Actifs",
            completed: "Terminés"
        },
        daily: "Quotidien",
        minimumStake: "Stake Minimum",
        unstakingPeriod: "Période de Détachement",
        days: "jours",
        stakeButton: "Staker {0}",
        status: {
            active: "ACTIF",
            completed: "TERMINÉ"
        },
        remaining: "Restant",
        dailyRate: "Taux Quotidien",
        duration: "Durée",
        createdAt: "Créé Le",
        dateFinish: "Date de Fin",
        totalCompletedRewards: "RÉCOMPENSES TOTALES TERMINÉES",
        stake: "STAKER",
        stakes: "STAKES",
        allRewardsFromCompleted: "Toutes les récompenses des stakes terminés",
        totalRewardsEarned: "RÉCOMPENSES TOTALES GAGNÉES",
        balance: "Solde",
        maximumStake: "Stake Maximum",
        estimatedTotalRewards: "Récompenses Totales Estimées",
        exploreStakingOptions: "Explorer les Options de Staking",
        startStaking: "Commencer le Staking",
        emptyStates: {
            options: {
                title: "Aucun Plan de Staking Disponible",
                message: "Il n'y a actuellement aucun plan de staking disponible. Veuillez vérifier plus tard pour de nouvelles opportunités de staking."
            },
            active: {
                title: "Aucun Stake Actif",
                message: "Vous n'avez pas encore de stake actif. Commencez le staking pour gagner des récompenses sur vos actifs crypto."
            },
            completed: {
                title: "Aucun Stake Terminé",
                message: "Vous n'avez pas encore terminé de stakes. Vos stakes terminés apparaîtront ici une fois terminés."
            }
        },
        stakeModal: {
            title: "Staker",
            amountToStake: "Montant à Staker",
            enterAmount: "Entrez le Montant"
        }
    },
    conversion: {
        title: "Convertir la Crypto",
        loading: "Chargement des derniers prix...",
        youSend: "Vous envoyez",
        youReceive: "Vous recevez",
        balance: "Solde",
        max: "MAX",
        insufficientBalance: "Solde insuffisant",
        estimatedConversion: "Conversion estimée",
        selectDifferentCurrencies: "Sélectionner des devises différentes",
        convertNow: "Convertir Maintenant",
        pricesUpdate: "Les prix se mettent à jour en temps réel",
        selectCurrency: "Sélectionner la Devise",
        searchCurrencies: "Rechercher des devises...",
        confirmConversion: "Confirmer la Conversion",
        conversionDetails: "Détails de la Conversion",
        exchangeRate: "Taux de Change",
        networkFee: "Frais de Réseau",
        estimatedArrival: "Arrivée Estimée",
        arrivalTime: "~30 secondes",
        processingConversion: "Traitement de la Conversion...",
        cancel: "Annuler"
    },
    history: {
        title: "Historique des Transactions",
        emptyState: {
            title: "Aucune transaction trouvée",
            description: "Essayez de modifier vos filtres pour voir plus de transactions"
        },
        filters: {
            all: "Toutes",
            deposits: "Dépôts",
            withdrawals: "Retraits",
            profits: "Profits",
            losses: "Pertes",
            conversions: "Conversions",
            stacking: "Staking"
        },
        statusFilters: {
            allStatus: "Tous les Statuts",
            completed: "Terminé",
            pending: "En Attente",
            canceled: "Annulé"
        },
        timeFilters: {
            allTime: "Toute Période",
            today: "Aujourd'hui",
            week: "Semaine",
            month: "Mois",
            year: "Année"
        },
        status: {
            completed: "Terminé",
            pending: "En Attente",
            canceled: "Annulé"
        },
        dateFormats: {
            today: "Aujourd'hui, {0}",
            yesterday: "Hier, {0}"
        },
        transactionTypes: {
            transaction: "Transaction",
            deposit: "Dépôt",
            withdrawal: "Retrait",
            convertedFrom: "Converti depuis {0}",
            convertedTo: "Converti en {0}",
            conversionIn: "Conversion Entrante",
            conversionOut: "Conversion Sortante",
            stakedAmount: "Montant Staké",
            stakingRewards: "Récompenses de Staking",
            futuresReserved: "Réservé Futures",
            futuresProfit: "Profit Futures",
            futuresLoss: "Perte Futures",
            futuresSettlement: "Règlement Futures",
            futuresFee: "Frais Futures",
            futuresRefund: "Remboursement Futures",
            futuresBonus: "Bonus Futures",
            futuresCommission: "Commission Futures",
            manualProfit: "Profit Manuel",
            manualLoss: "Perte Manuelle",
            manualAdjustment: "Ajustement Manuel",
            spotTradingProfit: "Profit Trading Spot",
            spotTradingLoss: "Perte Trading Spot",
            referralReward: "Récompense de Parrainage",
            bonus: "Bonus",
            referralCommission: "Commission de Parrainage",
            orderReserved: "Ordre Réservé",
            orderCancelled: "Ordre Annulé",
            orderPartialFill: "Ordre Partiellement Exécuté",
            orderCompleted: "Ordre Terminé",
            feePayment: "Paiement de Frais",
            balanceAdjustment: "Ajustement du Solde",
            transfer: "Transfert"
        }
    },
    withdraw: {
        title: "Retirer de la Crypto",
        selectCurrency: "Sélectionner la Devise",
        selectPlaceholder: "Sélectionnez une devise",
        selectHint: "Veuillez sélectionner une devise pour continuer",
        withdrawalAddress: "Adresse de Retrait",
        withdrawalAmount: "Montant du Retrait",
        withdrawalPassword: "Mot de Passe de Retrait",
        passwordPlaceholder: "Entrez le mot de passe de retrait",
        available: "Disponible",
        amountWithdrawal: "Montant du retrait",
        minimumWithdrawal: "Retrait minimum",
        networkFee: "Frais de réseau",
        youWillReceive: "Vous recevrez",
        confirmWithdrawal: "Confirmer le Retrait",
        processing: "Traitement...",
        securityVerification: "Vérification de Sécurité",
        securityMessage: "Pour votre sécurité, les retraits nécessitent une confirmation par mot de passe et peuvent être soumis à examen. Les retraits vers des adresses incorrectes ne peuvent pas être annulés.",
        networkInfo: "Réseau : {0} ({1})",
        noWalletAddress: "(Aucune adresse de portefeuille)",
        noWallet: {
            title: "Aucune Adresse de Portefeuille Trouvée",
            description: "Vous n'avez pas encore ajouté d'adresses de portefeuille. Veuillez ajouter une adresse de retrait pour procéder à votre transaction.",
            addButton: "Ajouter une Adresse de Portefeuille"
        },
        security: {
            title: "La Sécurité d'Abord",
            description: "Pour votre sécurité, nous demandons une adresse de retrait vérifiée pour chaque cryptomonnaie. Cela aide à prévenir les erreurs et garantit que vos fonds atteignent la bonne destination."
        },
        errors: {
            amountNumber: "Le montant du retrait doit être un nombre",
            amountRequired: "Le montant du retrait est requis",
            amountPositive: "Le montant du retrait doit être supérieur à 0",
            amountMin: "Le montant est inférieur au retrait minimum pour cette devise",
            passwordRequired: "Le mot de passe de retrait est requis",
            noWalletAddress: "Aucune adresse de portefeuille trouvée pour {0}. Veuillez d'abord ajouter une adresse de portefeuille.",
            minimumWithdraw: "Retrait minimum pour {0} : {1} {2}",
            insufficientForFee: "Solde insuffisant pour couvrir les frais ({0} {1})"
        },
        validation: {
            selectCurrency: "Sélectionner la devise",
            enterAmount: "Entrer le montant",
            belowMin: "En dessous du minimum ({0} {1})",
            insufficientBalance: "Solde insuffisant",
            insufficientForFee: "Solde insuffisant (frais inclus)",
            enterPassword: "Entrer le mot de passe"
        }
    },
    deposit: {
        title: "Déposer de la Crypto",
        loading: "Chargement de la méthode de dépôt ...",
        selectNetwork: "Sélectionner le Réseau",
        depositAddress: "Votre adresse de dépôt",
        copyAddress: "Copier l'Adresse",
        amountLabel: "Montant du dépôt ({0})",
        amountPlaceholder: "Minimum : {0} {1}",
        txidLabel: "ID de Transaction (TXID)",
        txidPlaceholder: "Entrez le TXID",
        minimumDeposit: "Dépôt minimum",
        importantNotice: "Avis Important",
        warningMessage: "Veuillez vous assurer de sélectionner le bon réseau pour votre dépôt. L'envoi de fonds via le mauvais réseau peut entraîner une perte permanente de vos actifs, qui ne pourra pas être récupérée.",
        confirmDeposit: "Confirmer le Dépôt",
        network: "Réseau",
        estimatedArrival: "Arrivée estimée",
        networkConfirmations: "3 confirmations du réseau",
        processingTime: "Temps de traitement",
        processingTimeValue: "10-30 minutes",
        noMethods: "Aucune méthode de dépôt disponible pour le moment.",
        addressCopied: "Adresse copiée dans le presse-papiers !",
        unknownNetwork: "Réseau Inconnu"
    },
    wallet: {
        totalPortfolioValue: "Valeur Totale du Portefeuille",
        myAssets: "Mes Actifs",
        manage: "Gérer",
        noAssets: "Aucun actif trouvé",
        quickActions: {
            deposit: "Déposer",
            withdraw: "Retirer",
            history: "Historique",
            convert: "Convertir",
            staking: "Staking"
        }
    },
    trade: {
        title: "SPOT",
        buy: "ACHETER",
        sell: "VENDRE",
        limit: "LIMITE",
        market: "MARCHÉ",
        orderType: "Type d'Ordre",
        price: "Prix (USDT)",
        amount: "Montant",
        available: "Disponible",
        placing: "En cours...",
        increasePrice: "augmenter le prix",
        decreasePrice: "diminuer le prix",
        errors: {
            invalidQuantity: "Veuillez entrer une quantité valide.",
            invalidPrice: "Veuillez entrer un prix valide.",
            insufficientUSDT: "Solde USDT insuffisant. Disponible : {0} USDT",
            insufficientCoin: "Solde {1} insuffisant. Disponible : {0} {1}",
            failedOrder: "Échec de la passation de l'ordre. Veuillez réessayer."
        },
        orderBook: {
            price: "Prix (USDT)",
            amount: "Montant"
        },
        openOrders: {
            title: "ORDRE OUVERT",
            viewAll: "voir tous les ordres",
            status: "Statut",
            price: "Prix",
            amount: "Montant",
            total: "Total",
            cancel: "Annuler",
            noOrders: "Aucun ordre ouvert pour l'instant",
            noOrdersSubtext: "Vos ordres ouverts apparaîtront ici"
        }
    },
    market: {
        title: "MARCHÉ USDT",
        noResults: "Aucune cryptomonnaie trouvée",
        volume: "Vol",
        search: {
            placeholder: "Rechercher une crypto",
            clear: "Effacer la recherche"
        },
        tabs: {
            all: "Toutes",
            gainers: "Gagnants",
            losers: "Perdants",
            favorites: "Favoris"
        }
    },
    signup: {
        title: "INSCRIPTION",
        creatingAccount: "CRÉATION...",
        createAccount: "CRÉER UN COMPTE",
        refresh: "Actualiser",
        captchaMismatch: "Le captcha ne correspond pas",
        alreadyHaveAccount: "Vous avez déjà un compte ? Connectez-vous",
        terms: {
            text: "En créant un compte, vous acceptez nos",
            link: "Conditions d'Utilisation"
        },
        labels: {
            email: "E-mail",
            phoneNumber: "Numéro de Téléphone",
            captcha: "Captcha Graphique",
            password: "Mot de Passe",
            confirmPassword: "Confirmer le Mot de Passe",
            withdrawPassword: "Mot de Passe de Retrait",
            invitationCode: "Code d'Invitation"
        },
        placeholders: {
            email: "Entrez votre e-mail",
            phoneNumber: "Entrez votre numéro de téléphone",
            captcha: "Entrez le code",
            password: "Créez un mot de passe",
            confirmPassword: "Confirmez votre mot de passe",
            withdrawPassword: "Entrez le mot de passe de retrait",
            invitationCode: "Entrez le code d'invitation"
        }
    },
    home: {
        quickAccess: {
            title: "Accès Rapide",
            deposit: "Dépôt",
            security: "Sécurité",
            faqCenter: "Centre d'Aide",
            invitation: "Invitation",
            staking: "Staking"
        },
        popularCryptos: "Cryptomonnaies Populaires",
        seeAll: "Voir tout",
        volume: "Vol",
        loading: "Chargement...",
        notifications: {
            btcAlert: "Alerte de Prix BTC",
            btcReached: "Le Bitcoin a atteint 45 000 $",
            fiveMinAgo: "Il y a 5 min",
            depositSuccess: "Dépôt Réussi",
            depositConfirmed: "Votre dépôt de 0,5 ETH est confirmé",
            oneHourAgo: "Il y a 1 heure",
            securityUpdate: "Mise à Jour de Sécurité",
            newSecurityFeatures: "Nouvelles fonctionnalités de sécurité disponibles",
            twoHoursAgo: "Il y a 2 heures",
            marketNews: "Actualités du Marché",
            ethUpgrade: "La mise à niveau d'Ethereum s'est terminée avec succès",
            fiveHoursAgo: "Il y a 5 heures"
        }
    },
    faq: {
        title: "Centre d'Aide",
        hero: {
            title: "Questions Fréquemment Posées",
            subtitle: "Trouvez des réponses aux questions courantes sur l'utilisation de Nexus"
        },
        search: {
            placeholder: "Rechercher des réponses..."
        },
        categories: {
            gettingStarted: "Pour Commencer",
            managingAccount: "Gérer Votre Compte"
        },
        questions: {
            howToCreateAccount: "Comment créer un compte ?",
            howToCompleteVerification: "Comment compléter la vérification ?",
            howToBuyCrypto: "Comment acheter de la cryptomonnaie ?",
            howToTrade: "Comment trader des cryptomonnaies ?",
            howToSendReceive: "Comment recevoir et envoyer de la crypto ?",
            howToBecomeP2PMerchant: "Comment devenir un Marchand P2P ?",
            howStakingWorks: "Comment fonctionne le staking ?"
        },
        answers: {
            verificationProcess: "Téléchargez une pièce d'identité officielle et une photo selfie. La vérification est généralement approuvée dans les heures qui suivent."
        },
        steps: {
            goToWebsite: "Allez sur https://nexus-exchange.com",
            clickSignUp: 'Cliquez sur "S\'inscrire"',
            enterDetails: "Entrez vos coordonnées",
            verifyEmail: "Vérifiez votre adresse e-mail",
            completeVerification: "Complétez d'abord la vérification",
            clickBuyCrypto: 'Cliquez sur "Acheter de la Crypto"',
            selectCoinAndPayment: "Sélectionnez la pièce et le mode de paiement",
            confirmTransaction: "Confirmez la transaction",
            cryptoInWallet: "La crypto apparaîtra dans votre portefeuille",
            goToTradeMarkets: 'Allez dans "Trade/Marchés"',
            pickTradingPair: "Choisissez une paire de trading (ex: BTC/USDT)",
            placeOrders: "Passez des ordres au marché ou à limite",
            receiveCrypto: "Allez dans Portefeuille > Recevoir → copiez l'adresse ou le QR code",
            sendCrypto: "Allez dans Portefeuille > Envoyer → entrez l'adresse/le montant → confirmez",
            applyP2P: 'Postulez sous la section "P2P"',
            meetCriteria: "Répondez aux critères d'éligibilité",
            createOffers: "Une fois approuvé, créez des offres et tradez",
            goToStaking: "Allez dans Portefeuilles > Staking",
            pickStakingPlan: "Choisissez un plan de staking",
            selectAmount: "Sélectionnez le montant à staker",
            confirmStaking: "Confirmez la transaction",
            rewardsProcessed: "Les récompenses sont traitées automatiquement à la fin de la période"
        },
        labels: {
            toReceive: "Pour recevoir :",
            toSend: "Pour envoyer :"
        },
        futures: {
            title: "Le Trading Futures Expliqué",
            whatAreFutures: "Que sont les contrats futures ?",
            futuresExplanation: "Accords d'achat ou de vente de crypto à un prix prédéterminé à une date future (règlement en espèces).",
            whatIsLeverage: "Qu'est-ce que l'effet de levier ?",
            leverageExplanation: "Capacité de trader avec plus de capital que vous n'en avez (ex: effet de levier 10x, 20x, 50x).",
            longShortPositions: "Que sont les positions Long et Short ?",
            long: "Long",
            longExplanation: "= parier que le prix va monter",
            short: "Short",
            shortExplanation: "= parier que le prix va baisser",
            marginLiquidation: "Que sont la Marge et la Liquidation ?",
            marginExplanation: "Risque de liquidation de la position si votre collatéral baisse trop pour maintenir la position.",
            fundingRate: "Qu'est-ce que le Taux de Financement ?",
            fundingRateExplanation: "Frais échangés toutes les 8 heures entre les traders long et short pour équilibrer les prix des contrats perpétuels avec les prix au comptant.",
            profitLossCalculation: "Comment le Profit/Perte est-il calculé ?",
            profitLossExplanation: "Calculé sur la base de la différence de prix multipliée par votre effet de levier et la taille de votre position."
        },
        benefits: {
            title: "Pourquoi Choisir Nexus Futures ?",
            hedge: "Couverture contre la volatilité du marché",
            multiplyProfits: "Multipliez les profits avec l'effet de levier",
            tradeBothMarkets: "Tradez sur les marchés haussiers et baissiers",
            advancedStrategies: "Mettez en œuvre des stratégies de trading avancées"
        },
        actionCards: {
            contactSupport: "Contacter le Support",
            getHelp: "Obtenez de l'aide de notre équipe",
            community: "Communauté",
            joinDiscussions: "Rejoignez les discussions"
        },
        footer: {
            copyright: "© 2025 Nexus Exchange. Tous droits réservés.",
            needHelp: "Besoin de plus d'aide ? Contactez support@nexus-exchange.com"
        }
    },
    tabBottomNavigator: {
        home: "accueil",
        grap: "graphique",
        records: "historique",
        starting: "démarrage"
    },
    language: {
        title: "Langue de l'Application",
        selectLanguage: "Sélectionner la Langue",
        choosePreferred: "Choisissez votre langue préférée",
        searchPlaceholder: "Rechercher des langues...",
        currentLanguage: "Langue Actuelle",
        languages: {
            english: "Anglais",
            french: "Français",
            russian: "Russe",
            german: "Allemand",
            spanish: "Espagnol"
        },
        nativeNames: {
            english: "English",
            french: "Français",
            russian: "Русский",
            german: "Deutsch",
            spanish: "Español"
        }
    }
},

components: {
    bottomNav: {
      home: "Accueil",
      market: "Marché",
      trade: "Échanger",
      futures: "Futures",
      wallets: "Portefeuilles"
    },
    coinListModal: {
      title: "Sélectionner une cryptomonnaie",
      loading: "Chargement des données de cryptomonnaies...",
      noResults: "Aucune cryptomonnaie trouvée",
      popular: "Populaire",
      search: {
        placeholder: "Rechercher des cryptomonnaies..."
      }
    }
  },

  auth: {
    signin: {
      title: "CONNEXION",
      button: "Se connecter",
      signingIn: "Connexion en cours...",
      forgotPassword: "MOT DE PASSE OUBLIÉ ?",
      signUp: "S'INSCRIRE",
      orContinueWith: "ou continuer avec",
      downloadApp: "TÉLÉCHARGEZ NOTRE APPLICATION",
      appDescription: "Profitez de la meilleure expérience crypto sur votre appareil mobile",
      googlePlay: "Google Play"
    },
    fields: {
      emailOrPhone: "Email/Numéro de téléphone",
      password: "Mot de passe"
    },
    tenants: "Espaces de travail",
    singindesc: "Entrez votre email et mot de passe pour vous connecter",
    signupdesc: "Entrez votre email et mot de passe pour vous inscrire",
    profile: {
      title: "Profil",
      success: "Profil mis à jour avec succès",
      vip: "Félicitations pour votre abonnement",
      wallet: "Paramètres de retrait complétés.",
    },
    createAnAccount: "Créer un compte",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié",

    signup: "S'inscrire",
    signout: "Se déconnecter",
    alreadyHaveAnAccount: "Vous avez déjà un compte ? Connectez-vous.",
    social: {
      errors: {
        "auth-invalid-provider": "Cet email est déjà enregistré avec un autre fournisseur.",
        "auth-no-email": "L'email associé à ce compte est privé ou inexistant.",
      },
    },
    signinWithAnotherAccount: "Se connecter avec un autre compte",
    emailUnverified: {
      message: "Veuillez confirmer votre email à <strong>{0}</strong> pour continuer.",
      submit: "Renvoyer la vérification d'email",
    },
    emptyPermissions: {
      message: "Vous n'avez pas encore de permissions. Attendez que l'administrateur vous accorde des privilèges.",
    },
    passwordResetEmail: {
      message: "Envoyer l'email de réinitialisation du mot de passe",
      error: "Email non reconnu",
    },
    passwordReset: {
      message: "Réinitialiser le mot de passe",
    },
    passwordChange: {
      title: "Changer le mot de passe",
      success: "Mot de passe changé avec succès",
      mustMatch: "Les mots de passe doivent correspondre",
    },
    emailAddressVerificationEmail: {
      error: "Email non reconnu",
    },
    verificationEmailSuccess: "Email de vérification envoyé avec succès",
    passwordResetEmailSuccess: "Email de réinitialisation du mot de passe envoyé avec succès",
    passwordResetSuccess: "Mot de passe changé avec succès",
    verifyEmail: {
      success: "Email vérifié avec succès.",
      message: "Un instant, votre email est en cours de vérification...",
    },
  },

  user: {
    fields: {
      gender: "Genre",
      captcha: "Captcha",
      username: "Nom d'utilisateur",
      walletName: "Nom du portefeuille",
      id: "ID",
      confirmPassword: "Confirmer le mot de passe",
      avatars: "Avatar",
      invitationcode: "Code d'invitation",
      email: "Email",
      emails: "Email(s)",
      erc20: "Adresse portefeuille ERC20",
      trc20: "Adresse portefeuille TRC20",
      fullName: "Nom",
      balance: "Solde",
      firstName: "Prénom",
      lastName: "Nom",
      status: "Statut",
      phoneNumber: "Numéro de téléphone",
      withdrawPassword: "Mot de passe de retrait",
      sector: "Secteur",
      employer: "Employeur",
      profession: "Profession",
      address: "Adresse",
      birthDate: "Date de naissance",
      maritalStatus: "Statut matrimonial",
      facebookLink: "Lien Facebook",
      sponsor: "Parrain",
      role: "Rôle",
      createdAt: "Créé le",
      updatedAt: "Mis à jour le",
      roleUser: "Rôle/Utilisateur",
      roles: "Rôles",
      createdAtRange: "Créé le",
      password: "Mot de passe",
      oldPassword: "Ancien mot de passe",
      newPassword: "Nouveau mot de passe",
      newPasswordConfirmation: "Confirmation du nouveau mot de passe",
      rememberMe: "Se souvenir de moi",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Industrie agroalimentaire",
      ASSURANCES: "Assurance",
      AUDIOVISUEL: "Audiovisuel",
      BANCAIRE: "Bancaire",
      CHIMIE: "Chimie",
      COMPOSANTS_AUTOMOBILES: "Composants automobiles",
      DISTRIBUTION: "Distribution",
      DISTRIBUTION_AUTOMOBILE: "Distribution automobile",
      DIVERS: "Divers",
      FINANCIER: "Financier",
      HOLDING: "Holding",
      IMMOBILIER: "Immobilier",
      INDUSTRIEL: "Industriel",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistique et transport",
      PHARMACEUTIQUE: "Pharmaceutique",
      SANTÉ: "Santé",
      TOURSIME: "Tourisme",
      INFORMATION_TECHNOLOGY: "Technologie de l'information",
    },
    maritalStatus: {
      célébataire: "Célibataire",
      marié: "Marié",
    },
    status: {
      active: "Actif",
      invited: "Invité",
      "empty-permissions": "En attente des permissions",
      inactive: "Inactif",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "Homme",
        female: "Femme",
      }
    },
    invite: "Inviter",
    validations: {
      email: "L'email ${value} est invalide",
    },
    title: "Utilisateurs",
    menu: "Utilisateurs",
    doAddSuccess: "Utilisateur(s) enregistré(s) avec succès",
    doUpdateSuccess: "Utilisateur enregistré avec succès",
    exporterFileName: "export_utilisateurs",
    doDestroySuccess: "Utilisateur supprimé avec succès",
    doDestroyAllSelectedSuccess: "Utilisateurs supprimés avec succès",
    edit: {
      title: "Modifier l'utilisateur",
    },
    new: {
      title: "Inviter un ou des utilisateur(s)",
      titleModal: "Inviter un utilisateur",
      emailsHint: "Séparez plusieurs adresses email par une virgule.",
    },
    view: {
      title: "Voir l'utilisateur",
      activity: "Activité",
    },
    importer: {
      title: "Importer des utilisateurs",
      fileName: "modèle_import_utilisateurs",
      hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace. Les relations doivent être les ID des enregistrements référencés séparés par un espace. Les rôles doivent être les ids de rôle séparés par un espace.",
    },
    errors: {
      userAlreadyExists: "Un utilisateur avec cet email existe déjà",
      userNotFound: "Utilisateur non trouvé",
      revokingOwnPermission: "Vous ne pouvez pas révoquer votre propre permission d'administrateur",
    },
  },


  entities: {
    record: {
      menu: "Enregistrements",
      fields: {
        user: "utilisateur",
        product: "produit",
        number: "numéro d'enregistrement",
        status: "statut",
      },
      list: {
        title: "Liste des enregistrements",
      },
      view: {
        title: "Détail de l'enregistrement",
      },
      edit: {
        title: "Modifier l'enregistrement",
      },
      create: {
        success: "Produit soumis avec succès.",
      },
      update: {
        success: "Produit soumis avec succès.",
      },
      destroy: {
        success: "Enregistrement supprimé avec succès",
      },
      destroyAll: {
        success: "Enregistrement supprimé avec succès",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Terminé",
          canceled: "Annulé",
        },
      },
    },

    category: {
      name: "catégorie",
      label: "Catégories",
      menu: "Catégories",
      exporterFileName: "export_categorie",
      list: {
        menu: "Catégories",
        title: "Catégories",
      },
      create: {
        success: "Catégorie enregistrée avec succès",
      },
      update: {
        success: "Catégorie enregistrée avec succès",
      },
      destroy: {
        success: "Catégorie supprimée avec succès",
      },
      destroyAll: {
        success: "Catégorie(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la catégorie",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        photo: "Photo",
        metaKeywords: "Mots-clés Meta",
        metaDescriptions: "Descriptions Meta",
        status: "Statut",
        isFeature: "Est en vedette",
        serialRange: "Série",
        serial: "Série",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle catégorie",
      },
      view: {
        title: "Voir la catégorie",
      },
      importer: {
        title: "Importer des catégories",
        fileName: "modèle_import_categorie",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    product: {
      name: "produit",
      label: "Produits",
      menu: "Produits",
      exporterFileName: "export_produit",
      list: {
        menu: "Produits",
        title: "Produits",
      },
      create: {
        success: "Produit enregistré avec succès",
      },
      update: {
        success: "Produit enregistré avec succès",
      },
      destroy: {
        success: "Produit supprimé avec succès",
      },
      destroyAll: {
        success: "Produit(s) supprimé(s) avec succès",
      },
      edit: {
        title: "Modifier le produit",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        tags: "Tags",
        video: "Vidéo",
        specificationName: "Nom de la spécification",
        specificationDesciption: "Description de la spécification",
        isSpecification: "Est une spécification",
        details: "Détails",
        photo: "Photo",
        discountPriceRange: "Prix remisé",
        discountPrice: "Prix actuel",
        previousPriceRange: "Prix précédent",
        previousPrice: "Prix précédent",
        stockRange: "Stock",
        stock: "Stock",
        metaKeywords: "Mots-clés Meta",
        metaDesctiption: "Description courte",
        status: "Statut",
        isType: "Type",
        dateRange: "Date",
        date: "Date",
        itemType: "Type d'article",
        file: "Fichier",
        link: "Lien",
        fileType: "Type de fichier",
        taxe: "Taxe",
        category: "Catégorie",
        subcategory: "Sous-catégorie",
        childcategory: "Sous-sous-catégorie",
        brand: "Marque",
        gallery: "Galerie",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
        itemType: {
          physical: "physique",
          digitale: "Numérique",
        },
        fileType: {
          file: "Fichier",
          link: "Lien",
        },
        isType: {
          new_arrival: "Nouvelle arrivée",
          feature_product: "Produit vedette",
          top_pdroduct: "Produit populaire",
          best_product: "Meilleur produit",
          flash_deal_product: "Produit en promotion flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouveau produit",
      },
      view: {
        title: "Voir le produit",
      },
      importer: {
        title: "Importer des produits",
        fileName: "modèle_import_produit",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
    transaction: {
      name: "transaction",
      label: "Transactions",
      menu: "Transactions",
      exporterFileName: "export_transaction",
      list: {
        menu: "Transactions",
        title: "Transactions",
      },
      create: {
        success: "Transaction envoyée avec succès",
      },
      update: {
        success: "Transaction enregistrée avec succès",
      },
      destroy: {
        success: "Transaction supprimée avec succès",
      },
      destroyAll: {
        success: "Transaction(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la transaction",
      },
      fields: {
        id: "Id",
        amountRange: "Montant",
        amount: "Montant",
        email: "Email",
        tax: "Taxe",
        currencySign: "Signe monétaire",
        currencyValue: "Valeur monétaire",
        orderId: "ID de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Succès",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle transaction",
      },
      view: {
        title: "Voir la transaction",
      },
      importer: {
        title: "Importer des transactions",
        fileName: "modèle_import_transaction",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    order: {
      name: "commande",
      label: "Commandes",
      menu: "Commandes",
      exporterFileName: "export_commande",
      list: {
        menu: "Commandes",
        title: "Commandes",
      },
      create: {
        success: "Commande enregistrée avec succès",
      },
      update: {
        success: "Commande enregistrée avec succès",
      },
      destroy: {
        success: "Commande supprimée avec succès",
      },
      destroyAll: {
        success: "Commande(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la commande",
      },
      fields: {
        id: "Id",
        userId: "Utilisateur",
        cart: "Panier",
        shipping: "Livraison",
        discountRange: "Remise",
        discount: "Remise",
        paymentMethod: "Méthode de paiement",
        taxe: "Taxe",
        transactionNumber: "Numéro de transaction",
        orderStatus: "Statut de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        orderStatus: {
          pending: "En attente",
          in_progress: "En cours",
          delivered: "Livré",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle commande",
      },
      view: {
        title: "Voir la commande",
      },
      importer: {
        title: "Importer des commandes",
        fileName: "modèle_import_commande",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
  },



  errors: {
    backToHome: "Retour à l'accueil",
    403: `Désolé, vous n'avez pas accès à cette page`,
    404: "Désolé, la page que vous avez visitée n'existe pas",
    500: "Désolé, le serveur signale une erreur",
    429: "Trop de requêtes. Veuillez réessayer plus tard.",
    forbidden: {
      message: "Interdit",
    },
    validation: {
      message: "Une erreur s'est produite",
    },
    defaultErrorMessage: "Oups, une erreur s'est produite",
  },

  withdraw: {
    withdrawamount: "Montant du retrait",
    Withdrawpassword: "Mot de passe de retrait",
    availablebalance: "Solde disponible",
    rules: "Description des règles",
    rule1: "Le retrait minimum est de 20 $",
    rule2: "Le paiement sera effectué dans les 24 heures suivant la demande de retrait",
    rule3: "L'absence de soumission des commandes quotidiennes entraîne l'impossibilité de retrait, tous les produits doivent être soumis pour retrait"
  },
  profile: {
    profile: "Profil",
    fullname: "Nom complet",
    email: "Email",
    phonenumber: "Numéro de téléphone",
    country: "Pays",
    Invitationcode: "Code d’invitation"
  },
  wallet: {
    wallet: "Portefeuille",
    info: "Informations sur la méthode de retrait",
    username: "Nom d'utilisateur",
    walletname: 'Nom du portefeuille',
    walletaddress: 'Adresse du portefeuille',
    note: "Remarque",
    notedesctiption: "Veuillez remplir ces informations avec précaution."
  },


  cs: {
    cs: "Service client",
    note: "Si vous avez des questions ou rencontrez des problèmes, veuillez nous envoyer un email ou discuter avec notre équipe de support client en ligne.",
    contactnow: "Contacter maintenant"
  },
  transaction: {
    transaction: "Transaction",
    all: "Tout",
    withdraw: "Retrait",
    dposit: "Dépôt",
    notransaction: "Aucune transaction pour le moment !"
  },
  order: {
    order: "Commande",
    completed: "Complété",
    pending: "En attente",
    canceled: "Annulé",
    ordertime: "Heure de la commande",
    ordernumber: "Numéro de commande",
    total: "Montant total de la commande",
    commission: "Commission",
    return: "Retour estimé"
  },

  security: {
    changepassword: "Changer le mot de passe",
    oldpassword: "Ancien mot de passe",
    newpassword: "Nouveau mot de passe",
    confirmpassword: "Confirmer le mot de passe",
    note: "Remarque",
    notedesc: "Veuillez remplir ces informations avec précaution"
  },



  tabbarmenue: {
    home: "Accueil",
    rate: "Évaluer",
    profile: "Profil"
  },


  validation: {
    mixed: {
      default: "${path} est invalide",
      required: "${path} est requis",
      oneOf: "${path} doit être l'une des valeurs suivantes : ${values}",
      notOneOf: "${path} ne doit pas être l'une des valeurs suivantes : ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} doit être un(e) ${type}`;
      },
    },
    string: {
      length: "${path} doit contenir exactement ${length} caractères",
      min: "${path} doit contenir au moins ${min} caractères",
      max: "${path} doit contenir au maximum ${max} caractères",
      matches: '${path} doit correspondre au format suivant : "${regex}"',
      email: "${path} doit être une adresse e-mail valide",
      url: "${path} doit être une URL valide",
      trim: "${path} doit être une chaîne sans espaces au début et à la fin",
      lowercase: "${path} doit être en minuscules",
      uppercase: "${path} doit être en majuscules",
      selected: "${path} doit être sélectionné",
    },
    number: {
      min: "${path} doit être supérieur ou égal à ${min}",
      max: "${path} doit être inférieur ou égal à ${max}",
      lessThan: "${path} doit être inférieur à ${less}",
      moreThan: "${path} doit être supérieur à ${more}",
      notEqual: "${path} ne doit pas être égal à ${notEqual}",
      positive: "${path} doit être un nombre positif",
      negative: "${path} doit être un nombre négatif",
      integer: "${path} doit être un nombre entier",
    },
    date: {
      min: "${path} doit être postérieur à ${min}",
      max: "${path} doit être antérieur à ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} ne doit pas contenir de clés non spécifiées dans l'objet",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} est requis`
          : `${path} doit contenir au moins ${min} éléments`,
      max: "${path} doit contenir au maximum ${max} éléments",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Téléverser",
    image: "Vous devez téléverser une image",
    size: "Le fichier est trop volumineux. La taille maximale autorisée est de {0}",
    formats: `Format invalide. Doit être l'un des suivants : {0}.`,
  },


};

export default fr;
