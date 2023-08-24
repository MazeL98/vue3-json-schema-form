export default {
  name: 'Nested',
  schema: {
    description: '嵌套数据',
    title: '用户信息',
    type: 'object',
    properties: {
      name: {
        type: 'object',
        required: ['firstName', 'lastName'],
        title: '申请人姓名',
        properties: {
          firstName: {
            type: 'string',
            minLength: 1,
            title: '姓'
          },
          lastName: {
            type: 'string',
            minLength: 1,
            title: '名',
            default: 'Last'
          }
        },
        errorMessage: {
          firstName: '至少有个字符吧'
        }
      },
      contactInfo: {
        type: 'object',
        title: '联系方式',
        required: ['phone', 'email'],
        properties: {
          phone: {
            type: 'string',
            description: '不少于11位',
            minLength: 11,
            title: '手机号码'
          },
          email: {
            type: 'string',
            title: '邮箱'
          }
        }
      }
    },
    errorMessage: '这是一个简单的错误'
  },
  uiSchema: {},
  default: {
    name: {
      firstName: '李',
      lastName: '四'
    },
    contactInfo: {
      phone: '13121556960',
      email: 'lisi0908@gmail.com'
    }
  }
}
