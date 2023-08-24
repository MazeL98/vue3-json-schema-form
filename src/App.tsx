import { defineComponent, ref, reactive, Ref, watchEffect, watch } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'
import SchemaForm from './lib/SchemaForm'
import demos from './demos'
import { ThemeProvider } from './lib/theme'
import themeDefault from './lib/theme-default'

import customFormats from '../src/plugins/customFormat'
import customKeyword from '../src/plugins/customKeyword'

type Schema = any
type UISchema = any
const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '0 auto',
    width: '1300px'
  },
  title: {
    color: '#5f5d5e'
  },
  menu: {
    dsiplay: 'flex'
  },
  menuButton: {
    color: 'white',
    padding: '8px 12px',
    margin: '10px 20px 30px 0',
    backgroundColor: '#39828f',
    border: 0,
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#619ba5'
    }
  },
  content: {
    display: 'flex'
  },
  code: {
    width: 800,
    flexShrink: 0
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '48%'
    }
  },
  form: {
    flexGrow: 1,
    marginLeft: 40
  },
  codePanel: {
    margin: '0 0 20px 0',
    minHeight: 300
  },
  validateBtn: {
    margin: '25px 0 10px',
    padding: '7px 10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#39828f',
    border: 0,
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#619ba5'
    },
    '&:focus': {
      backgroundColor: '#39828f'
    }
  },
  btnContent: {
    color: '#fff'
  }
})

// 把要传入的 code 格式化
function toJSON(data: any) {
  return JSON.stringify(data, null, 2)
}

export default defineComponent({
  setup() {
    const selectedRef = ref(0)

    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate: ((data: any, errors: any) => void) | undefined
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined
    })

    watchEffect(() => {
      const index = selectedRef.value

      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJSON(d.schema)
      demo.dataCode = toJSON(d.default)
      demo.customValidate = d.customValidate
      demo.uiSchemaCode = toJSON(d.uiSchema)
    })

    const classesRef = useStyles()

    // 用于右侧表单的 onChange监听函数
    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJSON(v)
    }

    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string
    ) => {
      try {
        const json = JSON.parse(value)
        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        console.log(err)
      }
    }
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    const contextRef: Ref = ref()

    function valideForm() {
      contextRef.value
        .doValidate()
        .then((result: any) => {
          console.log(result)
        })
        .catch((error: Error) => {
          console.error(error.message)
        })
    }
    return () => {
      const classes = classesRef.value
      // switch button component dynamically
      const BtnComponent = themeDefault.wrapper?.Btn
        ? themeDefault.wrapper?.Btn
        : 'button'
      return (
        <div class={classes.container}>
          <h1 class={classes.title}> Vue3 JSON Schema Form </h1>
          <div class={classes.menu}>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={classes.menuButton}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              ></MonacoEditor>
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={themeDefault}>
                <SchemaForm
                  schema={demo.schema}
                  value={demo.data}
                  onChange={handleChange}
                  contextRef={contextRef}
                  customValidate={demo.customValidate}
                  uiSchema={demo.uiSchema || {}}
                  customFormats={customFormats}
                  customKeyword={customKeyword}
                  curNodePath=""
                  rootFormData={demo.data}
                ></SchemaForm>
                <BtnComponent class={classes.validateBtn} onClick={valideForm}>
                  <span class={classes.btnContent}>校验</span>
                </BtnComponent>
              </ThemeProvider>
            </div>
          </div>
        </div>
      )
    }
  }
})
