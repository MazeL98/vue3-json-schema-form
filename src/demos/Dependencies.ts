export default {
  name: 'Dependencies',
  schema: {
    description: '表单字段的联动',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        minLength: 1
      },
      gender: {
        type: 'array',
        title: '性别',
        items: {
          type: 'string',
          enum: ['男', '女']
        }
      }
    },
    dependentRequired: {
      gender: ['name']
    }
  },
  uiSchema: {},
  default: {
    gender: ['女']
  }
}
