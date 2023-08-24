export default {
  name: 'CustomFormat',
  schema: {
    description: '自定义 format 关键字',
    title: '自定义format关键字',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        title: '邮箱地址'
      },
      url: {
        type: 'string',
        format: 'url',
        title: 'URL'
      }
    }
  },
  uiSchema: {},
  default: {
    email: 'yyw3334@126.com',
    url: 'https://www.mazel98.com'
  }
}
