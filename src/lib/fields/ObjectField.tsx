import { defineComponent, PropType, inject } from 'vue'
import { SchemaPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { isObject, computedCurPath } from '../utils'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  schemaTitle: {
    color: '#39828f',
    fontWeight: 600,
    fontSize: 20,
    padding: '7px 0',
    marginBottom: 15
  },
  objTitle: {
    color: '#5f5d5e',
    fontWeight: 600,
    fontSize: 16,
    padding: '7px 0',
    borderBottom: '1px solid #eeeeee',
    marginBottom: 15
  }
})

export default defineComponent({
  name: 'ObjectField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something

    const classesRef = useStyles()
    const context = useVJSFContext()
    const handleObjFieldChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }
      props.onChange(value)
    }

    return () => {
      const classes = classesRef.value

      const { SchemaItem } = context
      const {
        schema,
        rootSchema,
        value,
        errorSchema,
        uiSchema,
        curNodePath,
        rootFormData
      } = props
      const properties = schema.properties || {}

      const required =
        (Array.isArray(schema.required)
          ? schema.required
          : [schema.required]) || []
      const curV: any = isObject(value) ? value : {}

      return (
        <div>
          <div
            class={
              schema === rootSchema ? classes.schemaTitle : classes.objTitle
            }
          >
            {schema.title || '标题'}
          </div>

          {Object.keys(properties).map((k: string, index: number) => {
            return (
              <SchemaItem
                schema={properties[k]}
                rootSchema={rootSchema}
                value={curV[k]}
                key={index}
                onChange={(v: any) => handleObjFieldChange(k, v)}
                errorSchema={errorSchema[k] || { k: null }}
                uiSchema={
                  uiSchema?.properties ? uiSchema.properties[k] || {} : {}
                }
                isRequired={required.findIndex((item) => item === k) !== -1}
                curNodePath={computedCurPath(curNodePath as any, k)}
                rootFormData={rootFormData}
              ></SchemaItem>
            )
          })}
        </div>
      )
    }
  }
})
