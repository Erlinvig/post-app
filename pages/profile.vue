<template>
  <div class="container fc">
    <div class="content mb1" v-if="user">
      <div class="content__title">
        <span>Информация об аккаунте:</span>
      </div>
      <div class="content__main p2">
        <span class="content__text mb2">Логин: {{user.login}}</span>
        <hr class="mb2">
        <span class="content__password mb1">Сменить пароль</span>

        <form class="change-password" @submit="onSubmit">
          <label for="old-password" class="change-password__error" v-if="error.oldPassword">{{error.oldPassword}}</label>
          <input id="old-password" class="mb1" type="password" placeholder="Введите старый пароль" v-model="form.oldPassword">

          <label for="new-password" class="change-password__error" v-if="error.newPassword">{{error.newPassword}}</label>
          <input id="new-password" class="mb1" type="password" placeholder="Введите новый пароль" v-model="form.newPassword">

          <label for="repeat-password" class="change-password__error" v-if="error.repeatPassword">{{error.repeatPassword}}</label>
          <input id="repeat-password" class="mb1" type="password" placeholder="Повторите новый пароль" v-model="form.repeatPassword">

          <span v-if="success" class="change-password__success mb1">Пароль успешно обновлен!</span>

          <button class="password__save mb2" type="submit">Сохранить</button>
        </form>

        <hr class="mb2">

        <button @click="confirm = !confirm" class="delete-account mb1">Удалить аккаунт</button>

        <div class="delete-account__confirm" v-if="confirm">
          <span class="confirm__text mb1">Пожалуйста, введите пароль, чтобы удалить аккаунт</span>
          <label for="password-confirm" class="confirm__error mb1" v-if="error_confirm">{{error_confirm}}</label>
          <input id="password-confirm" class="mb1" type="password" placeholder="Введите пароль" v-model="confirm_password">
          <button @click="confirmDeleteAccount" class="delete-account mb1">Подтвердить удаление</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    middleware: ['auth'],
    head: {
      title: 'Мой профиль'
    },
    mounted() {
      this.$store.dispatch('menu/setMenuTitle', {title: 'Мой профиль'})
    },
    data() {
      return {
        confirm: false,
        confirm_password: '',
        error_confirm: '',

        form: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },
        error: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },
        success: false
      }
    },
    validations: {
      form: {
        oldPassword: {required},
        newPassword: {required, minLength: minLength(6)},
        repeatPassword: {required, sameAsPassword: sameAs('newPassword')}
      }
    },
    methods: {
      async confirmDeleteAccount() {
        if (this.confirm_password) {
          const isTruePassword = await this.$store.dispatch('user/checkPassword', {id: this.user._id, password: this.confirm_password});

          if (isTruePassword) {
            await this.$store.dispatch('user/deleteAccount', this.user._id);
            this.$router.push('/logout')
          } else {
            this.error_confirm = 'Не верный пароль!'
          }
        } else {
          this.error_confirm = 'Необходимо ввести пароль!'
        }
      },
      async onSubmit(e) {
        e.preventDefault();

        const isTruePassword = await this.$store.dispatch('user/checkPassword', {id: this.user._id, password: this.form.oldPassword});
        if (!isTruePassword) {
          this.error.oldPassword = 'Неверный парроль!'
        } else {
          this.error.oldPassword = ''
        }

        this.$v.form.$touch();

        if (this.$v.form.newPassword.$error) {
          this.error.newPassword = 'Пароль должен быть не менее 6 символов!'
        } else {
          this.error.newPassword = ''
        }

        if (this.$v.form.repeatPassword.$error) {
          this.error.repeatPassword = 'Пароли не совпадают!'
        } else {
          this.error.repeatPassword = ''
        }

        if (!this.$v.form.$error && isTruePassword) {
          this.$store.dispatch('user/updatePassword', {id: this.user._id, newPassword: this.form.newPassword});
          this.clearForm();
          this.success = true;
        }
      },
      clearForm() {
        this.form.oldPassword = '';
        this.form.newPassword = '';
        this.form.repeatPassword = '';
      }
    },
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
  .fc {
    display: flex;
    justify-content: center;
  }

  .content {
    align-content: center;
    display: flex;
    flex-direction: column;
    background-color: #e3e3e3;
    border-radius: 1em;

    .content__title {
      padding: 1em;
      background-color: #000a6e;
      font-size: 1.3em;
      text-align: center;
      color: white;
    }

    .content__text {
      font-size: 1.3em;
      text-align: center;
    }

    .content__main {
      display: flex;
      flex-direction: column;
      font-size: 1.2em;

      .content__password {
        text-align: center;
      }

      input {
        text-align: center;
        padding: 1em;
        border-radius: 1em;
        border: 1px solid #b6bcf4;
        outline: none;
      }

      .change-password {
        display: flex;
        flex-direction: column;
        .change-password__error {
          font-size: 14px;
          color: #910001;
          margin-bottom: .5em;
        }
        .change-password__success {
          font-size: 14px;
          font-weight: 600;
          color: #007f4d;
          text-align: center;
        }
        .password__save {
          background-color: #000a6e;
          padding: .5em 2em;
          color: white;
          border-radius: 1em;
          transition: .5s;

          &:hover {
            background-color: #0011b8;
          }
        }
      }
      


      .delete-account {
        background-color: #e8d8d6;
        padding: .5em;
        color: #5a0000;
        border: 1px solid #5a0000;
        border-radius: 1em;
        transition: .5s;

        &:hover {
          background-color: #ffe4dd;
        }
      }
      .delete-account__confirm {
        display: flex;
        flex-direction: column;
        .confirm__error  {
          font-size: 13px;
          color: #910001;
          text-align: center;
        }
        .confirm__text {
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }

  @media only screen and (min-width: 320px) {
    .content {
      width: 100%;
    }
  }
  @media only screen and (min-width: 420px) {
    .content {

    }
  }
  @media only screen and (min-width: 768px) {
    .content {
      width: 60%;
    }
  }
  @media only screen and (min-width: 992px) {
    .content {
      width: 50%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .content {
      width: 40%;
    }
  }
</style>
