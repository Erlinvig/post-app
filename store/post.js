export const state = () => ({
  currentPost: null
});

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  }
};

export const actions = {
  async getPosts() {
    try {
      return await this.$axios.$get('/api/post/')
    } catch (e) {
      throw e
    }
  },
  async getPostById({commit}, payload) {
    try {
      const post = await this.$axios.$get(`/api/post/${payload.id}`);
      commit('setCurrentPost', post);
    } catch (e) {
      throw e
    }
  },
  async addPost({}, post) {
    try {
      const fd = new FormData();
      fd.append('title', post.title);
      fd.append('author', post.author);
      fd.append('description', post.description);
      fd.append('text', post.text);
      fd.append('image', post.image, post.image.name);
      return await this.$axios.$post('/api/post/', fd)
    } catch (e) {
      throw e
    }
  },
  async savePost({commit}, payload) {
    try {
      const post = await this.$axios.$put(`/api/post/${payload.id}`, payload.post);
      commit('setCurrentPost', post);
    } catch (e) {
      throw e
    }
  },
  async searchPost({}, searchPostTitle) {
    try {
      return await this.$axios.$post(`/api/post/get/byTitle`, {title: searchPostTitle});
    } catch (e) {
      throw e
    }
  }
};

export const getters = {
  getCurrentPost: state => state.currentPost
};

