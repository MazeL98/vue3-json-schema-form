import { defineComponent, ref, watch, watchEffect } from 'vue'
import { SelectWidgetPropsDefine } from '../../types'
import { createFormItem } from '../FormItem'
export default createFormItem(
  defineComponent({
    name: 'SelectWidget',
    props: SelectWidgetPropsDefine,
    setup(props) {
      /* eslint-disable-next-line */
      let curValRef = ref(props.value as any)
      watch(curValRef, (newV: any, oldV: any) => {
        if (oldV !== newV) {
          props.onChange(newV)
        }
      })

      watch(
        () => {
          props.value
        },
        () => {
          if (props.value !== curValRef.value) {
            curValRef.value = props.value
          }
        },
        {
          deep: true
        }
      )
      return () => {
        const { options } = props

        return (
          <el-select v-model={curValRef.value}>
            {options?.map((opt) => {
              return <el-option label={opt.label} value={opt.value}></el-option>
            })}
          </el-select>
        )
      }
    }
  })
)
