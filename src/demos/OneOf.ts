export default {
  name: 'OneOf',
  schema: {
    description: '在多个schema中只符合其中一个schema即可通过校验',
    title: 'oneOf',
    type: 'object',
    oneOf: [
      {
        properties: {
          address: {
            type: 'string',
            minLength: 5,
            title: '地址'
          }
        },
        required: ['address']
      },
      {
        properties: {
          phone: {
            type: 'string',
            minLength: 11,
            title: '手机'
          }
        },
        required: ['phone']
      }
    ]
  },
  uiSchema: {},
  default: {
    age: 'ddddddd'
  }
}
