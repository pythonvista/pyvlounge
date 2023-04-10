<template>
  <div class="wrap h-screen overflow-hidden bg-white">
    <div class="grid px-5 gap-5 grid-cols-2 mt-6 place-items-center">
      <div class="w-full relative mb-4 col-span-2">
        <p class="pa-0 ma-0 text-2xl text-black font-bold text-center">
          Dashboard
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

      <div class="flex flex-col justify-center items-center gap-2">
        <div
          class="user pa-3 flex justify-center items-center overflow-hidden bg-black w-32 h-32 shadow-md rounded-md"
        >
          <img
            width="100"
            class="object-fit-cover"
            src="@/assets/img/admin.png"
            alt=""
          />
        </div>
        <p class="ma-0 pa-0 text-black text-xl">Stocks</p>
      </div>
      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 bg-black flex justify-center items-center w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-black text-xl">Add User</p>
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        <div
          class="user pa-3 flex justify-center items-center bg-black w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-black text-xl">Place Order</p>
      </div>

      <div class="flex flex-col justify-center items-center gap-2">
        <div
          class="user pa-3 flex justify-center items-center bg-black w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-black text-xl">All Orders</p>
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        <div
          class="user pa-3 flex justify-center items-center bg-black w-32 h-32 shadow-md rounded-md"
        >
          <img width="100" class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-black text-xl">All Transactions</p>
      </div>
    </div>
    <q-dialog
      v-model="isOpen"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="h-screen overflow-hidden bg-black">
        <div class="py-3 px-1 box_3 bg-black">
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
          class="box_4 grid grid-cols-1 gap-4 bg-white overflow-y-scroll overflow-hidden px-4 py-4"
        >
          <p class="ma-0 pa-0 text-2xl text-center font-bold text-black">
            Register
          </p>

          <div class="w-full">
            <q-input outlined v-model="userid" label="User Email" />
          </div>
          <div class="w-full">
            <q-input outlined v-model="fullname" label="Full Name" />
          </div>

          <div class="w-full">
            <q-select
              outlined
              v-model="accounttype"
              :options="accountType"
              label="Account Type"
            />
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
            <q-input
              outlined
              v-model="confirmpasscode"
              type="password"
              label="Confirm Passcode"
            />
          </div>

          <div class="w-full">
            <q-btn
              :disable="!valid"
              :loading="loading"
              class="w-full"
              color="black"
              @click="CreateUser"
            >
              Register
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Creating...
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

    valid() {
      if (
        this.fullname &&
        this.accountType &&
        this.confirmpasscode == this.passcode &&
        this.userid
      ) {
        return true;
      }

      return false;
    },
  },
  methods: {
    setOpen(isOpen) {
      this.isOpen = isOpen;
    },
   async SignOut(){
    const nuxtApp = useNuxtApp();
      const authfunc = nuxtApp.$authfunc;
      await authfunc.signout()
      this.$router.push('/')
    },
    async CreateUser() {
      this.loading = true;
      const nuxtApp = useNuxtApp();
      const crud = nuxtApp.$crud;
      try {
        const res = await nuxtApp.$authfunc.signup(this.userid, this.passcode);
        await crud.addDocWithId('USERS', res.user.uid, {
          fullname: this.fullname,
          accountType: this.accounttype,
          email: this.userid,
        });
        this.loading = false;
        this.isOpen = false;
        this.fullname = '';
        this.accounttype = '';
        this.userid = '';
        this.passcode = '';
        this.confirmpasscode = '';
        this.accounttype = '';
        ShowSnack(
          `${this.accounttype.toUpperCase()} Account Created Successfully`,
          'positive'
        );
      } catch (err) {
        ShowSnack(`${err.message}`, 'negative');
      }
    },
  },
  setup() {
    definePageMeta({
      middleware: ['auth'],
    });
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

.box_3 {
  height: 20%;
}

.box_4 {
  height: 80%;
  border-top-left-radius: 60px;
  overflow: hidden;
  overflow-y: scroll !important;
}
</style>
