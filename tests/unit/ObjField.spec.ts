import { mount } from '@vue/test-utils'
import {
  NumberField,
  StringField,
  IntegerField,
  BooleanField
} from '../../src/lib'
import TestComponent from './TestComponent'
describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        default: {
          type: 'boolean',
          default: true
        },
        name: {
          type: 'string'
        },
        age: {
          type: 'integer'
        },
        height: {
          type: 'number'
        }
      }
    }
  })
  it('should render properly according to the types of properties', () => {
    let value: any
    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const numberField = wrapper.findComponent(NumberField)
    const stringField = wrapper.findComponent(StringField)
    const integerField = wrapper.findComponent(IntegerField)
    const booleanField = wrapper.findComponent(BooleanField)
    expect(numberField.exists()).toBeTruthy()
    expect(stringField.exists()).toBeTruthy()
    expect(integerField.exists()).toBeTruthy()
    expect(booleanField.exists()).toBeTruthy()
  })

  it('onChange should be triggered and value should be changed', async () => {
    let value = {
      default: false,
      name: 'mazel',
      age: 32,
      height: '161.5'
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
    const numberField = wrapper.findComponent(NumberField)
    const integerField = wrapper.findComponent(IntegerField)
    await numberField.props('onChange')(166)
    expect(value.height).toEqual(166)
    await integerField.props('onChange')(32)
    expect(value.age).toEqual(32)
  })
})
