import { CustomKeyword } from '../lib/types'
import { _, KeywordCxt, CodeKeywordDefinition } from 'ajv'
// const keyword: CustomKeyword = {
//   name: 'studentID',
//   definition: {
//     keyword: 'studentID',
//     macro: () => {
//       return {
//         minLength: 10
//       }
//     }
//   },
//   updateSchema(schema) {
//     return {
//       ...schema,
//       minLength: 10
//     }
//   }
// }

const keyword: CodeKeywordDefinition[] = [
  {
    keyword: 'vjsf-hidden',
    type: 'string',
    schemaType: 'string',
    code(cxt) {
      const { schema, parentSchema } = cxt
      eval(schema)
      cxt.fail(_`!eval(schema)`)
    }
  }
]

export default keyword
