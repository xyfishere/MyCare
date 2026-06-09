const aboutCopy = {
  zh: {
    back: "返回 My Care",
    eyebrow: "信息与支持",
    title: "欢迎分享你的想法和建议",
    subtitle: "如果你发现问题、想分享使用感受，或对 My Care 有任何建议，可以直接发送邮件给我。",
    feedbackKicker: "发送反馈",
    feedbackTitle: "让 My Care 变得更好",
    emailAction: "给我发邮件",
    welcomeTitle: "欢迎反馈",
    welcomeCopy: "欢迎分享错误、令人困惑的部分或新想法。",
    privacyTitle: "隐私优先",
    privacyCopy: "你的反馈和数据会保持私密与安全。",
    updatesTitle: "测试版更新",
    updatesCopy: "了解 My Care 的最新消息和改进。",
    footerLine: "为更缓慢、更稳定的日子而做。",
  },
  en: {
    back: "Back to My Care",
    eyebrow: "Information & Support",
    title: "Ideas and feedback are always welcome",
    subtitle: "If you find an issue, want to share your experience, or have a suggestion for My Care, you can email me directly.",
    feedbackKicker: "Send feedback",
    feedbackTitle: "Help make My Care better",
    emailAction: "Email me",
    welcomeTitle: "Feedback welcome",
    welcomeCopy: "Share bugs, confusing parts, or ideas.",
    privacyTitle: "Privacy first",
    privacyCopy: "Your feedback and data stay private and secure.",
    updatesTitle: "Beta updates",
    updatesCopy: "Get the latest news about My Care.",
    footerLine: "Made for slower, steadier days.",
  },
};

const backgroundImages = [
  ["森林溪流", "Unsplash", "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85"],
  ["清晨树林", "Unsplash", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=85"],
  ["绿林小路", "Unsplash", "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=2400&q=85"],
  ["森林湖畔", "Unsplash", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85"],
  ["雾中森林", "Unsplash", "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=85"],
  ["森林光线", "Unsplash", "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=2400&q=85"],
  ["小猫凝视", "Unsplash", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2400&q=85"],
  ["窗边小猫", "Unsplash", "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=2400&q=85"],
  ["暖光小猫", "Unsplash", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=2400&q=85"],
  ["安静小猫", "Unsplash", "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=2400&q=85"],
  ["猫咪特写", "Pexels", "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=2400"],
  ["绿意森林", "Pexels", "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=2400"],
  ["冰岛黑沙滩", "Unsplash", "https://images.unsplash.com/photo-1741660419720-df89f2906cfc?auto=format&fit=crop&w=2400&q=85"],
  ["Gullfoss 冰雪瀑布", "Unsplash", "https://images.unsplash.com/photo-1651254665060-0fe9e7b1551f?auto=format&fit=crop&w=2400&q=85"],
  ["Landmannalaugar 苔原山谷", "Unsplash", "https://images.unsplash.com/photo-1661041524618-220a2a2b8b74?auto=format&fit=crop&w=2400&q=85"],
  ["冰岛瀑布山谷", "Unsplash", "https://images.unsplash.com/photo-1660489028389-b16abc97da71?auto=format&fit=crop&w=2400&q=85"],
  ["Skógafoss 雪山瀑布", "Unsplash", "https://images.unsplash.com/photo-1651932167017-60502240bb22?auto=format&fit=crop&w=2400&q=85"],
  ["Skógafoss 青绿瀑布", "Unsplash", "https://images.unsplash.com/photo-1634055633771-48a7a9d2464a?auto=format&fit=crop&w=2400&q=85"],
  ["冰岛北极光", "Unsplash", "https://images.unsplash.com/photo-1517322479358-df90f951f87d?auto=format&fit=crop&w=2400&q=85"],
  ["冰岛极光星空", "Unsplash", "https://images.unsplash.com/photo-1559843473-cd9037597389?auto=format&fit=crop&w=2400&q=85"],
  ["Skógafoss 极光", "Unsplash", "https://images.unsplash.com/photo-1728875650224-fd3f375f6546?auto=format&fit=crop&w=2400&q=85"],
];

function setRandomBackground() {
  const [title, source, url] = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.documentElement.style.setProperty("--active-bg", `url("${url}")`);
  document.querySelector("#backgroundCredit").textContent = `背景：${title} · ${source}`;
}

function renderAboutLanguage(language) {
  const copy = aboutCopy[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-lang-label]").forEach((label) => {
    label.classList.toggle("active", label.dataset.langLabel === language);
  });
}

const savedLanguage = localStorage.getItem("myCareAboutLanguage");
let aboutLanguage = savedLanguage === "en" ? "en" : "zh";
setRandomBackground();
renderAboutLanguage(aboutLanguage);

document.querySelector("#aboutLanguageToggle").addEventListener("click", () => {
  aboutLanguage = aboutLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("myCareAboutLanguage", aboutLanguage);
  renderAboutLanguage(aboutLanguage);
});
