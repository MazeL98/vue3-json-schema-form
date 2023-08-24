import { defineComponent, PropType, computed, inject, ComputedRef } from 'vue'
import {
  Schema,
  SchemaPropsDefine,
  WidgetName,
  Theme,
  SelectWidgetDefine
} from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'
import { getWidget, THEME_PROVIDER_KEY } from '../theme'
const useStyles = createUseStyles({
  actions: {
    background: '#F9F9F9',
    padding: 5,
    textAlign: 'right'
  },
  action: {
    color: '#ffffff',
    backgroundColor: '#39828f',
    '&:hover': {
      backgroundColor: '#619ba5',
      color: '#ffffff'
    },
    '& + &': {
      marignRight: 10
    }
  },
  content: {
    padding: 10
  }
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()

    // custom  BtnWrapper
    const context: ComputedRef<Theme> | undefined = inject(THEME_PROVIDER_KEY)
    if (!context) {
      throw new Error('vjsf theme is required')
    }
    const BtnComponentRef = computed(() => {
      return context.value.wrapper?.Btn ? context.value.wrapper?.Btn : 'button'
    })
    const sizeRef = computed(() => {
      return context.value.wrapper?.Btn ? 'small' : ''
    })

    return () => {
      const classes = classesRef.value
      const BtnComponent = BtnComponentRef.value
      const size = sizeRef.value
      const handleAdd = () => {
        props.onAdd(props.index)
      }
      const handleDelete = () => {
        props.onDelete(props.index)
      }
      const handleUp = () => {
        props.onUp(props.index)
      }
      const handleDown = () => {
        props.onDown(props.index)
      }
      return (
        <div class="arrayItem">
          <div class={classes.content}>{slots.default && slots.default()}</div>
          <div class={classes.actions}>
            <BtnComponent
              class={['addBtn', classes.action]}
              size={size}
              onClick={handleAdd}
            >
              新增
            </BtnComponent>
            <BtnComponent
              class={['deleteBtn', classes.action]}
              size={size}
              onClick={handleDelete}
            >
              删除
            </BtnComponent>
            <BtnComponent
              class={['downBtn', classes.action]}
              size={size}
              onClick={handleDown}
            >
              下移
            </BtnComponent>
            <BtnComponent
              class={['upBtn', classes.action]}
              size={size}
              onClick={handleUp}
            >
              上移
            </BtnComponent>
          </div>
        </div>
      )
    }
  }
})

export default defineComponent({
  name: 'ArrayField',
  props: SchemaPropsDefine,
  setup(props) {
    // do something
    const context = useVJSFContext()

    const hanldeArrayItemChange = (v: any, index: number | undefined) => {
      const { value } = props
      let valueArr
      if (index) {
        valueArr = Array.isArray(value) ? value : [value]
        valueArr[index] = v
      } else {
        valueArr = Array.isArray(v) ? v : [v]
      }
      props.onChange(valueArr)
    }

    // edit singleTypeArray
    const handleAdd = (index: number) => {
      const { value } = props
      const valueArr = Array.isArray(value) ? value : []
      valueArr.splice(index + 1, 0, undefined)
      props.onChange(valueArr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const valueArr = Array.isArray(value) ? value : []
      valueArr.splice(index, 1)
      props.onChange(valueArr)
    }

    const handleUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const valueArr = Array.isArray(value) ? value : []
      const cur = valueArr.splice(index, 1)
      valueArr.splice(index - 1, 0, cur[0])
      props.onChange(valueArr)
    }

    const handleDown = (index: number) => {
      const { value } = props
      const valueArr = Array.isArray(value) ? value : []
      if (index === valueArr.length - 1) return
      const cur = valueArr.splice(index, 1)
      valueArr.splice(index + 1, 0, cur[0])
      props.onChange(valueArr)
    }

    const SelectWidgetRef = getWidget(WidgetName.SelectWidget, props)
    const RadioWidgetRef = getWidget(WidgetName.RadioWidget, props)
    const CheckboxWidgetRef = getWidget(WidgetName.CheckboxWidget, props)

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props

      const SchemaItem = context.SchemaItem
      const SelectWidget = SelectWidgetRef.value
      const RadioWidget = RadioWidgetRef.value
      const CheckboxWidget = CheckboxWidgetRef.value
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
      const itemArr: Schema[] = schema.items as any
      const valueArr = Array.isArray(value) ? value : []
      // multitype array
      if (isMultiType) {
        return itemArr.map((item: Schema, index: number) => {
          const itemsUISchema = uiSchema?.items
          const itemUISchema = Array.isArray(itemsUISchema)
            ? itemsUISchema[index] || {}
            : itemsUISchema || {}
          return (
            <SchemaItem
              {...props}
              schema={item}
              rootSchema={rootSchema}
              value={valueArr[index]}
              key={index}
              errorSchema={errorSchema[index] || {}}
              onChange={(v: any) => {
                hanldeArrayItemChange(v, index)
              }}
              uiSchema={itemUISchema}
            ></SchemaItem>
          )
        })
        //singletype array without enumerable items
      } else if (!isSelect) {
        const valueArr = Array.isArray(value) ? value : []

        return valueArr.map((v: any, index: number) => (
          <ArrayItemWrapper
            index={index}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              {...props}
              schema={schema.items as Schema}
              rootSchema={rootSchema}
              value={v}
              key={index}
              errorSchema={errorSchema[index] || {}}
              onChange={(v: any) => {
                hanldeArrayItemChange(v, index)
              }}
              uiSchema={uiSchema?.items || {}}
            ></SchemaItem>
          </ArrayItemWrapper>
        ))
        //  singletype array with enumerable items
      } else {
        const enumArr = (schema as any).items.enum
        const selectOpts: Array<{ value: string; label: any }> = enumArr.map(
          (i: any) => ({ value: i, label: i })
        )

        const Component: SelectWidgetDefine =
          valueArr.length > 1
            ? (CheckboxWidget as SelectWidgetDefine)
            : enumArr.length <= 4
            ? (RadioWidget as SelectWidgetDefine)
            : (SelectWidget as SelectWidgetDefine)

        return (
          <div>
            {selectOpts && (
              <Component
                value={valueArr}
                schema={schema}
                onChange={(v: any, index: number | undefined) => {
                  hanldeArrayItemChange(v, index)
                }}
                errors={errorSchema.__errors || []}
                options={selectOpts || []}
                uiSchema={uiSchema}
              ></Component>
            )}
          </div>
        )
      }
    }
  }
})
