<template>
  <div class="p-5">
    <div class="w-full relative col-span-2">
      <q-btn
        v-if="RouteState == 'dashboard'"
        class="absolute top-0 text-white left-0"
        size="10px"
        :to="{ path: '/' }"
        color="transparent"
        round
        text-color="black"
        icon="home"
      />
      <q-btn
        v-else
        class="absolute top-0 text-white left-0"
        size="10px"
        @click="$router.go(-1)"
        color="transparent"
        round
        text-color="black"
        icon="arrow_left"
      />
      <p class="pa-0 ma-0 text-2xl capitalize text-black font-bold text-center">
        {{ userData ? userData.accountType : '' }} Dashboard <br />
        <span class="font-italic text-sm texx-black">{{
          userData ? userData.fullname : ''
        }}</span>
      </p>

      <p
        v-if="RouteState != 'dashboard'"
        class="text-2xl font-semibold font-serif underline text-center w-full"
      >
        {{ RouteState }}
      </p>

      <q-btn
        class="absolute top-0 text-white right-0"
        size="10px"
        @click="SignOut"
        color="transparent"
        round
        text-color="black"
        icon="logout"
      />
    </div>
    <div
      v-if="loader"
      class="loader flex justify-center items-center absolute top-0 left-0 h-screen w-full"
    >
      <img width="100" src="@/assets/img/loader.gif" alt="" />
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
  computed: {
    RouteState() {
      return store.routeState;
    },
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
    async SignOut() {
      const nuxtApp = useNuxtApp();
      const authfunc = nuxtApp.$authfunc;
      await authfunc.signout();
      this.$router.push('/');
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
