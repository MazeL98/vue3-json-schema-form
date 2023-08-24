import { defineComponent, PropType, Ref, ref } from 'vue'
import themeDefault from '@/lib/theme-default'
import { ThemeProvider } from '@/lib/theme'
import JSONSchemaForm from '@/lib/SchemaForm'
import { Schema } from '@/lib/types'
const TestThemeProvider = defineComponent({
  setup(props, { slots }) {
    // do something
    return () => {
      return (
        <ThemeProvider theme={themeDefault}>
          {slots.default && slots.default()}
        </ThemeProvider>
      )
    }
  }
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props) {
    const contextRef: Ref = ref()
    return () => {
      function valideForm() {
        contextRef.value.doValidate().then((result: any) => {
          console.log(result)
        })
      }
      return (
        <TestThemeProvider>
          <JSONSchemaForm {...props} contextRef={contextRef}></JSONSchemaForm>
          <button id="testBtn" onClick={valideForm}>
            校验
          </button>
        </TestThemeProvider>
      )
    }
  }
})
