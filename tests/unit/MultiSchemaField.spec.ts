import { mount } from '@vue/test-utils'
import { MultiSchemaField, SelectWidget, StringField } from '../../src/lib'
import TestComponent from './TestComponent'
describe('MultiSchemaField', () => {
  it('should properly render the multiSchemaWidget', () => {
    let value = {
      age: 33
    }
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'object',
          oneOf: [
            {
              properties: {
                address: {
                  type: 'string'
                }
              }
            },
            {
              properties: {
                phone: {
                  type: 'number'
                }
              }
            }
          ]
        },
        value: value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const multiSchemaField = wrapper.findComponent(MultiSchemaField)
    expect(multiSchemaField.exists()).toBeTruthy()
    const multiSchemaWidget = multiSchemaField.findComponent(SelectWidget)
    expect(multiSchemaWidget.exists()).toBeTruthy()
    const stringField = multiSchemaField.findComponent(StringField)
    expect(stringField.exists()).toBeTruthy()
  })
})
