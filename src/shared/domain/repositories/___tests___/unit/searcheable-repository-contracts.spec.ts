import {
  SearchParams,
  SearchResult,
  SortDirection,
} from '../../searcheable-repository-contracts'

describe('Searcheable repository unit tests', () => {
  describe('SearchParams tests', () => {
    const pageParams: { page: number }[] = [
      { page: 0 },
      { page: -1 },
      { page: 1 },
    ]

    describe('Page property', () => {
      it('Should set page property with 1 when no value is provided', () => {
        const sut = new SearchParams()
        expect(sut.page).toBe(1)
      })

      it('should set page property when a valid is provided', () => {
        const sut = new SearchParams({ page: 2 })
        expect(sut.page).toBe(2)
      })

      it('should set page property with integer number when a float number is provided', () => {
        const sut = new SearchParams({ page: 5.6 })
        expect(sut.page).toBe(5)
      })

      it('Should set page property with provided value', () => {
        pageParams.forEach(i => {
          expect(new SearchParams({ page: i.page }).page).toEqual(1)
        })
      })
    })

    describe('perPage property', () => {
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

    describe('sort property', () => {
      it('Should set sort property with null when no value is provided', () => {
        const sut = new SearchParams()
        expect(sut.sort).toBeNull()
      })
      it('Should set sort property with null when empty value is provided', () => {
        const sut = new SearchParams({ sort: '' })
        expect(sut.sort).toBeNull()
      })
      it('should set sort property when a valid is provided', () => {
        const sut = new SearchParams({ sort: 'name' })
        expect(sut.sort).toBe('name')
      })
    })

    describe('sortDir property', () => {
      it('Should set sortDir property with null when no value is provided', () => {
        const sut = new SearchParams()
        expect(sut.sortDir).toBeNull()
      })

      it('should set sortDir property with desc when desc is provided', () => {
        const sut = new SearchParams({ sort: 'someValue', sortDir: 'desc' })
        expect(sut.sortDir).toBe('desc')
      })
      it('should set sortDir property with asc when asc is provided', () => {
        const sut = new SearchParams({ sort: 'someValue', sortDir: 'asc' })
        expect(sut.sortDir).toBe('asc')
      })

      it('should set sortDir property with null when sort property if not provided ', () => {
        const sut = new SearchParams({ sortDir: 'asc' })
        expect(sut.sortDir).toBeNull()
      })
    })

    describe('filter property', () => {
      it('Should set filter property with null when no value is provided', () => {
        const sut = new SearchParams()
        expect(sut.filter).toBeNull()
      })

      it('should set filter property when a valid value is provided', () => {
        const sut = new SearchParams({ filter: 'someValue' })
        expect(sut.filter).toBe('someValue')
      })
    })
  })

  describe('SearchResult tests', () => {
    it('should create a search result with valid values', () => {
      const sortDirection: SortDirection = 'asc'
      const props = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: sortDirection,
        filter: 'test',
      }
      const sut = new SearchResult(props)
      const result = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: sortDirection,
        filter: 'test',
        lastPage: 2,
      }
      expect(sut.toJSON()).toStrictEqual(result)
    })
    it('should create a search result with null values in properties sort, sortDir and filter', () => {
      const props = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      }
      const sut = new SearchResult(props)
      const result = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
        lastPage: 2,
      }
      expect(sut.toJSON()).toStrictEqual(result)
    })
    it('should set lastPage with 1 when total is less than perPage', () => {
      const sortDirection: SortDirection = 'asc'
      const props = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: sortDirection,
        filter: 'test',
      }
      const sut = new SearchResult(props)
      expect(sut.lastPage).toStrictEqual(1)
    })

    it('should set lastPage with the total divided by perPage, rounding it to up ', () => {
      const sortDirection: SortDirection = 'asc'
      const props = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: sortDirection,
        filter: 'test',
      }
      const sut = new SearchResult(props)
      expect(sut.lastPage).toStrictEqual(6)
    })
  })
})
