import { defineComponent, ref, watch } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { createFormItem } from '../../lib/theme-default/FormItem'
export default createFormItem(
  defineComponent({
    name: 'DatePickerWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const dateRef = ref(props.value)
      watch(dateRef, (newV: any, oldV: any) => {
        if (oldV !== newV) {
          props.onChange(newV)
        }
      })

      watch(
        () => {
          props.value
        },
        () => {
          if (props.value !== dateRef.value) {
            dateRef.value = props.value
          }
        },
        {
          deep: true
        }
      )
      return () => {
        return (
          <el-date-picker
            v-model={dateRef.value}
            placeholder="Select date and time"
          ></el-date-picker>
        )
      }
    }
  })
)
