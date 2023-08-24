import { computed, defineComponent } from 'vue'
import { SchemaPropsDefine, WidgetName } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'IntegerField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something
    const IntegerWidgetRef = computed(() => {
      const widgetRef = getWidget(WidgetName.IntegerWidget, props)
      return widgetRef.value
    })
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      const { value, schema, errorSchema, isRequired, uiSchema } = props
      const IntegerWidget = IntegerWidgetRef.value
      return (
        <IntegerWidget
          value={value}
          onChange={handleChange}
          schema={schema}
          errors={errorSchema.__errors || []}
          isRequired={isRequired}
          uiSchema={uiSchema || {}}
        ></IntegerWidget>
      )
    }
  }
})
