import { mount, flushPromises } from '@vue/test-utils'
import TestComponent from './TestComponent'
import {
  NumberField,
  ObjectField,
  StringField,
  validateFormData
} from '../../src/lib'
import { Schema } from '@/lib/types'
describe('RetrieveSchema', () => {
  it('should properly resolve the $ref keyword', () => {
    let value = null
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          definitions: {
            address: {
              type: 'object',
              required: ['city', 'province'],
              properties: {
                city: {
                  type: 'string'
                },
                province: {
                  type: 'string'
                }
              }
            }
          },
          type: 'object',
          properties: {
            billing_address: {
              $ref: '#/definitions/address'
            }
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const objectField = wrapper.findComponent(ObjectField)
    const stringFieldArr = objectField.findAllComponents(StringField)
    expect(stringFieldArr.length).toBe(2)
  })
  it('should properly resolve the dependenctRequired keyword', async () => {
    // 当用户使用 dependentRequired 关键字时
    // case 1 properly resolve，and objectField.props.schema.required should have the required keyword
    let value: any = { gender: 1 }
    const schema: Schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        gender: {
          type: 'number'
        }
      },
      dependentRequired: {
        gender: ['name']
      }
    }

    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const objectField = wrapper.findComponent(ObjectField)
    expect(objectField.props('schema').required).toContain('name')
    // case 2 the key or value of dependentRequired is not found in properties

    await wrapper.setProps({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number'
          }
        },
        dependentRequired: {
          gender: ['name'],
          age: ['gender']
        }
      },
      value: {
        name: 'xxx',
        age: 44
      }
    })
    const objectField2 = wrapper.findComponent(ObjectField)
    expect(objectField2.props('schema').required.length).toBe(0)

    // 测试 点击校验后能成功调用 validateFormData 这个函数
    // mockfn = jest.fn((v) => v)
    // const btn = wrapper.find('#testBtn')
    // await wrapper.setProps({ callback: mockfn })
    // const res = await btn.trigger('click')
    // expect(mockfn).toHaveBeenCalled()
  })
  it('the oneOf keyword should be properly resolved', async () => {
    const schema: Schema = {
      type: 'object',
      oneOf: [
        {
          properties: {
            address: {
              type: 'string'
            }
          },
          required: ['address']
        },
        {
          properties: {
            phone: {
              type: 'number'
            }
          },
          required: ['phone']
        }
      ]
    }
    let value: any = { phone: 13278865947 }
    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    // case1: 根据 value 能找到对应的schema并如常渲染
    const numberField = wrapper.findComponent(NumberField)
    const stringField = wrapper.findComponent(StringField)
    expect(numberField.exists()).toBeTruthy()
    expect(stringField.exists()).toBeFalsy()
    // case2: 根据value找不到对应schema，默认渲染第一个schema

    //TODO: setProps没有同步更新到 objectField 中
    // await wrapper.setProps({
    //   schema: schema,
    //   value: { address: 'xxxxxx', name: 'xxx' }
    // })
    // await flushPromises()
    // const stringField2 = wrapper.findComponent(StringField)
    // const form = wrapper.findComponent('JSONSchemaForm')
    // expect(form.props('schema').properties).toBe('')
  })
})
