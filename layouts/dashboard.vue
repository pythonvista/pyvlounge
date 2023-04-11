<template>
  <div pa-5 bg-red>
   
    <div class="">
      <slot />
    </div>
  </div>
</template>

<script>
import { useLoungeStore } from '@/store/index';

const store = useLoungeStore();
export default {
  data: () => ({
    userData: {},
  }),
  created() {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$authfunc.UserState();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      store.SetActiveUser(uid, true);

    } else {
      this.$router.push('/');
    }
    this.GetUser();
  },
  methods: {
    async GetUser() {
      try {
        const nuxtApp = useNuxtApp();
        const crud = nuxtApp.$crud;
        const doc = await crud.getSingleDoc('USERS', store.activeUser);
        this.userData = { ...doc.data(), id: doc.id };
        store.SetUserData(this.userData)
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
