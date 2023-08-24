import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '@/lib/types'
import { createFormItem } from '../FormItem'
export default createFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      // do something
      const handleChange = (v: any) => {
        props.onChange(v)
      }

      return () => {
        let value: any
        // eslint-disable-next-line
        value = props.value
        return (
          <div>
            <el-input type="text" onInput={handleChange} v-model={value} />
          </div>
        )
      }
    }
  })
)
