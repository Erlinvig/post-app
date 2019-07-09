<template>
  <div class="post p1 mb1">
    <div class="post__header mb1">
      <h1>{{post.title}}</h1>
      <span class="post__edit" @click="edit" v-if="isAuthor">
          <v-icon class="post__edit-mobile" name="edit"></v-icon>
          <span class="post__edit-desktop">Редактировать</span>
        </span>
    </div>

    <div class="post__date mb1">
      <v-icon name="clock" class="post__icon"></v-icon><span>{{new Date(post.date).toLocaleDateString()}}</span>
    </div>

    <hr class="mb1">
    <span class="post__description mb1">{{post.description}}</span>
    <hr class="mb1">
    <span class="post__text">{{post.text}}</span>
  </div>
</template>

<script>
  export default {
    props: ['post'],

    methods: {
      edit() {
        this.$router.push({path: `/post/${this.post._id}`, query: {edit: true}})
      }
    },
    computed: {
      isAuthor() {
        const authorPost = this.post.author;
        const currentUser = this.$store.getters['auth/user'];
        if (currentUser) {
          if (currentUser.status === 'admin') {
            return true
          } else {
            return authorPost === currentUser.login
          }
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    display: flex;
    flex-direction: column;
    background-color: #e3e3e3;

    .post__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .post__edit {
        background-color: #aaaaaa;
        cursor: pointer;
        transition: .5s;
        &:hover {
          background-color: #cbcbcb;
          color: #252525;

        }
      }
    }

    .post__date {
      display: flex;
      align-items: center;

      .post__icon {
        padding-right: .5em;
        color: black;
      }
    }

    .post__description {
      font-style: italic;
      font-size: 16px;
      text-align: justify;
    }
    .post__text {
      font-size: 18px;
      text-align: justify;
    }
  }

  @media only screen and (min-width: 320px) {
    .post__edit {
      border-radius: 100%;
      padding: .6em;
      .post__edit-mobile {
        display: block;
        color: black;
        width: 1.5em;
        height: 1.5em;
      }
      .post__edit-desktop {
        display: none;
      }
    }
  }
  @media only screen and (min-width: 420px) {

  }
  @media only screen and (min-width: 768px) {
    .post__edit {
      border-radius: 1em;
      padding: .5em 1em;
      .post__edit-mobile {
        display: none;
      }
      .post__edit-desktop {
        display: block;
      }
    }

  }
  @media only screen and (min-width: 992px) {

  }
  @media only screen and (min-width: 1200px) {

  }
</style>
