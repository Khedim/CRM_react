import { configureStore, createSlice } from "@reduxjs/toolkit";

export const stateSlicer = createSlice({
  name: "stateSlicer",
  initialState: {
    isLoading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || "",
    user: {
      id: localStorage.getItem("userid") || 0,
      username: localStorage.getItem("username") || "",
    },
    team: {
        team_id: localStorage.getItem("team_id") || 0,
        team_name: localStorage.getItem("team_name") || "",
    },
    toast: {
      show: false,
      text: "",
    },
  },
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", actions.payload);
    },
    removeToken: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userid', action.payload.id)
      localStorage.setItem('username', action.payload.username)
    },
    setTeam: (state, action) => {
      state.team = action.payload;
      localStorage.setItem('team_id', action.payload.team_id)
      localStorage.setItem('team_name', action.payload.team_name)
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    activateToast: (state, actions) => {
      state.toast.show = actions.payload.show;
      state.toast.text = actions.payload.text;
    },
    deactivateToast: (state, actions) => {
      state.toast.show = actions.payload;
      state.toast.text = "";
    },
  },
});

export const store = configureStore({
  reducer: {
    state: stateSlicer.reducer,
  },
});

export const {
  setToken,
  removeToken,
  setIsLoading,
  activateToast,
  deactivateToast,
  setUser,
  setTeam,
} = stateSlicer.actions;
