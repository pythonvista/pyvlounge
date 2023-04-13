<template>
  <div pa-5 bg-red>
    <div
      v-if="loader"
      class="loader flex justify-center items-center absolute top-0 left-0 h-screen w-full"
    >
      <img src="@/assets/img/loader.gif" alt="" />
    </div>
    <div v-else class="">
      <slot />
    </div>
  </div>
</template>

<script>
import { useLoungeStore } from '@/store/index';
import { onAuthStateChanged } from '@firebase/auth';

const store = useLoungeStore();
export default {
  data: () => ({
    userData: {},
    loader: true,
  }),
  created() {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$authfunc.UserState();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.SetActiveUser(user.uid, true);
        this.loader = false;
        this.GetUser();
      }
    });
  },
  methods: {
    async GetUser() {
      try {
        const nuxtApp = useNuxtApp();
        const crud = nuxtApp.$crud;
        const doc = await crud.getSingleDoc('USERS', store.activeUser);
        this.userData = { ...doc.data(), id: doc.id };
        store.SetUserData(this.userData);
      } catch (err) {
        console.log('this is err:' + err.message);

        if ((err = 'Failed to get document because the client is offline.')) {
          ShowSnack('No Internet', 'negative');
          this.$router.push({ path: '/' });
        }
      }
    },
  },
};
</script>

<style scoped>
.loader {
  background: rgba(0, 0, 0, 0.889);
  backdrop-filter: blur(10px);
  z-index: 100;
}
</style>
