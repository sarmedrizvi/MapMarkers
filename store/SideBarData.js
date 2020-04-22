export const state = () => ({
  sideBarUser: {},
  sideBarData: {},
  drawer: false
});

export const getters = {
  BusinessUser(state) {
    return state.sideBarUser;
  }
};

export const mutations = {
  MutateAddUser(state, payload) {
    state.sideBarUser = payload;
  },
  MutateSideBar(state, payload) {
    state.sideBarData = payload;
  },
  MutateDrawer(state, payload) {
    state.drawer = payload;
  },
  MutateFeedback(state, payload) {
    state.sideBarData.feedback.push(payload);
  },
  MutateClearFeedback(state) {
    state.sideBarData.feedback = [];
  }
};

export const actions = {
  AddUser({ commit }, payload) {
    commit("MutateAddUser", payload);
  },
  AddSideBar({ commit }, payload) {
    commit("MutateSideBar", payload);
  },
  DrawerChange({ commit }, payload) {
    commit("MutateDrawer", payload);
  },
  AddFeedback({ commit }, payload) {
    commit("MutateFeedback", payload);
  },
  ClearFeedback({ commit }) {
    commit("MutateClearFeedback");
  }
};

// export const SideBarData = {
//   namespaced: true,
//   state,
//   actions,
//   mutations
// };
