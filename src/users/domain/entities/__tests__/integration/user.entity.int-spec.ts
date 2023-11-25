import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { UserDataBuilder } from '../../../testing/helpers/user-data-builders'
import { UserEntity, UserProps } from '../../user.entity'
describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('should not an error when creating a user with valid fields', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
    })

    describe('Name field', () => {
      it('should throw an error when creating a user with null name', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          name: null,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with empty name', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          name: '',
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with name with more then 255 caracters', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          name: 'a'.repeat(256),
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })

      it('should throw an error when creating a user with name with a number', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          name: 10 as any,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    describe('Email field', () => {
      it('should throw an error when creating a user with null email', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          email: null,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with empty email', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          email: '',
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with email with more then 255 caracters', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          email: 'a'.repeat(256),
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })

      it('should throw an error when creating a user with email with a number', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          email: 10 as any,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    describe('Password field', () => {
      it('should throw an error when creating a user with null password', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          password: null,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with empty password', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          password: '',
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
      it('should throw an error when creating a user with password with more then 100 caracters', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          password: 'a'.repeat(101),
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })

      it('should throw an error when creating a user with password with a number', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          password: 10 as any,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })

    describe('CreatedAt field', () => {
      it('should throw an error when creating a user with invalid createdAt', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          createdAt: '2023' as any,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })

      it('should throw an error when creating a user with createdAt with a number', () => {
        const props: UserProps = {
          ...UserDataBuilder({}),
          createdAt: 10 as any,
        }
        expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      })
    })
  })
})
