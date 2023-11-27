import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: SortDirection | null
  filter: Filter | null
}

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly lastPage: number
  readonly sort: string | null
  readonly sortDir: SortDirection | null
  readonly filter: Filter | null

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export class SearchParams {
  private _page: number
  private _perPage: number
  private _sort: string | null
  private _sortDir: SortDirection | null
  private _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page ?? 1
    this.perPage = props.perPage ?? 15
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  get page(): number {
    return this._page
  }

  private set page(value: number) {
    this._page = value <= 0 || !value ? 1 : Math.trunc(value)
  }

  get perPage(): number {
    return this._perPage
  }

  private set perPage(value: number) {
    this._perPage = value <= 0 || !value ? this._perPage : Math.trunc(value)
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort = !value ? null : value
  }

  get sortDir(): string | null {
    return this._sortDir
  }

  private set sortDir(value: string | null) {
    if (!value || !this.sort) {
      this._sortDir = null
      return
    }
    const sort = value.toLowerCase()
    this._sortDir = sort !== 'asc' && sort !== 'desc' ? 'desc' : sort
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(value: string | null) {
    this._filter = !value ? null : value
  }
}

export interface SearcheableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>
}
