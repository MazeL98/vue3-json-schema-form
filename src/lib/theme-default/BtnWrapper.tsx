import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'BtnWrapper',
  props: {},
  setup(props, { slots }) {
    // do something
    return () => {
      return <el-button>{slots.default && slots.default()}</el-button>
    }
  }
})
