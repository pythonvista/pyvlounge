<template>
  <div class="wrap h-screen overflow-hidden bg-black">
    <div class="logo w-full px-2 py-4 flex justify-center items-center">
      <img width="150" src="@/assets/img/logo_white.png" alt="" />
    </div>

    <div class="grid px-5 gap-6 grid-cols-2 mt-3 place-items-center">
      <div class="w-full mb-6 col-span-2">
        <p class="pa-0 ma-0 text-2xl font-bold text-center">
          Who's Authencating
        </p>
      </div>

      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 flex justify-center items-center overflow-hidden bg-white w-40 h-40 shadow-md rounded-md"
        >
          <img class="object-fit-cover" src="@/assets/img/admin.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-2xl">Admin</p>
      </div>
      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div class="user pa-3 bg-white w-40 h-40 shadow-md rounded-md">
          <img class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-2xl">Sales Personel</p>
      </div>
      <div
        @click="setOpen(true)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div class="user pa-3 bg-white w-40 h-40 shadow-md rounded-md">
          <img class="" src="@/assets/img/sales.png" alt="" />
        </div>
        <p class="ma-0 pa-0 text-2xl">Chef</p>
      </div>
    </div>

    <ion-modal :is-open="isOpen">
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
        <div class="box_2 bg-white px-4 py-4 flex flex-col gap-9 justify-center items-center">
            <p class="ma-0 pa-0 text-2xl font-bold text-black">Login</p>

            <div class="w-full ">
                <q-input outlined v-model="userid" label="User Id" />
            </div>

            <div class="w-full ">
                <q-input outlined v-model="passcode" type="password" label="Passcode" />
            </div>

            <div class="w-full">
                <q-btn class="w-full" color="black" label="Login" />
            </div>

        </div>
      </div>
    </ion-modal>
  </div>
</template>
<script>
import { useLoungeStore } from '@/store/index';

const store = useLoungeStore();
export default {
  data: () => ({
    vvv: 'hih',
    isOpen: false,
    userid: '',
    passcode: ''
  }),
  components: {},
  computed: {
    accountType() {
      return store.accountType;
    },
  },
  methods: {
    setOpen(isOpen) {
      this.isOpen = isOpen;
    },
  },
  setup() {
    const bar = ref(null);

    // we manually trigger it (this is not needed if we
    // don't skip Ajax calls hijacking)
    function trigger() {
      console.log(bar);
      const barRef = bar.value;
      barRef.start();

      setTimeout(() => {
        const barRef = bar.value;
        if (barRef) {
          barRef.stop();
        }
      }, Math.random() * 3000 + 1000);
    }

    return {
      bar,
      trigger,
    };
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
