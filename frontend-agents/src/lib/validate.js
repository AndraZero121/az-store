// lib/validate.js

class Validator {
  constructor(name, type) {
    this.name = name
    this.type = type
    this.rules = []
  }
  require() {
    this.rules.push({
      type: "required",
      messageKey: "fill-not-fill",
    })
    return this
  }
  validate(value) {
    return { isValid: true }
  }
}

class StringValidator extends Validator {
  constructor(name) {
    super(name, "string")
  }
  max(value) {
    this.rules.push({
      type: "max",
      value: value,
      messageKey: "fill-max-fill",
    })
    return this
  }
  min(value) {
    this.rules.push({
      type: "min",
      value: value,
      messageKey: "fill-min-fill",
    })
    return this
  }
  formatUrl() {
    this.rules.push({
      type: "url",
      messageKey: "fill-string-url",
    })
    return this
  }
  formatDate() {
    this.rules.push({
      type: "date_format",
      messageKey: "fill-date-format-type",
    })
    return this
  }
  cantBefore() {
    this.rules.push({
      type: "date_cant_before",
      messageKey: "fill-date-cant-before",
    })
    return this
  }
  cantAfter() {
    this.rules.push({
      type: "date_cant_after",
      messageKey: "fill-date-cant-after",
    })
    return this
  }
  isEmail() {
    this.rules.push({
      type: "email",
      messageKey: "fill-email-can-allow",
    })
    return this
  }
  onlyInclude(allowedValues) {
    this.rules.push({
      type: "only_include",
      value: allowedValues,
      messageKey: "fill-array-only-include",
    })
    return this
  }
  validate(value) {
    const errors = []
    if(typeof value !== this.type && value !== undefined) {
      errors.push({
        messageKey: "fill-not-same-as-type",
        params: { name: this.name, type: this.type },
      })
      return { isValid: false, errors }
    }
    for(const rule of this.rules) {
      if(rule.type === "required") {
        if(value === undefined || value === null || value === "") {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
      } else if(value !== undefined && value !== null && value !== "") {
        if(rule.type === "max" && value.length > rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "min" && value.length < rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "url" && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value)) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
        if(rule.type === "date_format") {
          const [year, month, day] = String(value).split("-")
          if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          } else if(parseInt(month) < 1 || parseInt(month) >= 13) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          } else if(parseInt(day) < 1 || parseInt(day) >= 33) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          // Dimulai 1995 - 2450
          } else if(parseInt(year) < 1995 || parseInt(year) >= 2450) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          }
        }
        if(rule.type === "date_cant_before") {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const dateValue = new Date(value)
          dateValue.setHours(0, 0, 0, 0)
          if(dateValue < today) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          }
        }
        if(rule.type === "date_cant_after") {
          const today = new Date()
          today.setHours(23, 59, 59, 999)
          const dateValue = new Date(value)
          dateValue.setHours(23, 59, 59, 999)
          if(dateValue > today) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          }
        }
        if(rule.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
        if(rule.type === "only_include") {
          if(!rule.value.includes(value)) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          }
        }
      }
    }
    return { isValid: errors.length === 0, errors }
  }
}

class NumberValidator extends Validator {
  constructor(name) {
    super(name, "number")
  }
  max(value) {
    this.rules.push({
      type: "max",
      value: value,
      messageKey: "fill-max-fill",
    })
    return this
  }
  min(value) {
    this.rules.push({
      type: "min",
      value: value,
      messageKey: "fill-min-fill",
    })
    return this
  }
  onlyInteger() {
    this.rules.push({
      type: "integer",
      messageKey: "fill-only-interger",
    })
    return this
  }
  validate(value) {
    const errors = []
    if(typeof value !== this.type && value !== undefined) {
      errors.push({
        messageKey: "fill-not-same-as-type",
        params: { name: this.name, type: this.type },
      })
      return { isValid: false, errors }
    }
    for(const rule of this.rules) {
      if(rule.type === "required") {
        if(value === undefined || value === null) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
      } else if(value !== undefined && value !== null) {
        if(rule.type === "max" && value > rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "min" && value < rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "integer" && !Number.isInteger(value) || parseInt(value) < 1) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
      }
    }
    return { isValid: errors.length === 0, errors }
  }
}

class BooleanValidator extends Validator {
  constructor(name) {
    super(name, "boolean")
  }

  validate(value) {
    const errors = []
    if(typeof value !== this.type && value !== undefined && value !== null) {
      errors.push({
        messageKey: "fill-not-same-as-type",
        params: { name: this.name, type: this.type },
      })
      return { isValid: false, errors }
    }

    for(const rule of this.rules) {
      if(rule.type === "required") {
        if(value === undefined || value === null) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
      }
    }
    return { isValid: errors.length === 0, errors }
  }
}

class ArrayValidator extends Validator {
  constructor(name, itemValidator = null) {
    super(name, "array")
    this.itemValidator = itemValidator
  }
  max(value) {
    this.rules.push({
      type: "max",
      value: value,
      messageKey: "fill-array-max",
    })
    return this
  }
  min(value) {
    this.rules.push({
      type: "min",
      value: value,
      messageKey: "fill-array-min",
    })
    return this
  }
  onlyInclude(allowedValues) {
    this.rules.push({
      type: "only_include",
      value: allowedValues,
      messageKey: "fill-array-only-include",
    })
    return this
  }
  validate(value) {
    const errors = []
    if(!Array.isArray(value) && value !== undefined) {
      errors.push({
        messageKey: "fill-not-same-as-type",
        params: { name: this.name, type: this.type },
      })
      return { isValid: false, errors }
    }
    for(const rule of this.rules) {
      if(rule.type === "required") {
        if(value === undefined || value === null || value.length === 0) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name },
          })
        }
      } else if(value !== undefined && value !== null) {
        if(rule.type === "max" && value.length > rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "min" && value.length < rule.value) {
          errors.push({
            messageKey: rule.messageKey,
            params: { name: this.name, value: rule.value },
          })
        }
        if(rule.type === "only_include") {
          if(!value.every((item) => rule.value.includes(item))) {
            errors.push({
              messageKey: rule.messageKey,
              params: { name: this.name },
            })
          }
        }
      }
    }
    if(this.itemValidator && Array.isArray(value)) {
      value.forEach((item, index) => {
        const itemErrors = this.itemValidator.validate(item).errors
        itemErrors.forEach((error) => {
          errors.push({
            ...error,
            params: { ...error.params, name: `${this.name}[${index}]` },
          })
        })
      })
    }
    return { isValid: errors.length === 0, errors }
  }
}

class ObjectValidator extends Validator {
  constructor(name, schema = {}) {
    super(name, "object")
    this.schema = schema
  }
  setSchema(schema) {
    this.schema = schema
    return this
  }
  validate(value) {
    const errors = []
    if(typeof value !== this.type && value !== undefined) {
      errors.push({
        messageKey: "fill-not-same-as-type",
        params: { name: this.name, type: this.type },
      })
      return { isValid: false, errors }
    }
    if((value === undefined || value === null) && !this.rules.some((r) => r.type === "required")) {
      return { isValid: true }
    }
    if(this.rules.some((r) => r.type === "required") && (value === undefined || value === null)) {
      errors.push({
        messageKey: "fill-not-fill",
        params: { name: this.name },
      })
      return { isValid: false, errors }
    }
    for(const key in this.schema) {
      const validator = this.schema[key]
      const fieldName = `${this.name ? `${this.name}.` : ""}${key}`
      const result = validator.validate(value ? value[key] : undefined)
      result.errors.forEach((error) => {
        errors.push({
          ...error,
          params: { ...error.params, name: fieldName },
        })
      })
    }
    return { isValid: errors.length === 0, errors }
  }
}

class Form {
  constructor(protocol) {
    this.protocol = protocol
    this.schema = {}
  }
  append(schema) {
    this.schema = schema
  }
  validate(data) {
    const allErrors = []
    const errorSlugs = []
    const errorParams = []
    for(const key in this.schema) {
      const validator = this.schema[key]
      let fieldNameForError = validator.name || key
      if(validator instanceof ObjectValidator || validator instanceof ArrayValidator) {
        const result = validator.validate(data[key])
        result.errors.forEach((error) => {
          allErrors.push(error)
          errorSlugs.push(error.messageKey)
          errorParams.push(error.params)
        })
      } else {
        const result = validator.validate(data[key])
        result.errors.forEach((error) => {
          allErrors.push(error)
          errorSlugs.push(error.messageKey)
          errorParams.push(error.params)
        })
      }
    }
    if(allErrors.length > 0) {
      return {
        error: `${this.protocol}:${errorSlugs.join("|")}`,
        error_params: errorParams,
      }
    }
    return null
  }
}

const string = (name) => new StringValidator(name)
const number = (name) => new NumberValidator(name)
const array = (name, itemValidator = null) => new ArrayValidator(name, itemValidator)
const object = (name, schema = {}) => new ObjectValidator(name, schema)
const boolean = (name) => new BooleanValidator(name)

// module.exports = {
export {
  Form,
  string,
  number,
  array,
  object,
  boolean,
}