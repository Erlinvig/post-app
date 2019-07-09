export default function ({store, redirect}) {
  if (store.getters['auth/user']) {
    redirect('/profile')
  }
}
