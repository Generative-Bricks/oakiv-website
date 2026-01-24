/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '*/amplify_outputs.json' {
  const value: Record<string, unknown>
  export default value
}
