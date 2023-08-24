import { computed, defineComponent } from 'vue'
import { SchemaPropsDefine, WidgetName } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something
    const NumberWidgetRef = computed(() => {
      const widgetRef = getWidget(WidgetName.NumberWidget, props)
      return widgetRef.value
    })
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      const { value, schema, errorSchema, isRequired, uiSchema } = props
      const NumberWidget = NumberWidgetRef.value
      return (
        <NumberWidget
          value={value}
          onChange={handleChange}
          schema={schema}
          errors={errorSchema.__errors || []}
          isRequired={isRequired}
          uiSchema={uiSchema || {}}
        ></NumberWidget>
      )
    }
  }
})
