import { defineComponent } from 'vue'
import './index.scss'
export default defineComponent({
  name: 'FormWrapper',
  props: {},
  setup(props, { slots }) {
    // do something
    return () => {
      return (
        <el-card shadow="hover">
          <el-form label-position={'left'}>
            {slots.default && slots.default()}
          </el-form>
        </el-card>
      )
    }
  }
})
