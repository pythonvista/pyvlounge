<template>
  <div class="q-pa-md bg-white h-screen">

    <p class="text-black">{{ vvv }}</p>

    <q-ajax-bar
      ref="bar"
      position="top"
      color="accent"
      size="4px"
      skip-hijack
    />

    <q-btn color="primary" label="Trigger" @click="trigger" />
   
    <ion-list>
  <ion-item>
    <ion-select v-model="vvv" aria-label="fruit" placeholder="Select fruit">
      <ion-select-option v-for="(i, index) in accountType" :key="index" :value="i">{{ i.toLocaleUpperCase() }}</ion-select-option>
    </ion-select>
  </ion-item>
</ion-list>
  </div>
 
</template>
<script>
import { useLoungeStore } from '@/store/index';

const store = useLoungeStore()
export default {
    data:()=>({
        vvv: 'hih'
    }),

    computed:{
        accountType(){
            
           return store.accountType
        },
       
    },
  setup () {
    const bar = ref(null)
 
    // we manually trigger it (this is not needed if we
    // don't skip Ajax calls hijacking)
    function trigger () {
        console.log(bar)
      const barRef = bar.value
      barRef.start()

      setTimeout(() => {
        const barRef = bar.value
        if (barRef) {
          barRef.stop()
        }
      }, Math.random() * 3000 + 1000)
    }

    return {
      bar,
      trigger,
          }
  }
}
</script>

<style scoped></style>
