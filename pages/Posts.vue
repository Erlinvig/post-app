<template>
  <div class="container">
    <header class="fc mb1">
      <div class="toggle-panel mr1">
        <div class="toggle-panel__button" :class="{active: isState('post-list')}" @click="setState('post-list')"><v-icon class="button__icon" name="list"></v-icon></div>
        <div class="toggle-panel__button" :class="{active: isState('post-table')}" @click="setState('post-table')"><v-icon class="button__icon" name="grid"></v-icon></div>
      </div>
      <div class="search-panel mr1">
        <input class="search-panel__field" type="text" v-model="searchPostTitle" placeholder="Введите запрос">
        <button @click="search"><v-icon class="search-panel__icon" name="search"></v-icon></button>
      </div>
      <div class="create-post" @click="createPost"><v-icon class="button__icon" name="plus"></v-icon></div>
    </header>
    
    <div class="mb2" :class="getState">
      <div class="post mb1" v-for="post in posts" :key="post._id">
        <div class="post__section-1 p1">
          <div>
            <h2 class="post__title mb1">{{post.title}}</h2>
          </div>
          <div class="post__date-user mb1">
            <div class="fc"><v-icon name="clock" class="post__icon"></v-icon><span>{{new Date(post.date).toLocaleDateString()}}</span></div>
            <div class="fc"><v-icon name="user" class="post__icon"></v-icon><span>{{post.author}}</span></div>
          </div>
<!--          <img-->
<!--            class="post__image mb1"-->
<!--            :src="post.imageUrl"-->
<!--            alt="img">-->
          <div
            class="post__image mb1"
            :style="{'background-image': `url(${post.imageUrl})`}"
          >
          </div>
          <button @click="openPost(post._id)" class="post__button-open button">Открыть</button>
        </div>
        <div class="post__section-2 p1">
          <h2 class="post__title mb1">{{post.title}}</h2>
          <div class="post__date-user mb1">
            <div class="fc mr2"><v-icon name="clock" class="post__icon"></v-icon><span>{{new Date(post.date).toLocaleDateString()}}</span></div>
            <div class="fc"><v-icon name="user" class="post__icon"></v-icon><span>{{post.author}}</span></div>
          </div>
          <p class="post__description mb1">{{post.description.substr(0, 300)}}</p>
          <button @click="openPost(post._id)" class="post__button-open button">Открыть</button>
        </div>
      </div>
      <div class="post__section-1" style="min-width: 33%"></div>
    </div>
  </div>
</template>

<script>
  export default {
    async created() {
      if (this.$route.query.search) {
        this.posts = await this.$store.dispatch('post/searchPost', this.$route.query.search);
        this.searchPostTitle = this.$route.query.search;
      } else {
        this.posts = await this.getPosts();
      }
      if (!this.$route.query.state) {
        this.post_state = 'post-list';
        this.$router.push({path: 'posts', query: {state: this.post_state, search: this.searchPostTitle}})
      }
    },
    mounted () {
      this.$store.dispatch('menu/setMenuTitle', {title: 'Посты'});
      this.windowWidth = window.innerWidth;
      this.search_title = this.$route.query.search;
      this.post_state = this.$route.query.state;
      if (this.windowWidth < 768) {
        this.post_state = 'post-table'
      }
      window.onresize = (event) => {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth < 768) {
          this.post_state = 'post-table'
        } else {
          this.post_state = this.post_state_cash
        }
      };
    },
    head: {
      title: 'Посты'
    },
    data() {
      return {
        posts: null,
        post_state: 'post-list',
        post_state_cash: 'post-list',
        search_title: null,
        searchPostTitle: null,
        windowWidth: null
      }
    },
    methods: {
      setState(state) {
        this.post_state = state;
        this.post_state_cash = state;
        this.$router.push({path: 'posts', query: {state: state, search: this.search_title}});
      },
      async getPosts() {
        return await this.$store.dispatch('post/getPosts');
      },
      async addPost() {
        const payload = {title: 'Название статьи', description: 'Описание', text: 'Текст данной статьи'};
        await this.$store.dispatch('post/addPost', payload);
        this.posts = await this.$store.dispatch('post/getPosts');
      },
      createPost() {
        this.$router.push('/createpost')
      },
      openPost(id) {
        this.$router.push(`/post/${id}`);
      },
      async search() {
        if (this.searchPostTitle) {
          this.search_title = this.searchPostTitle;
          this.posts = await this.$store.dispatch('post/searchPost', this.searchPostTitle);
          this.$router.push({path: 'posts', query: {state: this.post_state, search: this.searchPostTitle}})
        } else {
          this.search_title = null;
          this.posts = await this.$store.dispatch('post/getPosts');
          this.$router.push({path: 'posts', query: {state: this.post_state}})
        }
      },
      isState(state) {
        return this.$route.query.state === state
      }
    },
    computed: {
      getState() { return this.post_state },
    }
  }
</script>

<style lang="scss" scoped>
  .toggle-panel {
    background-color: #e3e3e3;
    border-radius: .5em;
    .toggle-panel__button {
      cursor: pointer;
      padding: 1em;
      transition: .5s;
      &:first-child {
        border-bottom-left-radius: .5em;
        border-top-left-radius: .5em;
      }
      &:nth-child(2) {
        border-bottom-right-radius: .5em;
        border-top-right-radius: .5em;
      }
      .icon {
        color: #000;
      }
      &:hover {
        background-color: #949494;
      }
    }
    .active {
      background-color: #4d4d4d;
      .icon {
        color: #74baea;
      }
      &:hover {
        background-color: #4d4d4d;
      }
    }
  }
  .search-panel {
    display: flex;
    width: 100%;
    padding: .8em 1em;
    background-color: #e3e3e3;
    border-radius: .5em;

    .search-panel__field {
      margin-right: .5em;
      padding: .5em;
      font-size: 1.2rem;
      border: 1px solid #969696;
      border-radius: .5em;
      width: 100%;
      transition: .5s;
      &:focus {
        border: 1px solid #00a9ff;
        outline: none;
      }
    }

    .search-panel__icon {
      color: black;
      transition: .5s;
      &:hover {
        color: #322394;
      }
    }
  }
  .create-post {
    background-color: #e3e3e3;
    border-radius: .5em;
    display: flex;
    padding: 1em;
    cursor: pointer;
    transition: .5s ease;
    .button__icon {
      color: #000;
      transition: .5s ease;
    }
    &:hover {
      background-color: #969696;
    }
  }

  .post {
    background-color: #e3e3e3;
    display: flex;
    flex-direction: row;

    .post__section-1, .post__section-2 {
      display: flex;
      flex-direction: column;
      .post__button-open {
        border-radius: 5px;
        transition: .5s;
        &:hover {
          background-color: #0011b8;
        }
      }
      .post__image {
        width: 100%;
        height: 12em;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      }
      .post__date-user {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .post__icon {
          padding-right: .5em;
          color: black;
        }
      }
    }
  }

  .post-table {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .post {
      width: min-content;
      .post__section-1 {
        width: 100%;
      }
      .post__section-2 {
        display: none;
      }
    }
  }

  .post-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .post {
      width: 100%;
      .post__section-1 {
        min-width: 20em;
        .post__title { display: none; }
        .post__date-user { display: none }
        .post__image { margin-bottom: 0; }
        .post__button-open { display: none }
      }
      .post__section-2 {
        display: flex;
        width: 100%;
        .post__date-user {
          justify-content: flex-start;
        }
        .post__button-open {
          border-radius: 5px;
          align-self: flex-end;
          transition: .5s;
          &:hover {
            background-color: #0011b8;
          }
        }
        .post__description {
          height: 90%;
          text-align: justify;
        }
      }
    }
  }

  @media only screen and (min-width: 320px) {
    .toggle-panel {
      display: none;
    }
    .post {
      min-width: 100%;
    }
  }
  @media only screen and (min-width: 420px) {

  }
  @media only screen and (min-width: 768px) {
    .toggle-panel {
      display: flex;
    }
    .post {
      min-width: 49%;
    }
  }
  @media only screen and (min-width: 992px) {

  }
  @media only screen and (min-width: 1200px) {
    .post {
      min-width: 33%;
    }
  }
</style>
