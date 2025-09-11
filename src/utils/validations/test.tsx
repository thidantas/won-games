import { signInValidate, signUpValidate } from './validators'

describe('validations', () => {
  describe('singInValidate()', () => {
    it('should validate empty fileds', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })

    it('should validate invalid email', () => {
      const values = { email: 'email', password: 'XXXXXXXX' }

      expect(signInValidate(values)).toMatchInlineSnapshot(`
        {
          "email": ""email" must be a valid email",
        }
      `)
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fileds', () => {
      const values = { username: '', email: '', password: '' }

      expect(signUpValidate(values)).toMatchObject({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        confirm_password: expect.any(String)
      })
    })

    it('should return short username error', () => {
      const values = { username: 'bla', email: '', password: '' }

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `""username" length must be at least 5 characters long"`
      )
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'johndoe',
        email: 'invalid-email',
        password: ''
      }

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `""email" must be a valid email"`
      )
    })

    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'johndoe',
        email: 'johndoe@email.com',
        password: '1234',
        confirm_password: '4321'
      }

      expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(
        `"confirm password does not match with password"`
      )
    })
  })
})
