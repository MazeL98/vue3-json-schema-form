import { defineComponent, Prop, PropType } from 'vue'
import { DefineComponent } from 'vue'
import { ErrorSchema } from './validator'
import {
  FormatDefinition,
  KeywordDefinition,
  CodeKeywordDefinition,
  MacroKeywordDefinition
} from 'ajv'
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string
  title?: string
  default?: any
  properties?: {
    [key: string]: Schema
  }
  definitions?: { [key: string]: Schema }
  $ref?: string
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  dependentRequired?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const SchemaPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>
  },
  onChange: {
    type: Function as PropType<(...v: any[]) => void>,
    required: true
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true
  },
  uiSchema: {
    type: Object as PropType<UISchema>
  },
  customFormats: {
    type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>
  },
  isRequired: {
    type: Boolean as PropType<boolean>
  },
  rootFormData: {
    default: {}
  },
  curNodePath: {}
} as const

export const MultiSchemaPropsDefine = {
  ...SchemaPropsDefine,
  options: {
    type: Array as PropType<Schema[]>,
    required: true
  }
} as const

// 手动声明 SchemaItem 组件的类型

export type CommonFieldDefine = DefineComponent<typeof SchemaPropsDefine>

// Theme 相关类型和接口

// 通用 widget propsType
export const CommonWidgetPropsDefine = {
  value: {
    required: true
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  onChange: {
    type: Function as PropType<(...v: any[]) => void>,
    required: true
  },
  errors: {
    type: Array as PropType<string[]>
  },
  isRequired: {
    type: Boolean as PropType<boolean>
  },
  uiSchema: {
    type: Object as PropType<UISchema>
  }
} as const
const CommonHelperComponent = defineComponent({
  props: CommonWidgetPropsDefine
})
export type CommonWidgetDefine = typeof CommonHelperComponent

// 特殊 widget propsType 和 widget component type
export const SelectWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ value: string; label: any }[]>,
    required: true
  }
} as const

const SelectHelperComponent = defineComponent({
  props: SelectWidgetPropsDefine
})

export type SelectWidgetDefine = typeof SelectHelperComponent

// widgetName
export enum WidgetName {
  SelectWidget = 'SelectWidget',
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
  RadioWidget = 'RadioWidget',
  CheckboxWidget = 'CheckboxWidget',
  IntegerWidget = 'IntegerWidget',
  BooleanWidget = 'BooleanWidget'
}

export interface Theme {
  widgets: {
    SelectWidget: SelectWidgetDefine
    TextWidget: CommonWidgetDefine
    NumberWidget: CommonWidgetDefine
    RadioWidget: SelectWidgetDefine
    CheckboxWidget: SelectWidgetDefine
    IntegerWidget: CommonWidgetDefine
    BooleanWidget: CommonWidgetDefine
  }
  wrapper?: {
    [key: string]: ReturnType<typeof defineComponent>
  }
}

// Validator 相关
export interface ContextRef {
  doValidate: () => Promise<{
    valid: boolean
    errors: any[]
  }>
}

// custom Widget
export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any
}

// customFormat
export interface CustomFormat {
  name: string
  definition: FormatDefinition<string | number>
  component: CommonWidgetDefine
}

// customKeyword
// interface MacroKeyword {
//   name: string
//   definition: KeywordDefinition
//   updateSchema: (originSchema: Schema) => Schema
// }
export type CustomKeyword = CodeKeywordDefinition | MacroKeywordDefinition
