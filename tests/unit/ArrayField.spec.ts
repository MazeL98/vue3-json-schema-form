import { mount } from '@vue/test-utils'
import { StringField, NumberField, ArrayField } from '../../src/lib'
import SelectWidget from '../../src/lib'
import CheckboxWidget from '../../src/lib'
import RadioWidget from '../../src/lib'
import TestComponent from './TestComponent'
describe('ArrayField', () => {
  it('should match the multi-type ArrayField', () => {
    let value: any
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string'
            },
            {
              type: 'number'
            }
          ]
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const arrField = wrapper.findComponent(ArrayField)
    const strField = arrField.findComponent(StringField)
    const numField = arrField.findComponent(NumberField)
    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  it('should match the single type without enum', () => {
    let value = ['111', '222', '333']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const arrField = wrapper.findComponent(ArrayField)
    const strs = arrField.findAllComponents(StringField)
    expect(strs.length).toBe(value.length)
    expect(strs[0].props('value')).toBe(value[0])
  })

  it('should  match the single type with enum when more than one value', () => {
    let value = ['apple', 'banana']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['apple', 'banana', 'potato', 'grape']
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const checkboxWidget = wrapper.findComponent(CheckboxWidget)
    expect(checkboxWidget.exists()).toBeTruthy()
  })
  it('should  match the single type with enum when  just one value and less than four enum items', () => {
    let value = ['apple']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['apple', 'banana', 'potato']
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const radioWidget = wrapper.findComponent(RadioWidget)
    expect(radioWidget.exists()).toBeTruthy()
  })
  it('should  match the single type with enum when  just one value and more than four enum items', () => {
    let value = ['apple']
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['apple', 'banana', 'potato', 'grape', 'orange']
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const selectWidget = wrapper.findComponent(SelectWidget)
    expect(selectWidget.exists()).toBeTruthy()
  })
  it('the value should be changed when clicking the buttons', () => {
    let value = [33, 66, 99]
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'number'
          }
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const oldVals = [...value]
    const arrayItems = wrapper.findAllComponents('.arrayItem')
    const downBtn = arrayItems[0].findComponent('.downBtn')
    downBtn.trigger('click')
    expect(value[1]).toBe(oldVals[0])
  })
})
