import {
  defineComponent,
  PropType,
  ref,
  computed,
  Ref,
  ComputedRef,
  watchEffect
} from 'vue'
import { MultiSchemaPropsDefine, WidgetName } from '../types'
import { getMatchingOption } from '../utils'
import { getWidget } from '../theme'
import { useVJSFContext } from '../context'
export default defineComponent({
  name: 'MultiSchemaField',
  props: MultiSchemaPropsDefine,
  setup(props) {
    // TODO: 不确定要不要封装函数 getMatchingOpt
    // 传入oneOf 数组作为 options，根据 value 去 match 结构相同的 option，得到索引号变量 selectedOption
    const options = props.options || []
    const selectedOptRef = ref(0)
    watchEffect(() => {
      const option = getMatchingOption(props.value, options)
      if (option !== 0) {
        selectedOptRef.value = option
      } else {
        selectedOptRef.value = selectedOptRef.value ? selectedOptRef.value : 0
      }
    })

    // TODO: 根据 selectedOptRef.value 这个索引号获取真正的 option, 检查这个schema中是否有 type，若没有，初始化一个type属性
    const selectedSchemaRef = computed(() => {
      const option = options[selectedOptRef.value] || null
      if (option) {
        return option.type
          ? option
          : Object.assign({}, option, { type: 'object' })
      }
      return {}
    })

    // 获取 uiSchema 中的options，看是否有自定义 widget，如果没有就使用默认的 selectWidget
    const MultiSchemaRef = computed(() => {
      const widgetRef = getWidget(WidgetName.SelectWidget, props)
      return widgetRef.value
    })

    // TODO: enumOptions变量，整理 selectWidget 所需要的数据
    const enumOptions = options.map((opt, index) => ({
      label: opt.title || `Option ${index + 1}`,
      value: index
    }))

    const context = useVJSFContext()
    const onSelectChange = (v: any) => {
      selectedOptRef.value = v
    }
    return () => {
      const { value, schema, errorSchema, isRequired, rootSchema, uiSchema } =
        props

      const { SchemaItem } = context
      const selectedOption = selectedOptRef.value

      const selectedSchema = selectedSchemaRef.value
      const MultiSchemaWidget = MultiSchemaRef.value
      return (
        <div>
          <MultiSchemaWidget
            value={selectedOption}
            onChange={onSelectChange}
            schema={schema}
            errors={errorSchema.__errors || []}
            isRequired={isRequired}
            options={enumOptions}
            uiSchema={uiSchema || {}}
          ></MultiSchemaWidget>
          {selectedOption !== null && (
            <SchemaItem
              {...props}
              schema={selectedSchema}
              rootSchema={rootSchema}
              value={value}
            ></SchemaItem>
          )}
        </div>
      )
    }
  }
})
