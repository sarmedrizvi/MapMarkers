export const state = () => ({
  sideBarUser: {}
});

export const getters = {
  BusinessUser(state) {
    return state.sideBarUser;
  }
};

export const mutations = {
  MutateAddUser(state, payload) {
    state.sideBarUser = payload;
  }
};

export const actions = {
  AddUser({ commit }, payload) {
    commit("MutateAddUser", payload);
  }
};

// export const SideBarData = {
//   namespaced: true,
//   state,
//   actions,
//   mutations
// };
