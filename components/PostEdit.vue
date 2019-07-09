<template>
  <form class="post p1 mb1" v-if="isAuthor">
    <div class="post__header mb1">
      <div @click="closeEdit"><v-icon name="arrow-left-circle" class="post__back mr1"></v-icon></div>
      <label for="post-title"></label>
      <input id="post-title" class="post__title" type="text" v-model="form.title" placeholder="Заголовок поста">
    </div>

    <label for="description"></label>
    <textarea id="description" class="post__description mb1" cols="30" rows="7" v-model="form.description" placeholder="Описание поста"></textarea>

    <label for="text"></label>
    <textarea id="text" class="post__text mb1" cols="30" rows="9" v-model="form.text" placeholder="Текст поста"></textarea>

    <button @click="savePost" class="post__save" :class="{'post__save--active': isFilled}">Сохранить</button>
  </form>
</template>

<script>
  export default {
    props: ['post'],
    created() {
      const authorPost = this.post.author;
      const currentUser = this.$store.getters['auth/user'];

      if (currentUser.status !== 'admin' && authorPost !== currentUser.login) {
        this.$router.push({path: `/post/${this.post._id}`})
      }
    },
    data() {
      return {
        form: {
          title: this.post.title,
          author: this.post.author,
          description: this.post.description,
          text: this.post.text,
        }
      }
    },
    methods: {
      closeEdit() {
        this.$router.push({path: `/post/${this.post._id}`})
      },
      async savePost(e) {
        e.preventDefault();

        const updatePost = {
          title: this.form.title,
          author: this.form.author,
          description: this.form.description,
          text: this.form.text
        };

        if (this.isFilled) {
          await this.$store.dispatch('post/savePost', {post: updatePost, id: this.post._id});
          await this.$router.push(`/post/${this.post._id}`);
        }
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
      },
      isFilled() {
        return Boolean(this.form.title && this.form.description && this.form.text)
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
      align-items: center;
      .post__back {
        color: black;
        cursor: pointer;
        transition: .5s;

        &:hover {
          color: #7F828B;
        }
      }

      .post__title {
        width: 100%;
      }
    }
    .post__description {
      font-style: italic;
    }

    .post__save {
      background-color: #848484;
      color: white;
      align-self: center;
      border-radius: 2em;
      padding: .8em 2em;
      transition: .5s;

      &:hover {
        background-color: #aaaaaa;
      }
    }

    .post__save--active {
      background-color: #1f1866;
      &:hover {
        background-color: #4533dd;
      }
    }

    input, textarea {
      padding: 1em;
      font-size: 16px;
    }

    textarea {
      min-height: min-content;
      resize: none;
    }
  }

  @media only screen and (min-width: 320px) {

  }
  @media only screen and (min-width: 420px) {

  }
  @media only screen and (min-width: 768px) {

  }
  @media only screen and (min-width: 992px) {

  }
  @media only screen and (min-width: 1200px) {

  }
</style>
