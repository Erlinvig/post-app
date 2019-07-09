<template>
  <div class="navigation">
    <div @click="closeMenuRight" style="align-self: flex-end"><v-icon name="x" class="mb1"></v-icon></div>

    <div v-if="!isAuth" class="navigation__item mb1" @click="closeMenuRight">
      <nuxt-link class="menu-item fc" to="/" exact> <v-icon name="home" class="mr1"></v-icon>Главная</nuxt-link>
    </div>

    <div v-if="isAuth" class="navigation__item mb1" @click="closeMenuRight">
      <nuxt-link class="menu-item fc" to="/profile" exact> <v-icon name="home" class="mr1"></v-icon>Мой профиль</nuxt-link>
    </div>

    <div class="navigation__item mb1" @click="closeMenuRight">
      <nuxt-link class="menu-item fc" to="/posts?state=post-list"><v-icon name="list" class="mr1"></v-icon>Посты</nuxt-link>
    </div>

    <hr class="mb2">

    <div class="navigation__item mb1" @click="closeMenuRight" v-if="!isAuth">
      <nuxt-link class="menu-item fc" to="/enter?name=login"><v-icon name="log-out" class="mr1"></v-icon>Вход</nuxt-link>
    </div>
    <div class="navigation__item mb1" @click="closeMenuRight" v-if="isAuth">
      <nuxt-link class="menu-item fc" to="/logout"><v-icon name="log-out" class="mr1"></v-icon>Выйти</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      closeMenuRight() {
        this.$store.dispatch('menu/closeMenuRight')
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters['auth/isAuthenticated']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation {
    background-color: #353535;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 1em 2em;

    .navigation__item {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #0081ff;
      }
    }
    .menu-item {
      color: #fff;
      font-size: 24px;
    }
    .nuxt-link-active {
      color: #97a6db
    }
  }
</style>
