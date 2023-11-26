import { Entity } from '@/shared/domain/entities/entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemoryRepository } from '../../in-memory.repository'

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('In memory repository unit tests', () => {
  let sut: StubInMemoryRepository
  let entity: StubEntity

  beforeEach(() => {
    sut = new StubInMemoryRepository()
    entity = new StubEntity({ name: 'test name', price: 10 })
  })

  test('should insert a new entity', async () => {
    await sut.insert(entity)
    expect(sut.items.length).toBe(1)
    expect(sut.items[0]).toBe(entity)
    expect(sut.items[0].toJSON()).toStrictEqual(entity.toJSON())
  })

  test('should throw NotFoundError when entity is not found', async () => {
    const id = 'non-existent-id'
    const action = async () => {
      await sut.findById(id)
    }
    await expect(action).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  test('should find an entity by id', async () => {
    sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(result).toEqual(entity)
    expect(sut.items[0].toJSON()).toStrictEqual(result.toJSON())
  })

  test('should return all entities', async () => {
    const entity2 = entity
    sut.insert(entity)
    sut.insert(entity2)

    const result = await sut.findAll()

    expect(result).toEqual([entity, entity2])
    expect(result.length).toBe(2)
    expect(result[0].toJSON()).toStrictEqual(entity.toJSON())
    expect(result[1].toJSON()).toStrictEqual(entity2.toJSON())
  })

  test('should throw NotFoundError when updating an non existent entity', async () => {
    const action = async () => {
      await sut.update(entity)
    }
    await expect(action).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('should update an entity', async () => {
    await sut.insert(entity)

    const updatedEntity = new StubEntity(
      {
        name: 'Updated Entity',
        price: 15,
      },
      entity.id,
    )

    await sut.update(updatedEntity)

    const result = await sut.findById(entity.id)

    expect(result).toEqual(updatedEntity)
    expect(result.toJSON()).toStrictEqual(updatedEntity.toJSON())
  })

  test('Should delete an entity', async () => {
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toHaveLength(0)
  })

  test('Deleting an entity with a non-existent ID', async () => {
    await expect(() => sut.delete('fake-id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  test('should return the index of an entity', async () => {
    sut.items = [entity]
    const index = sut['_getIndex'](entity._id)
    expect(index).toBe(0)
  })

  // test('should throw an error when inserting an entity with a duplicate ID', async () => {
  //   await sut.insert(entity)
  //   await expect(sut.insert(entity)).rejects.toThrow(NotFoundError)
  // })

  test('should return an empty array when the repository is empty', async () => {
    expect((await sut.findAll()).length).toBe(0)
  })
})
