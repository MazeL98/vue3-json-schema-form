import { defineComponent, ref } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib/types'
import { createFormItem } from '../../lib/theme-default/FormItem'
import { UploadProps, UploadUserFile } from 'element-plus'
import { createUseStyles } from 'vue-jss'
const useStyles = createUseStyles({
  btn: {
    margin: '10px 0 10px',
    padding: '7px 10px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#39828f',
    border: 0,
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#619ba5',
      color: '#fff'
    },
    '&:focus': {
      backgroundColor: '#39828f',
      color: '#fff'
    }
  }
})
export default createFormItem(
  defineComponent({
    name: 'UploadWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const actionRef = ref(
        props.uiSchema && props.uiSchema.action ? props.uiSchema.action : ''
      )
      const fileListRef = ref<UploadUserFile[]>([
        {
          name: '文件1',
          url: props.value as string
        }
      ])
      const classesRef = useStyles()

      return () => {
        const classes = classesRef.value
        const action = actionRef.value
        const fileList = fileListRef.value
        return (
          <el-upload action={action} fileList={fileList}>
            <el-button type="primary" class={classes.btn}>
              点击上传
            </el-button>
          </el-upload>
        )
      }
    }
  })
)
