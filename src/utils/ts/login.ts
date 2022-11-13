import { loginUserData, registerUserData } from '../../types/index'

export const validation = (userData: loginUserData | registerUserData): boolean => {
  // const validateResults = {
  //   email: true,
  //   name: true,
  //   password: true,
  //   confirmPassword: true,
  // }
  // // Keys
  // for (const prop in userData) {
  //   switch (prop) {
  //     case 'email':
  //       // email check
  //     case 'name':
  //       validateResults[prop] = userData[prop].length > 0
  //       break
  //     case 'password':
  //       validateResults[prop] = userData[prop].length > 6
  //       break
  //     case 'confirmPassword':
  //       validateResults[prop] = userData[prop] === userData.password
  //       break
  //     default: false
  //   }
  // }

  // return validateResults

  // Keys
  let isValid = true

  for (const prop in userData) {
    if (!(prop in userData)) continue

    switch (prop) {
      case 'email':
        isValid = userData[prop].length > 4 && !!userData[prop].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        break
      case 'password':
        isValid = userData[prop].length >= 6
        break
      case 'confirmPassword':
        isValid = userData[prop as keyof typeof userData] === userData.password
        break
      case 'name':
        isValid = userData[prop as keyof typeof userData].length > 0
        break
      default: false
    }

    if (!isValid) break
  }

  return isValid
}
