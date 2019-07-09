<template>
  <div class="header">
    <div class="container">
      <div class="navigation">
        <div class="navigation__menu">
          <div @click="openMenuRight"><v-icon name="menu" class="navigation__icon-menu mr1"></v-icon></div>
          <span class="menu-item menu-title mr2">{{getMenuTitle}}</span>
          <div v-if="!isAuth"><nuxt-link class="menu-item menu-nav mr2" to="/" exact>Главная</nuxt-link></div>
          <div v-if="isAuth"><nuxt-link class="menu-item menu-nav mr2" to="/profile" exact>Мой профиль</nuxt-link></div>
          <div><nuxt-link class="menu-item menu-nav mr2" to="/posts?state=post-list">Посты</nuxt-link></div>
        </div>
        <nuxt-link class="menu-item menu-nav" to="/logout" v-if="isAuth">Выйти</nuxt-link>
        <nuxt-link class="menu-item menu-nav" to="/enter?name=login" v-if="!isAuth">Вход</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   data() {
     return {
     }
   },
   methods: {
     openMenuRight() {
       this.$store.dispatch('menu/openMenuRight')
     }
   },
   computed: {
     getMenuTitle() {
       return this.$store.getters['menu/menuTitle']
     },
     isAuth() {
       return this.$store.getters['auth/isAuthenticated']
     }
   }
 }
</script>

<style lang="scss" scoped>
  .header {
    background-color: #202020;
    height: 4em;
    display: flex;
    align-items: center;

    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .navigation__menu {
        display: flex;
        align-items: center;
      }

      .menu-item {
        color: #fff;
        font-size: 20px;
      }

      .nuxt-link-active {
        color: #97a6db
      }
    }
  }

  @media only screen and (min-width: 320px) {
    .menu-nav {
      display: none;
    }
    .menu-title{
      display: block;
    }
  }

  @media only screen and (max-width: 767px) {
    .navigation__icon-menu {
      display: block;
    }
    .menu-title{
      display: block;
    }
    .menu-nav {
      display: none;
    }
  }

  @media only screen and (min-width: 768px) {
    .navigation__icon-menu {
      display: none;
    }
    .menu-title {
      display: none;
    }
    .menu-nav {
      display: block;
    }
  }
</style>
