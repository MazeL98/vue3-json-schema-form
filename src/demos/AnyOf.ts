export default {
  name: 'AnyOf',
  schema: {
    description: '在多个schema中至少符合一个schema即可通过校验',
    title: 'anyOf',
    type: 'object',
    anyOf: [
      {
        properties: {
          address: {
            type: 'string',
            minLength: 5,
            title: '地址'
          }
        }
      },
      {
        properties: {
          phone: {
            type: 'string',
            minLength: 11,
            title: '手机'
          }
        }
      }
    ]
  },
  uiSchema: {},
  default: {
    address: 'ddddddd'
  }
}
