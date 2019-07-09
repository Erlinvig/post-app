export const actions = {
  async deleteAccount({}, id) {
    await this.$axios.$delete(`/api/user/${id}`)
  },

  async checkPassword({}, {id, password}) {
    return await this.$axios.$post(`/api/user/check/${id}`, {password})
  },

  async updatePassword({}, {id, newPassword}) {
    await this.$axios.$put(`/api/user/update/${id}`, {newPassword});
  }
};
