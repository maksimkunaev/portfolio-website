export const themes = {
  light: {
    settings: {
      "--primary-color": "#212121",                  // глубокий тёмно-серый для текста
      "--secondary-color": "#1565c0",                // насыщенный синий
      "--tertiary-color": "#555",                    // серый для доп. текста
      "--quaternery-color": "#cccccc",               // светлый бордер
      "--primary-bg-color": "#f0f2f5",               // светло-серый фон вместо чисто белого
      "--opacity-bg-color": "#0000000a",             // лёгкая тень
      "--secondary-bg-color": "#ffffff",             // белый, но только как блок/карточка
      "--primary-shadow": "0 1px 4px rgba(0, 0, 0, 0.1)",
      "--border-radius": "8px",
    },
    label: "🌕",
  },
  dark: {
    settings: {
      "--primary-color": "#e8ebf1",      // text
      "--secondary-color": "#8e9bb3",    // muted text: dates, labels, captions
      "--tertiary-color": "#c3cad8",     // body text one step down from primary
      "--quaternery-color": "#232d42",   // borders
      "--primary-bg-color": "#0a0e16",   // page
      "--secondary-bg-color": "#111725", // cards
      "--opacity-bg-color": "#0a0e16cc", // header, translucent
      "--accent-color": "#5fd4e8",       // interactive things only
      "--primary-shadow": "0 8px 24px rgba(0, 0, 0, 0.35)",
      "--border-radius": "10px",
    },
    label: "🌚",
  },
};
