// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

// ** ThemeConfig Import
import { themeConfig } from '../../configs/theme.config';

const initialState = {
  mode: themeConfig.mode,
  themeColor: themeConfig.themeColor,
  colorLevel: themeConfig.primaryColorLevel,
  lang: themeConfig.locale,
  root: themeConfig.root,
  minimized: false
};

export const themeConfigs = createSlice({
  name: 'themeConfigs',
  initialState: initialState,
  reducers: {
    ChangeMode: (state, action) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
      } else {
        state.mode = 'light';
      }
    },
    ChangeLang : (state, action) => {
        state.lang = action.payload
    },
    Minimize: (state, action) => {
      state.minimized = !state.minimized
    }
  },
});

export const { ChangeMode, ChangeLang, Minimize } = themeConfigs.actions;

export default themeConfigs.reducer;
