import SliderWidget from './SliderWidget'
export default {
  name: 'Number',
  schema: {
    description: '数字类型数据样例',
    title: '统计',
    type: 'object',
    required: ['rating', 'age'],
    properties: {
      rating: {
        type: 'number',
        title: '评分',
        default: 0
      },
      age: {
        type: 'integer',
        title: '年龄',
        default: 20
      },
      service: {
        type: 'integer',
        title: '服务满意度',
        maximum: 100,
        minimum: 0
      },
      delivery: {
        type: 'integer',
        title: '配送满意度',
        maximum: 100,
        minimum: 0,
        multipleOf: 10
      }
    }
  },
  uiSchema: {
    properties: {
      service: {
        widget: SliderWidget
      },
      delivery: {
        widget: SliderWidget
      }
    }
  },
  default: {
    rating: 85.6,
    age: 20,
    service: 50,
    delivery: 60
  }
}
