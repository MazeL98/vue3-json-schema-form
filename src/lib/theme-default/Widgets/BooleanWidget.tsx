import { defineComponent, ref, watch } from 'vue'
import { CommonWidgetPropsDefine } from '@/lib/types'
import { createFormItem } from '@/lib/theme-default/FormItem'
export default createFormItem(
  defineComponent({
    name: 'BooleanWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      /* eslint-disable-next-line */
      let curValRef = ref((props.value || true) as any)
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
        return <el-switch v-model={curValRef.value} />
      }
    }
  })
)
