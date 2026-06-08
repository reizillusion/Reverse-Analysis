const SAVE_KEY = "reverse-analysis-save";
const MENU_BACKDROP = "assets/images/backgrounds/menu-hall.jpg";

class AudioManager {
  constructor() {
    this.context = null;
    this.enabled = true;
    this.assetTemplates = new Map();
    this.unavailableAssets = new Set();
    this.activePlayers = new Set();
    this.musicPlayer = null;
    this.currentMusicKey = null;
    this.requestedMusicKey = null;
    this.unavailableMusic = new Set();
    this.musicVolume = 0.3;
    this.assetConfig = {
      ui: { src: "assets/audio/ui-click.wav", volume: 0.45 },
      objection: { src: "assets/audio/objection.flac", volume: 0.72 },
      success: { src: "assets/audio/success.wav", volume: 0.58 },
      fail: { src: "assets/audio/fail.wav", volume: 0.58 },
      scene: { src: "assets/audio/scene-transition.wav", volume: 0.6 },
      end: { src: "assets/audio/end.ogg", volume: 0.68 },
    };
    this.musicConfig = {
      menu: "music/0.mp3",
      "case-1": "music/1.mp3",
      "case-2": "music/2.mp3",
      "case-3": "music/3.mp3",
      "case-4": "music/4.mp3",
      "case-5": "music/5.mp3",
      "case-6": "music/6.mp3",
    };
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopActivePlayers();
      this.pauseMusic();
      return;
    }

    this.resumeRequestedMusic();
  }

  ensureContext() {
    if (!this.enabled) {
      return null;
    }

    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return null;
      }

      this.context = new AudioContextClass();
    }

    if (this.context.state === "suspended") {
      this.context.resume().catch(() => {});
    }

    return this.context;
  }

  playTone(options) {
    const context = this.ensureContext();
    if (!context) {
      return;
    }

    const { type, frequency, duration, gain, rampTo } = options;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const masterGain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    if (typeof rampTo === "number") {
      oscillator.frequency.linearRampToValueAtTime(rampTo, now + duration);
    }

    masterGain.gain.setValueAtTime(gain, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(masterGain);
    masterGain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  sequence(tones, gap = 0.04) {
    if (!this.enabled) {
      return;
    }

    let accumulatedDelay = 0;
    tones.forEach((tone) => {
      window.setTimeout(() => this.playTone(tone), accumulatedDelay * 1000);
      accumulatedDelay += tone.duration + gap;
    });
  }

  stopActivePlayers() {
    this.activePlayers.forEach((player) => {
      player.pause();
      player.currentTime = 0;
    });
    this.activePlayers.clear();
  }

  pauseMusic() {
    if (!this.musicPlayer) {
      return;
    }

    this.musicPlayer.pause();
  }

  stopMusic() {
    if (!this.musicPlayer) {
      return;
    }

    this.musicPlayer.pause();
    this.musicPlayer.currentTime = 0;
    this.musicPlayer = null;
    this.currentMusicKey = null;
  }

  playMenuMusic() {
    this.playMusic("menu");
  }

  playCaseMusic(order) {
    this.playMusic(`case-${order}`);
  }

  playMusic(key) {
    this.requestedMusicKey = key;

    if (!this.enabled || typeof Audio === "undefined") {
      return;
    }

    const src = this.musicConfig[key];
    if (!src || this.unavailableMusic.has(key)) {
      return;
    }

    if (this.currentMusicKey === key && this.musicPlayer) {
      this.musicPlayer.volume = this.musicVolume;
      this.resumeRequestedMusic();
      return;
    }

    this.stopMusic();

    const player = new Audio(src);
    player.loop = true;
    player.preload = "auto";
    player.volume = this.musicVolume;
    player.onerror = () => {
      this.unavailableMusic.add(key);
      if (this.musicPlayer === player) {
        this.musicPlayer = null;
        this.currentMusicKey = null;
      }
    };

    this.musicPlayer = player;
    this.currentMusicKey = key;
    this.resumeRequestedMusic();
  }

  resumeRequestedMusic() {
    if (!this.enabled || !this.requestedMusicKey || typeof Audio === "undefined") {
      return;
    }

    if (!this.musicPlayer || this.currentMusicKey !== this.requestedMusicKey) {
      const requestedKey = this.requestedMusicKey;
      this.playMusic(requestedKey);
      return;
    }

    this.musicPlayer.volume = this.musicVolume;
    const playPromise = this.musicPlayer.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }

  getAssetTemplate(name) {
    if (this.unavailableAssets.has(name) || typeof Audio === "undefined") {
      return null;
    }

    if (!this.assetTemplates.has(name)) {
      const config = this.assetConfig[name];
      if (!config?.src) {
        return null;
      }

      const template = new Audio(config.src);
      template.preload = "auto";
      this.assetTemplates.set(name, template);
    }

    return this.assetTemplates.get(name) || null;
  }

  playAsset(name, fallback) {
    if (!this.enabled) {
      return;
    }

    this.resumeRequestedMusic();

    const template = this.getAssetTemplate(name);
    if (!template) {
      fallback?.();
      return;
    }

    const player = template.cloneNode();
    player.volume = this.assetConfig[name]?.volume ?? 1;

    const cleanup = () => {
      this.activePlayers.delete(player);
      player.onended = null;
      player.onerror = null;
    };

    player.onended = cleanup;
    player.onerror = () => {
      cleanup();
      this.unavailableAssets.add(name);
      fallback?.();
    };

    this.activePlayers.add(player);
    const playPromise = player.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        cleanup();
        this.unavailableAssets.add(name);
        fallback?.();
      });
    }
  }

  ui() {
    this.playAsset("ui", () =>
      this.playTone({
        type: "triangle",
        frequency: 480,
        duration: 0.08,
        gain: 0.04,
        rampTo: 620,
      }),
    );
  }

  objection() {
    this.playAsset("objection", () =>
      this.sequence(
        [
          { type: "sawtooth", frequency: 260, duration: 0.08, gain: 0.055, rampTo: 420 },
          { type: "square", frequency: 510, duration: 0.1, gain: 0.045, rampTo: 700 },
        ],
        0.02,
      ),
    );
  }

  success() {
    this.playAsset("success", () =>
      this.sequence(
        [
          { type: "triangle", frequency: 420, duration: 0.09, gain: 0.04, rampTo: 560 },
          { type: "triangle", frequency: 620, duration: 0.12, gain: 0.05, rampTo: 860 },
        ],
        0.02,
      ),
    );
  }

  fail() {
    this.playAsset("fail", () =>
      this.sequence(
        [
          { type: "square", frequency: 240, duration: 0.12, gain: 0.05, rampTo: 160 },
          { type: "sawtooth", frequency: 180, duration: 0.15, gain: 0.05, rampTo: 130 },
        ],
        0.01,
      ),
    );
  }

  scene() {
    this.playAsset("scene", () =>
      this.sequence(
        [
          { type: "triangle", frequency: 330, duration: 0.08, gain: 0.03, rampTo: 420 },
          { type: "triangle", frequency: 494, duration: 0.08, gain: 0.03, rampTo: 660 },
          { type: "triangle", frequency: 659, duration: 0.1, gain: 0.035, rampTo: 880 },
        ],
        0.03,
      ),
    );
  }

  end() {
    this.playAsset("end", () =>
      this.sequence(
        [
          { type: "triangle", frequency: 740, duration: 0.12, gain: 0.04, rampTo: 620 },
          { type: "triangle", frequency: 554, duration: 0.16, gain: 0.04, rampTo: 440 },
          { type: "sine", frequency: 440, duration: 0.24, gain: 0.045, rampTo: 330 },
        ],
        0.04,
      ),
    );
  }
}

export class ReverseAnalysisGame {
  constructor({ cases, evidenceLibrary, ending }) {
    this.cases = cases;
    this.caseMap = new Map(cases.map((caseData) => [caseData.id, caseData]));
    this.evidenceLibrary = evidenceLibrary;
    this.ending = ending;
    this.audio = new AudioManager();
    this.calloutTimer = null;
    this.splashMusicStarted = false;
    this.characters = {
      player: null,
      npc: null,
    };
    this.playerPortraitModes = ["default", "objection", "rejection", "wait", "welldone"];
    this.playerPortraitLayers = new Map();
    this.failedPlayerPortraitModes = new Set();
    this.imagePreloadCache = new Map();
    this.failedImageAssets = new Set();
    this.playerTransientPortraitMode = null;
    this.activePlayerPortraitMode = "default";
    this.playerPortraitAssets = {
      objection: "assets/images/portraits/call_out.png",
      rejection: "assets/images/portraits/rejection.png",
      wait: "assets/images/portraits/wait.png",
      welldone: "assets/images/portraits/welldone.png",
    };

    this.state = {
      save: this.loadSave(),
      screen: "splash",
      currentCaseId: null,
      currentSequence: [],
      currentIndex: 0,
      currentMode: "idle",
      currentLine: null,
      currentCrossLine: null,
      activeStage: null,
      pendingStageRetry: null,
      bufferedLines: [],
      afterBufferedLines: null,
      bufferedContext: null,
      typing: {
        active: false,
        timer: null,
        text: "",
        index: 0,
      },
      credibility: 0,
      ownedEvidence: [],
    };

    this.refs = this.captureRefs();
    this.audio.setEnabled(!this.state.save.muted);
  }

  captureRefs() {
    return {
      app: document.getElementById("app"),
      screens: {
        splash: document.querySelector('[data-screen="splash"]'),
        menu: document.querySelector('[data-screen="menu"]'),
        intro: document.querySelector('[data-screen="intro"]'),
        game: document.querySelector('[data-screen="game"]'),
        ending: document.querySelector('[data-screen="ending"]'),
      },
      splashScreen: document.getElementById("splash-screen"),
      splashHint: document.getElementById("splash-hint"),
      caseGrid: document.getElementById("case-grid"),
      continueButton: document.getElementById("continue-btn"),
      resetButton: document.getElementById("reset-progress-btn"),
      introCard: document.getElementById("intro-card"),
      endingCard: document.getElementById("ending-card"),
      caseTitle: document.getElementById("case-title"),
      sceneLabel: document.getElementById("scene-label"),
      objectiveText: document.getElementById("objective-text"),
      credibilityMeter: document.getElementById("credibility-meter"),
      muteButton: document.getElementById("mute-btn"),
      evidenceList: document.getElementById("evidence-list"),
      evidenceCount: document.getElementById("evidence-count"),
      portraitPlayer: document.getElementById("portrait-player"),
      portraitPlayerArt: document.getElementById("portrait-player-art"),
      portraitNpc: document.getElementById("portrait-npc"),
      portraitPlayerName: document.getElementById("portrait-player-name"),
      portraitPlayerRole: document.getElementById("portrait-player-role"),
      portraitPlayerImage: document.getElementById("portrait-player-image"),
      portraitPlayerGlyph: document.getElementById("portrait-player-glyph"),
      portraitNpcName: document.getElementById("portrait-npc-name"),
      portraitNpcRole: document.getElementById("portrait-npc-role"),
      portraitNpcImage: document.getElementById("portrait-npc-image"),
      portraitNpcGlyph: document.getElementById("portrait-npc-glyph"),
      speakerName: document.getElementById("speaker-name"),
      dialogueTag: document.getElementById("dialogue-tag"),
      dialogueText: document.getElementById("dialogue-text"),
      nextButton: document.getElementById("next-btn"),
      presentButton: document.getElementById("present-btn"),
      skipButton: document.getElementById("skip-btn"),
      signalBanner: document.getElementById("signal-banner"),
      challengeBox: document.getElementById("challenge-box"),
      challengeCounter: document.getElementById("challenge-counter"),
      challengeMode: document.getElementById("challenge-mode"),
      challengePrompt: document.getElementById("challenge-prompt"),
      choiceList: document.getElementById("choice-list"),
      overlay: document.getElementById("overlay"),
      overlayPanel: document.getElementById("overlay-panel"),
      overlayScrim: document.getElementById("overlay-scrim"),
      callout: document.getElementById("callout"),
      toastStack: document.getElementById("toast-stack"),
      dialoguePanel: document.getElementById("dialogue-panel"),
    };
  }

  init() {
    this.applyMenuBackdrop();
    this.applyScreenBackdrop(this.refs.screens.splash, MENU_BACKDROP);
    this.schedulePortraitWarmup();
    this.bindEvents();
    this.renderMenu();
    this.showScreen("splash");
    this.audio.playMenuMusic();
  }

  bindEvents() {
    this.refs.splashScreen.addEventListener("click", () => {
      this.handleSplashInteraction();
    });

    this.refs.splashScreen.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      this.handleSplashInteraction();
    });

    this.refs.caseGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-case-id]");
      if (!button) {
        return;
      }

      this.audio.ui();
      this.openCaseIntro(button.dataset.caseId);
    });

    this.refs.continueButton.addEventListener("click", () => {
      const targetCase = this.getContinueCase();
      if (!targetCase) {
        return;
      }

      this.audio.ui();
      this.openCaseIntro(targetCase.id);
    });

    this.refs.resetButton.addEventListener("click", () => {
      const accepted = window.confirm("确定要清空本地进度并重新开始吗？");
      if (!accepted) {
        return;
      }

      this.audio.ui();
      this.resetSave();
      this.renderMenu();
      this.showToast("进度已重置", "所有案件都回到了初始状态。");
    });

    this.refs.introCard.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }

      this.audio.ui();
      const { action } = button.dataset;
      if (action === "start-case") {
        this.beginCase(button.dataset.caseId);
      }

      if (action === "back-menu") {
        this.returnToMenu();
      }
    });

    this.refs.endingCard.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }

      this.audio.ui();
      if (button.dataset.action === "back-menu") {
        this.returnToMenu();
      }
    });

    this.refs.nextButton.addEventListener("click", () => {
      this.audio.ui();
      this.handleNext();
    });

    this.refs.skipButton.addEventListener("click", () => {
      this.audio.ui();
      this.finishTyping();
    });

    this.refs.presentButton.addEventListener("click", () => {
      this.audio.ui();
      this.openEvidencePicker();
    });

    this.refs.evidenceList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-evidence-id]");
      if (!button) {
        return;
      }

      this.audio.ui();
      this.openEvidenceDetail(button.dataset.evidenceId);
    });

    this.refs.overlay.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (actionButton) {
        this.audio.ui();
        this.handleOverlayAction(actionButton);
        return;
      }

      if (event.target === this.refs.overlayScrim && this.refs.overlay.dataset.closable === "true") {
        this.closeOverlay();
      }
    });

    this.refs.choiceList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-choice-id]");
      if (!button || !this.state.activeStage) {
        return;
      }

      this.audio.ui();
      this.resolveChoice(button.dataset.choiceId);
    });

    this.refs.muteButton.addEventListener("click", () => {
      const muted = !this.state.save.muted;
      this.state.save.muted = muted;
      this.persistSave();
      this.audio.setEnabled(!muted);
      this.renderMuteButton();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.refs.overlay.classList.contains("hidden") && this.refs.overlay.dataset.closable === "true") {
        this.closeOverlay();
      }

      if (event.code === "Space" && this.state.screen === "game" && this.refs.overlay.classList.contains("hidden")) {
        event.preventDefault();
        this.handleNext();
      }
    });
  }

  loadSave() {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return {
          clearedCaseIds: [],
          muted: false,
        };
      }

      const parsed = JSON.parse(raw);
      return {
        clearedCaseIds: Array.isArray(parsed.clearedCaseIds) ? parsed.clearedCaseIds : [],
        muted: Boolean(parsed.muted),
      };
    } catch {
      return {
        clearedCaseIds: [],
        muted: false,
      };
    }
  }

  persistSave() {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(this.state.save));
  }

  resetSave() {
    this.state.save = {
      clearedCaseIds: [],
      muted: false,
    };
    this.persistSave();
    this.audio.setEnabled(true);
    this.renderMuteButton();
  }

  getContinueCase() {
    const unclearedUnlocked = this.cases.find((caseData, index) => {
      return this.isCaseUnlocked(index) && !this.isCaseCleared(caseData.id);
    });
    if (unclearedUnlocked) {
      return unclearedUnlocked;
    }

    const lastCleared = [...this.cases].reverse().find((caseData) => this.isCaseCleared(caseData.id));
    return lastCleared || this.cases[0];
  }

  isCaseCleared(caseId) {
    return this.state.save.clearedCaseIds.includes(caseId);
  }

  isCaseUnlocked(index) {
    if (index === 0) {
      return true;
    }

    const previousCase = this.cases[index - 1];
    return this.isCaseCleared(previousCase.id);
  }

  renderMenu() {
    this.applyMenuBackdrop();

    const tiles = this.cases
      .map((caseData, index) => {
        const cleared = this.isCaseCleared(caseData.id);
        const unlocked = this.isCaseUnlocked(index);
        const statusLabel = cleared ? "已完成" : unlocked ? "可开始" : "锁定";
        const statusClass = cleared ? "" : unlocked ? "" : " case-tile__status--locked";

        return `
          <button
            class="case-tile"
            type="button"
            data-index="0${caseData.order}"
            data-case-id="${caseData.id}"
            ${unlocked ? "" : "disabled"}
          >
            <span class="case-tile__status${statusClass}">${statusLabel}</span>
            <h3>${caseData.shortLabel}</h3>
            <p>${caseData.subtitle}</p>
            <div class="case-tile__meta">
              <span>${caseData.difficulty}</span>
              <span>${cleared ? "已通关" : unlocked ? "待质询" : "需解锁"}</span>
            </div>
          </button>
        `;
      })
      .join("");

    this.refs.caseGrid.innerHTML = tiles;

    const continueCase = this.getContinueCase();
    this.refs.continueButton.textContent = continueCase
      ? `继续${continueCase.shortLabel}`
      : "继续案件";

    this.renderMuteButton();
  }

  renderMuteButton() {
    this.refs.muteButton.textContent = this.state.save.muted ? "音频：关" : "音频：开";
  }

  enterMenuFromSplash() {
    if (this.state.screen !== "splash") {
      return;
    }

    this.applyMenuBackdrop();
    this.showScreen("menu");
    this.audio.playMenuMusic();
  }

  handleSplashInteraction() {
    if (this.state.screen !== "splash") {
      return;
    }

    this.audio.ui();
    this.audio.playMenuMusic();

    if (!this.state.save.muted && !this.splashMusicStarted) {
      this.splashMusicStarted = true;
      if (this.refs.splashHint) {
        this.refs.splashHint.textContent = "再次点击开始";
      }
      return;
    }

    this.enterMenuFromSplash();
  }

  applyScreenBackdrop(screenNode, assetPath) {
    const applyBackdropStyles = (node) => {
      if (!node) {
        return;
      }

      if (!assetPath) {
        node.style.backgroundImage = "";
        node.style.backgroundSize = "";
        node.style.backgroundPosition = "";
        node.style.backgroundRepeat = "";
        return;
      }

      node.style.backgroundImage =
        `linear-gradient(180deg, rgba(18, 15, 18, 0.56), rgba(10, 9, 12, 0.84)), url("${assetPath}")`;
      node.style.backgroundSize = "cover";
      node.style.backgroundPosition = "center center";
      node.style.backgroundRepeat = "no-repeat";
    };

    applyBackdropStyles(this.refs.app);

    if (!screenNode) {
      return;
    }

    applyBackdropStyles(screenNode);
  }

  applyMenuBackdrop() {
    this.applyScreenBackdrop(this.refs.screens.menu, MENU_BACKDROP);
  }

  showScreen(name) {
    Object.entries(this.refs.screens).forEach(([screenName, node]) => {
      node.classList.toggle("hidden", screenName !== name);
    });
    this.state.screen = name;
  }

  openCaseIntro(caseId) {
    const caseData = this.caseMap.get(caseId);
    if (!caseData) {
      return;
    }

    this.schedulePortraitWarmup(caseData, { priority: "high" });
    this.closeOverlay();
    this.state.currentCaseId = caseId;
    this.applyScreenBackdrop(this.refs.screens.intro, caseData.sceneAsset || MENU_BACKDROP);
    this.refs.introCard.innerHTML = this.renderIntroCard(caseData);
    this.showScreen("intro");
    this.audio.playCaseMusic(caseData.order);
    this.audio.scene();
  }

  renderIntroCard(caseData) {
    return `
      <div class="intro-card__header">
        <div>
          <p class="intro-card__eyebrow">${caseData.shortLabel} / ${caseData.difficulty}</p>
          <h2>${caseData.title}</h2>
        </div>
        <p class="case-board__hint">${caseData.sceneLabel}</p>
      </div>
      <p class="intro-card__summary">${caseData.intro}</p>
      <div class="intro-card__facts">
        <article class="fact-card">
          <span>核心目标</span>
          <strong>${caseData.objective}</strong>
        </article>
        <article class="fact-card">
          <span>案件焦点</span>
          <strong>${caseData.summary}</strong>
        </article>
        <article class="fact-card">
          <span>初始资料</span>
          <strong>共 ${caseData.initialEvidence.length} 张证据卡，包含定义、定理、反例与干扰项。</strong>
        </article>
      </div>
      <div class="intro-card__actions">
        <button class="button button--primary" type="button" data-action="start-case" data-case-id="${caseData.id}">进入质询</button>
        <button class="button button--ghost" type="button" data-action="back-menu">返回目录</button>
      </div>
    `;
  }

  beginCase(caseId) {
    const caseData = this.caseMap.get(caseId);
    if (!caseData) {
      return;
    }

    this.schedulePortraitWarmup(caseData, { priority: "high" });
    this.stopTyping();
    this.closeOverlay();
    this.showScreen("game");

    this.state.currentCaseId = caseId;
    this.state.currentSequence = this.buildSequence(caseData);
    this.state.currentIndex = 0;
    this.state.currentMode = "idle";
    this.state.currentLine = null;
    this.state.currentCrossLine = null;
    this.state.activeStage = null;
    this.state.pendingStageRetry = null;
    this.state.bufferedLines = [];
    this.state.afterBufferedLines = null;
    this.state.bufferedContext = null;
    this.state.credibility = caseData.maxCredibility;
    this.state.ownedEvidence = [...caseData.initialEvidence];
    this.playerTransientPortraitMode = null;
    this.activePlayerPortraitMode = "default";

    this.applyScreenBackdrop(this.refs.screens.game, caseData.sceneAsset || MENU_BACKDROP);
    this.refs.dialoguePanel.classList.remove("shake");
    this.refs.caseTitle.textContent = `${caseData.shortLabel}：${caseData.title}`;
    this.refs.sceneLabel.textContent = caseData.sceneLabel;
    this.refs.objectiveText.textContent = caseData.objective;
    this.configurePortrait("player", caseData.player);
    this.configurePortrait("npc", caseData.npc);
    this.renderCredibility();
    this.renderEvidence();
    this.hideSignalBanner();
    this.hideChallengeBox();
    this.audio.playCaseMusic(caseData.order);
    this.audio.scene();
    this.showToast("案件开始", `资料已整理完毕：${caseData.initialEvidence.length} 张证据卡待你调度。`);
    this.runCurrentNode();
  }

  buildSequence(caseData) {
    const sequence = [];

    caseData.events.forEach((event, eventIndex) => {
      if (event.type === "dialogue") {
        event.lines.forEach((line) => {
          sequence.push({
            type: "line",
            line,
            eventIndex,
          });
        });
      }

      if (event.type === "cross") {
        sequence.push({
          type: "cross-line",
          line: event.line,
          eventIndex,
        });

        event.stages.forEach((stage, stageIndex) => {
          sequence.push({
            type: "stage",
            crossLine: event.line,
            stage,
            stageIndex,
            totalStages: event.stages.length,
            eventIndex,
          });
        });

        event.resolvedLines.forEach((line) => {
          sequence.push({
            type: "line",
            line,
            eventIndex,
          });
        });
      }
    });

    return sequence;
  }

  collectPortraitAssets(caseData = null) {
    const assets = new Set(Object.values(this.playerPortraitAssets).filter(Boolean));
    const casesToScan = caseData ? [caseData] : this.cases;

    casesToScan.forEach((item) => {
      if (item?.player?.asset) {
        assets.add(item.player.asset);
      }

      if (item?.npc?.asset) {
        assets.add(item.npc.asset);
      }
    });

    return [...assets];
  }

  schedulePortraitWarmup(caseData = null, options = {}) {
    const assetPaths = this.collectPortraitAssets(caseData);
    if (assetPaths.length === 0) {
      return;
    }

    const priority = options.priority || "low";
    const warmup = () => {
      assetPaths.forEach((assetPath, index) => {
        this.preloadImageAsset(assetPath, {
          priority: priority === "high" || index < 2 ? "high" : "low",
        });
      });
    };

    if (priority === "high") {
      warmup();
      return;
    }

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => warmup(), { timeout: 1200 });
      return;
    }

    window.setTimeout(warmup, 120);
  }

  preloadImageAsset(assetPath, options = {}) {
    if (!assetPath || this.failedImageAssets.has(assetPath) || typeof Image === "undefined") {
      return Promise.resolve(null);
    }

    const cached = this.imagePreloadCache.get(assetPath);
    if (cached) {
      if (options.priority === "high" && "fetchPriority" in cached.image) {
        cached.image.fetchPriority = "high";
      }
      return cached.promise;
    }

    const image = new Image();
    image.decoding = "async";

    if ("fetchPriority" in image) {
      image.fetchPriority = options.priority || "low";
    }

    const entry = {
      image,
      loaded: false,
      failed: false,
      promise: null,
    };

    entry.promise = new Promise((resolve) => {
      image.onload = () => {
        const finalize = () => {
          entry.loaded = true;
          image.onload = null;
          image.onerror = null;
          resolve(entry);
        };

        if (typeof image.decode === "function") {
          image.decode().catch(() => {}).finally(finalize);
          return;
        }

        finalize();
      };

      image.onerror = () => {
        entry.failed = true;
        this.failedImageAssets.add(assetPath);
        image.onload = null;
        image.onerror = null;
        resolve(entry);
      };
    });

    this.imagePreloadCache.set(assetPath, entry);
    image.src = assetPath;
    return entry.promise;
  }

  isImageAssetLoaded(assetPath) {
    return Boolean(assetPath && this.imagePreloadCache.get(assetPath)?.loaded);
  }

  configurePortrait(side, character) {
    this.characters[side] = character;

    const imageNode = side === "player" ? this.refs.portraitPlayerImage : this.refs.portraitNpcImage;
    const glyphNode = side === "player" ? this.refs.portraitPlayerGlyph : this.refs.portraitNpcGlyph;
    const nameNode = side === "player" ? this.refs.portraitPlayerName : this.refs.portraitNpcName;
    const roleNode = side === "player" ? this.refs.portraitPlayerRole : this.refs.portraitNpcRole;

    nameNode.textContent = character.name;
    roleNode.textContent = character.role;
    glyphNode.textContent = character.glyph;
    imageNode.classList.add("hidden");
    this.preloadImageAsset(character.asset, { priority: "high" });

    if (side === "player") {
      this.initializePlayerPortraitLayers(character);
      this.updatePlayerPortraitState(true);
      return;
    }

    this.loadPortraitImage({
      imageNode,
      glyphNode,
      assetPath: character.asset,
      fallbackAssetPath: null,
      alt: `${character.name}立绘`,
    });
  }

  initializePlayerPortraitLayers(character) {
    this.failedPlayerPortraitModes.clear();
    this.playerPortraitLayers.clear();

    const defaultNode = this.refs.portraitPlayerImage;
    defaultNode.classList.add("hidden");
    defaultNode.dataset.playerPortraitMode = "default";
    defaultNode.dataset.ready = "false";
    this.playerPortraitLayers.set("default", defaultNode);
    this.configurePlayerPortraitLayer({
      mode: "default",
      imageNode: defaultNode,
      assetPath: character.asset,
      alt: `${character.name}立绘`,
    });

    this.refs.portraitPlayerArt
      .querySelectorAll("[data-player-portrait-extra='true']")
      .forEach((node) => node.remove());

    this.playerPortraitModes
      .filter((mode) => mode !== "default")
      .forEach((mode) => {
        const imageNode = document.createElement("img");
        imageNode.alt = "";
        imageNode.className = "portrait-card__image hidden";
        imageNode.decoding = "async";
        if ("fetchPriority" in imageNode) {
          imageNode.fetchPriority = "high";
        }
        imageNode.dataset.playerPortraitExtra = "true";
        imageNode.dataset.playerPortraitMode = mode;
        imageNode.dataset.ready = "false";
        this.refs.portraitPlayerArt.appendChild(imageNode);
        this.playerPortraitLayers.set(mode, imageNode);
        this.configurePlayerPortraitLayer({
          mode,
          imageNode,
          assetPath: this.getPlayerPortraitAssetByMode(mode),
          alt: `${character.name}立绘`,
        });
      });
  }

  configurePlayerPortraitLayer({ mode, imageNode, assetPath, alt }) {
    if (!imageNode || !assetPath) {
      return;
    }

    imageNode.alt = alt;
    imageNode.dataset.assetPath = assetPath;
    imageNode.dataset.ready = this.isImageAssetLoaded(assetPath) ? "true" : "false";

    imageNode.onload = () => {
      imageNode.dataset.ready = "true";
      if (this.activePlayerPortraitMode === mode) {
        this.showPlayerPortraitMode(mode);
      }
    };

    imageNode.onerror = () => {
      imageNode.dataset.ready = "false";
      this.failedPlayerPortraitModes.add(mode);
      if (this.activePlayerPortraitMode === mode) {
        this.showPlayerPortraitMode("default");
      }
    };

    this.preloadImageAsset(assetPath, { priority: "high" });
    imageNode.src = assetPath;

    if (imageNode.complete && imageNode.naturalWidth > 0) {
      imageNode.dataset.ready = "true";
    }
  }

  showPlayerPortraitMode(mode) {
    const normalizedMode = this.failedPlayerPortraitModes.has(mode) ? "default" : mode;
    const targetNode = this.playerPortraitLayers.get(normalizedMode) || this.playerPortraitLayers.get("default");
    const defaultNode = this.playerPortraitLayers.get("default");

    const isReady = (node) => {
      if (!node) {
        return false;
      }

      if (node.dataset.ready === "true") {
        return true;
      }

      if (node.complete && node.naturalWidth > 0) {
        node.dataset.ready = "true";
        return true;
      }

      if (this.isImageAssetLoaded(node.dataset.assetPath)) {
        node.dataset.ready = "true";
        return true;
      }

      return false;
    };

    const visibleNode = isReady(targetNode) ? targetNode : isReady(defaultNode) ? defaultNode : null;

    this.playerPortraitLayers.forEach((node) => {
      node.classList.toggle("hidden", node !== visibleNode);
    });

    this.refs.portraitPlayerGlyph.classList.toggle("hidden", Boolean(visibleNode));
  }

  loadPortraitImage({ imageNode, glyphNode, assetPath, fallbackAssetPath, alt }) {
    let fallbackUsed = false;
    const requestToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    imageNode.dataset.requestToken = requestToken;

    const showGlyphFallback = () => {
      if (imageNode.dataset.requestToken !== requestToken) {
        return;
      }

      imageNode.classList.add("hidden");
      glyphNode.classList.remove("hidden");
    };

    const revealImage = () => {
      if (imageNode.dataset.requestToken !== requestToken) {
        return;
      }

      imageNode.classList.remove("hidden");
      glyphNode.classList.add("hidden");
    };

    imageNode.onerror = () => {
      if (imageNode.dataset.requestToken !== requestToken) {
        return;
      }

      const failedAssetPath = imageNode.dataset.assetPath || assetPath;
      this.failedImageAssets.add(failedAssetPath);
      if (!fallbackUsed && fallbackAssetPath && fallbackAssetPath !== assetPath) {
        fallbackUsed = true;
        this.preloadImageAsset(fallbackAssetPath, { priority: "high" });
        imageNode.dataset.assetPath = fallbackAssetPath;
        imageNode.src = fallbackAssetPath;
        return;
      }

      showGlyphFallback();
    };

    imageNode.onload = () => {
      revealImage();
    };

    imageNode.alt = alt;
    this.preloadImageAsset(assetPath, { priority: "high" });
    imageNode.dataset.assetPath = assetPath;
    imageNode.src = assetPath;

    if (this.isImageAssetLoaded(assetPath)) {
      revealImage();
    }
  }

  getDesiredPlayerPortraitMode() {
    if (this.playerTransientPortraitMode) {
      return this.playerTransientPortraitMode;
    }

    if (this.state.currentMode === "buffered-line" && this.state.bufferedContext === "success") {
      return "welldone";
    }

    const currentLine = this.state.currentLine;
    if (currentLine?.speaker === "system" && !currentLine?.speakerName) {
      return "wait";
    }

    return "default";
  }

  getPlayerPortraitAssetByMode(mode) {
    const player = this.characters.player;
    if (!player) {
      return null;
    }

    if (mode === "default") {
      return player.asset;
    }

    return this.playerPortraitAssets[mode] || player.asset;
  }

  updatePlayerPortraitState(force = false) {
    const player = this.characters.player;
    if (!player) {
      return;
    }

    const nextMode = this.getDesiredPlayerPortraitMode();
    if (!force && this.activePlayerPortraitMode === nextMode) {
      return;
    }

    this.activePlayerPortraitMode = nextMode;
    this.showPlayerPortraitMode(nextMode);
  }

  setPlayerTransientPortrait(mode = null) {
    this.playerTransientPortraitMode = mode;
    this.updatePlayerPortraitState();
  }

  runCurrentNode() {
    if (this.state.bufferedLines.length > 0) {
      this.playNextBufferedLine();
      return;
    }

    if (this.state.currentIndex >= this.state.currentSequence.length) {
      this.completeCase();
      return;
    }

    const node = this.state.currentSequence[this.state.currentIndex];
    this.state.currentMode = node.type;

    if (node.type === "line") {
      this.state.currentCrossLine = null;
      this.hideSignalBanner();
      this.hideChallengeBox();
      this.displayTypedLine(node.line);
      return;
    }

    if (node.type === "cross-line") {
      this.state.currentCrossLine = node.line;
      this.showSignalBanner("反驳点已出现");
      this.hideChallengeBox();
      this.displayTypedLine(node.line);
      return;
    }

    if (node.type === "stage") {
      this.activateStage(node);
    }
  }

  playNextBufferedLine() {
    const nextLine = this.state.bufferedLines.shift();
    if (!nextLine) {
      this.state.bufferedContext = null;
      this.updatePlayerPortraitState();
      const afterCallback = this.state.afterBufferedLines;
      this.state.afterBufferedLines = null;
      if (afterCallback) {
        afterCallback();
      }
      return;
    }

    this.state.currentMode = "buffered-line";
    this.displayTypedLine(nextLine);
  }

  activateStage(node) {
    this.state.activeStage = node;
    if (node.crossLine) {
      this.displayStaticLine(node.crossLine);
    }

    this.showChallengeBox(node);
    this.updateControls();
  }

  getCurrentCase() {
    return this.caseMap.get(this.state.currentCaseId) || null;
  }

  getSpeakerMeta(line) {
    const caseData = this.getCurrentCase();
    if (line?.speakerName) {
      return {
        name: line.speakerName,
        type: line.speakerType || "system",
      };
    }

    if (!caseData) {
      return { name: "-", type: "system" };
    }

    const speaker = line?.speaker;
    if (speaker === "player") {
      return { name: caseData.player.name, type: "player" };
    }

    if (speaker === "npc") {
      return { name: caseData.npc.name, type: "npc" };
    }

    return { name: "系统", type: "system" };
  }

  displayTypedLine(line) {
    this.state.currentLine = line;
    const speaker = this.getSpeakerMeta(line);
    this.refs.speakerName.textContent = speaker.name;
    this.refs.dialogueTag.textContent = line.tag || "陈述";
    this.highlightSpeaker(speaker.type);
    this.updatePlayerPortraitState();
    this.typeText(line.text);
  }

  displayStaticLine(line) {
    this.stopTyping();
    this.state.currentLine = line;
    const speaker = this.getSpeakerMeta(line);
    this.refs.speakerName.textContent = speaker.name;
    this.refs.dialogueTag.textContent = line.tag || "陈述";
    this.highlightSpeaker(speaker.type);
    this.updatePlayerPortraitState();
    this.refs.dialogueText.textContent = line.text;
    this.refs.dialogueText.classList.remove("dialogue-text--typing");
  }

  highlightSpeaker(type) {
    this.refs.portraitPlayer.classList.toggle("portrait-card--active", type === "player");
    this.refs.portraitNpc.classList.toggle("portrait-card--active", type === "npc");
  }

  typeText(text) {
    this.stopTyping();
    this.state.typing.active = true;
    this.state.typing.text = text;
    this.state.typing.index = 0;
    this.refs.dialogueText.textContent = "";
    this.refs.dialogueText.classList.add("dialogue-text--typing");
    this.updateControls();

    const step = () => {
      if (!this.state.typing.active) {
        return;
      }

      this.state.typing.index += 1;
      this.refs.dialogueText.textContent = text.slice(0, this.state.typing.index);

      if (this.state.typing.index >= text.length) {
        this.finishTyping();
        return;
      }

      const currentChar = text[this.state.typing.index - 1];
      const delay = /[，。！？；：]/.test(currentChar) ? 44 : 18;
      this.state.typing.timer = window.setTimeout(step, delay);
    };

    this.state.typing.timer = window.setTimeout(step, 12);
  }

  stopTyping() {
    if (this.state.typing.timer) {
      window.clearTimeout(this.state.typing.timer);
    }

    this.state.typing.active = false;
    this.state.typing.timer = null;
  }

  finishTyping() {
    if (!this.state.typing.active) {
      return;
    }

    this.stopTyping();
    this.refs.dialogueText.textContent = this.state.typing.text;
    this.refs.dialogueText.classList.remove("dialogue-text--typing");
    this.updateControls();
  }

  handleNext() {
    if (!this.refs.overlay.classList.contains("hidden")) {
      return;
    }

    if (this.state.typing.active) {
      this.finishTyping();
      return;
    }

    if (this.state.activeStage) {
      return;
    }

    if (this.state.currentMode === "buffered-line") {
      this.playNextBufferedLine();
      return;
    }

    if (this.state.currentMode === "line" || this.state.currentMode === "cross-line") {
      this.state.currentIndex += 1;
      this.runCurrentNode();
    }
  }

  showChallengeBox(node) {
    const { stage, stageIndex, totalStages } = node;
    this.refs.challengeBox.classList.remove("hidden");
    this.refs.challengeCounter.textContent = `破绽 ${stageIndex + 1} / ${totalStages}`;
    this.refs.challengeMode.textContent = stage.modeLabel || (stage.kind === "choice" ? "选择路径" : "出示证据");
    this.refs.challengePrompt.textContent = stage.prompt;
    this.refs.choiceList.innerHTML = "";

    if (stage.kind === "choice") {
      this.refs.choiceList.innerHTML = stage.options
        .map((option) => {
          return `
            <button class="choice-button" type="button" data-choice-id="${option.id}">
              ${option.label}
              <span>${option.detail}</span>
            </button>
          `;
        })
        .join("");
    }

    this.updateControls();
  }

  hideChallengeBox() {
    this.refs.challengeBox.classList.add("hidden");
    this.refs.choiceList.innerHTML = "";
    this.refs.challengePrompt.textContent = "";
    this.updateControls();
  }

  showSignalBanner(text) {
    this.refs.signalBanner.textContent = text;
    this.refs.signalBanner.classList.remove("hidden");
  }

  hideSignalBanner() {
    this.refs.signalBanner.classList.add("hidden");
    this.refs.signalBanner.textContent = "";
  }

  updateControls() {
    const evidenceStageActive = Boolean(this.state.activeStage && this.state.activeStage.stage.kind === "evidence");
    this.refs.presentButton.disabled = !evidenceStageActive || this.state.typing.active;
    this.refs.skipButton.disabled = !this.state.typing.active;
    this.refs.nextButton.disabled = Boolean(this.state.activeStage && !this.state.typing.active);
  }

  renderCredibility() {
    const caseData = this.getCurrentCase();
    const max = caseData ? caseData.maxCredibility : 5;
    const cells = [];

    for (let index = 0; index < max; index += 1) {
      const active = index < this.state.credibility;
      cells.push(`<span class="meter__cell${active ? "" : " meter__cell--empty"}"></span>`);
    }

    this.refs.credibilityMeter.innerHTML = cells.join("");
  }

  renderEvidence() {
    const cards = this.state.ownedEvidence
      .map((evidenceId) => this.evidenceLibrary[evidenceId])
      .filter(Boolean)
      .map((evidence) => {
        return `
          <button class="evidence-card" type="button" data-evidence-id="${evidence.id}">
            <span class="evidence-card__type">${evidence.type}</span>
            <h3>${evidence.title}</h3>
            <p>${evidence.summary}</p>
          </button>
        `;
      })
      .join("");

    this.refs.evidenceList.innerHTML = cards;
    this.refs.evidenceCount.textContent = `${this.state.ownedEvidence.length}`;
  }

  openEvidenceDetail(evidenceId) {
    const evidence = this.evidenceLibrary[evidenceId];
    if (!evidence) {
      return;
    }

    const stage = this.state.activeStage?.stage;
    const canPresent = Boolean(stage && stage.kind === "evidence");
    this.openOverlay(
      `
        <div class="modal-header">
          <div>
            <p class="section-label">证据详情</p>
            <h2>${evidence.title}</h2>
          </div>
          <span class="case-board__hint">${evidence.type}</span>
        </div>
        <div class="modal-body">
          <article class="detail-card">
            <p>${evidence.detail}</p>
          </article>
        </div>
        <div class="modal-actions">
          ${canPresent ? `<button class="button button--accent" type="button" data-action="present-evidence" data-evidence-id="${evidence.id}">在本轮出示</button>` : ""}
          <button class="button button--ghost" type="button" data-action="close-overlay">关闭</button>
        </div>
      `,
      { closable: true },
    );
  }

  openEvidencePicker() {
    const stage = this.state.activeStage?.stage;
    if (!stage || stage.kind !== "evidence") {
      return;
    }

    const cards = this.state.ownedEvidence
      .map((evidenceId) => this.evidenceLibrary[evidenceId])
      .filter(Boolean)
      .map((evidence) => {
        return `
          <button class="evidence-picker__card" type="button" data-action="present-evidence" data-evidence-id="${evidence.id}">
            <span class="evidence-card__type">${evidence.type}</span>
            <strong>${evidence.title}</strong>
            <p>${evidence.summary}</p>
          </button>
        `;
      })
      .join("");

    this.openOverlay(
      `
        <div class="modal-header">
          <div>
            <p class="section-label">出示证据</p>
            <h2>选择本轮要提交的卡片</h2>
          </div>
          <span class="case-board__hint">${stage.prompt}</span>
        </div>
        <div class="modal-body">
          <div class="evidence-picker">${cards}</div>
        </div>
        <div class="modal-actions">
          <button class="button button--ghost" type="button" data-action="close-overlay">取消</button>
        </div>
      `,
      { closable: true },
    );
  }

  resolveChoice(choiceId) {
    const activeNode = this.state.activeStage;
    if (!activeNode || activeNode.stage.kind !== "choice") {
      return;
    }

    const correct = choiceId === activeNode.stage.correctOption;
    if (!correct) {
      this.handleStageFailure(activeNode.stage, {
        response: this.getFailureResponse(activeNode.stage, {
          kind: "choice",
          value: choiceId,
        }),
      });
      return;
    }

    this.resolveStage();
  }

  presentEvidence(evidenceId) {
    const activeNode = this.state.activeStage;
    if (!activeNode || activeNode.stage.kind !== "evidence") {
      return;
    }

    const acceptable = activeNode.stage.correctEvidence || [];
    const correct = acceptable.includes(evidenceId);
    if (!correct) {
      this.handleStageFailure(activeNode.stage, {
        response: this.getFailureResponse(activeNode.stage, {
          kind: "evidence",
          value: evidenceId,
        }),
      });
      return;
    }

    this.resolveStage();
  }

  getFailureResponse(stage, attempt) {
    if (!stage || !attempt) {
      return null;
    }

    if (attempt.kind === "choice") {
      return (
        stage.wrongChoiceResponses?.[attempt.value] ||
        stage.genericFailureResponse ||
        null
      );
    }

    if (attempt.kind === "evidence") {
      return (
        stage.wrongEvidenceResponses?.[attempt.value] ||
        stage.genericFailureResponse ||
        null
      );
    }

    return stage.genericFailureResponse || null;
  }

  resolveStage() {
    const activeNode = this.state.activeStage;
    if (!activeNode) {
      return;
    }

    this.closeOverlay();
    this.audio.objection();
    this.audio.success();
    this.showCallout("异议！");
    this.state.activeStage = null;
    this.hideChallengeBox();
    this.state.currentIndex += 1;

    const successLines = activeNode.stage.successLines || [];
    if (successLines.length > 0) {
      this.state.bufferedContext = "success";
      this.state.bufferedLines = [...successLines];
      this.state.afterBufferedLines = () => this.runCurrentNode();
      this.playNextBufferedLine();
      return;
    }

    this.state.bufferedContext = null;
    this.runCurrentNode();
  }

  handleStageFailure(stage, options = {}) {
    const response = options.response || null;
    this.closeOverlay();
    this.audio.fail();
    this.showCallout("驳回", { tone: "fail" });
    this.refs.dialoguePanel.classList.remove("shake");
    void this.refs.dialoguePanel.offsetWidth;
    this.refs.dialoguePanel.classList.add("shake");

    this.state.credibility = Math.max(this.state.credibility - 1, 0);
    this.renderCredibility();
    this.showToast(
      response?.title || "判断失误",
      response?.body || stage.failureText || "这一步没有击中证词漏洞。",
    );

    if (this.state.credibility <= 0) {
      this.failCase();
      return;
    }

    if (response?.lines?.length) {
      const retryStage = this.state.activeStage;
      this.state.activeStage = null;
      this.state.pendingStageRetry = retryStage;
      this.state.bufferedContext = "failure";
      this.hideChallengeBox();
      this.state.bufferedLines = [...response.lines];
      this.state.afterBufferedLines = () => {
        const stageToRetry = this.state.pendingStageRetry;
        this.state.pendingStageRetry = null;
        if (stageToRetry && this.state.credibility > 0) {
          this.activateStage(stageToRetry);
        }
      };
      this.playNextBufferedLine();
      return;
    }

    this.state.bufferedContext = null;
    this.updateControls();
  }

  failCase() {
    const caseData = this.getCurrentCase();
    if (!caseData) {
      return;
    }

    this.stopTyping();
    this.state.activeStage = null;
    this.state.pendingStageRetry = null;
    this.openOverlay(
      `
        <div class="modal-header">
          <div>
            <p class="section-label">质询失败</p>
            <h2>信誉值归零</h2>
          </div>
          <span class="case-board__hint">${caseData.shortLabel}</span>
        </div>
        <div class="modal-body">
          <article class="detail-card">
            <p>${caseData.failureText || "你没有在有限次尝试内抓到关键破绽，本轮课堂质询被迫中止。可以立即重审本案，或返回目录重新整理证据。"}</p>
          </article>
        </div>
        <div class="modal-actions">
          <button class="button button--primary" type="button" data-action="retry-case" data-case-id="${caseData.id}">重新审理</button>
          <button class="button button--ghost" type="button" data-action="back-menu">返回目录</button>
        </div>
      `,
      { closable: false },
    );
  }

  completeCase() {
    const caseData = this.getCurrentCase();
    if (!caseData) {
      return;
    }

    this.markCaseCleared(caseData.id);

    const nextCase = this.getNextCase(caseData.id);
    const finishedAll = this.cases.every((item) => this.isCaseCleared(item.id));

    if (finishedAll) {
      this.renderEnding();
      return;
    }

    this.openOverlay(
      `
        <div class="modal-header">
          <div>
            <p class="section-label">案件告破</p>
            <h2>${caseData.title}</h2>
          </div>
          <span class="case-board__hint">${caseData.shortLabel}</span>
        </div>
        <div class="modal-body">
          <article class="detail-card">
            <p>${caseData.verdict}</p>
          </article>
        </div>
        <div class="modal-actions">
          ${
            nextCase
              ? `<button class="button button--primary" type="button" data-action="open-case" data-case-id="${nextCase.id}">进入${nextCase.shortLabel}</button>`
              : ""
          }
          <button class="button button--ghost" type="button" data-action="back-menu">返回目录</button>
        </div>
      `,
      { closable: false },
    );
  }

  markCaseCleared(caseId) {
    if (!this.isCaseCleared(caseId)) {
      this.state.save.clearedCaseIds.push(caseId);
      this.persistSave();
    }
  }

  getNextCase(caseId) {
    const currentIndex = this.cases.findIndex((item) => item.id === caseId);
    if (currentIndex < 0 || currentIndex >= this.cases.length - 1) {
      return null;
    }

    return this.cases[currentIndex + 1];
  }

  renderEnding() {
    const currentCase = this.getCurrentCase();
    this.applyScreenBackdrop(this.refs.screens.ending, currentCase?.sceneAsset || MENU_BACKDROP);
    this.showScreen("ending");
    this.audio.playMenuMusic();
    const facts = this.ending.facts
      .map((item) => {
        return `
          <article class="fact-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </article>
        `;
      })
      .join("");

    this.refs.endingCard.innerHTML = `
      <div class="ending-card__header">
        <div>
          <p class="ending-card__eyebrow">Final Verdict</p>
          <h2>${this.ending.title}</h2>
        </div>
        <p class="case-board__hint">全案件通关</p>
      </div>
      <p class="ending-card__summary">${this.ending.summary}</p>
      <div class="ending-card__facts">${facts}</div>
      <div class="ending-card__actions">
        <button class="button button--primary" type="button" data-action="back-menu">返回目录</button>
      </div>
    `;
    this.audio.end();
  }

  returnToMenu() {
    this.stopTyping();
    this.closeOverlay();
    this.renderMenu();
    this.showScreen("menu");
    this.audio.playMenuMusic();
  }

  openOverlay(content, { closable }) {
    this.refs.overlayPanel.innerHTML = content;
    this.refs.overlay.dataset.closable = closable ? "true" : "false";
    this.refs.overlay.classList.remove("hidden");
    this.refs.overlay.setAttribute("aria-hidden", "false");
  }

  closeOverlay() {
    this.refs.overlay.classList.add("hidden");
    this.refs.overlay.dataset.closable = "false";
    this.refs.overlay.setAttribute("aria-hidden", "true");
    this.refs.overlayPanel.innerHTML = "";
  }

  handleOverlayAction(button) {
    const { action, caseId, evidenceId } = button.dataset;

    if (action === "close-overlay") {
      this.closeOverlay();
      return;
    }

    if (action === "present-evidence" && evidenceId) {
      this.presentEvidence(evidenceId);
      return;
    }

    if (action === "retry-case" && caseId) {
      this.beginCase(caseId);
      return;
    }

    if (action === "back-menu") {
      this.returnToMenu();
      return;
    }

    if (action === "open-case" && caseId) {
      this.openCaseIntro(caseId);
    }
  }

  showCallout(text, options = {}) {
    if (this.calloutTimer) {
      window.clearTimeout(this.calloutTimer);
      this.calloutTimer = null;
    }

    this.refs.callout.textContent = text;
    this.refs.callout.classList.remove("callout--show");
    this.refs.callout.classList.remove("callout--fail");

    if (options.tone === "fail") {
      this.refs.callout.classList.add("callout--fail");
      this.setPlayerTransientPortrait("rejection");
    } else {
      this.setPlayerTransientPortrait("objection");
    }

    void this.refs.callout.offsetWidth;
    this.refs.callout.classList.remove("hidden");
    this.refs.callout.classList.add("callout--show");

    this.calloutTimer = window.setTimeout(() => {
      this.refs.callout.classList.remove("callout--show");
      this.refs.callout.classList.add("hidden");
      this.setPlayerTransientPortrait(null);
      this.calloutTimer = null;
    }, 920);
  }

  showToast(title, body) {
    const toast = document.createElement("article");
    toast.className = "toast";
    toast.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
    this.refs.toastStack.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
