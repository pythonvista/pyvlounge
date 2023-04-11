<template>
  <div class="wrap h-screen overflow-hidden bg-white">
    <div class="grid px-5 gap-5 grid-cols-2 mt-6 place-items-center">
      <div class="w-full relative mb-4 col-span-2">
        <q-btn
          class="absolute top-0 text-white left-0"
          size="10px"
          :to="{ path: '/dashboard' }"
          color="transparent"
          round
          text-color="black"
          icon="arrow_left"
        />
        <p
          class="pa-0 ma-0 text-2xl capitalize text-black font-bold text-center"
        >
          Stocks
          <br />
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
      <div class="w-full flex justify-center items-center col-span-2">
        <q-btn color="black" @click="OpenRegister" label="Add Stocks" />
      </div>
      <div
        v-if="stocks <= 0"
        class="absolute flex flex-col justify-center items-center gap-2 no-stock"
      >
        <img src="@/assets/img/noitem.png" alt="" />

        <p class="text-red-400 font-bold">No Stock... Add Stock</p>
      </div>
      <div
        @click="ViewStock(stock)"
        v-for="(stock, i) in stocks"
        :key="i"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div
          class="user pa-3 flex justify-center flex-col items-center bg-slate-100 w-32 h-32 shadow-lg rounded-md"
        >
          <p class="font-bold text-sm text-black">
            {{ stock.name.toUpperCase() }}
          </p>
          <p class="text-sm">
            {{ stock.qty }} :<span
              :class="{
                'text-red': stock.qty < 10,
                'text-green': stock.qty > 0,
              }"
              >{{ stock.qty > 0 ? 'in-stock' : 'out-of-stock' }}</span
            >
          </p>
          <p class="">₦ {{ stock.stockSPrice1 }} / 1</p>
        </div>
        <!-- <p class="ma-0 pa-0 text-black text-xl">{{ s }}</p> -->
      </div>
    </div>
    <q-dialog
      v-model="isOpen"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div v-if="view" class="h-screen overflow-hidde bg-white">
        <div class="py-3 px-2 box_3">
          <q-btn
            size="15px"
            @click="isOpen = !isOpen"
            round
            color="black"
            icon="arrow_back"
          />
        </div>

        <div
          class="border-2 flex items-start gap-3 justify-start flex-col border-solid shadow-md border-blue-400 rounded-sm p-3 m-2"
        >
          <p class="m-0 p-0 text-xl font-bold text-center my-5 w-full">
            Stock Information
          </p>

          <p class="m-0 p-0 text-xl font-bold text-center my-5 w-full">
            {{ stock.name.toUpperCase() }}
            <span class="bg-green px-3 ml-2 text-xs text-white rounded">{{
              stock.stocktype
            }}</span>
          </p>

          <p class="text-lg text-black">
            Stock Name:
            <span class="text-green font-normal text-md">{{
              stock.name.toUpperCase()
            }}</span>
          </p>
          <p class="text-lg text-black">
            Stock Quantity:
            <span
              class="text-green font-normal text-md"
              :class="{
                'text-red': stock.qty < 0,
                'text-green': stock.qty > 0,
              }"
              >{{ stock.qty }}</span
            >
          </p>
          <p class="text-lg text-black">
            Stock Cost Price:
            <span class="text-green font-normal text-md"
              >₦{{ stock.stockCPrice1 }}</span
            >
          </p>
          <p class="text-lg text-black">
            Stock Selling Price:
            <span class="text-green font-normal text-md"
              >₦{{ stock.stockSPrice1 * stock.qty }}</span
            >
          </p>
          <p class="text-lg text-black">
            Stock Price per 1:
            <span class="text-green font-normal text-md"
              >₦{{ stock.stockSPrice1 }}</span
            >
          </p>
        </div>

        <div
          class="border-2 flex items-start gap-3 justify-start flex-col border-solid shadow-md border-blue-400 rounded-sm p-3 m-2"
        >
          <p class="m-0 p-0 text-xl font-bold text-center my-5 w-full">
            Actions
          </p>

          <div class="flex flex-wrap justify-center items-center gap-3">
            <q-btn
              size="15px"
              label="Edit"
              color="blue"
              icon="edit"
              @click="EditStock"
            />

            <q-btn
              size="15px"
              label="Delete"
              :loading="loading"
              color="red"
              icon="delete"
              @click="ShowPrompt(`Stock Item ${stock.name}`, DeleteStock)"
            />
            <q-btn size="15px" label="Stock Up" color="green" icon="add" />
          </div>
        </div>
        <div
          class="border-2 flex items-start gap-3 justify-start flex-col border-solid shadow-md border-blue-400 rounded-sm p-3 m-2"
        >
          <p class="m-0 p-0 text-xl font-bold text-center my-5 w-full">
            Stock History
          </p>

          <div class="grid w-full grid-cols-1 gap-2">

            <div
              v-for="(st, i) in currStockHistory"
              :key="i"
              class="w-full p-3 border-b-2 border-solid text-black border-gray-700"
            >
              hi {{ { ...st } }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-screen overflow-hidde bg-white">
        <div class="py-3 px-2 box_3">
          <q-btn
            size="15px"
            @click="isOpen = !isOpen"
            round
            color="black"
            icon="arrow_back"
          />
        </div>
        <div
          class="box_4 grid grid-cols-1 gap-4 bg-white overflow-y-scroll overflow-hidden px-4 py-4"
        >
          <p class="ma-0 pa-0 text-2xl text-center font-bold text-black">
            {{ viewstock ? 'Edit' : 'Add' }} Stocks
          </p>

          <div class="w-full">
            <q-input outlined v-model="dform.name" label="Stock Name" />
          </div>
          <div class="w-full">
            <q-select
              outlined
              v-model="dform.stocktype"
              :options="stockType"
              label="Stock Type"
            />
          </div>
          <div v-if="!viewstock" class="w-full">
            <q-input
              type="number"
              outlined
              v-model="dform.qty"
              label="Stock Quantity"
            />
          </div>

          <div class="w-full">
            <q-input
              outlined
              v-model="dform.stockSPrice1"
              type="number"
              label="Stock Selling Price Per 1"
            />
          </div>

          <div class="w-full">
            <q-input
              outlined
              v-model="dform.stockCPrice1"
              type="number"
              label="Stock Cost Price Per 1"
            />
          </div>

          <div class="w-full">
            <q-input
              outlined
              v-model="dform.totalStockPrice"
              type="number"
              label="Total Cost Price"
            />
          </div>

          <div class="w-full">
            <q-btn
              v-if="!viewstock"
              :disable="!valid"
              :loading="loading"
              class="w-full"
              color="black"
              @click="AddStock"
            >
              Add Stock
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Creating...
              </template>
            </q-btn>
            <q-btn
              v-else
              :disable="!valid2"
              :loading="loading"
              class="w-full"
              color="green"
              @click="UpdateStock"
            >
              Update Stock
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Updating...
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

let nuxtApp;
let authfunc;
let crud;
const store = useLoungeStore();
export default {
  data: () => ({
    userData: {},
    isOpen: false,
    dialog: false,
    view: false,
    viewstock: false,
    maximizedToggle: true,
    loading: false,
    stockid: '',
    stocks: [],
    stock: {},
    currStockHistory:[],
    dform: {
      name: '',
      stocktype: '',
      qty: '',
      stockSPrice1: '',
      stockCPrice1: '',
      totalStockPrice: '',
    },
  }),
  methods: {
    async GetStocks() {
      this.stocks = [];
      try {
        const doc = await crud.getAllDoc('STOCKS');
        this.stocks = doc;
        console.log(this.stocks);
      } catch (err) {
        console.log(err);
        ShowSnack(err.msg, 'negative');
      }
    },
    ViewStock(stock) {
      this.stock = stock;
      this.view = true;
      this.isOpen = true;
      this.stockid = stock.docid;
      this.StockHistory(stock.docid)
    },
    OpenRegister() {
      this.view = false;
      this.viewstock = false;
      this.isOpen = true;
      this.stockid = '';
    },
    async SignOut() {
      await authfunc.signout();
    },
    async AddStock() {
      let ref = ` TTS${Math.floor(Math.random() * 12309999004)}`;
      try {
        this.loading = true;
        await crud.addDocWithId('STOCKS', ref, {
          ...this.dform,
          addedBy: { name: this.userData.fullname, userId: this.userData.id },
        });
        await crud.addDocWithoutId('STOCKSTOPUP', {
          name: this.dform.name,
          prevQty: 0,
          qty: this.dform.qty,
          newQty: this.dform.qty + 0,
          stockid: ref,
          addedBy: { name: this.userData.fullname, userId: this.userData.id },
        });

        ShowSnack('Stock Added Succesfully', 'positive');
        await this.GetStocks();
        this.dform = {};
        this.loading = false;
        this.isOpen = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
        ShowSnack(err.msg, 'negative');
      }
    },

    async EditStock() {
      this.view = false;
      this.viewstock = true;
      this.dform = this.stock;
    },

    async UpdateStock() {
      try {
        this.loading = true;
        await crud.updateDocument('STOCKS', this.stock.docid, this.dform);
        ShowSnack('Stock Updated Successfully', 'positive');
        this.loading = false;
        this.view = true;
        this.viewstock = false;
        this.dform = {};
      } catch (err) {
        this.loading = false;
        ShowSnack(err.message, 'negative');
      }
    },

    async DeleteStock() {
      try {
        this.loading = true;
        await crud.removeDoc('STOCKS', this.stock.docid);
        ShowSnack('Stock Deleted Successfully', 'positive');
        this.loading = false;
        this.view = true;
        this.isOpen = false;
        this.viewstock = false;
        this.GetStocks();
      } catch (err) {
        this.loading = false;
        ShowSnack(err.message, 'negative');
      }
    },

    async StockHistory(id) {
      this.currStockHistory = []
      try {
        console.log(id);
        let data = [];
        const docs = await crud.getAllQueryDoc('STOCKSTOPUP','stockid',id,'asc'
        );
        data = [...docs];
        this.currStockHistory = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {},
  computed: {
    valid() {
      if (
        this.dform.name &&
        this.dform.stocktype &&
        this.dform.qty &&
        this.dform.stockSPrice1 &&
        this.dform.stockCPrice1 &&
        this.dform.totalStockPrice
      ) {
        return true;
      }

      return false;
    },

    valid2() {
      if (
        this.dform.name &&
        this.dform.stocktype &&
        this.dform.stockSPrice1 &&
        this.dform.stockCPrice1 &&
        this.dform.totalStockPrice
      ) {
        return true;
      }

      return false;
    },

    stockType() {
      return ['kitchen', 'lounge'];
    },

    CurrUser() {
      return store.activeUser;
    },
  },
  created() {
    nuxtApp = useNuxtApp();
    crud = nuxtApp.$crud;
    authfunc = nuxtApp.$authfunc;
    this.userData = store.userData;
    this.GetStocks();
  },
  setup() {
    definePageMeta({
      layout: 'dashboard',
    });
  },
};
</script>

<style scoped>
.no-stock {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
