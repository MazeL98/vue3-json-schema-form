export default {
  name: 'Hidden(表单联动)',
  schema: {
    description: '通过控制开关隐藏/展示相关表单',
    title: '隐藏表单',
    type: 'object',
    properties: {
      showMore: {
        title: '显示更多表单',
        type: 'boolean',
        default: false
      },
      x1: {
        title: '隐藏表单1',
        type: 'string',
        default: '请输入...'
      }
    }
  },
  uiSchema: {
    properties: {
      x1: {
        hidden: '{{rootFormData.showMore === false}}'
      }
    }
  },
  default: {
    showMore: true
  }
}
