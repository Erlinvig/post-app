<template>
  <div class="container">
    <div class="content p2">
      <h1 class="mb1">Добро пожаловать на сайт</h1>
      <hr class="mb1" />
      <span class="content__text">Пожалуйста <nuxt-link class="content__link" to="/enter?name=login">войдите</nuxt-link> в систему</span>
    </div>
  </div>
</template>

<script>

export default {
  middleware: ['toProfile'],
  head: {
    title: 'Главная'
  },
  mounted() {
    this.$store.dispatch('menu/setMenuTitle', {title: 'Главная'})
  },
  components: {},
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated']
    },
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    background-color: #e3e3e3;
    align-items: center;

    hr {
      width: 50%;
    }

    h1, span {
      text-align: center;
    }

    .content__text {
      font-size: 1.2rem;
      .content__link {
        color: #3528ae;
        transition: .5s;
        &:hover {
          color: #0081ff;
        }
      }
    }
  }
</style>
