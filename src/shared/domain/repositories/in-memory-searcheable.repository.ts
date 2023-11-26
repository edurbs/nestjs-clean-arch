import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory.repository'
import { SearcheableRepositoryInterface } from './searcheable-repository-contracts'

export abstract class InMemorySearcheableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearcheableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

}
