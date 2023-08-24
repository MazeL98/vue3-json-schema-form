import { computed, defineComponent, PropType } from 'vue'

import { Schema, SchemaTypes, SchemaPropsDefine } from './types'

import { retrieveSchema, isHiddenWidget } from './utils'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import IntegerField from './fields/IntegerField'
import BooleanField from './fields/BooleanField'
import { ErrorSchema } from './validator'
import { useVJSFContext } from './context'
import MultiSchemaField from './fields/MultiSchemaField'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  hidden: {
    display: 'none'
  }
})
export default defineComponent({
  name: 'SchemaItem',
  props: SchemaPropsDefine,

  setup(props) {
    // const formContext = useVJSFContext()
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      // 在添加customKeyword 后更新schema
      // return formContext.updateSchemaRef.value(
      //   retrieveSchema(schema, rootSchema, value)
      // )

      return retrieveSchema(schema, rootSchema, value)
    })
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    // 检验是否需要隐藏

    const isHiddenRef = computed(() => {
      return isHiddenWidget(
        props.uiSchema,
        props.rootFormData,
        props.curNodePath as string
      )
    })
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      const isHidden = isHiddenRef.value

      const {
        value,
        errorSchema,
        uiSchema,
        isRequired,
        rootFormData,
        rootSchema
      } = props
      const retrievedSchema = retrievedSchemaRef.value

      const type = retrievedSchema.type
      let Component: any
      let options: any
      if (retrievedSchema.oneOf || retrievedSchema.anyOf) {
        Component = MultiSchemaField
        options = retrievedSchema.oneOf || retrievedSchema.anyOf || undefined
      } else {
        switch (type) {
          case SchemaTypes.STRING:
            Component = StringField
            break
          case SchemaTypes.NUMBER:
            Component = NumberField
            break
          case SchemaTypes.OBJECT:
            Component = ObjectField
            break
          case SchemaTypes.ARRAY:
            Component = ArrayField
            break
          case SchemaTypes.INTEGER:
            Component = IntegerField
            break
          case SchemaTypes.BOOLEAN:
            Component = BooleanField
            break
          default:
            console.warn(`${type} is not supported`)
        }
      }

      return (
        <Component
          class={isHidden ? classes.hidden : ''}
          value={value}
          schema={retrievedSchema}
          options={options}
          onChange={handleChange}
          uiSchema={uiSchema || {}}
          errorSchema={errorSchema || {}}
          isRequired={isRequired}
          rootSchema={rootSchema}
          rootFormData={rootFormData}
        ></Component>
      )
    }
  }
})
