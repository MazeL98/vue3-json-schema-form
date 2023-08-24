import UploadWidget from './customWidgets/UploadWidget'
export default {
  name: 'Files',
  schema: {
    description: '上传文件',
    title: 'files',
    type: 'object',
    properties: {
      single: {
        type: 'string',
        title: '单个文件',
        default:
          'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'
      }
    }
  },
  uiSchema: {
    properties: {
      single: {
        widget: UploadWidget,
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15'
      }
    }
  },
  default: {
    single:
      'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'
  }
}
