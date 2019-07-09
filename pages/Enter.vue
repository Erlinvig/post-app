<template>
  <div class="container">
    <div class="content">
      <div class="entry">
        <div class="entry__header mb1">
          <button v-bind:class="{'active': isLogin}" class="header__item" @click="toLogin"><v-icon class="header__icon" name="log-in"></v-icon> Вход</button>
          <button v-bind:class="{'active': isRegistration}" class="header__item" @click="toRegistration"><v-icon class="header__icon" name="user-plus"></v-icon> Регистрация</button>
        </div>
        <login v-if="isLogin"></login>
        <registration v-if="isRegistration"></registration>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from '../components/Login.vue';
  import Registration from '../components/Registration.vue';

  export default {
    components: {
      Login,
      Registration
    },
    beforeCreate() {
      if (!this.$route.query.name) {
        this.$router.push({path: '/enter', query: {name: 'login'}})
      }
    },
    methods: {
      toLogin() {
        this.$router.push({path: 'enter', query: {name: 'login'}})
      },
      toRegistration() {
        this.$router.push({path: 'enter', query: {name: 'registration'}})
      },
      onSubmit() {

      }
    },
    computed: {
      isLogin() {
        return this.$route.query.name === 'login'
      },
      isRegistration() {
        return this.$route.query.name === 'registration'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .active {
    background-color: #225db5;
  }
  .content {
    display: flex;
    justify-content: center;
  }
  .entry {
    display: flex;
    flex-direction: column;
    background-color: #e3e3e3;
    width: 40%;
    border-radius: 1em;
    .entry__header {
      display: flex;
      justify-content: space-between;
      background-color: #1f1866;
      .header__item {
        color: white;
        width: 100%;
        justify-content: center;
        font-size: 18px;
        padding: 1em;
        display: flex;
        align-items: center;
        transition: .5s;
        &:hover {
          background-color: #225db5;
        }
        .header__icon {
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
      }
    }
  }
  @media only screen and (min-width: 320px) {
    .entry {
      width: 100%;
    }
  }
  @media only screen and (min-width: 420px) {
    .entry {
    }
  }
  @media only screen and (min-width: 768px) {
    .entry {
      width: 60%;
    }
  }
  @media only screen and (min-width: 992px) {
    .entry {
      width: 50%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .entry {
      width: 40%;
    }
  }
</style>
