import Ajv, { ErrorObject } from 'ajv/dist/2020'
import i18n from 'ajv-i18n'
import { Schema } from './types'
import toPath from 'lodash.topath'
import { isObject } from './utils'
interface FormattedErrObj {
  name: string
  property: string
  message: string | undefined
  params: any
  schemaPath: string
}

export type ErrorSchema = {
  [level: string]: ErrorSchema
} & {
  __errors?: string[]
}

function formatErrorList(error: ErrorObject[] | undefined | null) {
  if (error === null || error === undefined) return []

  return error.map(({ keyword, instancePath, schemaPath, params, message }) => {
    return {
      name: keyword,
      property: `${instancePath}`,
      schemaPath,
      params,
      message
    }
  })
}

function formatErrSchema(errors: FormattedErrObj[]) {
  if (errors.length < 1 || errors === undefined) return {}

  return errors.reduce((errSchema, curV) => {
    const { property, message } = curV
    let parent = errSchema
    const path = property.split('/')

    // const path = toPath(property)

    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    for (const segment of path) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }

    return errSchema
  }, {} as ErrorSchema)
}

export async function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale: keyof typeof i18n,
  customValidate: ((data: any, errors: any) => void) | undefined
) {
  let validatorErr = null
  try {
    validator.validate(schema, formData)
  } catch (error) {
    validatorErr = error as any
  }
  i18n[locale](validator.errors)

  const errors = formatErrorList(validator.errors)

  if (validatorErr) {
    // TODO: 如果只有 validator 错误，应该如何展示？
    if (!errors.length) {
      const validatorErrMsg = validatorErr.message
      return {
        errors: { message: validatorErrMsg },
        errorSchema: { __errors: { message: validatorErrMsg } },
        valid: undefined
      }
    }
    errors.push({ message: validatorErr.message } as FormattedErrObj)
  }

  const errorSchema = formatErrSchema(errors)

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0
    }
  }
  const proxy = createErrorProxy()

  await customValidate(formData, proxy)

  const newErrorSchema = mergeObjs(errorSchema, proxy, false)

  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0
  }
}

function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    get(target, key, receiver) {
      if (key === 'addErr') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', receiver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            ;(target as any).__errors = [msg]
          }
        }
      }
      const targetObj = Reflect.get(target, key, receiver)
      if (targetObj === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }
      return targetObj
    }
  })
}

function mergeObjs(obj1: any, obj2: any, concatArr = false) {
  const accumulator = Object.assign({}, obj1) // Prevent mutation of source object
  return Object.keys(obj2).reduce((accumulator, key) => {
    const left = obj1 ? obj1[key] : {}
    const right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      accumulator[key] = mergeObjs(left, right, concatArr) // 递归
    } else if (concatArr && Array.isArray(left) && Array.isArray(right)) {
      accumulator[key] = left.concat(right)
    } else {
      accumulator[key] = right
    }
    return accumulator
  }, accumulator)
}
