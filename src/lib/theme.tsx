import {
  PropType,
  computed,
  defineComponent,
  inject,
  provide,
  ComputedRef,
  ref,
  ExtractPropTypes
} from 'vue'
import { Theme, WidgetName, SchemaPropsDefine } from './types'
import { isObject } from './utils'
import { useVJSFContext } from './context'

export const THEME_PROVIDER_KEY = Symbol()
export const ThemeProvider = defineComponent({
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)
    return () => {
      const Component = context.value.wrapper?.Form
        ? context.value.wrapper.Form
        : 'div'
      return <Component>{slots.default && slots.default()}</Component>
    }
  }
})

// TODO: type of argument name
export function getWidget(
  name: WidgetName,
  props: ExtractPropTypes<typeof SchemaPropsDefine>
) {
  // TODO: 如果 widget 的值是一个字符串呢？
  const formContext = useVJSFContext()
  if (props) {
    const { uiSchema, schema, customFormats } = props
    // 自定义组件有更高优先级
    if (uiSchema?.widget && isObject(uiSchema?.widget)) {
      return ref(uiSchema.widget)
    }
    // 自定义 format 字段
    if (schema.format) {
      if (formContext.formatMapRef.value[schema.format]) {
        return ref(formContext.formatMapRef.value[schema.format])
      }
    }
  }
  const context: ComputedRef<Theme> | undefined = inject(THEME_PROVIDER_KEY)
  if (!context) {
    throw new Error('vjsf theme is required')
  }
  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}
