import { useLoungeStore } from '~/store';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    const nuxtApp = useNuxtApp();
    const user = nuxtApp.$authfunc.UserState();
    const store = useLoungeStore();
    console.log(user)
    // if (!user) {
    //   store.SetActiveUser('', false);
    //   return navigateTo('/');
    // }

    // store.SetActiveUser(user?.uid, true);
    // return navigateTo(to.fullPath);
  }
});
