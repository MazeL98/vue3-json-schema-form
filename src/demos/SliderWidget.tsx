import { defineComponent, ref, watch } from 'vue'
import { CommonWidgetPropsDefine } from '../lib/types'
import { createFormItem } from '../lib/theme-default/FormItem'

export default createFormItem(
  defineComponent({
    name: 'SliderWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      // do something
      const curValRef = ref(props.value || 0)

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
        const min = props.schema.minimum
        const max = props.schema.maximum
        const step = props.schema.multipleOf
        return (
          <el-slider
            min={min || 0}
            max={max || 100}
            v-model={curValRef.value}
            step={step || 1}
          ></el-slider>
        )
      }
    }
  })
)
