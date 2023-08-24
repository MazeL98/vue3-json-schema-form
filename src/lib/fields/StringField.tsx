import { computed, defineComponent, mergeProps, PropType } from 'vue'
import { SchemaPropsDefine, WidgetName } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'StringField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(WidgetName.TextWidget, props)
      return widgetRef.value
    })

    return () => {
      const { value, schema, errorSchema, isRequired, uiSchema } = props

      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          value={value}
          onChange={props.onChange}
          schema={schema}
          errors={errorSchema.__errors || []}
          isRequired={isRequired}
          uiSchema={uiSchema || {}}
        ></TextWidget>
      )
    }
  }
})
