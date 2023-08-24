import { inject, Ref } from 'vue'
import { CommonFieldDefine, Theme, CommonWidgetDefine, Schema } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context:
    | {
        theme: Theme
        SchemaItem: CommonFieldDefine
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
        updateSchemaRef: Ref<(s: Schema) => Schema>
      }
    | undefined = inject(SchemaFormContextKey)
  if (!context) {
    throw Error('SchemaForm should be used!')
  }

  return context
}
