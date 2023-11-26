import { SearcheableRepositoryInterface } from '../../../shared/domain/repositories/searcheable-repository-contracts'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository
  extends SearcheableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
