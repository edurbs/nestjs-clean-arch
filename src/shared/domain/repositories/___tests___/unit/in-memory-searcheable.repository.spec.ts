import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearcheableRepository } from '../../in-memory-searcheable.repository'

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearcheableRepository extends InMemorySearcheableRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
}

describe('In memory repository unit tests', () => {
  let sut: StubInMemorySearcheableRepository
  let entity: StubEntity
  beforeEach(() => {
    sut = new StubInMemorySearcheableRepository()
    entity = new StubEntity({
      name: 'test',
      price: 10,
    })
  })

  describe('applyFilter method', () => {
    it('should return all items when filter is null', () => {})
  })

  describe('applySort method', () => {})

  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
