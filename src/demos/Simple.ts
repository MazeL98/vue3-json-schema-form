export default {
  name: 'Simple',
  schema: {
    description: '简单数据样例',
    title: '个人资料',
    type: 'object',
    required: ['name', 'mobile'],
    properties: {
      name: {
        type: 'string',
        title: '昵称',
        default: '小李'
      },
      age: {
        type: 'number',
        title: '年龄'
      },
      mobile: {
        type: 'string',
        minLength: 11,
        title: '手机号码'
      },
      city: {
        type: 'string',
        title: '现居地'
      },
      defaultAddress: {
        type: 'boolean',
        title: '设为默认地址',
        default: true
      }
    }
  },
  uiSchema: {},
  default: {
    name: '小张',
    age: '33',
    mobile: '13122863836',
    city: '深圳',
    defaultAddress: false
  }
}
