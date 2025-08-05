import type { Locale } from "../types/localization-types";

const fr: Locale = {
  auth: {
    signUp: "Créer un compte",
    login: "Connexion",
    logout: "Déconnexion",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    passwordChangeSuccess: "Votre mot de passe a été changé avec succès.",
    displayName: "Nom",
    profileInfo: "Profil",
    security: "Sécurité",
    apply: "Appliquer",
    change: "Modifier",
    verificationSent:
      "Un lien de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception.",
    newEmailVerificationSent:
      "Un lien de vérification a été envoyé au nouvel e-mail. Veuillez vérifier votre boîte de réception.",
  },
  settings: {
    auto: "Auto",
    toggleAuto: "Thème automatique",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    toggleTheme: "Changer de thème",
    language: "Langue",
    selectLanguage: "Choisir la langue",
    textSize: "Taille du texte",
    textSizeReduce: "Réduire la taille du texte",
    textSizeIncrease: "Augmenter la taille du texte",
  },
  translator: {
    placeholder: "Écrivez ici...",
    translating: "Traduction en cours...",
    sourceLanguage: "De",
    targetLanguage: "Vers",
    save: "Enregistrer",
    saved: "Enregistré",
    copy: "Copier",
    copied: "Copié",
    switch: "Inverser",
    selectSourceLanguage: "Choisir la langue d’entrée",
    selectTargetLanguage: "Choisir la langue de traduction",
    detectLanguage: "Détecter la langue",
  },
  navigation: {
    appSettings: "Paramètres de l’application",
    accountSettings: "Paramètres du compte",
    openMenu: "Ouvrir le menu",
    history: "Historique",
    saved: "Enregistrés",
    noHistoryAccess:
      "Aucun historique de traductions pour le moment. Connectez-vous ou créez un compte pour suivre vos traductions.",
    noSavedAccess:
      "Aucune traduction enregistrée pour le moment. Connectez-vous ou créez un compte pour les enregistrer.",
    delete: "Supprimer",
  },
  errors: {
    form: {
      nameMissing: "Veuillez entrer un nom.",
      emailMissing: "Veuillez entrer un e-mail.",
      passwordMissing: "Veuillez entrer un mot de passe.",
      passwordConfirmationMissing: "Veuillez confirmer le mot de passe.",
      passwordInvalidLength:
        "Le mot de passe doit contenir au moins 8 caractères.",
      passwordInvalidCharacter:
        "Le mot de passe ne peut contenir que des lettres anglaises, des chiffres et des caractères spéciaux courants.",
      passwordInvalidStart: "Le mot de passe doit commencer par une lettre.",
      passwordNoLowercase:
        "Le mot de passe doit contenir au moins une lettre minuscule.",
      passwordNoUppercase:
        "Le mot de passe doit contenir au moins une lettre majuscule.",
      passwordDoNotMatch: "Les mots de passe ne correspondent pas.",
      currentPasswordMissing: "Veuillez entrer votre mot de passe actuel.",
      newPasswordMissing: "Veuillez entrer un nouveau mot de passe.",
    },
    auth: {
      signup: {
        "auth/email-already-in-use": "Cet e-mail est déjà utilisé.",
        "auth/invalid-email":
          "Cette adresse e-mail est invalide. Veuillez vérifier et réessayer.",
        "auth/weak-password": "Le mot de passe est trop faible.",
        "auth/too-many-requests":
          "Trop de tentatives. Veuillez réessayer plus tard.",
      },
      login: {
        "auth/invalid-email":
          "Cette adresse e-mail est invalide. Veuillez vérifier et réessayer.",
        "auth/invalid-credential":
          "E-mail ou mot de passe incorrect. Réessayez ou créez un compte.",
        "auth/user-not-found":
          "E-mail ou mot de passe incorrect. Réessayez ou créez un compte.",
        "auth/wrong-password":
          "E-mail ou mot de passe incorrect. Réessayez ou créez un compte.",
        "auth/user-disabled": "Ce compte a été désactivé.",
        "auth/too-many-requests":
          "Trop de tentatives. Veuillez réessayer plus tard.",
      },
      profile: {
        "auth/invalid-email":
          "Cette adresse e-mail est invalide. Veuillez vérifier et réessayer.",
        "auth/invalid-credential":
          "Mot de passe incorrect. Veuillez réessayer.",
        "auth/too-many-requests":
          "Trop de tentatives. Veuillez réessayer plus tard.",
        "auth/operation-not-allowed":
          "Veuillez vérifier votre compte. Consultez le lien de vérification envoyé à votre e-mail.",
        "auth/email-change-need-password":
          "Veuillez saisir votre mot de passe pour changer l’adresse e-mail.",
      },
      passwordChange: {
        "auth/weak-password": "Le mot de passe est trop faible.",
        "auth/invalid-credential":
          "Le mot de passe actuel est incorrect. Veuillez réessayer.",
        "auth/too-many-requests":
          "Trop de tentatives. Veuillez réessayer plus tard.",
        "auth/operation-not-allowed":
          "Veuillez vérifier votre compte. Consultez le lien de vérification envoyé à votre e-mail.",
      },
      unexpected: "Une erreur inattendue s’est produite. Veuillez réessayer.",
    },
    ai: {
      "429":
        "Limite d’utilisation de Gemini atteinte. Réessayez dans un instant.",
      "500": "Erreur inattendue du côté de Google. Réessayez dans un instant.",
      "503":
        "Le système rencontre un problème temporaire. Réessayez dans un instant.",
      "504":
        "La requête a pris trop de temps. Essayez de la simplifier ou réessayez plus tard.",
      unexpected:
        "Une erreur inattendue s’est produite. Réessayez dans un instant.",
    },
  },
};

export default fr;
