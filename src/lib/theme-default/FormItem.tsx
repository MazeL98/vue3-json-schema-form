import { defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'
import { CommonWidgetPropsDefine } from '../types'
const useStyles = createUseStyles({
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '2px 0  5px'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '0 0 15px 0'
  },
  content: {
    padding: '5px 0'
  }
})
export function createFormItem(Widget: any) {
  const FormItem = defineComponent({
    name: 'FormItem',
    props: CommonWidgetPropsDefine,
    setup(props, { slots }) {
      const classesRef = useStyles()
      return () => {
        const { schema, errors, isRequired } = props

        const classes = classesRef.value
        return (
          <div>
            <el-form-item label={schema.title} required={isRequired}>
              <div class={classes.content}>
                {slots.default && slots.default()}
              </div>
            </el-form-item>
            <ul class={classes.list}>
              {errors?.map((err: any) => (
                <li class={classes.errorText}>{err}</li>
              ))}
            </ul>
          </div>
        )
      }
    }
  })
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs}></Widget>
          </FormItem>
        )
      }
    }
  }) as any
}
