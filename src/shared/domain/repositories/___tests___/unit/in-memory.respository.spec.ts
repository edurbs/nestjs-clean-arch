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

  // class TestEntity extends Entity {};

  // describe('StubInMemoryRepository', () => {
  //   let repository: StubInMemoryRepository<TestEntity>

  //   beforeEach(() => {
  //     repository = new StubInMemoryRepository<TestEntity>()
  //   })

  //   it('should update an entity', async () => {
  //     const entity = new TestEntity()
  //     entity.id = '1'
  //     await repository.insert(entity)

  //     const updatedEntity = new TestEntity()
  //     updatedEntity.id = '1'
  //     updatedEntity.name = 'Updated Entity'

  //     await repository.update(updatedEntity)

  //     const result = await repository.findById('1')

  //     expect(result).toEqual(updatedEntity)
  //   })
  // })

  // test('Should delete an entity', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository()
  //   const entity = { id: '1', name: 'Entity 1' }
  //   await repository.insert(entity)

  //   // Act
  //   await repository.delete('1')

  //   // Assert
  //   expect(repository.items.length).toBe(0)
  //   expect(repository.items.find(item => item.id === '1')).toBeUndefined()
  // })

  // test('should return the index of an entity', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository() {}
  //   const entity = { id: '1' }
  //   repository.items = [entity]

  //   // Act
  //   const index = repository._getIndex('1')

  //   // Assert
  //   expect(index).toBe(0)
  // })

  // test('should throw an error when inserting an entity with a duplicate ID', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository() {}
  //   const entity = { id: '1', name: 'Entity 1' }
  //   await repository.insert(entity)

  //   // Act
  //   const insertDuplicate = async () => {
  //     await repository.insert(entity)
  //   }

  //   // Assert
  //   await expect(insertDuplicate()).rejects.toThrow(NotFoundError)
  // })

  // test('should return an empty array when the repository is empty', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository()

  //   // Act
  //   const result = await repository.findAll()

  //   // Assert
  //   expect(result).toEqual([])
  // })

  // test('Updating an entity with a non-existent ID', async () => {
  //   // Arrange
  //   const repository = new TestRepository()
  //   const entity = new TestEntity('1', 'Test')

  //   // Act & Assert
  //   await expect(repository.update(entity)).rejects.toThrow(NotFoundError)
  // })

  // test('Deleting an entity with a non-existent ID', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository()
  //   const id = 'non-existent-id'

  //   // Act
  //   try {
  //     await repository.delete(id)
  //   } catch (error) {
  //     // Assert
  //     expect(error).toBeInstanceOf(NotFoundError)
  //     expect(error.message).toBe('Entity not found')
  //   }
  // })

  // test('should throw NotFoundError when deleting an entity with a valid ID but not present in the repository', async () => {
  //   // Arrange
  //   const repository = new StubInMemoryRepository()
  //   const entityId = '1'

  //   // Act & Assert
  //   await expect(repository.delete(entityId)).rejects.toThrow(NotFoundError)
  // })
})
