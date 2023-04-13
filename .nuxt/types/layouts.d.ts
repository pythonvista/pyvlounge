import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "dashboard"
declare module "C:/Users/James/Desktop/pyvlounge/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}