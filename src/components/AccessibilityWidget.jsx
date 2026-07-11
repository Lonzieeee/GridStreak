import React, { useCallback, useEffect, useState } from "react";
import {
  FaAccessibleIcon,
  FaAlignLeft,
  FaArrowsAltH,
  FaFont,
  FaImage,
  FaLink,
  FaMousePointer,
  FaPause,
  FaTextHeight,
  FaTimes,
} from "react-icons/fa";
import { MdContrast } from "react-icons/md";
import { RiLineHeight } from "react-icons/ri";
import "./AccessibilityWidget.css";

const STORAGE_KEY = "gridstreak-a11y-settings";

const DEFAULT_SETTINGS = {
  contrastMode: 0,
  highlightLinks: false,
  textSize: 0,
  textSpacing: false,
  pauseAnimations: false,
  hideImages: false,
  dyslexiaFont: false,
  largeCursor: false,
  lineHeight: false,
  textAlignLeft: false,
};

const TEXT_SIZE_MAX = 3;
const CONTRAST_MODE_MAX = 3;
const CONTRAST_LABELS = [
  "Contrast +",
  "Invert Colours",
  "Dark Contrast",
  "Light Contrast",
];

function getOptionDisplay(option, settings) {
  if (option.id === "contrastMode") {
    const mode = settings.contrastMode;
    if (mode === 0) {
      return { title: "Contrast +", level: null };
    }
    return { title: "Contrast +", level: CONTRAST_LABELS[mode] };
  }

  if (option.id === "textSize" && settings.textSize > 0) {
    return {
      title: "Bigger Text",
      level: `Level ${settings.textSize}/${TEXT_SIZE_MAX}`,
    };
  }

  return { title: option.label, level: null };
}

function getActiveSettingLabels(settings) {
  const active = [];

  if (settings.contrastMode > 0) {
    active.push(CONTRAST_LABELS[settings.contrastMode]);
  }
  if (settings.highlightLinks) active.push("Highlight Links");
  if (settings.textSize > 0) active.push(`Bigger Text ${settings.textSize}/${TEXT_SIZE_MAX}`);
  if (settings.textSpacing) active.push("Text Spacing");
  if (settings.pauseAnimations) active.push("Pause Animations");
  if (settings.hideImages) active.push("Hide Images");
  if (settings.dyslexiaFont) active.push("Dyslexia Friendly");
  if (settings.largeCursor) active.push("Large Cursor");
  if (settings.lineHeight) active.push("Line Height");
  if (settings.textAlignLeft) active.push("Text Align");

  return active;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    if (typeof parsed.highContrast === "boolean") {
      parsed.contrastMode = parsed.highContrast ? 2 : 0;
      delete parsed.highContrast;
    }
    return parsed;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function applySettings(settings) {
  const root = document.documentElement;
  const contrastModes = ["", "invert", "dark", "light"];
  root.dataset.a11yContrast = contrastModes[settings.contrastMode] || "";
  root.dataset.a11yHighlightLinks = settings.highlightLinks ? "true" : "";
  root.dataset.a11yTextSize = String(settings.textSize);
  root.dataset.a11yTextSpacing = settings.textSpacing ? "true" : "";
  root.dataset.a11yPauseMotion = settings.pauseAnimations ? "true" : "";
  root.dataset.a11yHideImages = settings.hideImages ? "true" : "";
  root.dataset.a11yDyslexia = settings.dyslexiaFont ? "true" : "";
  root.dataset.a11yLargeCursor = settings.largeCursor ? "true" : "";
  root.dataset.a11yLineHeight = settings.lineHeight ? "true" : "";
  root.dataset.a11yTextAlign = settings.textAlignLeft ? "left" : "";
}

const accessibilityOptions = [
  {
    id: "contrastMode",
    label: "Contrast +",
    labels: CONTRAST_LABELS,
    Icon: MdContrast,
    cycle: true,
    max: CONTRAST_MODE_MAX,
    formatActive: (value) => value > 0,
  },
  {
    id: "highlightLinks",
    label: "Highlight Links",
    Icon: FaLink,
    toggle: true,
  },
  {
    id: "textSize",
    label: "Bigger Text",
    Icon: FaTextHeight,
    cycle: true,
    max: TEXT_SIZE_MAX,
    formatActive: (value) => value > 0,
  },
  {
    id: "textSpacing",
    label: "Text Spacing",
    Icon: FaArrowsAltH,
    toggle: true,
  },
  {
    id: "pauseAnimations",
    label: "Pause Animations",
    Icon: FaPause,
    toggle: true,
  },
  {
    id: "hideImages",
    label: "Hide Images",
    Icon: FaImage,
    toggle: true,
  },
  {
    id: "dyslexiaFont",
    label: "Dyslexia Friendly",
    Icon: FaFont,
    toggle: true,
  },
  {
    id: "largeCursor",
    label: "Cursor",
    Icon: FaMousePointer,
    toggle: true,
  },
  {
    id: "lineHeight",
    label: "Line Height",
    Icon: RiLineHeight,
    toggle: true,
  },
  {
    id: "textAlignLeft",
    label: "Text Align",
    Icon: FaAlignLeft,
    toggle: true,
  },
];

const GRIDSTREAK_LOGO =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/navbar.png";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const loaded = loadSettings();
    applySettings(loaded);
    return loaded;
  });

  const updateSettings = useCallback((next) => {
    setSettings(next);
    applySettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "u") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleOptionClick = (option) => {
    if (option.cycle) {
      const current = settings[option.id];
      const next = current >= option.max ? 0 : current + 1;
      updateSettings({ ...settings, [option.id]: next });
      return;
    }

    updateSettings({ ...settings, [option.id]: !settings[option.id] });
  };

  const isOptionActive = (option) => {
    if (option.cycle) {
      return option.formatActive(settings[option.id]);
    }
    return Boolean(settings[option.id]);
  };

  const resetAll = () => {
    updateSettings({ ...DEFAULT_SETTINGS });
  };

  const activeCount = Object.entries(settings).filter(([key, value]) => {
    if (key === "textSize" || key === "contrastMode") return value > 0;
    return Boolean(value);
  }).length;

  const activeLabels = getActiveSettingLabels(settings);

  return (
    <div className="a11y-widget">
      {isOpen ? (
        <div
          id="a11y-widget-panel"
          className="a11y-widget__panel"
          role="dialog"
          aria-label="Accessibility menu"
          aria-modal="false"
        >
          <div className="a11y-widget__header">
            <h2 className="a11y-widget__title">Accessibility Menu</h2>
            <span className="a11y-widget__shortcut">CTRL+U</span>
            <button
              type="button"
              className="a11y-widget__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div className="a11y-widget__body">
            <p className="a11y-widget__lede">
              Adjust display and reading options. Your preferences are saved on this device.
            </p>

            {activeLabels.length > 0 ? (
              <div className="a11y-widget__status" aria-live="polite">
                <span className="a11y-widget__status-label">Active:</span>
                <div className="a11y-widget__status-list">
                  {activeLabels.map((item) => (
                    <span key={item} className="a11y-widget__status-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="a11y-widget__grid" role="group" aria-label="Accessibility options">
              {accessibilityOptions.map((option) => {
                const active = isOptionActive(option);
                const { Icon } = option;
                const display = getOptionDisplay(option, settings);
                const ariaLabel = display.level
                  ? `${display.title}, ${display.level}`
                  : display.title;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`a11y-widget__option${active ? " is-active" : ""}`}
                    onClick={() => handleOptionClick(option)}
                    aria-pressed={active}
                    aria-label={ariaLabel}
                  >
                    <span className="a11y-widget__option-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="a11y-widget__option-label">{display.title}</span>
                    {display.level ? (
                      <span className="a11y-widget__option-level">{display.level}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button type="button" className="a11y-widget__reset" onClick={resetAll}>
              Reset all settings
            </button>
          </div>

          <footer className="a11y-widget__footer">
            <img src={GRIDSTREAK_LOGO} alt="GridStreak" className="a11y-widget__footer-logo" />
            <p className="a11y-widget__footer-tagline">Powering a new clean future</p>
          </footer>
        </div>
      ) : null}

      <button
        type="button"
        className={`a11y-widget__trigger${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={isOpen}
        aria-controls="a11y-widget-panel"
      >
        <FaAccessibleIcon className="a11y-widget__trigger-icon" aria-hidden="true" />
        {activeCount > 0 ? (
          <span className="a11y-widget__badge" aria-hidden="true">
            {activeCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
