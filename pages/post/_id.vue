<template>
  <div class="container">
    <post-view :post="getPost" v-if="!checkQueryEdit"></post-view>
    <post-edit :post="getPost" v-if="checkQueryEdit"></post-edit>
  </div>
</template>

<script>
  import PostView from '../../components/PostView'
  import PostEdit from '../../components/PostEdit'
  export default {
    head: {
      title: 'Пост'
    },
    components: {
      PostView,
      PostEdit
    },
    validate({params}) {
      return Boolean(params.id)
    },
    mounted() {
      this.$store.dispatch('menu/setMenuTitle', {title: 'Пост'})
    },
    async asyncData({store, params}) {
      await store.dispatch('post/getPostById', {id: params.id});
    },
    computed: {
      checkQueryEdit() {
        return this.$route.query.edit
      },
      getPost() {
        return this.$store.getters['post/getCurrentPost'];
      }
    }
  }
</script>

