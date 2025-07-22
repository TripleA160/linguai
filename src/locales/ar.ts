import type { Locale } from "../types/localization-types";

const ar: Locale = {
  auth: {
    signUp: "إنشاء حساب",
    login: "تسجيل دخول",
    logout: "تسجيل خروج",
    email: "الإيميل",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    passwordChangeSuccess: "تم تغيير كلمة المرور بنجاح.",
    displayName: "الاسم",
    profileInfo: "الملف الشخصي",
    security: "الأمان",
    apply: "تطبيق",
    change: "تغيير",
    verificationSent:
      "تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.",
    newEmailVerificationSent:
      "تم إرسال رابط التحقق إلى عنوان البريد الإلكتروني الجديد. يرجى التحقق من صندوق الوارد.",
  },
  settings: {
    auto: "تلقائي",
    toggleAuto: "المظهر التلقائي",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",
    toggleTheme: "تبديل المظهر",
    language: "اللغة",
    selectLanguage: "اختيار اللغة",
  },
  translator: {
    placeholder: "اكتب هنا...",
    translating: "جاري الترجمة...",
    sourceLanguage: "من",
    targetLanguage: "إلى",
    save: "حفظ",
    saved: "تم الحفظ",
    copy: "نسخ",
    copied: "تم النسخ",
    switch: "تبديل",
    selectSourceLanguage: "اختر لغة الكتابة",
    selectTargetLanguage: "اختر لغة الترجمة",
  },
  navigation: {
    appSettings: "إعدادات التطبيق",
    accountSettings: "إعدادات الحساب",
    history: "السجل",
    saved: "المحفوظات",
    delete: "حذف",
  },
  errors: {
    form: {
      nameMissing: "يرجى إدخال الاسم.",
      emailMissing: "يرجى إدخال البريد الإلكتروني.",
      passwordMissing: "يرجى إدخال كلمة المرور.",
      passwordConfirmationMissing: "يرجى تأكيد كلمة المرور.",
      passwordInvalidLength: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.",
      passwordInvalidCharacter:
        "يمكن استخدام الأحرف الإنجليزية، الأرقام، والرموز الشائعة فقط في كلمة المرور.",
      passwordInvalidStart: "يمكن أن تبدأ كلمة المرور بأحرف فقط.",
      passwordNoLowercase:
        "يجب أن تحتوي كلمة المرور على حرف إنجليزي صغير (a-z) واحد على الأقل.",
      passwordNoUppercase:
        "يجب أن تحتوي كلمة المرور على حرف إنجليزي كبير (A-Z) واحد على الأقل.",
      passwordDoNotMatch: "كلمتا المرور غير متطابقتين.",
      currentPasswordMissing: "يرجى إدخال كلمة المرور الحالية.",
      newPasswordMissing: "يرجى إدخال كلمة المرور الجديدة.",
    },
    auth: {
      signup: {
        "auth/email-already-in-use": "هذا البريد الإلكتروني مستخدم بالفعل.",
        "auth/invalid-email":
          "عنوان البريد الإلكتروني هذا غير صالح. يرجى التحقق والمحاولة مرة أخرى.",
        "auth/weak-password": "كلمة المرور ضعيفة جداً.",
        "auth/too-many-requests":
          "تم إجراء عدد كبير من المحاولات. يرجى المحاولة لاحقًا.",
      },
      login: {
        "auth/invalid-email":
          "عنوان البريد الإلكتروني هذا غير صالح. يرجى التحقق والمحاولة مرة أخرى.",
        "auth/invalid-credential":
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى أو أنشئ حساب جديد.",
        "auth/user-not-found":
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى أو أنشئ حساب جديد.",
        "auth/wrong-password":
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى أو أنشئ حساب جديد.",
        "auth/user-disabled": "تم تعطيل هذا الحساب.",
        "auth/too-many-requests":
          "تم إجراء عدد كبير من المحاولات. يرجى المحاولة لاحقًا.",
      },
      profile: {
        "auth/invalid-email":
          "عنوان البريد الإلكتروني هذا غير صالح. يرجى التحقق والمحاولة مرة أخرى.",
        "auth/invalid-credential":
          "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
        "auth/too-many-requests":
          "تم إجراء عدد كبير من المحاولات. يرجى المحاولة لاحقًا.",
        "auth/operation-not-allowed":
          "يرجى تأكيد الحساب أولا. تحقق من الرابط المرسل إلى بريدك الإلكتروني",
        "auth/email-change-need-password":
          "يرجى إدخال كلمة المرور الخاصة بك لتغيير عنوان البريد الإلكتروني.",
      },
      passwordChange: {
        "auth/weak-password": "كلمة المرور ضعيفة جداً.",
        "auth/invalid-credential":
          "كلمة المرور الحالية غير صحيحة. يرجى المحاولة مرة أخرى.",
        "auth/too-many-requests":
          "تم إجراء عدد كبير من المحاولات. يرجى المحاولة لاحقًا.",
        "auth/operation-not-allowed":
          "يرجى تأكيد الحساب أولا. تحقق من الرابط المرسل إلى بريدك الإلكتروني",
      },
      unexpected: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
    },
    ai: {
      "429":
        "تم الوصول إلى الحد الأقصى لاستخدام Gemini. حاول مرة أخرى بعد قليل.",
      "500": "حدث خطأ غير متوقع من جهة Google. حاول مرة أخرى بعد قليل.",
      "503": "النظام يواجه مشكلة مؤقتة. حاول مرة أخرى بعد قليل.",
      "504":
        "استغرقت العملية وقتًا طويلاً. حاول تبسيط الطلب أو إعادة المحاولة لاحقًا.",
      unexpected: "حدث خطأ غير متوقع، حاول مرة أخرى بعد قليل.",
    },
  },
};

export default ar;
