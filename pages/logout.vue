<template>
  <div></div>
</template>

<script>
  export default {
    beforeCreate() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/enter?name=login')
    }
  }
</script>
