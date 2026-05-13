const STORE_KEY = "myCareApp.v1";
const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultNightMusicPlaylists = {
  classical: "https://www.bilibili.com/video/BV1nTbizxE83/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  guitar: "https://www.bilibili.com/video/BV1ixREBSEe7/?spm_id_from=333.1391.0.0",
  rain: "https://www.bilibili.com/video/BV1C79xBLEKK/?spm_id_from=333.1391.0.0",
};

const nightBackgroundTrackUrl = "https://www.bilibili.com/video/BV1bs411X7pd/";
const morningBackgroundTrackUrl = "https://www.bilibili.com/video/BV1GP411d7Hr/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c";

const morningMeditations = {
  focus: {
    label: "专注冥想",
    url: "https://www.bilibili.com/video/BV1kP41137JQ/?spm_id_from=333.337.search-card.all.click",
  },
  emotion: {
    label: "情绪冥想",
    url: "https://www.bilibili.com/video/BV1eNpAe2E9i/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  },
  mindfulness: {
    label: "正念冥想",
    url: "https://www.bilibili.com/video/BV1AG4y167xD/?spm_id_from=333.337.search-card.all.click&vd_source=3912bdc9ceab10ea76b3b53828b9018c",
  },
};

const legacyNightMusicPlaylists = {
  classical: "https://www.youtube.com/results?search_query=classical+sleep+music+playlist",
  guitar: "https://www.youtube.com/results?search_query=acoustic+guitar+sleep+music+playlist",
  rain: "https://www.youtube.com/results?search_query=gentle+rain+sleep+music+playlist",
};

const defaults = {
  settings: {
    calendarUrl: "https://calendar.google.com/calendar/u/0/r/day",
    nightMode: "simple",
    nightMusicTheme: "classical",
    nightMusicPlaylists: defaultNightMusicPlaylists,
    personalBlockTheme: "iceland",
    personalBlockTab: "write",
    personalNoteFilter: "all",
  },
  morningEntries: [],
  focusSessions: [],
  nightEntries: [],
  healthRecords: [],
  personalNotes: [],
};

const backgroundImages = [
  {
    title: "森林溪流",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "清晨树林",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "绿林小路",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "森林湖畔",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "雾中森林",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "森林光线",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "小猫凝视",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "窗边小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "暖光小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "安静小猫",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "猫咪特写",
    source: "Pexels",
    url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=2400",
  },
  {
    title: "绿意森林",
    source: "Pexels",
    url: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=2400",
  },
  {
    title: "冰岛黑沙滩",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1741660419720-df89f2906cfc?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Gullfoss 冰雪瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1651254665060-0fe9e7b1551f?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Landmannalaugar 苔原山谷",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1661041524618-220a2a2b8b74?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛瀑布山谷",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1660489028389-b16abc97da71?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 雪山瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1651932167017-60502240bb22?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 青绿瀑布",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1634055633771-48a7a9d2464a?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛北极光",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1517322479358-df90f951f87d?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "冰岛极光星空",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1559843473-cd9037597389?auto=format&fit=crop&w=2400&q=85",
  },
  {
    title: "Skógafoss 极光",
    source: "Unsplash",
    url: "https://images.unsplash.com/photo-1728875650224-fd3f375f6546?auto=format&fit=crop&w=2400&q=85",
  },
];

let state = loadState();
let audio = {};
let focusTimer = {
  mode: "focus",
  running: false,
  remaining: 30 * 60,
  total: 30 * 60,
  focusMinutes: 30,
  interval: null,
  cycle: 1,
};
let focusCategory = "学习";
let selectedFocusMinutes = 30;
let morningIndex = 0;
let nightIndex = 0;
let nightInterval = null;
let selectedNoteMood = "平静";
let selectedNoteDelay = { type: "days", days: 7 };
let selectedNoteRecipient = "self";
let currentBackgroundCredit = "";

const personalBlockThemeCredits = {
  iceland: "背景：冰湖雪山 · Unsplash",
  green: "背景：梯田风景 · Unsplash",
  purple: "背景：薰衣草花海 · Unsplash",
  dark: "背景：极光星空 · Unsplash",
};

const nightModes = {
  simple: {
    label: "精简模式",
    duration: 12,
    steps: [
      "把手机放到外面充电，让夜晚先安静下来。",
      "慢慢洗漱，给皮肤涂上乳液和面霜。",
      "轻轻准备好明早的衣服、水杯、钥匙或包。",
      "写下明天醒来后最先做的一件小事，就一句话。",
      "关灯，陪自己做 5 轮呼气更长的慢呼吸。",
      "放空大脑，不再去想任何事情。晚安！",
    ],
  },
  decompress: {
    label: "解压模式",
    duration: 18,
    steps: [
      "把灯光调暗，把手机放到外面充电，给自己一点安静。",
      "写下现在最占脑子的 1 到 3 件事，让它们先离开脑袋。",
      "在每件事旁边写一句：明天可以做的最小动作。",
      "写一句收尾：这件事已经被记录，今晚不用继续解决。",
      "从脚到脸慢慢放松肌肉：轻轻绷紧 3 秒，再温柔地放掉。",
      "躺下后吸气 4 秒、呼气 6 秒，陪自己重复 8 轮。",
      "如果很久仍清醒，就先离开床，去暗处做一点安静无聊的事，困了再回来。",
    ],
  },
  relaxed: {
    label: "放松模式",
    duration: 30,
    steps: [
      "关掉强光，开启勿扰，选一份适合今晚的睡前音乐。",
      "泡澡、泡脚或冲一个热水澡，让身体慢慢降速。",
      "敷面膜，或者做一轮细致一点的护肤，不需要看短视频。",
      "换上舒服的睡衣，顺手整理床边、水杯和明早要用的东西。",
      "轻轻拉伸肩颈、背部、髋部和小腿，舒服就好，不做到酸痛。",
      "写下今天完成的一件小事，只记一件就够了。",
      "关灯，做 8 轮慢呼吸，让呼气比吸气更长一点。",
    ],
  },
};

const defaultMorningQuotes = [
  {
    label: "先读一句",
    prompt: "爱自己是一生浪漫的开始。",
    hint: "",
  },
  {
    label: "再读一句",
    prompt: "人不可以逃避苦难，亦不可以放弃希望。",
    hint: "",
  },
  {
    label: "启动提醒",
    prompt: "唯有“美”能让生命拥意义。",
    hint: "",
  },
  {
    label: "短句 4",
    prompt: "我们体内住着一个存在，他无所不知，他知道自己想要什么，它比我们更懂得如何生活得更好。",
    hint: "",
  },
  {
    label: "短句 5",
    prompt: "如果一个人一直足够鉴定，就能实现他的愿望。",
    hint: "",
  },
  {
    label: "短句 6",
    prompt: "我始终沉浸在自己之中，我的注意力永远朝向内心。",
    hint: "",
  },
  {
    label: "短句 7",
    prompt: "寻找自己，在自己内心扎根，试探着走出自己的道路，无论这条路将通向何方。",
    hint: "",
  },
  {
    label: "短句 8",
    prompt: "读书，痛苦，爱着从痛苦中滋生出来的那份喜悦，这是一个永无止境的过程。",
    hint: "",
  },
  {
    label: "短句 9",
    prompt: "我遇见的每一个人，街头的每一丝气味，都让我有了无限去爱的理由。",
    hint: "",
  },
];

const morningCheckInSteps = [
  {
    label: "皮肤状态",
    prompt: "现在的皮肤是什么状态？",
    hint: "选一个最接近的就好，不需要分析原因。",
    field: "skin",
  },
  {
    label: "起床时间",
    prompt: "你今天大概几点起床？",
    hint: "填一个时间。模糊也可以，这只是给未来的你一点线索。",
    field: "wake",
  },
  {
    label: "饥饿值",
    prompt: "现在的饥饿值是多少？",
    hint: "0 是完全不饿，10 是非常饿。",
    field: "hunger",
  },
  {
    label: "今日一句话",
    prompt: "给今天留一句很短的提醒。",
    hint: "可以留空。短一点反而更容易带走。",
    field: "note",
  },
  {
    label: "晨间冥想",
    prompt: "很好。现在去做晨间冥想。",
    hint: "链接在这里。确认无误后点击按钮，记录会一起保存。",
    field: "meditation",
    action: "saveAndMeditate",
  },
  {
    label: "今日目标",
    prompt: "冥想回来后，打开 Calendar。",
    hint: "把今天最重要的目标放进一个看得见的时间块里。",
    field: "calendar",
    action: "openCalendar",
  },
];

let morningQuotePool = [...defaultMorningQuotes];
let morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  if (!saved) return cloneDefaults();
  try {
    const parsed = JSON.parse(saved);
    const loaded = {
      ...cloneDefaults(),
      ...parsed,
      settings: { ...cloneDefaults().settings, ...(parsed.settings || {}) },
    };
    loaded.settings.nightMusicPlaylists = migrateNightMusicPlaylists(parsed.settings?.nightMusicPlaylists);
    if (!loaded.settings.nightMusicPlaylists[loaded.settings.nightMusicTheme]) {
      loaded.settings.nightMusicTheme = defaults.settings.nightMusicTheme;
    }
    return loaded;
  } catch {
    return cloneDefaults();
  }
}

function migrateNightMusicPlaylists(savedPlaylists = {}) {
  const merged = { ...defaultNightMusicPlaylists, ...savedPlaylists };
  Object.entries(legacyNightMusicPlaylists).forEach(([theme, oldUrl]) => {
    if (!savedPlaylists[theme] || savedPlaylists[theme] === oldUrl) {
      merged[theme] = defaultNightMusicPlaylists[theme];
    }
  });
  delete merged.bedtime;
  return merged;
}

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaults));
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  refreshDashboard();
}

function init() {
  setRandomBackground();
  loadMorningQuotes();

  $("#todayLabel").textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  $("#calendarUrl").value = state.settings.calendarUrl;
  $("#nightMusicUrl").value = getNightMusicUrl();
  $("#wakeTime").value = new Date().toTimeString().slice(0, 5);

  bindNavigation();
  bindMorning();
  bindFocus();
  bindNight();
  bindPersonalBlock();
  bindStats();
  showView("home");
  refreshDashboard();
}

function setRandomBackground() {
  const selected = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.documentElement.style.setProperty("--active-bg", `url("${selected.url}")`);
  currentBackgroundCredit = `背景：${selected.title} · ${selected.source}`;
  $("#backgroundCredit").textContent = currentBackgroundCredit;
}

async function loadMorningQuotes() {
  try {
    const response = await fetch("morning-quotes.json", { cache: "no-store" });
    if (!response.ok) throw new Error("quotes file unavailable");
    const quotes = await response.json();
    const normalized = normalizeMorningQuotes(quotes);
    if (!normalized.length) throw new Error("quotes file is empty");
    morningQuotePool = normalized;
    resetMorningSteps();
  } catch {
    morningQuotePool = [...defaultMorningQuotes];
    resetMorningSteps();
  }
}

function normalizeMorningQuotes(quotes) {
  if (!Array.isArray(quotes)) return [];
  return quotes
    .map((quote, index) => {
      if (typeof quote === "string") {
        return {
          label: `短句 ${index + 1}`,
          prompt: quote.trim(),
          hint: "",
        };
      }
      return {
        label: quote.label || `短句 ${index + 1}`,
        prompt: String(quote.prompt || "").trim(),
        hint: quote.hint || "",
      };
    })
    .filter((quote) => quote.prompt);
}

function resetMorningSteps() {
  morningSteps = [...pickMorningQuotes(), ...morningCheckInSteps];
}

function pickMorningQuotes() {
  const pool = [...morningQuotePool];
  const selected = [];
  while (pool.length && selected.length < 2) {
    const index = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }
  return selected.map((quote, index) => ({
    ...quote,
    label: `今日短句 ${index + 1}`,
  }));
}

function bindNavigation() {
  $$(".nav-tab, .module-card, .immersive-home, .paper-entry").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });

  $("#calendarUrl").addEventListener("change", (event) => {
    state.settings.calendarUrl = event.target.value || defaults.settings.calendarUrl;
    saveState();
  });
}

function showView(viewName) {
  $$(".nav-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".paper-entry").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#view-${viewName}`).classList.add("active");
  setImmersiveMode(viewName);
  if (viewName !== "morning") stopMorningBackgroundTrack();
  if (viewName === "block") renderPersonalBlock();
  if (viewName !== "block") $("#backgroundCredit").textContent = currentBackgroundCredit;
  if (viewName === "stats") drawCharts();
}

function setImmersiveMode(viewName) {
  document.body.classList.toggle("immersive-mode", viewName === "morning" || viewName === "night");
  document.body.classList.toggle("morning-mode", viewName === "morning");
  document.body.classList.toggle("night-mode", viewName === "night");
  document.body.classList.toggle("block-mode", viewName === "block");
}

function bindMorning() {
  $("#hunger").addEventListener("input", (event) => {
    $("#hungerOut").textContent = `${event.target.value} / 10`;
  });

  $("#startMorning").addEventListener("click", () => {
    playMorningBackgroundTrack();
    resetMorningSteps();
    morningIndex = 0;
    $("#startMorning").textContent = "从头开始";
    $("#nextMorning").textContent = "下一步";
    renderMorningPrompt();
  });

  $("#nextMorning").addEventListener("click", () => {
    const currentStep = morningSteps[morningIndex];
    if (currentStep?.action === "saveAndMeditate") {
      saveMorningEntry({ openMeditation: false, stayOnMeditation: true });
      return;
    }
    if (currentStep?.action === "openCalendar") {
      updateMorningLinks();
      saveState();
      openFlowLink(state.settings.calendarUrl);
      renderMorningComplete();
      $("#nextMorning").textContent = "已完成";
      return;
    }
    morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
    renderMorningPrompt();
  });

  $("#morningForm").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  $$(".meditation-option").forEach((button) => {
    button.addEventListener("click", () => {
      const meditation = morningMeditations[button.dataset.meditation];
      if (!meditation) return;
      saveMorningEntry({ openMeditation: false });
      openFlowLink(meditation.url);
      morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
      renderMorningPrompt();
    });
  });

  $$(".audio-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const kind = button.dataset.audio;
      if (kind === "night") {
        if ($("#nightMusicPlayerWrap").classList.contains("is-hidden")) playNightBackgroundTrack();
        else stopNightBackgroundTrack();
        return;
      }
      if (kind === "morning") {
        if (audio.morning?.playing) stopMorningBackgroundTrack();
        else playMorningBackgroundTrack();
        return;
      }
      if (audio[kind]?.playing) stopAudio(kind);
      else startAudio(kind);
    });
  });
}

function setAudioButtonState(kind, isPlaying) {
  const button = document.querySelector(`[data-audio="${kind}"]`);
  if (!button) return;
  button.classList.toggle("active", isPlaying);
  button.setAttribute("aria-label", `${isPlaying ? "暂停" : "播放"}${kind === "morning" ? "晨间" : "睡前"}音乐`);
  button.setAttribute("title", isPlaying ? "暂停音乐" : "播放音乐");
}

function renderMorningPrompt() {
  const step = morningSteps[morningIndex];
  $("#morningStepLabel").textContent = `${step.label} · ${morningIndex + 1} / ${morningSteps.length}`;
  $("#morningPrompt").textContent = step.prompt;
  $("#morningHint").textContent = step.hint;
  $("#morningHint").hidden = !step.hint;
  $("#nextMorning").textContent = getMorningButtonText(step);
  $("#morningForm").classList.toggle("is-hidden", !step.field);
  $$(".morning-field").forEach((field) => {
    field.classList.toggle("active", field.dataset.morningField === step.field);
  });
  animateStep("#view-morning .ritual-stage");
}

function getMorningButtonText(step) {
  if (step.action === "saveAndMeditate") return "选择冥想";
  if (step.action === "openCalendar") return "打开 Calendar";
  return "下一步";
}

function renderMorningComplete() {
  $("#morningForm").classList.add("is-hidden");
  $$(".morning-field").forEach((field) => field.classList.remove("active"));
  $("#morningStepLabel").textContent = "完成";
  $("#morningPrompt").textContent = "晨间流程完成。今天不用完美，只要能回来就好。";
  $("#morningHint").textContent = "你已经把今天打开了。";
  animateStep("#view-morning .ritual-stage");
}

function saveMorningEntry(options = {}) {
  updateMorningLinks();
  const entry = {
    date: todayKey(),
    createdAt: new Date().toISOString(),
    skinState: $("#skinState").value,
    wakeTime: $("#wakeTime").value,
    hunger: Number($("#hunger").value),
    note: $("#morningNote").value.trim(),
  };
  state.morningEntries = state.morningEntries.filter((item) => item.date !== entry.date);
  state.morningEntries.push(entry);
  saveState();
  if (options.openMeditation) openFlowLink(options.openMeditation);
  if (options.stayOnMeditation) return;
  morningIndex = Math.min(morningIndex + 1, morningSteps.length - 1);
  renderMorningPrompt();
}

function updateMorningLinks() {
  state.settings.calendarUrl = $("#calendarUrl").value || defaults.settings.calendarUrl;
}

function bindFocus() {
  $("#toggleFocus").addEventListener("click", toggleFocusTimer);
  $("#skipFocus").addEventListener("click", finishFocusSegment);
  $("#resetFocus").addEventListener("click", resetFocusTimer);
  $("#logFocus").addEventListener("click", () => logFocusSession(selectedFocusMinutes, "manual"));
  $$(".focus-category").forEach((button) => {
    button.addEventListener("click", () => {
      focusCategory = button.dataset.focusCategory;
      renderFocusCategories();
    });
  });
  $$(".duration-option").forEach((button) => {
    button.addEventListener("click", () => setFocusDuration(Number(button.dataset.duration)));
  });
  $("#customFocusMinutes").addEventListener("change", (event) => {
    setFocusDuration(Number(event.target.value));
  });
  renderFocusCategories();
  renderFocusDurationOptions();
  renderTimer();
}

function toggleFocusTimer() {
  focusTimer.running ? pauseFocusTimer() : startFocusTimer();
}

function startFocusTimer() {
  focusTimer.running = true;
  $("#toggleFocus").textContent = "暂停";
  focusTimer.interval = setInterval(() => {
    focusTimer.remaining -= 1;
    if (focusTimer.remaining <= 0) finishFocusSegment();
    renderTimer();
  }, 1000);
}

function pauseFocusTimer() {
  focusTimer.running = false;
  clearInterval(focusTimer.interval);
  $("#toggleFocus").textContent = "继续";
}

function finishFocusSegment() {
  clearInterval(focusTimer.interval);
  let autoStartBreak = false;
  if (focusTimer.mode === "focus") {
    const completedMinutes = focusTimer.focusMinutes;
    logFocusSession(completedMinutes, "timer");
    const breakMinutes = completedMinutes <= 30 ? 5 : 10;
    focusTimer.mode = "break";
    focusTimer.remaining = breakMinutes * 60;
    focusTimer.total = breakMinutes * 60;
    autoStartBreak = true;
  } else {
    focusTimer.mode = "focus";
    focusTimer.focusMinutes = selectedFocusMinutes;
    focusTimer.remaining = selectedFocusMinutes * 60;
    focusTimer.total = selectedFocusMinutes * 60;
    focusTimer.cycle += 1;
  }
  focusTimer.running = false;
  $("#toggleFocus").textContent = "开始";
  renderTimer();
  if (autoStartBreak) startFocusTimer();
}

function resetFocusTimer() {
  clearInterval(focusTimer.interval);
  focusTimer = {
    mode: "focus",
    running: false,
    remaining: selectedFocusMinutes * 60,
    total: selectedFocusMinutes * 60,
    focusMinutes: selectedFocusMinutes,
    interval: null,
    cycle: 1,
  };
  $("#toggleFocus").textContent = "开始";
  renderTimer();
}

function renderTimer() {
  const minutes = String(Math.floor(focusTimer.remaining / 60)).padStart(2, "0");
  const seconds = String(focusTimer.remaining % 60).padStart(2, "0");
  const progress = 1 - focusTimer.remaining / focusTimer.total;
  $("#timerDisplay").textContent = `${minutes}:${seconds}`;
  $("#timerMode").textContent = focusTimer.mode === "focus" ? "专注" : "休息";
  $("#cycleLabel").textContent = `第 ${focusTimer.cycle} 轮`;
  $("#timerRing").style.setProperty("--water-level", `${Math.max(progress * 100, 4)}%`);
  $("#timerRing").style.setProperty("--sand-progress", `${Math.max(progress * 100, 3)}%`);
  $("#timerRing").style.setProperty("--sand-remaining", `${Math.max((1 - progress) * 100, 3)}%`);
  $("#timerRing").classList.toggle("break-mode", focusTimer.mode === "break");
}

function logFocusSession(minutes, source) {
  state.focusSessions.push({
    date: todayKey(),
    createdAt: new Date().toISOString(),
    minutes,
    source,
    category: focusCategory,
    task: $("#focusTask").value.trim(),
  });
  saveState();
}

function renderFocusCategories() {
  $$(".focus-category").forEach((button) => {
    button.classList.toggle("active", button.dataset.focusCategory === focusCategory);
  });
}

function setFocusDuration(minutes) {
  const normalized = Math.max(5, Math.min(120, Number.isFinite(minutes) ? Math.round(minutes) : 30));
  selectedFocusMinutes = normalized;
  $("#customFocusMinutes").value = normalized;
  renderFocusDurationOptions();
  if (!focusTimer.running && focusTimer.mode === "focus") {
    focusTimer.focusMinutes = selectedFocusMinutes;
    focusTimer.remaining = selectedFocusMinutes * 60;
    focusTimer.total = selectedFocusMinutes * 60;
    renderTimer();
  }
}

function renderFocusDurationOptions() {
  $$(".duration-option").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.duration) === selectedFocusMinutes);
  });
}

function bindNight() {
  $$(".mode-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.nightMode = button.dataset.nightMode;
      nightIndex = 0;
      clearInterval(nightInterval);
      saveState();
      renderNightStep();
    });
  });

  $("#startNight").addEventListener("click", () => {
    startAudio("night");
    nightIndex = 0;
    renderNightStep();
    clearInterval(nightInterval);
    const mode = getNightMode();
    const stepMs = Math.round((mode.duration * 60 * 1000) / mode.steps.length);
    nightInterval = setInterval(() => {
      advanceNightStep();
    }, stepMs);
  });

  $("#completeNight").addEventListener("click", advanceNightStep);
  $$(".music-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.nightMusicTheme = button.dataset.musicTheme;
      $("#nightMusicUrl").value = getNightMusicUrl();
      saveState();
      renderNightMusicOptions();
      playNightMusic();
    });
  });
  $("#nightMusicUrl").addEventListener("change", (event) => {
    const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
    state.settings.nightMusicPlaylists = {
      ...defaults.settings.nightMusicPlaylists,
      ...(state.settings.nightMusicPlaylists || {}),
      [theme]: event.target.value || defaults.settings.nightMusicPlaylists[theme],
    };
    $("#nightMusicUrl").value = getNightMusicUrl();
    saveState();
  });
  renderNightStep();
  renderNightMusicOptions();
}

function renderNightStep() {
  const mode = getNightMode();
  $$(".mode-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.nightMode === state.settings.nightMode);
  });
  $("#nightModeDuration").textContent = `${mode.duration} 分钟`;
  $("#nightStepLabel").textContent = `${mode.label} · 第 ${nightIndex + 1} 步 / ${mode.steps.length}`;
  $("#nightPrompt").textContent = mode.steps[nightIndex] || "今天到这里就很好。";
  $("#nightHint").textContent = getNightModeHint(state.settings.nightMode);
  $("#nightProgressBar").style.width = `${(nightIndex / Math.max(mode.steps.length - 1, 1)) * 100}%`;
  $("#completeNight").textContent = nightIndex >= mode.steps.length - 1 ? "完成睡前" : "下一步";
  animateStep("#view-night .night-stage");
}

function getNightMode() {
  return nightModes[state.settings.nightMode] || nightModes.simple;
}

function getNightModeHint(modeName) {
  if (modeName === "simple") return "“把自己置于舒适的环境里，并走向自己。”";
  if (modeName === "decompress") return "先把压力从脑子里放到纸上，再让身体慢慢松下来。";
  return "今晚可以慢一点，让身体知道一天真的结束了。";
}

function getNightMusicUrl() {
  const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
  const playlists = { ...defaults.settings.nightMusicPlaylists, ...(state.settings.nightMusicPlaylists || {}) };
  return playlists[theme] || defaults.settings.nightMusicPlaylists.classical;
}

function updateNightMusicUrl() {
  const theme = state.settings.nightMusicTheme || defaults.settings.nightMusicTheme;
  state.settings.nightMusicPlaylists = {
    ...defaults.settings.nightMusicPlaylists,
    ...(state.settings.nightMusicPlaylists || {}),
    [theme]: $("#nightMusicUrl").value || defaults.settings.nightMusicPlaylists[theme],
  };
  $("#nightMusicUrl").value = getNightMusicUrl();
}

function renderNightMusicOptions() {
  $$(".music-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.musicTheme === state.settings.nightMusicTheme);
  });
}

function playNightMusic() {
  updateNightMusicUrl();
  const embedUrl = toEmbeddableMusicUrl(getNightMusicUrl());
  $("#nightMusicPlayer").src = embedUrl;
  $("#nightMusicPlayerWrap").classList.remove("is-hidden");
  setAudioButtonState("night", true);
}

function playNightBackgroundTrack() {
  $("#nightMusicPlayer").src = toEmbeddableMusicUrl(nightBackgroundTrackUrl);
  $("#nightMusicPlayerWrap").classList.remove("is-hidden");
  setAudioButtonState("night", true);
}

function stopNightBackgroundTrack() {
  $("#nightMusicPlayer").src = "";
  $("#nightMusicPlayerWrap").classList.add("is-hidden");
  setAudioButtonState("night", false);
}

function playMorningBackgroundTrack() {
  $("#morningMusicPlayerWrap").classList.remove("is-hidden");
  $("#morningMusicPlayer").src = "";
  requestAnimationFrame(() => {
    $("#morningMusicPlayer").src = toEmbeddableMusicUrl(morningBackgroundTrackUrl);
  });
  audio.morning = { playing: true, embedded: true };
  setAudioButtonState("morning", true);
}

function stopMorningBackgroundTrack() {
  if (!$("#morningMusicPlayer")) return;
  $("#morningMusicPlayer").src = "";
  $("#morningMusicPlayerWrap").classList.add("is-hidden");
  audio.morning = null;
  setAudioButtonState("morning", false);
}

function toEmbeddableMusicUrl(url) {
  const bvid = url.match(/BV[a-zA-Z0-9]+/)?.[0];
  if (bvid) {
    return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=1`;
  }
  return url;
}

function advanceNightStep() {
  const mode = getNightMode();
  if (nightIndex >= mode.steps.length - 1) {
    completeNight();
    return;
  }
  nightIndex += 1;
  renderNightStep();
}

function completeNight() {
  clearInterval(nightInterval);
  $("#nightProgressBar").style.width = "100%";
  state.nightEntries = state.nightEntries.filter((item) => item.date !== todayKey());
  state.nightEntries.push({ date: todayKey(), createdAt: new Date().toISOString(), completed: true, mode: state.settings.nightMode });
  saveState();
  stopAudio("night");
  $("#nightStepLabel").textContent = "完成";
  $("#nightPrompt").textContent = "睡前流程完成。现在可以把自己交给睡眠了。";
  $("#nightHint").textContent = "如果一会儿还是很清醒，就先离开床，去暗处做安静无聊的事，困了再回来。";
  $("#completeNight").textContent = "已完成";
  animateStep("#view-night .night-stage");
}

function animateStep(selector) {
  const element = $(selector);
  if (!element) return;
  element.classList.remove("step-transition");
  void element.offsetWidth;
  element.classList.add("step-transition");
}

function bindPersonalBlock() {
  if (!$("#personalBlockShell")) return;
  state.personalNotes = state.personalNotes || [];

  $$(".block-theme-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalBlockTheme = button.dataset.blockTheme;
      saveState();
      renderPersonalBlockTheme();
    });
  });

  $$(".block-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalBlockTab = button.dataset.blockTab;
      saveState();
      renderPersonalBlockTab();
    });
  });

  $$(".recipient-option").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.recipient === "friend") {
        $("#personalNoteHint").textContent = "给朋友留小纸条的功能先留在这里，下一版再打开。";
        return;
      }
      selectedNoteRecipient = button.dataset.recipient;
      $$(".recipient-option").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $$("#noteMoodChoices .note-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedNoteMood = button.dataset.noteMood;
      $$("#noteMoodChoices .note-chip").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $$("#noteDelayChoices .note-chip").forEach((button) => {
    button.addEventListener("click", () => {
      selectedNoteDelay = button.dataset.noteRandom
        ? { type: "random", days: null }
        : { type: "days", days: Number(button.dataset.noteDays) };
      renderNoteDelaySelection();
      updatePersonalNoteHint();
    });
  });

  $("#customNoteDays").addEventListener("focus", () => {
    selectedNoteDelay = { type: "custom", days: Number($("#customNoteDays").value) || 14 };
    renderNoteDelaySelection();
    updatePersonalNoteHint();
  });

  $("#customNoteDays").addEventListener("input", () => {
    if (selectedNoteDelay.type !== "custom") return;
    selectedNoteDelay.days = Number($("#customNoteDays").value) || 14;
    updatePersonalNoteHint();
  });

  $("#savePersonalNote").addEventListener("click", savePersonalNote);
  $("#randomPersonalNote").addEventListener("click", showRandomPersonalNote);
  $("#noteSearchDate").addEventListener("change", renderPersonalNotes);

  $$(".note-filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings.personalNoteFilter = button.dataset.noteFilter;
      saveState();
      renderPersonalNotes();
    });
  });

  renderPersonalBlock();
}

function renderPersonalBlock() {
  renderPersonalBlockTheme();
  renderPersonalBlockTab();
  renderNoteDelaySelection();
  updatePersonalNoteHint();
  renderPersonalNotes();
}

function renderPersonalBlockTheme() {
  const theme = state.settings.personalBlockTheme || defaults.settings.personalBlockTheme;
  const shell = $("#personalBlockShell");
  if (!shell) return;
  shell.className = `block-shell block-theme-${theme}`;
  document.body.dataset.blockTheme = theme;
  if (document.body.classList.contains("block-mode")) {
    $("#backgroundCredit").textContent = personalBlockThemeCredits[theme] || currentBackgroundCredit;
  }
  $$(".block-theme-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.blockTheme === theme);
  });
}

function renderPersonalBlockTab() {
  $("#blockWritePanel")?.classList.add("active");
  $("#blockReadPanel")?.classList.add("active");
}

function renderNoteDelaySelection() {
  $$("#noteDelayChoices .note-chip").forEach((button) => {
    const isRandom = selectedNoteDelay.type === "random" && button.dataset.noteRandom;
    const isFixed = selectedNoteDelay.type === "days" && Number(button.dataset.noteDays) === selectedNoteDelay.days;
    button.classList.toggle("active", Boolean(isRandom || isFixed));
  });
  $(".custom-note-delay").classList.toggle("active", selectedNoteDelay.type === "custom");
}

function updatePersonalNoteHint() {
  const hint = $("#personalNoteHint");
  if (!hint) return;
  if (selectedNoteDelay.type === "random") {
    hint.textContent = "这张纸条会在未来 1 到 30 天之间随机回来。";
    return;
  }
  const days = getPersonalNoteDelayDays({ preview: true });
  hint.textContent = `这张纸条会在 ${days} 天后回来。`;
}

function getPersonalNoteDelayDays(options = {}) {
  if (selectedNoteDelay.type === "random" && !options.preview) {
    return Math.floor(Math.random() * 30) + 1;
  }
  if (selectedNoteDelay.type === "custom") {
    const value = Number($("#customNoteDays").value);
    return Math.max(1, Math.min(365, Number.isFinite(value) ? Math.round(value) : 14));
  }
  if (selectedNoteDelay.type === "random") return 1;
  return selectedNoteDelay.days || 7;
}

function savePersonalNote() {
  const textarea = $("#personalNoteText");
  const text = textarea.value.trim();
  if (!text) {
    $("#personalNoteHint").textContent = "先写一句很短的话就可以。";
    textarea.focus();
    return;
  }

  const delayDays = getPersonalNoteDelayDays();
  const openAt = new Date();
  openAt.setDate(openAt.getDate() + delayDays);
  const createdAt = new Date().toISOString();
  const note = {
    id: `note-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    text,
    mood: selectedNoteMood,
    recipient: selectedNoteRecipient,
    createdAt,
    date: createdAt.slice(0, 10),
    openAt: openAt.toISOString(),
    delayDays,
    theme: state.settings.personalBlockTheme || defaults.settings.personalBlockTheme,
  };

  state.personalNotes = [note, ...(state.personalNotes || [])];
  saveState();
  textarea.value = "";
  $("#personalNoteHint").textContent = `已经收好，会在 ${delayDays} 天后回来。`;
  renderPersonalNotes(note.id);
}

function showRandomPersonalNote() {
  const notes = getFilteredPersonalNotes();
  if (!notes.length) {
    $("#personalNotesBoard").innerHTML = `<div class="empty-note">还没有符合条件的小纸条。</div>`;
    renderMoodStats();
    return;
  }
  const selected = notes[Math.floor(Math.random() * notes.length)];
  renderPersonalNotes(selected.id);
}

function getFilteredPersonalNotes() {
  const filter = state.settings.personalNoteFilter || "all";
  const date = $("#noteSearchDate")?.value;
  return (state.personalNotes || []).filter((note) => {
    const moodMatched = filter === "all" || note.mood === filter;
    const dateMatched = !date || note.date === date || note.openAt.slice(0, 10) === date;
    return moodMatched && dateMatched;
  });
}

function renderPersonalNotes(highlightId = "") {
  if (!$("#personalNotesBoard")) return;
  const filter = state.settings.personalNoteFilter || "all";
  $$(".note-filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.noteFilter === filter);
  });

  const notes = getFilteredPersonalNotes();
  $("#personalNotesBoard").innerHTML = notes.length
    ? notes.map((note, index) => renderPersonalNoteCard(note, highlightId, index)).join("")
    : `<div class="empty-note">这里还很安静。写下一张小纸条，它会慢慢长成你的时间胶囊。</div>`;
  renderMoodStats();
}

function renderPersonalNoteCard(note, highlightId, index) {
  const daysLeft = Math.ceil((new Date(note.openAt).getTime() - Date.now()) / 86400000);
  const timeLabel = daysLeft > 0 ? `${daysLeft} 天后可读` : "现在可以读";
  const rotate = (index % 5) - 2;
  return `
    <article class="personal-note-card ${note.id === highlightId ? "highlight" : ""}" style="--note-rotate:${rotate}deg">
      <div class="note-card-meta">
        <span class="mood-dot" data-mood="${escapeHtml(note.mood)}"></span>
        <b>${escapeHtml(note.mood)}</b>
        <small>${timeLabel}</small>
      </div>
      <p>${escapeHtml(note.text)}</p>
      <time>${formatShortDate(note.date)}</time>
    </article>
  `;
}

function renderMoodStats() {
  const target = $("#noteMoodStats");
  if (!target) return;
  const moods = ["平静", "开心", "疲惫", "焦虑", "期待"];
  const notes = state.personalNotes || [];
  target.innerHTML = moods.map((mood) => {
    const count = notes.filter((note) => note.mood === mood).length;
    return `<span><i class="mood-dot" data-mood="${mood}"></i>${mood} ${count}</span>`;
  }).join("");
}

function formatShortDate(dateText) {
  if (!dateText) return "";
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric" }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindStats() {
  $("#healthImport")?.addEventListener("change", handleImport);
  $("#exportData").addEventListener("click", exportData);
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result);
    const records = file.name.endsWith(".xml") ? parseHealthXml(text) : parseCsvOrJson(text, file.name);
    state.healthRecords.push(...records);
    saveState();
    $("#importResult").textContent = `已导入 ${records.length} 条健康记录`;
  };
  reader.readAsText(file);
}

function parseHealthXml(text) {
  const doc = new DOMParser().parseFromString(text, "text/xml");
  const records = Array.from(doc.querySelectorAll("Record")).slice(0, 6000);
  return records.map((record) => ({
    date: (record.getAttribute("startDate") || "").slice(0, 10),
    type: record.getAttribute("type") || "unknown",
    value: Number(record.getAttribute("value")) || 0,
    unit: record.getAttribute("unit") || "",
  })).filter((item) => item.date);
}

function parseCsvOrJson(text, name) {
  if (name.endsWith(".json")) {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  }
  return text.split(/\r?\n/).slice(1).map((line) => {
    const [date, type, value, unit = ""] = line.split(",");
    return { date, type, value: Number(value), unit };
  }).filter((item) => item.date && item.type);
}

function startAudio(kind) {
  stopAudio(kind);
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  const context = new AudioEngine();
  const gain = context.createGain();
  gain.gain.value = kind === "morning" ? 0.045 : 0.032;
  gain.connect(context.destination);

  const tones = kind === "morning" ? [261.63, 329.63, 392] : [196, 246.94, 293.66];
  const oscillators = tones.map((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index * 4;
    oscillator.connect(gain);
    oscillator.start();
    return oscillator;
  });

  audio[kind] = { context, oscillators, playing: true };
  setAudioButtonState(kind, true);
}

function stopAudio(kind) {
  if (!audio[kind]) return;
  audio[kind].oscillators.forEach((oscillator) => oscillator.stop());
  audio[kind].context.close();
  audio[kind] = null;
  setAudioButtonState(kind, false);
}

function openFlowLink(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function refreshDashboard() {
  const today = todayKey();
  const morning = state.morningEntries.find((item) => item.date === today);
  const focusToday = state.focusSessions.filter((item) => item.date === today);
  const night = state.nightEntries.find((item) => item.date === today);

  $("#morningStatus").textContent = morning ? "已记录" : "未记录";
  $("#focusStatus").textContent = `${focusToday.length} 轮`;
  $("#nightStatus").textContent = night ? "已完成" : "未完成";
  $("#todayFocusMinutes").textContent = focusToday.reduce((sum, item) => sum + item.minutes, 0);
  $("#todayFocusRounds").textContent = focusToday.length;
  renderFocusCategorySummary(focusToday);
  if ($("#view-stats").classList.contains("active")) drawCharts();
}

function renderFocusCategorySummary(focusToday) {
  const target = $("#focusCategorySummary");
  if (!target) return;
  const totals = focusToday.reduce((acc, item) => {
    const category = item.category || "未分类";
    acc[category] = (acc[category] || 0) + item.minutes;
    return acc;
  }, {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  target.innerHTML = entries.length
    ? entries.map(([category, minutes]) => `<span><b>${category}</b>${minutes} 分钟</span>`).join("")
    : "<span>今天还没有分类专注记录</span>";
}

function lastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });
}

function drawCharts() {
  const days = lastSevenDays();
  drawLineChart($("#hungerChart"), days, days.map((day) => state.morningEntries.find((item) => item.date === day)?.hunger ?? null), 10);
  drawLineChart($("#focusChart"), days, days.map((day) => state.focusSessions.filter((item) => item.date === day).reduce((sum, item) => sum + item.minutes, 0)), 120);
  drawCategoryChart($("#categoryChart"), days);
  renderSummary(days);
}

function drawCategoryChart(canvas, days) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const totals = state.focusSessions
    .filter((item) => days.includes(item.date))
    .reduce((acc, item) => {
      const category = item.category || "未分类";
      acc[category] = (acc[category] || 0) + item.minutes;
      return acc;
    }, {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!entries.length) {
    ctx.fillStyle = "#62756a";
    ctx.font = "22px Noto Sans SC";
    ctx.textAlign = "center";
    ctx.fillText("还没有分类专注记录", width / 2, height / 2);
    return;
  }
  const max = Math.max(...entries.map(([, minutes]) => minutes), 1);
  const colors = ["#496f52", "#7fb38c", "#9fc8bd", "#d9c77a", "#b9dbc8", "#365f49"];
  ctx.font = "18px Noto Sans SC";
  entries.forEach(([category, minutes], index) => {
    const y = 34 + index * 36;
    const barWidth = Math.max(8, ((width - 190) * minutes) / max);
    ctx.fillStyle = "#183228";
    ctx.textAlign = "left";
    ctx.fillText(category, 34, y + 18);
    ctx.fillStyle = colors[index % colors.length];
    roundRect(ctx, 118, y, barWidth, 18, 9);
    ctx.fill();
    ctx.fillStyle = "#62756a";
    ctx.textAlign = "right";
    ctx.fillText(`${minutes} 分钟`, width - 28, y + 18);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawLineChart(canvas, labels, values, maxValue) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(73, 111, 82, 0.16)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = 34 + i * 52;
    ctx.beginPath();
    ctx.moveTo(44, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  const points = values.map((value, index) => {
    const x = 54 + index * ((width - 92) / 6);
    const normalized = value === null ? null : Math.min(value / maxValue, 1);
    const y = normalized === null ? null : height - 48 - normalized * (height - 84);
    return { x, y, value };
  });

  ctx.strokeStyle = "#496f52";
  ctx.lineWidth = 4;
  ctx.beginPath();
  let started = false;
  points.forEach((point) => {
    if (point.y === null) return;
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    }
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach((point, index) => {
    ctx.fillStyle = point.y === null ? "#cfddd4" : "#7fb38c";
    ctx.beginPath();
    ctx.arc(point.x, point.y ?? height - 48, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6b7280";
    ctx.font = "18px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(labels[index].slice(5), point.x, height - 14);
  });
}

function renderSummary(days) {
  const morningCount = state.morningEntries.filter((item) => days.includes(item.date)).length;
  const focusMinutes = state.focusSessions.filter((item) => days.includes(item.date)).reduce((sum, item) => sum + item.minutes, 0);
  const nightCount = state.nightEntries.filter((item) => days.includes(item.date)).length;
  const healthCount = state.healthRecords.length;
  $("#summaryList").innerHTML = [
    ["晨间记录", `${morningCount}/7`],
    ["专注时长", `${focusMinutes} 分钟`],
    ["睡前完成", `${nightCount}/7`],
    ["健康数据", `${healthCount} 条`],
  ].map(([label, value]) => `<div><b>${value}</b><span>${label}</span></div>`).join("");
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `my-care-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

init();
