export type ThemeType = 'light' | 'dark';

export interface ThemePalette {
  // основные цвета
  pageBg: string;
  loaderBg: string;
  
  // кнопки
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonPrimaryBgHover: string;
  buttonPrimaryTextHover: string;
  buttonPrimaryBgDisabled: string;
  buttonPrimaryTextDisabled: string;
  buttonPrimaryBgActive: string;
  buttonPrimaryTextActive: string;
  
  // текст
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  
  // инпуты
  inputText: string;
  inputBg: string;
  inputPlaceholder: string;
  inputBorder: string;
  inputBgFocus: string;
  inputBorderFocus: string;
  inputTextFocus: string;
  inputBgDisabled: string;
  inputBorderDisabled: string;
  inputTextDisabled: string;
  
  // чекбоксы
  checkboxBg: string;
  checkboxBorder: string;
  checkboxBgHover: string;
  checkboxBorderHover: string;
  checkboxBgDisabled: string;
  checkboxBorderDisabled: string;
  checkboxCheck: string;
  checkboxCheckHover: string;
  checkboxCheckDisabled: string;
  
  // карточки и дропдауны
  cardImageBg: string;
  cardBg: string;
  dropdownOptionsBg: string;
  
  // бренд
  brand: string;
  brandActive: string;
  brandHover: string;
  
  // хедер
  headerBg: string;
  headerBorder: string;
  logoBrown: string;
  logoLightGreen: string;
}

export const lightTheme: ThemePalette = {
  pageBg: '#FAFAFA',
  loaderBg: '#518581',
  
  buttonPrimaryBg: '#518581',
  buttonPrimaryText: '#fff',
  buttonPrimaryBgHover: '#86aaa7',
  buttonPrimaryTextHover: '#fff',
  buttonPrimaryBgDisabled: '#d9d9d9',
  buttonPrimaryTextDisabled: '#fff',
  buttonPrimaryBgActive: '#487773',
  buttonPrimaryTextActive: '#fff',
  
  textPrimary: '#000',
  textSecondary: '#afadb5',
  textAccent: '#518581',
  
  inputText: '#000',
  inputBg: '#fff',
  inputPlaceholder: '#afadb5',
  inputBorder: '#fff',
  inputBgFocus: '#fff',
  inputBorderFocus: '#518581',
  inputTextFocus: '#000',
  inputBgDisabled: '#fff',
  inputBorderDisabled: '#fff',
  inputTextDisabled: 'rgba(0, 0, 0, 0.2)',
  
  checkboxBg: '#fff',
  checkboxBorder: '#fff',
  checkboxBgHover: '#fff',
  checkboxBorderHover: '#518581',
  checkboxBgDisabled: 'rgba(255, 255, 255, 0.5)',
  checkboxBorderDisabled: 'rgba(255, 255, 255, 0)',
  checkboxCheck: '#518581',
  checkboxCheckHover: '#518581',
  checkboxCheckDisabled: 'rgba(0, 0, 0, 0.2)',
  
  cardImageBg: '#d9d9d9',
  cardBg: '#fff',
  dropdownOptionsBg: '#fff',
  
  brand: '#518581',
  brandActive: '#487773',
  brandHover: '#86aaa7',
  
  headerBg: '#ffffff',
  headerBorder: '#f3f3f3',
  logoBrown: '#ad7e5c',
  logoLightGreen: '#a6d8d1',
};

export const darkTheme: ThemePalette = {
  pageBg: '#1a1a1a',
  loaderBg: '#518581',
  
  buttonPrimaryBg: '#518581',
  buttonPrimaryText: '#fff',
  buttonPrimaryBgHover: '#86aaa7',
  buttonPrimaryTextHover: '#fff',
  buttonPrimaryBgDisabled: '#3a3a3a',
  buttonPrimaryTextDisabled: '#666',
  buttonPrimaryBgActive: '#487773',
  buttonPrimaryTextActive: '#fff',
  
  textPrimary: '#e0e0e0',
  textSecondary: '#888888',
  textAccent: '#86aaa7',
  
  inputText: '#e0e0e0',
  inputBg: '#2a2a2a',
  inputPlaceholder: '#666666',
  inputBorder: '#2a2a2a',
  inputBgFocus: '#2a2a2a',
  inputBorderFocus: '#518581',
  inputTextFocus: '#e0e0e0',
  inputBgDisabled: '#2a2a2a',
  inputBorderDisabled: '#2a2a2a',
  inputTextDisabled: 'rgba(255, 255, 255, 0.2)',
  
  checkboxBg: '#2a2a2a',
  checkboxBorder: '#2a2a2a',
  checkboxBgHover: '#2a2a2a',
  checkboxBorderHover: '#518581',
  checkboxBgDisabled: 'rgba(42, 42, 42, 0.5)',
  checkboxBorderDisabled: 'rgba(42, 42, 42, 0)',
  checkboxCheck: '#518581',
  checkboxCheckHover: '#518581',
  checkboxCheckDisabled: 'rgba(255, 255, 255, 0.2)',
  
  cardImageBg: '#3a3a3a',
  cardBg: '#252525',
  dropdownOptionsBg: '#2a2a2a',
  
  brand: '#518581',
  brandActive: '#487773',
  brandHover: '#86aaa7',
  
  headerBg: '#1f1f1f',
  headerBorder: '#2a2a2a',
  logoBrown: '#c89468',
  logoLightGreen: '#a6d8d1',
};

export const themes: Record<ThemeType, ThemePalette> = {
  light: lightTheme,
  dark: darkTheme,
};

