import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '@/lib/types'
import { createFormItem } from '../FormItem'
export default createFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      // do something
      const handleChange = (v: any) => {
        const num = Number(v)
        v = props.value
        if (Number.isNaN(num)) {
          props.onChange(undefined)
        } else {
          props.onChange(num)
        }
      }

      return () => {
        let value: any
        // eslint-disable-next-line
        value = props.value
        return (
          <div>
            <el-input type="number" onInput={handleChange} v-model={value} />
          </div>
        )
      }
    }
  })
)
