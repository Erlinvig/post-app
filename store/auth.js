import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  token: null,
  user: null
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload.token;
    state.user = payload.user
  },
  clearToken(state) {
    state.token = null;
    state.user = null;
  }
};

export const actions = {
  async login({commit, dispatch}, formData) {
    try {
      const {token, user} = await this.$axios.$post('/api/auth/login', formData);
      dispatch('setToken', {token, user})
    } catch (e) {
      console.log(e.message)
      throw e
    }
  },

  setToken({commit}, payload) {
    this.$axios.setToken(payload.token, 'Bearer');
    Cookies.set('jwt-token', payload.token);
    Cookies.set('user', JSON.stringify(payload.user));
    commit('setToken', payload);

  },

  logout({commit}) {
    this.$axios.setToken(false);
    commit('clearToken');
    Cookies.remove('jwt-token');
    Cookies.remove('user');
  },

  async registration({commit, dispatch}, formData) {
    try {
      await this.$axios.$post('/api/auth/registration', formData)
    } catch (e) {
      throw e
    }
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || '') || {};
    const token = cookies['jwt-token'];
    const user = cookies['user'] ? JSON.parse(cookies['user']) : null;

    if (token && user) {
      dispatch('setToken', {token, user})
    } else {
      dispatch('logout')
    }
  }
};

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
  user: state => state.user
};

