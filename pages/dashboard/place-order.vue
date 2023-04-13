<template>
  <div class="grid grid-cols-5">
    <p class="col-span-5 py-5 text-center text-2xl font-bold text-black">
      All Items
    </p>
    <div
      class="xs:col-span-5 md:col-span-3 m-2 p-4 grid grid-cols-4 gap-3 items-tray"
    >
      <div
        @click="AddItem(food)"
        v-for="(food, index) in foodList"
        :key="index"
        class="items pa-5 rounded-sm item-cover shadow hover:shadow-lg cursor-pointer flex flex-col justify-center items-center"
      >
        <p
          class="ma-0 pa-0 text-lg text-center capitalize text-blue-500 font-semibold font-serif"
        >
          {{ food.name }}
        </p>
        <p class="ma-0 pa-o text-black font-mono text-sm">
          ₦{{ food.stockSPrice1 }}
        </p>
      </div>
    </div>

    <q-dialog v-model="orderdialog" persistent max-width="400px">
      <div class="bg-white pa-4 flex flex-col justify-center items-center">
        <p class="ma-0 pa-0 text-lg font-bold font-cursive text-center">
          KSG Food and Lounge
        </p>
        <div id="printMe" class="w-full">
          <table>
            <tr>
              <td>Item Name</td>
              <td>Item Qty</td>
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
        </div>
        <!-- <div
          class="border-solid w-full mt-3 border-b border-red-400 flex justify-between items-center"
        >
          <span class="ma-0 pa-0 text-blue-300">Total</span>
          <span>₦ {{ Total }}</span>
        </div> -->
        <div
          v-if="!viewmode"
          class="flex w-full mt-2 justify-between gap-3 items-center"
        >
          <q-btn color="blue">Print</q-btn>
          <q-btn color="red" @click="CloseBtn" class="">Close</q-btn>
        </div>
        <div v-else class="flex w-full mt-2 justify-start gap-3 items-center">
          <q-btn class="white--text" color="blue">Print</q-btn>
          <q-btn
            @click="updatedConfirm"
            class="white--text"
            color="green"
            v-if="currentInvoice.status == 'pending'"
            >Confirm Order</q-btn
          >
          <q-btn @click="updatedPending" class="white--text" v-else color="blue"
            >Pend Order</q-btn
          >
          <q-btn class="white--text" color="red" @click="CloseBtn">Close</q-btn>
        </div>
      </div>
    </q-dialog>

    <q-btn
      color="green"
      text-color="white"
      round
      icon="add_shopping_cart"
      @click="invoceblock = !invoceblock"
      class="fixed bottom-2 right-2 cart_btn"
      ><q-badge color="red" floating>{{ orders.length }}</q-badge></q-btn
    >
    <q-dialog
      v-model="invoceblock"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="w-full bg-white">
        <q-tabs v-model="tab" background-color="transparent" color="basil">
          <q-tab name="current" label="Current Invoice" />
          <q-tab name="pending" label="Pending Invoice" />
          <q-tab name="all" label="All Invoice" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="current" class="h-full">
            <div
              color="basil"
              class="current-invoice w-full relative py-2"
              flat
            >
              <p class="ma-0 pa-0 text-lg font-bold text-center">Ksg Invoice</p>
              <div
                class="invoice_list flex w-full flex-col gap-2 justify-start items-center py-2"
              >
                <div
                  class="h-10 flex w-full px-1 justify-between items-center rounded shadow-sm border-2 border-dashed border-blue-300"
                >
                  <span class="">Item</span>
                  <span class="">Qty</span>
                  <div class="flex gap-5">
                    <span>Price</span>
                    <span>Actions</span>
                  </div>
                </div>
                <div
                  v-for="(item, i) in orders"
                  :key="i"
                  class="p-3 flex w-full items-center rounded shadow-sm bg-slate-100"
                >
                  <div class="flex w-full px-1 justify-between items-center">
                    <span class="text-sm">{{ item.name }}</span>
                    <div class="gap-2 flex justify-center items-center">
                      <q-btn
                        size="10px"
                        :disable="item.qty == 1"
                        @click="item.qty -= 1"
                        round
                        icon="remove"
                      />
                      {{ item.qty }}
                      <q-btn
                        size="10px"
                        @click="item.qty += 1"
                        round
                        icon="add"
                      />
                    </div>
                    <div class="flex justify-end px-1 items-center gap-5">
                      <span>₦{{ item.price }}</span>
                      <q-btn
                        size="10px"
                        @click="Delete(i)"
                        color="red"
                        rounde
                        icon="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-solid border-b border-red-400 flex justify-between items-center"
              >
                <span class="ma-0 pa-0 text-blue-300">Total</span>
                <span>₦ {{ Total }}</span>
              </div>
              <div
                class="absolute bottom-0 left-0 w-full flex justify-center gap-3 items-center"
              >
                <q-btn
                  :disable="orders.length == 0"
                  @click="PlaceOrder"
                  color="green"
                  small
                  label="Place Order"
                />
                <q-btn
                  :disable="orders.length == 0"
                  @click="PendOrder"
                  color="blue"
                  small
                  label="Pend Order"
                />
                <q-btn
                  :disable="orders.length < 1"
                  @click="orders = []"
                  color="red"
                  small
                  label="Clear Order"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="pending">
            <div
              class="current-invoice w-full px-3 my-3 relative overflow-y-scroll overflow-hidden"
            >
              <div
                @click="ViewOrder(invoice)"
                v-for="(invoice, i) in invoices.filter(
                  (v) => v.status == 'pending'
                )"
                :key="i"
                class="flex w-full justify-between items-center hover:shadow-lg cursor-pointers pa-3 mb-3 shadow-sm rounded-md border-2 border-solid border-blue-400"
              >
                <p class="ma-0 pa-0">
                  {{ invoice.ref }}
                  <span
                    :class="{
                      colorgreen: invoice.status == 'confirmed',
                      colorred: invoice.status == 'pending',
                    }"
                    class="px-2 py-1 rounded-sm"
                    >{{ invoice.status }}</span
                  >
                </p>
                <p class="ma-0 pa-0">{{ invoice.createdat }}</p>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="all">
            <div
              class="current-invoice w-full px-3 my-3 relative overflow-y-scroll overflow-hidden"
            >
              <div
                @click="ViewOrder(invoice)"
                v-for="(invoice, i) in invoices"
                :key="i"
                class="flex w-full justify-between items-center hover:shadow-lg cursor-pointer pa-3 mb-3 shadow-sm rounded-md border-2 border-solid border-blue-400"
              >
                <p class="ma-0 pa-0">
                  {{ invoice.ref }}
                  <span
                    :class="{
                      colorgreen: invoice.status == 'confirmed',
                      colorred: invoice.status == 'pending',
                    }"
                    class="px-2 py-1 rounded-sm"
                    >{{ invoice.status }}</span
                  >
                </p>
                <p class="ma-0 pa-0">{{ invoice.createdat }}</p>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
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
    viewmode: false,
    foodList: [],
    maximizedToggle: true,
    orderdialog: false,
    invoceblock: false,
    orders: [],
    invoices: [],
    currentInvoice: {},
    printObj: {
      id: 'printMe',
      popTitle: 'KSG Food and Lounge',
    },

    tab: 'current',
  }),
  computed: {
    Total() {
      console.log(this.orders);
      return this.orders.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.qty,
        0
      );
    },
  },
  created() {
    nuxtApp = useNuxtApp();
    crud = nuxtApp.$crud;

    authfunc = nuxtApp.$authfunc;
    this.userData = store.userData;

    setTimeout(() => {
      this.GetFoods();
    }, 5000);
  },
  methods: {
    async GetFoods() {
      try {
        const res = await crud.getAllQueryDoc('STOCKS', 'stocktype', 'lounge');
        // const res = [];
        if (res) {
          this.foodList = [];
          this.foodList = res;
        }
      } catch (err) {
        console.log(err);
        ShowSnack(err, 'negative');
      }
    },
    async GetInvoices() {
      try {
        const res = await apiClient.get('/invoices');
        if (res.data.success) {
          this.invoices = [];
          this.invoices = res.data.response;
        }
        if (res.data.err) {
          throw res.data.err.sqlMessage;
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async PendOrder() {
      let ref = 'KSG' + Math.floor(Math.random() * 129483 + 292929);
      this.orders.ref = ref;
      try {
        const res = await apiClient.post('/invoices', {
          ref: ref,
          status: 'pending',
        });
        console.log(res.data);
        if (res.data.success) {
          this.orders.forEach(async (v) => {
            let data = {
              refid: ref,
              status: 'pending',
              name: v.name,
              price: v.price,
              qty: v.qty,
            };
            const res2 = await apiClient.post('/items', data);
            console.log(res2);
          });

          alert('Invoice Added to pending');
          this.GetInvoices();
          this.orders = [];
        }
        if (res.data.err) {
          throw res.data.err.sqlMessage;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async PlaceOrder() {
      let ref = 'KSG' + Math.floor(Math.random() * 129483 + 292929);
      this.orders.ref = ref;
      try {
        const res = await apiClient.post('/invoices', {
          ref: ref,
          status: 'confirmed',
        });
        console.log(res.data);
        if (res.data.success) {
          this.orders.forEach(async (v) => {
            let data = {
              refid: ref,
              status: 'confirmed',
              name: v.name,
              price: v.price,
              qty: v.qty,
            };
            const res2 = await apiClient.post('/items', data);
            console.log(res2);
          });

          alert('Invoice Added');
          this.GetInvoices();
          this.orderdialog = true;
        }
        if (res.data.err) {
          throw res.data.err.sqlMessage;
        }
      } catch (err) {
        console.log(err);
      }
    },
    AddItem(food) {
      let order = {
        qty: 1,
        name: food.name,
        price: parseInt(food.stockSPrice1),
      };

      if (this.orders.length == 0) {
        ShowSnack('Double tap to add more...', 'positive');
        this.orders.push(order);
        return;
      }
      this.orders.forEach((item, index) => {
        if (food.name == item.name) {
          this.orders[index].qty += 1;
          ShowSnack(
            `Added +${this.orders[index].qty} ${item.name}`,
            'positive'
          );
          return;
        }
      });

      let temp = this.orders.filter((item) => item.name == food.name);
      if (temp.length == 0) {
        this.orders.push(order);
        console.log(this.orders);
        return;
      }
    },
    async updatedConfirm() {
      try {
        this.currentInvoice.status = 'confirmed';
        const res = await apiClient.put('/invoices', this.currentInvoice);
        if (res.data.success) {
          alert('Order Confirmed');
          this.GetInvoices();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updatedPending() {
      try {
        this.currentInvoice.status = 'pending';
        const res = await apiClient.put('/invoices', this.currentInvoice);
        if (res.data.success) {
          alert('Order Confirmed');
          this.GetInvoices();
        }
      } catch (err) {
        console.log(err);
      }
    },
    Delete(id) {
      console.log(id);
      this.orders.splice(id, 1);
    },
    async ViewOrder(invoice) {
      this.viewmode = true;
      this.currentInvoice = invoice;
      try {
        const res = await apiClient.get(`/items?refid=${invoice.ref}`);
        if (res.data.success) {
          this.orders = res.data.response;
          this.orderdialog = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    CloseBtn() {
      this.orderdialog = !this.orderdialog;
      this.currentInvoice = {};
      this.orders = [];
    },
  },
  setup() {
    definePageMeta({
      layout: 'dashboard',
    });
  },
};
</script>

<style scoped>
.items-tray {
  min-height: 80vh;
}

.items {
  transition-delay: 0.5s;
  transition: 0.6s;
  border: 1px solid blue;
}
.invoice {
  min-height: 80vh;
}
.current-invoice {
  height: 87vh;
}
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
.invoice_list {
  max-height: 90%;
  overflow: hidden;
  overflow-y: scroll;
}
.invoices_list {
  max-height: 90%;
  overflow: hidden;
  overflow-y: scroll;
}
.invoice_list::-webkit-scrollbar {
  background: whitesmoke;
  width: 6px;
}

.invoice_list::-webkit-scrollbar-thumb {
  background: grey;
}

.item_name {
  width: 50% !important;
}
.item_qty {
  width: 40% !important;
}

.item-cover {
  height: 100px;
  width: 150px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.cart_btn {
  z-index: 1111111111111111;
}
</style>
