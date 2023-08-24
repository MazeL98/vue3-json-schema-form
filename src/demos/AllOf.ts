export default {
  name: 'AllOf',
  schema: {
    description: '符合所有schema才能通过校验',
    title: 'allOf',
    type: 'object',
    allOf: [
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
