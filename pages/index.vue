<template>
  <div class="wrap h-screen overflow-hidden bg-black">
    <div class="logo w-full px-2 py-2 flex justify-center items-center">
      <img width="150" src="@/assets/img/logo_white.png" alt="" />
    </div>

    <div class="grid px-5 gap-5 grid-cols-2 mt-1 place-items-center">
      <div class="w-full mb-4 col-span-2">
        <p class="pa-0 ma-0 text-2xl text-white font-bold text-center">
          Who's Authencating
        </p>
      </div>

      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 flex justify-center items-center overflow-hidden bg-white w-32 h-32 shadow-md rounded-md"
        >
          <img
            width="100"
            class="object-fit-cover"
            src="@/assets/img/admin.png"
            alt=""
          />
        </div>
        <p class="ma-0 pa-0 text-white text-xl">Admin</p>
      </div>
      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 bg-white flex justify-center items-center w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-white text-xl">Sales Personel</p>
      </div>
      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 flex justify-center items-center bg-white w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-white text-xl">Chef</p>
      </div>
    </div>

    <q-dialog
      v-model="isOpen"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="h-screen bg-black">
        <div class="py-3 px-1 box_1 bg-black">
          <q-btn
            size="20px"
            @click="setOpen(false)"
            round
            color="black"
            icon="arrow_back"
          />

          <div class="logo w-full pa-2 flex justify-center items-center">
            <img width="70" src="@/assets/img/logo_white.png" alt="" />
          </div>
        </div>
        <div
          class="box_2 bg-white px-4 py-4 flex flex-col gap-9 justify-center items-center"
        >
          <p class="ma-0 pa-0 text-2xl font-bold text-black">Login</p>

          <div class="w-full">
            <q-input outlined v-model="userid" label="User Email" />
          </div>

          <div class="w-full">
            <q-input
              outlined
              v-model="passcode"
              type="password"
              label="Passcode"
            />
          </div>

          <div class="w-full">
            <q-btn
              label="Login"
              class="w-full"
              :disable="!IsValid"
              :loading="loading"
              color="black"
              @click="Login"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { useLoungeStore } from '@/store/index';

const store = useLoungeStore();

export default {
  data: () => ({
    vvv: 'hih',
    isOpen: false,
    fullname: '',
    accounttype: '',
    confirmpasscode: '',
    dialog: false,
    maximizedToggle: true,
    userid: '',
    passcode: '',
    loading: false,
  }),
  components: {},

  computed: {
    accountType() {
      return store.accountType;
    },

    IsValid() {
      if (this.userid && this.passcode) {
        return true;
      }

      return false;
    },
  },

  methods: {
    setOpen(isOpen) {
      const nuxtApp = useNuxtApp();
const auth = nuxtApp.$authfunc.UserState();
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        store.SetActiveUser(uid, true);
        console.log(uid);
        this.$router.push('/dashboard');
      } else {
        this.isOpen = isOpen;
      }
    },

    async Login() {
      try {
        this.loading = true;
        const nuxtApp = useNuxtApp();
        await nuxtApp.$authfunc.login(this.userid, this.passcode);
        this.loading = false;
        ShowSnack('Logged In Successfully', 'positive');
        this.$router.push('/dashboard');
      } catch (err) {
        this.loading = false;
        ShowSnack(err.message, 'negative');
      }
    },
  },

  setup() {
  
  },
};
</script>

<style scoped>
.wrap {
  overflow-y: scroll !important;
}

.metch {
  border: 1px solid red;
}

.box_1 {
  height: 30%;
}

.box_2 {
  height: 70%;
  border-top-left-radius: 60px;
}
</style>
