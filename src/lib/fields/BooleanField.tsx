import { computed, defineComponent } from 'vue'
import { SchemaPropsDefine, WidgetName } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'BooleanField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something
    const BooleanWidgetRef = computed(() => {
      const widgetRef = getWidget(WidgetName.BooleanWidget, props)
      return widgetRef.value
    })
    return () => {
      const { value, schema, onChange, errorSchema, isRequired, uiSchema } =
        props
      const BooleanWidget = BooleanWidgetRef.value
      return (
        <BooleanWidget
          value={value}
          onChange={onChange}
          schema={schema}
          errors={errorSchema.__errors || []}
          isRequired={isRequired}
          uiSchema={uiSchema || {}}
        ></BooleanWidget>
      )
    }
  }
})
