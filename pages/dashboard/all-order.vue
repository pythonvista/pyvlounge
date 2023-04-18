<template>
  <div>
    <div class="w-full px-3 my-3 relative overflow-y-scroll overflow-hidden">
      <div
        @click="ViewOrder(invoice)"
        v-for="(invoice, i) in invoices"
        :key="i"
        class="flex w-full justify-between items-center hover:shadow-lg cursor-pointer p-3 mb-3 shadow-sm rounded-md border-2 border-solid border-blue-400"
      >
        <p class="ma-0 pa-0">
          {{ invoice.ref }}
        </p>
        <span
          :class="{
            colorgreen: invoice.status == 'confirmed',
            colorred: invoice.status == 'pending',
          }"
          class="px-2 py-1 rounded-sm"
          >{{ invoice.status }}</span
        >
        <span class="px-2 py-1 rounded-sm">₦{{ invoice.total }}</span>
      </div>
    </div>
    <q-dialog v-model="orderdialog" full-width>
      <div class="bg-white p-7 flex flex-col justify-center items-center">
        <p class="ma-0 pa-0 py-4 text-lg font-bold font-cursive text-center">
          TSG Food and Lounge
        </p>
        <div class="w-full">
          <table class="w-full">
            <tr>
              <td>Name</td>
              <td>Qty</td>
              <td>Price</td>
            </tr>
            <tr v-for="(item, i) in orders" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
              <td>₦{{ item.price }}</td>
            </tr>
            <tr>
              <td class="text-red-600 bold">Total</td>
              <td></td>
              <td class="text-black font-bold">₦{{ Total }}</td>
            </tr>
          </table>
          <q-btn class="mt-4" color="red" @click="orderdialog = false"
            >Cancel</q-btn
          >
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { useLoungeStore } from '~/store';

let nuxtApp;
let crud;
const store = useLoungeStore();
export default {
  data: () => ({
    name: 'All Orders',
    invoices: [],
    orderdialog: false,
    orders: [],
    currentTotal: 0,
  }),
  computed: {
    Total() {
      return this.orders.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.qty,
        0
      );
    },
    UserData() {
      return store.userData;
    },
  },
  created() {
    store.SetRouteState(this.name);
    nuxtApp = useNuxtApp();
    crud = nuxtApp.$crud;
    this.GetInvoices();
  },
  setup() {
    definePageMeta({
      layout: 'dashboard',
    });
  },
  methods: {
    async GetInvoices() {
      try {
        const res = await crud.getAllDoc('INVOICES');
        this.invoices = res;
      } catch (err) {
        ShowSnack(err, 'negative');
      }
    },
    ViewOrder(i) {
      console.log(i);
      this.orders = i.orders;
      this.orderdialog = true;
    },
  },
};
</script>

<style scoped>
.colorgreen {
  background: green !important;
  color: white;
  font-size: 10px !important;
}
.colorred {
  background: red !important;
  color: white;
  font-size: 10px !important;
}
</style>
