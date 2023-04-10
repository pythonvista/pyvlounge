import { useLoungeStore } from '~/store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    const nuxtApp = useNuxtApp();
    const auth = await nuxtApp.$authfunc.UserState();
    const store = useLoungeStore();
    console.log(auth.currentUser)
    // if(user){
      
    //   store.SetActiveUser(user?.uid, true)
    //   navigateTo('/dashboard')
    // }
  
  }
});
