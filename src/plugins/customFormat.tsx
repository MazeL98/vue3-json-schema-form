import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CustomFormat } from '../lib/types'
import { createFormItem } from '@/lib/theme-default/FormItem'
const format: CustomFormat[] = [
  {
    name: 'email',
    definition: {
      type: 'string',
      validate: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    component: createFormItem(
      defineComponent({
        name: 'EmailWidget',
        props: CommonWidgetPropsDefine,
        setup(props) {
          function handleChange(v: string) {
            props.onChange(v)
          }

          return () => {
            let value: any
            // eslint-disable-next-line
            value = props.value
            return (
              <el-input type="email" onInput={handleChange} vModel={value} />
            )
          }
        }
      })
    )
  },
  {
    name: 'url',
    definition: {
      type: 'string',
      validate:
        /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
    },
    component: createFormItem(
      defineComponent({
        name: 'UrlWidget',
        props: CommonWidgetPropsDefine,
        setup(props) {
          function handleChange(v: string) {
            props.onChange(v)
          }
          return () => {
            let value: any
            // eslint-disable-next-line
            value = props.value
            return <el-input type="url" onInput={handleChange} vModel={value} />
          }
        }
      })
    )
  }
]

export default format
