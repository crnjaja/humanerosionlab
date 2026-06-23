export class ContactService {
  static createEmptyForm() {
    return {
      name: '',
      email: '',
      message: '',
    }
  }

  static createEmptyErrors() {
    return {
      name: '',
      email: '',
      message: '',
    }
  }

  static createEmptyResponse() {
    return {
      ok: false,
      message: '',
    }
  }

  static sanitize(value) {
    return String(value || '')
      .replaceAll('\u0000', '')
      .trim()
  }

  static validate(form) {
    const errors = this.createEmptyErrors()
    let valid = true

    const name = this.sanitize(form.name)
    const email = this.sanitize(form.email)
    const message = this.sanitize(form.message)

    if (!name) {
      errors.name = 'Name is required.'
      valid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      errors.email = 'Email is required.'
      valid = false
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.'
      valid = false
    }

    if (!message) {
      errors.message = 'Message is required.'
      valid = false
    } else if (message.length < 20) {
      errors.message = 'Message must be at least 20 characters.'
      valid = false
    } else if (message.length > 400) {
      errors.message = 'Message must be under 400 characters.'
      valid = false
    }

    return { valid, errors }
  }

  static buildEmailPayload(form) {
    return {
      from_name: this.sanitize(form.name),
      from_email: this.sanitize(form.email),
      message: this.sanitize(form.message),
    }
  }

  static resetForm(form) {
    form.name = ''
    form.email = ''
    form.message = ''
  }

  static resetErrors(errors) {
    Object.assign(errors, this.createEmptyErrors())
  }

  static resetResponse(response) {
    response.ok = false
    response.message = ''
  }

  static setSuccess(response, message = '✅ Message sent successfully!') {
    response.ok = true
    response.message = message
  }

  static setError(response, message = '❌ Failed to send message. Please try again.') {
    response.ok = false
    response.message = message
  }

  static socialClass(social) {
    return ['social-box', social?.key].filter(Boolean)
  }
}
