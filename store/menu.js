export const state = () => ({
  menuRight: false,
  menuTitle: null
});

export const mutations = {
  openMenuRight(state) {
    state.menuRight = true
  },
  closeMenuRight(state) {
    state.menuRight = false
  },
  setMenuTitle(state, payload) {
    state.menuTitle = payload.title
  }
};

export const actions = {
  openMenuRight({commit}) {
    commit('openMenuRight');
  },
  closeMenuRight({commit}) {
    commit('closeMenuRight');
  },
  setMenuTitle({commit}, payload) {
    commit('setMenuTitle', payload)
  }
};

export const getters = {
  showMenuRight: state => state.menuRight,
  menuTitle: state => state.menuTitle
};
