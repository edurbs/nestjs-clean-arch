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
      name: 'some name',
      price: 10,
    })
  })

  describe('applyFilter method', () => {
    let itemsToFilter: StubEntity[]
    let spyFilterMethod: jest.SpyInstance
    beforeEach(() => {
      const entity1 = new StubEntity({
        name: 'some name',
        price: 10,
      })
      const entity2 = new StubEntity({
        name: 'SOME NAME',
        price: 10,
      })
      const entity3 = new StubEntity({
        name: 'fake',
        price: 10,
      })
      itemsToFilter = [entity1, entity2, entity3]
      spyFilterMethod = jest.spyOn(itemsToFilter, 'filter')
    })

    async function doFilter(filter: string | null) {
      return await sut['applyFilter'](itemsToFilter, filter)
    }

    it('should return all items when filter is null', async () => {
      expect(await doFilter(null)).toStrictEqual(itemsToFilter)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should return filtered items when filter use upper and lower case', async () => {
      expect(await doFilter('SOME name')).toStrictEqual([
        itemsToFilter[0],
        itemsToFilter[1],
      ])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
    })

    it('should return nothing when filter dont match anything', async () => {
      expect(await doFilter('no-filter')).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
    })
  })

  describe('applySort method', () => {})

  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
