  export const state = () => ({
  sideBarUser: {},
  sideBarData: {}
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
  }
};

export const actions = {
  AddUser({ commit }, payload) {
    commit("MutateAddUser", payload);
  },
  AddSideBar({ commit }, payload) {
    commit("MutateSideBar", payload);
  }
};

// export const SideBarData = {
//   namespaced: true,
//   state,
//   actions,
//   mutations
// };
