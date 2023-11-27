import { SearchParams } from '../../searcheable-repository-contracts'

describe('Searcheable repository unit tests', () => {
  describe('SearchParams tests', () => {
    const pageParams = [{ page: null }, { page: 0 }, { page: -1 }, { page: 1 }]

    it('Should set page property with 1 when no value is provided', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)
    })

    it('should set page property when a valid is provided', () => {
      const sut = new SearchParams({ page: 2 })
      expect(sut.page).toBe(2)
    })

    it('should set page property with integer number when a float number is provided', () => {
      const sut = new SearchParams({ page: 5.5 })
      expect(sut.page).toBe(5)
    })

    it('Should set page property with provided value', () => {
      pageParams.forEach(i => {
        expect(new SearchParams({ page: i.page }).page).toEqual(1)
      })
    })

    it('Should set perPage property with 15 when no value is provided', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)
    })

    it('should set perPage property with integer number when a float number is provided', () => {
      const sut = new SearchParams({ perPage: 5.5 })
      expect(sut.perPage).toBe(5)
    })

    it('should set perPage property when a valid is provided', () => {
      const sut = new SearchParams({ perPage: 25 })
      expect(sut.perPage).toBe(25)
    })

    it('Should set perPage property with provided value', () => {
      pageParams.forEach(i => {
        expect(new SearchParams({ page: i.page }).perPage).toEqual(15)
      })
    })
  })
})
