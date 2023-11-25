import { UserDataBuilder } from '../../../testing/helpers/user-data-builders'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'

let sut: UserValidator

describe('User validator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('Shoud validate with valid fields', () => {
    const props = {
      ...UserDataBuilder({}),
    }
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  describe('Name field', () => {
    it('Should not validate with all fields null', () => {
      const isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })
    it('Should not validate with null', () => {
      const props = {
        ...UserDataBuilder({}),
        name: '' as any,
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])
    })

    it('Should not validate with only number', () => {
      const props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not validate with more then 255 characters', () => {
      const props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email field', () => {
    it('Should not validate with all fields null', () => {
      const isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })
    it('Should not validate with null', () => {
      const props = {
        ...UserDataBuilder({}),
        email: '' as any,
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ])
    })

    it('Should not validate with only number', () => {
      const props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })

    it('Should not validate with more then 255 characters', () => {
      const props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      }
      const isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })
})
