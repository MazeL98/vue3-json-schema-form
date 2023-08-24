import { defineComponent, ref, watch } from 'vue'
import { SelectWidgetPropsDefine } from '../../types'
import { createFormItem } from '../FormItem'
export default createFormItem(
  defineComponent({
    name: 'CheckboxWidget',
    props: SelectWidgetPropsDefine,
    setup(props) {
      const curValRef = ref(props.value || [])

      watch(curValRef, (newV: any, oldV: any) => {
        if (oldV !== newV) {
          props.onChange(newV, undefined)
        }
      })

      // watch(
      //   () => {
      //     props.value
      //   },
      //   (val: any) => {
      //     if (val !== curValRef.value) {
      //       curValRef.value = val
      //     }
      //   }
      // )
      watch(
        () => {
          props.value
        },
        () => {
          if (props.value !== curValRef.value) {
            curValRef.value = props.value as any
          }
        },
        {
          deep: true
        }
      )
      return () => {
        const { options } = props

        return (
          <el-checkbox-group v-model={curValRef.value}>
            {options?.map((opt) => {
              return <el-checkbox label={opt.label} />
            })}
          </el-checkbox-group>
        )
      }
    }
  })
)
