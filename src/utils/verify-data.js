import * as _ from 'lodash'
const verifyConfig = {
  map: {
    5: {
      max: 50
    },
    10: {
      max: 200
    },
    9: {
      href: {
        max: 500
      },
      name: {
        max: 20
      }
    }
  },
  switch: {},
  defaultSpecialCharacter: new RegExp('^([Nn][Uu][Ll][Ll])+$|[`\\\\（）\\(\\)~！@#$^&*=|{}\\[\\]<>《》/~@#￥&*——|{}【】%……;+\\-："；\'，。？、·!０１２３４５６７８９.:_ ]')
}

/**
 * 数据校验,只做数据校验，不做类型转换
 * @param   {Number|String|Object}    value                       值
 * @param   {String}                  label                       字段名（中文名，用于拼接报错信息）
 * @param   {1|2|4|41|5|9|10}         dataType                    数据类型 1:整数 2:浮点 4:日期时间 41:日期 5:短文本型 9:超链接 10:文本型
 * @param   {String}                  key                         内置特殊数据key，fileName,可通过config拓展
 * @return  {String}                                              数据正确返回空字符串，错误返回错误信息
 */
function verifyData (value, label, key, dataType) {
  let errorInfo = ''
  if (value || value === 0 || value === false) {
    if (dataType) {
      const config = _.get(verifyConfig.map, dataType)
      switch (dataType) {
        case 1:
          if (!/^-?\d{1,15}$/.test(value)) {
            errorInfo = `${label}必须是整数`
          }
          break
        case 2:
          if (!/^-?\d{1,15}(\.\d{1,15})?$/.test(value)) {
            errorInfo = `${label}必须是浮点数`
          }
          break
        case 4:
        case 41:
          if (new Date(value).toString() === 'Invalid Date') {
            errorInfo = `${label}格式不正确`
          }
          break
        case 5:
        case 10:
          if (config.max && value && value.length > config.max) {
            errorInfo = `${label}长度不能超过${config.max}个字符`
          } else if (config.min && value && value.length < config.min) {
            errorInfo = `${label}长度不能少于${config.min}个字符`
          } else if (config.sc?.test(value)) {
            errorInfo = `${label}不能包含特殊字符`
          }
          break
        case 9:
          if (value) {
            if (config.name.max && value.name && value.name.length > config.name.max) {
              errorInfo = `${label}名称长度不能超过${config.name.max}个字符`
            } else if (config.name.min && value.name && value.name.length < config.name.min) {
              errorInfo = `${label}名称长度不能少于${config.name.min}个字符`
            } else if (config.href.max && value.href && value.href.length > config.href.max) {
              errorInfo = `${label}链接长度不能超过${config.href.max}个字符`
            } else if (config.href.min && value.href && value.href.length < config.href.min) {
              errorInfo = `${label}链接长度不能少于${config.href.min}个字符`
            } else if (value.name && !value.href) {
              errorInfo = `${label}链接不能为空`
            }
            break
          }
      }
    }
    if (key) {
      const config = _.get(verifyConfig.map, key)
      if (verifyConfig.switch.length) {
        if (config.max && value.length > config.max) {
          errorInfo = `${label}长度不能超过${config.max}个字符`
        }
        if (config.min && value.length < config.min) {
          errorInfo = `${label}长度不能少于${config.min}个字符`
        }
      }

      if (!errorInfo && verifyConfig.switch.specialCharacter) {
        if (config.sc !== false) {
          if (!config.sc) {
            config.sc = verifyConfig.defaultSpecialCharacter
          }
          if (config.sc && config.sc.test(value)) {
            errorInfo = `${label}不能包含特殊字符`
          }
        }
      }
    }
  }
  return errorInfo
  // return errorInfo ? '您输入的数据有误，请重新输入' : errorInfo
}

/**
 * 获取字段最大长度配置
 * @param   {String}                  key                         key
 * @param   {String}                  type                        input | number
 * @param   {Boolean}                 showWordLimit               showWordLimit
 * @return  {Number | undefined}                                  数据正确返回空字符串，错误返回错误信息
 */
function getMaxlengthByKey (key, type = 'input', showWordLimit = true) {
  if (verifyConfig.switch.length) {
    const max = _.get(verifyConfig.map, key).max
    return type === 'input' ? {
      maxlength: max,
      showWordLimit: showWordLimit && !!max
    } : {
      max: max ?? undefined,
      min: _.get(verifyConfig.map, key).min ?? undefined
    }
  }
  return {}
}

function setCommonConfig (config) {
  _.merge(verifyConfig, config ?? {})
}

/**
 * 生成校验规则
 * @param config key:字段key，必须, label: 字段label，必须，ruleTypes: 需要生成的校验规则的key，必须，现支持required，defaultVerify,trigger:触发校验的方式，默认blur，path: 特殊字符校验的路径，customRules：自定义的校验规则，dataType： {1|2|4|41|5|9|10}
 * @returns 校验规则
 */
function buildValidatorRules (config) {
  const rules = {}
  config.forEach(({ key, label, ruleTypes = [], trigger = 'blur', path = null, customRules = [], dataType = null }) => {
    rules[key] = ruleTypes.map(type => {
      switch (type) {
        case 'required':
          return { required: true, trigger, message: '请填入' + label }
        case 'defaultVerify':
          return {
            validator: (rule, value, callback) => {
              const errorInfo = verifyData(value, label, path, dataType)
              if (errorInfo) {
                callback(new Error(errorInfo))
              } else {
                callback()
              }
            },
            trigger
          }
      }
    }).concat(customRules)
  })
  return rules
}

export { verifyData, getMaxlengthByKey, setCommonConfig, buildValidatorRules }
