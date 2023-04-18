<template>
  <div class="grid grid-cols-5">
    <p class="col-span-5 py-5 text-center text-2xl font-bold text-black">
      All Kitchen Items
    </p>
    <div class="xs:col-span-5 md:col-span-3 m-2 p-4 grid grid-cols-2 gap-3">
      <div
        @click="OpenBasketForm(food)"
        v-for="(food, index) in foodList"
        :key="index"
        class="items pa-5 rounded-sm item-cover shadow hover:shadow-lg cursor-pointer flex flex-col justify-center items-center"
      >
        <p
          class="ma-0 pa-0 text-lg text-center capitalize text-blue-500 font-semibold font-serif"
        >
          {{ food.name }}
        </p>
        <p
          class="ma-0 pa-0 text-xs text-center capitalize text-black font-light font-serif"
        >
          Qty: {{ food.qty }}
        </p>
        <p class="ma-0 pa-o text-black font-mono text-sm">
          ₦{{ food.stockSPrice1 }}
        </p>
      </div>
    </div>

    <q-dialog v-model="orderdialog" persistent max-width="400px">
      <div class="bg-white p-4 flex flex-col justify-center items-center">
        <p class="ma-0 pa-0 text-lg font-bold font-cursive text-center">
          TSG Food and Lounge
        </p>
        <div id="printMe" class="w-full">
          <p>This was prepared by {{ currentInvoice.addedBy.name }}</p>
          <table>
            <tr>
              <td>Item Name</td>
              <td>Item Qty</td>
            </tr>
            <tr v-for="(item, i) in orders" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
            </tr>
          </table>
        </div>

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
            :loading="loadingc"
            class="white--text"
            color="green"
            v-if="currentInvoice.status == 'pending'"
            >Confirm Order</q-btn
          >
          <q-btn
            @click="updatedPending"
            :loading="loadingp"
            class="white--text"
            v-else
            color="blue"
            >Pend Order</q-btn
          >
          <q-btn class="white--text" color="red" @click="CloseBtn">Close</q-btn>
        </div>
      </div>
    </q-dialog>

    <q-dialog v-model="oderform" persistent>
      <div
        class="bg-white p-8 w-72 flex flex-col relative justify-center items-center"
      >
        <q-btn
          class="absolute top-1 right-1"
          round
          color="red"
          size="10px"
          icon="close"
          @click="CloseForm"
        ></q-btn>
        <p class="ma-0 pa-0 pb-4 text-lg font-bold font-cursive text-center">
          Add Information for {{ dform.name }}

          <br />
          <span v-if="dform.qty && dform.denoation && dform.name"
            >{{ dform.qty }} {{ dform.denoation }} of {{ dform.name }}</span
          >
        </p>

        <div class="w-full flex flex-col gap-2">
          <q-input
            dense
            class="w-full"
            square
            filled
            v-model="dform.name"
            label="Item Name"
          />
          <q-input
            dense
            square
            type="number"
            filled
            v-model="dform.qty"
            label="Item Qty"
          />
          <q-input
            dense
            square
            filled
            v-model="dform.denoation"
            label="Quantity Title..Eg cubes of maggi"
          />
          <q-input
            v-model="dform.additionalInfo"
            square
            filled
            type="textarea"
            label="Additional Info"
          />

          <q-btn @click="AddItem" color="black">Submit</q-btn>
        </div>
      </div>
    </q-dialog>

    <q-btn
      color="green"
      text-color="white"
      round
      :icon="invoceblock ? 'cancel' : 'ramen_dining'"
      @click="invoceblock = !invoceblock"
      class="fixed bottom-4 right-4 cart_btn"
      ><q-badge v-if="!invoceblock" color="red" floating>{{
        orders.length
      }}</q-badge></q-btn
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
          <q-tab name="Cooking" label="Cooking History" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="current" class="h-full">
            <div
              color="basil"
              class="current-invoice w-full relative py-2"
              flat
            >
              <p class="ma-0 pa-0 text-lg font-bold text-center">
                Kitchen Basket
              </p>
              <div
                class="invoice_list flex w-full flex-col gap-2 justify-start items-center py-2"
              >
                <div
                  class="h-10 flex w-full px-1 justify-between items-center rounded shadow-sm border-2 border-dashed border-blue-300"
                >
                  <span class="">Item</span>
                  <span class="">Qty</span>
                  <div class="flex gap-5">
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
                  @click="Proceed"
                  :loading="loadingp"
                  color="green"
                  small
                  label="Proceed"
                />
                <q-btn
                  :disable="orders.length < 1"
                  @click="orders = []"
                  color="red"
                  small
                  label="Clear Basket"
                />
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="Cooking">
            <div
              class="w-full px-3 my-3 relative overflow-y-scroll overflow-hidden"
            >
              <div
                @click="ViewOrder(invoice)"
                v-for="(invoice, i) in invoices"
                :key="i"
                class="flex w-full justify-between items-center hover:shadow-lg cursor-pointer p-3 mb-3 shadow-sm rounded-md border-2 border-solid border-blue-400"
              >
                <p class="ma-0 pa-0">Trf {{ invoice.docid }}</p>
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
    name: 'Cooking Section',
    oderform: false,
    dform: {},
    foodList: [],
    maximizedToggle: true,
    orderdialog: false,
    invoceblock: false,
    orders: [],
    loading: false,
    loadingc: false,
    loadingp: false,
    invoices: [],
    currentInvoice: {},
    printObj: {
      id: 'printMe',
      popTitle: 'TSG Food and Lounge',
    },

    tab: 'current',
  }),
  computed: {
    Total() {
      return this.orders.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.qty,
        0
      );
    },
  },
  created() {
    store.SetRouteState(this.name);
    nuxtApp = useNuxtApp();
    crud = nuxtApp.$crud;
    authfunc = nuxtApp.$authfunc;
    this.userData = store.userData;
    this.GetFoods();
  },
  methods: {
    async GetFoods() {
      try {
        const res = await crud.getAllQueryDoc(
          'STOCKS',
          'stocktype',
          'kitchen',
          'asc'
        );
        // const res = [];
        if (res) {
          this.foodList = [];
          this.foodList = res;
        }
        this.GetInvoices();
      } catch (err) {
        ShowSnack(err, 'negative');
      }
    },
    async GetInvoices() {
      try {
        const res = await crud.getAllDoc('KITCHENORDERS');
        this.invoices = res;
      } catch (err) {
        ShowSnack(err, 'negative');
      }
    },

    OpenBasketForm(item) {
      this.oderform = true;
      console.log(item);
      this.dform.name = item.name;
    },
    AddItem() {
      this.orders.push(this.dform);
      ShowSnack('Item Added', 'positive');
      this.dform = {};
      this.oderform = false;
    },
    async Proceed() {
      try {
        this.loadingp = true;
        await crud.addDocWithoutId('KITCHENORDERS', {
          items: this.orders,
          addedBy: { name: this.userData.fullname, userId: this.userData.id },
        });
        this.loadingp = false;
        ShowSnack('Submitted Successfully', 'positive');
        this.orders = [];
      } catch (err) {
        ShowSnack(err.message, 'negative');
      }
    },
    Delete(id) {
      this.orders.splice(id, 1);
    },
    ViewOrder(invoice) {
      this.orderdialog = true;
      this.currentInvoice = invoice;
      this.orders = invoice.items;
    },
    CloseForm() {
      this.oderform = false;
      this.dform = {};
    },
    CloseBtn() {
      this.orderdialog = !this.orderdialog;
      this.currentInvoice = {};
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
