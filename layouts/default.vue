<template>
  <div>
    <menu-right class="menuRight" v-if="showMenuRight" />
    <div class="headerMain mb1">
      <menu-top class="menu" />
    </div>
    <nuxt />
  </div>
</template>

<script>
  import MenuTop from '../components/MenuTop.vue';
  import MenuRight from '../components/MenuRight.vue';

  export default {
    components: {
      MenuTop,
      MenuRight
    },
    computed: {
      showMenuRight() {
        return this.$store.getters['menu/showMenuRight']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .headerMain {
    height: 4em;
    .menu {
      position: fixed;
      width: 100%;
    }
  }

  @media only screen and (min-width: 320px) {
    .menuRight {
      width: 100%
    }
  }

  @media only screen and (min-width: 420px) {
    .menuRight {
      width: 18em;
    }
  }

  @media only screen and (min-width: 768px) {
    .menuRight {
      display: none;
    }
  }
</style>

