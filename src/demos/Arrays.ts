export default {
  name: 'Arrays',
  schema: {
    description: '常用的数组类型数据校验Schema',
    type: 'object',
    title: '数组',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        title: '用户名',
        default: 'user001'
      },
      interest: {
        type: 'array',
        title: '感兴趣的领域',
        items: {
          type: 'string',
          enum: ['金融', '体育', '社会', '影视', '文化', '生活方式']
        }
      }
    }
  },
  uiSchema: {},
  default: {
    name: 'maze',
    interest: ['社会', '体育']
  }
}
