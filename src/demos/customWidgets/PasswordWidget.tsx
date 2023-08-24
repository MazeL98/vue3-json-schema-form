import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { createFormItem } from '../../lib/theme-default/FormItem'
export default createFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      // do something
      function handleChange(v: string) {
        props.onChange(v)
      }

      return () => {
        let value: any
        // eslint-disable-next-line
        value = props.value
        return (
          <el-input type="password" onInput={handleChange} vModel={value} />
        )
      }
    }
  })
)
