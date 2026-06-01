// Regex básico para validação de formato de email
const isValidEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateTextInput = (text) => {
  if (!text || !text.trim()) {
    return { isValid: false, message: 'Este(s) campo(s) é obrigatório' }
  }
  return { isValid: true, message: null }
}

// Validação completa de email 
const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, message: 'Por favor, digite o email' }
  }
  
  if (!isValidEmailFormat(email.trim())) {
    return { isValid: false, message: 'Por favor, digite um email válido (exemplo: usuario@dominio.com)' }
  }
  
  return { isValid: true, message: null }
}

const validatePassword = (password) => {
  if (!password || !password.trim()) {
    return { isValid: false, message: 'Por favor, digite a senha' }
  }
  return { isValid: true, message: null }
}

const validateConfirmPassword = (confirmPassword) => {
  if (!confirmPassword || !confirmPassword.trim()) {
    return { isValid: false, message: 'Por favor, confirme a senha' }
  }
  return { isValid: true, message: null }
}

const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, message: 'As senhas não coincidem' }
  }
  return { isValid: true, message: null }
}

const validateAllLoginFields = (email, password, confirmPassword) => {
  // Valida email
  const emailValidation = validateEmail(email)
  if (!emailValidation.isValid) {
    return emailValidation
  }
  
  // Valida senha
  const passwordValidation = validatePassword(password)
  if (!passwordValidation.isValid) {
    return passwordValidation
  }
  
  // Valida confirmação de senha
  const confirmPasswordValidation = validateConfirmPassword(confirmPassword)
  if (!confirmPasswordValidation.isValid) {
    return confirmPasswordValidation
  }
  
  // Valida se as senhas coincidem
  const matchValidation = validatePasswordsMatch(password, confirmPassword)
  if (!matchValidation.isValid) {
    return matchValidation
  }
  
  return { isValid: true, message: null }
}

const getFormData = (email, password, confirmPassword) => {
  return {
    email: email.trim(),
    password: password.trim(),
    confirmPassword: confirmPassword.trim()
  }
}

// Função auxiliar para validar email em tempo real
const getEmailValidationStatus = (email) => {
  if (!email || !email.trim()) {
    return { status: 'empty', message: 'Email é obrigatório' }
  }
  
  if (!isValidEmailFormat(email.trim())) {
    return { status: 'invalid', message: 'Formato de email inválido' }
  }
  
  return { status: 'valid', message: 'Email válido' }
}

export {
  validateTextInput,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePasswordsMatch,
  validateAllLoginFields,
  getFormData,
  isValidEmailFormat,
  getEmailValidationStatus
}