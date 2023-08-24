import { defineComponent, ref, watch } from 'vue'
import { createFormItem } from '../FormItem'
import { SelectWidgetPropsDefine } from '../../types'
export default createFormItem(
  defineComponent({
    name: 'RadioWidget',
    props: SelectWidgetPropsDefine,
    setup(props) {
      const curValRef = ref((props.value as Array<string>) || [])
      watch(curValRef, (newV: any, oldV: any) => {
        if (oldV !== newV) {
          props.onChange(newV)
        }
      })

      watch(
        () => {
          props.value
        },
        (val: any) => {
          if (val !== curValRef.value) {
            curValRef.value = val
          }
        }
      )

      return () => {
        const { options } = props
        const curVal = curValRef.value

        return (
          <el-radio-group v-model={curVal[0]}>
            {options?.map((radio) => {
              return <el-radio label={radio.label}>{radio.value}</el-radio>
            })}
          </el-radio-group>
        )
      }
    }
  })
)
