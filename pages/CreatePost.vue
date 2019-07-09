<template>
  <div class="container">
    <form class="post p1 mb1" @submit="createPost">
      <div class="post__header mb1">
        <div @click="closeCreatePage"><v-icon name="arrow-left-circle" class="post__back mr1"></v-icon></div>
        <label for="post-title"></label>
        <input id="post-title" class="post__title" type="text" v-model="form.title" placeholder="Заголовок поста" autocomplete="off">
      </div>

      <label for="description"></label>
      <textarea id="description" class="post__description mb1" cols="30" rows="7" v-model="form.description" placeholder="Описание поста" autocomplete="off"></textarea>

      <label for="text"></label>
      <textarea id="text" class="post__text mb1" cols="30" rows="9" v-model="form.text" placeholder="Текст поста" autocomplete="off"></textarea>

      <el-upload
        style="align-self: center"
        class="upload-demo mb1"
        ref="upload"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleImageChange"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Загрузите изображение для превью</div>
      </el-upload>

      <button type="submit" class="post__save" :class="{'post__save--active': isFilled}">Сохранить</button>
    </form>
  </div>
</template>

<script>
  export default {
    middleware: ['auth'],
    head: {
      title: 'Создание поста'
    },
    mounted() {
      this.$store.dispatch('menu/setMenuTitle', {title: 'Создание поста'})
    },
    data() {
      return {
        form: {
          title: '',
          description: '',
          text: '',
          image: null
        },
        error: ''
      }
    },
    methods: {
      handleImageChange(file, fileList) {
        this.form.image = file.raw;
      },
      closeCreatePage() {
        this.$router.push('/posts')
      },
      async createPost(e) {
        e.preventDefault();

        const user = this.$store.getters['auth/user'];
        const newPost = {
          title: this.form.title,
          author: user.login,
          description: this.form.description,
          text: this.form.text,
          image: this.form.image
        };

        if (this.isFilled) {
          await this.$store.dispatch('post/addPost', newPost);
          await this.$router.push('/posts')
        }
      }
    },
    computed: {
      isFilled() {
        return Boolean(this.form.title && this.form.description && this.form.text && this.form.image)
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

