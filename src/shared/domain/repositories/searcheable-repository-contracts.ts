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

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page
    this.perPage = props.perPage
    this.sort = props.sort
    this.sortDir = props.sortDir
    this.filter = props.filter
  }

  get page(): number {
    return this._page
  }

  private set page(value: number) {
    let page = value
    if (page <= 0 || !page) {
      page = 1
    }
    this._page = Math.trunc(page)
  }

  get perPage(): number {
    return this._perPage
  }

  private set perPage(value: number) {
    let perPage = value
    if (perPage <= 0 || !perPage) {
      perPage = this._perPage
    }
    this._perPage = Math.trunc(perPage)
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort = value === null || value === '' ? null : `${value}`
  }

  get sortDir(): SortDirection | null {
    return this._sortDir
  }

  private set sortDir(value: SortDirection | null) {
    if (!value) {
      this._sortDir = null
      return
    }
    const dir = value.toLowerCase()
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(value: string | null) {
    if (!value) {
      this._filter = null
      return
    }
    this._filter = value
    //this._filter = value === null || value === '' ? null : value
  }
}

export interface SearcheableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}
