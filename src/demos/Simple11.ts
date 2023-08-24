import PasswordWidget from './customWidgets/PasswordWidget'
export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstPass: {
        type: 'string',
        studentID: true,
        title: 'First Password'
      },
      person: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            title: 'address',
            default: '广东省深圳市南山区南山大道'
          },
          height: {
            type: 'number',
            title: 'height',
            default: '180'
          }
        },
        title: 'Personal Data'
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Color'
      },
      // multiTypeArray: {
      //   type: 'array',
      //   items: [
      //     { type: 'string', title: 'string' },
      //     { type: 'number', title: 'number' }
      //   ],
      //   title: 'multiTypeArray'
      // },
      // singleTypeArray: {
      //   type: 'array',
      //   title: 'SingleType Array',
      //   items: {
      //     type: 'object',
      //     properties: {
      //       name: { type: 'string', title: 'name' },
      //       age: { type: 'number', title: 'age' }
      //     }
      //   }
      // },
      SelectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'foobar']
        },
        title: 'Select Array'
      }
      // others: {
      //   type: 'object',
      //   properties: {
      //     address: {
      //       type: 'string'
      //     },
      //     height: {
      //       type: 'number'
      //     }
      //   }
      // }
    }
  },
  uiSchema: {
    properties: {
      firstPass: {
        widget: PasswordWidget
      }
    }
  },
  // customValidate: (data: any, errors: any) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (data.firstName !== data.lastName) {
  //         errors.lastName.addErr('两次密码输入必须相同')
  //       }
  //       resolve(errors)
  //     }, 2000)
  //   })
  // },
  default: {
    // firstName: 6699,
    // lastName: 'Norris',
    // age: '75',
    // bio: 'Roundhouse kicking asses since 1940',
    // password: 'noneed',
    // telephone: '1385478126',
    // multiTypeArray: ['mazel98', 5858],
    // singleTypeArray: [{ name: 'cwy', age: '28' }],
    SelectArray: ['foo'],
    person: {
      address: '深圳市南山区',
      height: '188'
    },
    color: '#ffffff',
    firstPass: 'aaa'
  }
}
