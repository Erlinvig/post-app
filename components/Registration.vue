<template>
<form class="form" @submit="onSubmit">
  <span class="form__error mb2 fc" v-if="error"><v-icon class="icon mr1" name="alert-triangle"></v-icon>{{error}}</span>
  <hr class="mb1" v-if="error">

  <label for="login-form" v-if="errorLogin">Введите логин!</label>
  <input id="login-form" type="text" class="mb1" placeholder="Введите логин" v-model="form.login" autocomplete="off">

  <label for="password-form" v-if="errorPassword">Пароль должен быть не менее 6 символов!</label>
  <input id="password-form" type="password" class="mb1" placeholder="Введите пароль" v-model="form.password" autocomplete="off">

  <label for="password-form-repeat" v-if="errorPasswordRepeat">Пароли не совпадают!</label>
  <input id="password-form-repeat" type="password" class="mb2" placeholder="Повторите пароль" v-model="form.passwordRepeat" autocomplete="off">

  <hr class="mb2">
  <button class="form__button mb1" type="submit">
    <v-icon class="form__icon" name="upload"></v-icon>
    <span>Зарегистрироваться</span>
  </button>
</form>
</template>

<script>
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    head: {
      title: 'Регистрация'
    },
    mounted() {
      this.$store.dispatch('menu/setMenuTitle', {title: 'Регистрация'})
    },
    data() {
      return {
        form: {
          login: '',
          password: '',
          passwordRepeat: ''
        },
        error: ''
      }
    },
    validations: {
      form: {
        login: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        passwordRepeat: {
          sameAsPassword: sameAs('password')
        }
      }
    },

    methods: {
      async onSubmit(e) {
        e.preventDefault();
        this.$v.form.$touch();

        if (!this.$v.form.$error) {
          const formData = {
            login: this.form.login,
            password: this.form.password
          };
          try {
            await this.$store.dispatch('auth/registration', formData);
            await this.$store.dispatch('auth/login', formData);
            this.$router.push('/profile');
          } catch (e) {
            this.error = e.response.data.message;
          }
        }
      }
    },
    computed: {
      errorLogin() {
        return this.$v.form.login.$error
      },
      errorPassword() {
        return this.$v.form.password.$error
      },
      errorPasswordRepeat() {
        return this.$v.form.passwordRepeat.$error
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;

    .form__error {
      justify-content: center;
      text-align: center;
      color: #b70000;
      .icon {
        width: 1.5em;
        height: 1.5em;
        color: #7b0000;
      }
    }

    label {
      color: #b70000;
      margin-bottom: 5px;
    }

    input {
      padding: .5rem;
      font-size: 16px;
      text-align: center;
    }

    .form__button {
      background-color: #1f1866;
      color: white;
      align-self: center;
      border-radius: 2em;
      padding: .6em 3em;
      transition: .5s;
      display: flex;
      align-items: center;

      .form__icon {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }

      &:hover {
        background-color: #225db5;
      }
    }
  }
</style>
