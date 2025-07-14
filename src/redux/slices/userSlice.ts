import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string
  username: string
  login: boolean
}

interface UserState {
  selectedUser: User[];
}

const initialState: UserState = {
  selectedUser: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      if (!Array.isArray(state.selectedUser)) {
        state.selectedUser = [];
      }
      state.selectedUser = [...state.selectedUser, action.payload];
    },
    logout: (state) => {
      state.selectedUser = [];
    },
  },
});

export const { setSelectedUser, logout } = userSlice.actions;
export default userSlice.reducer;
