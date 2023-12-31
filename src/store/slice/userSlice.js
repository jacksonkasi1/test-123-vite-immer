// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    avatar: '',
    name: '',
    email: '',
    profile_pic:'',
    role: '',
    phone: ''
  },
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
