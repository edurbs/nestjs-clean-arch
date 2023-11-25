import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { UserDataBuilder } from '../../../testing/helpers/user-data-builders'
import { UserEntity, UserProps } from '../../user.entity'
describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
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
  })
})
