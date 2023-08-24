import { defineComponent, ref, watch } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { createFormItem } from '../../lib/theme-default/FormItem'
export default createFormItem(
  defineComponent({
    name: 'ColorPickerWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const colorValueRef = ref(props.value)
      watch(colorValueRef, (newV: any, oldV: any) => {
        if (oldV !== newV) {
          props.onChange(newV)
        }
      })

      watch(
        () => {
          props.value
        },
        () => {
          if (props.value !== colorValueRef.value) {
            colorValueRef.value = props.value
          }
        },
        {
          deep: true
        }
      )
      return () => {
        return <el-color-picker v-model={colorValueRef.value}></el-color-picker>
      }
    }
  })
)
