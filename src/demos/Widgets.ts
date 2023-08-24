import ColorPickerWidget from './customWidgets/ColorPickerWidget'
import DatePickerWidget from './customWidgets/DatePickerWidget'
import PasswordWidget from './customWidgets/PasswordWidget'
export default {
  name: 'Widgets',
  schema: {
    description: '利用uiSchema扩展自定义小控件',
    title: 'widgets',
    type: 'object',
    properties: {
      color: {
        type: 'string',
        title: '颜色',
        default: '#FFFFFF'
      },
      dateTime: {
        type: 'string',
        title: '日期',
        default: ''
      },
      password: {
        type: 'string',
        title: '密码'
      }
    }
  },
  uiSchema: {
    properties: {
      color: {
        widget: ColorPickerWidget
      },
      dateTime: {
        widget: DatePickerWidget
      },
      password: {
        widget: PasswordWidget
      }
    }
  },
  default: {
    color: '#409EFF',
    dateTime: '',
    password: '123456'
  }
}
