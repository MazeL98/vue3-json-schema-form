export default {
  name: 'References',
  schema: {
    description: 'Schema 引用与递归调用',
    title: '商品订单',
    definitions: {
      address: {
        type: 'object',
        required: ['street', 'city', 'state'],
        properties: {
          street: {
            type: 'string',
            title: '街道'
          },
          city: {
            type: 'string',
            title: '城市'
          },
          province: {
            type: 'string',
            title: '省份'
          }
        }
      },
      goodsInfo: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '名称',
            minLength: 2
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/definitions/goodsInfo'
            }
          }
        }
      }
    },
    type: 'object',
    properties: {
      billing_address: {
        title: '账单寄送地址',
        $ref: '#/definitions/address'
      },
      shipping_address: {
        title: '收货地址',
        $ref: '#/definitions/address'
      },
      goods: {
        title: '商品详情',
        $ref: '#/definitions/goodsInfo'
      }
    }
  },
  uiSchema: {},
  default: {
    billing_address: {
      street: '南山大道2066号',
      city: '深圳市',
      province: '广东省'
    },
    shipping_address: {
      street: '龙吴路33号',
      city: '上海',
      province: '上海市'
    },
    goods: {
      name: '小天鹅洗烘套装组合',
      children: [
        {
          name: '小天鹅洗衣机'
        },
        {
          name: '小天鹅烘干机'
        }
      ]
    }
  }
}
