import {
  defineComponent,
  PropType,
  provide,
  Ref,
  ref,
  shallowRef,
  watch,
  watchEffect,
  computed
} from 'vue'
import {
  Schema,
  UISchema,
  ContextRef,
  CustomFormat,
  CommonWidgetDefine,
  CustomKeyword
} from './types'
import { SchemaFormContextKey } from './context'
import SchemaItem from './SchemaItem'
import Ajv from 'ajv/dist/2020'
import { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'
import i18n from 'ajv-i18n'
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(...v: any[]) => void>,
      required: true
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>
    },
    ajvOpts: {
      type: Object as PropType<Options>
    },
    locale: {
      type: String,
      default: 'zh'
    },
    customValidate: {
      type: Function as PropType<((data: any, errors: any) => void) | undefined>
    },
    uiSchema: {
      type: Object as PropType<UISchema>
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>
    },
    customKeyword: {
      type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>
    },
    rootFormData: {
      default: {}
    },
    curNodePath: {
      default: ''
    }
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    //customFormatMap: name-component
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      } else {
        return {}
      }
    })

    // customKeyword method
    // const updateSchemaRef = computed(() => {
    //   if (props.customKeyword) {
    //     const customKeywords = Array.isArray(props.customKeyword)
    //       ? props.customKeyword
    //       : [props.customKeyword]
    //     return (schema: Schema) => {
    //       let newSchema = schema
    //       customKeywords.forEach((keyword) => {
    //         if ((newSchema as any)[keyword.keyword as string]) {
    //           newSchema = keyword.updateSchema(schema)
    //         }
    //       })
    //       return newSchema
    //     }
    //   } else {
    //     return (s: Schema) => s
    //   }
    // })

    const context: any = {
      SchemaItem,
      formatMapRef
      // updateSchemaRef
    }
    provide(SchemaFormContextKey, context)

    // ajv validator instance
    const defaultAjvOpts = { allErrors: true }
    const validatorRef: Ref<Ajv> = shallowRef() as any
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOpts,
        ...props.ajvOpts
      })

      // add custom format on ajv instance
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]

        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }
      // add custom keyword on ajv instance
      if (props.customKeyword) {
        const customKeywords = Array.isArray(props.customKeyword)
          ? props.customKeyword
          : [props.customKeyword]
        customKeywords.forEach((keyword) => {
          validatorRef.value.addKeyword(keyword)
        })
      }
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    async function newValidate() {
      console.log('<--------- start validate -------->')
      const index = (validateIndex.value += 1)
      const res = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale as keyof typeof i18n,
        props.customValidate
      )
      if (index !== validateIndex.value) return
      console.log('<--------- end validate -------->')

      errorSchemaRef.value = res.errorSchema

      validateResolveRef.value(res)
      validateResolveRef.value = undefined
    }

    watch(
      () => {
        props.contextRef
      },
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                newValidate()
              })
            }
          }
        }
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          newValidate()
        }
      },
      { deep: true }
    )

    return () => {
      const { schema, value, uiSchema, rootFormData, curNodePath } = props
      const errorSchema = errorSchemaRef.value

      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchema}
          uiSchema={uiSchema || {}}
          rootFormData={rootFormData}
          curNodePath={curNodePath}
        />
      )
    }
  }
})
