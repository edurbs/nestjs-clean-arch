import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  id: number
}

class StubEntity extends Entity<StubProps> {}

describe('Abstract entitty unit tests', () => {
  it('should set props and id ', () => {
    const props = { prop1: 'value1', id: 15 }
    const sut = new StubEntity(props)
    expect(sut.props).toStrictEqual(props)
    expect(sut.id).not.toBeNull()
    expect(uuidValidate(sut.id)).toBeTruthy()
  })

  it('should accept a valid uuid', () => {
    const props = { prop1: 'value1', id: 15 }
    const id = 'd6a3814f-31af-4c4d-b0d0-3fa483edfae6'
    const sut = new StubEntity(props, id)
    expect(uuidValidate(sut.id)).toBeTruthy()
    expect(sut.id).toBe(id)
  })

  it('should convert a entity to a JSON', () => {
    const props = { prop1: 'value1', id: 15 }
    const id = 'd6a3814f-31af-4c4d-b0d0-3fa483edfae6'
    const sut = new StubEntity(props, id)

    expect(sut.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
