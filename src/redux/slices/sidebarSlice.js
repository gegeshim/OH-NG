import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: true,
  reducers: {
    sidebarToggle: (state) => !state,
  },
});

export const { sidebarToggle } = sidebarSlice.actions;
export default sidebarSlice.reducer;
