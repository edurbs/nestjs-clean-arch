import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory.repository'
import {
  SearchParams,
  SearchResult,
  SearcheableRepositoryInterface,
  SortDirection,
} from './searcheable-repository-contracts'

export abstract class InMemorySearcheableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearcheableRepositoryInterface<E, any, any>
{
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir,
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir as SortDirection,
      filter: props.filter,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: string | null,
  ): Promise<E[]> {
    throw new Error('Method not implemented.')
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {
    throw new Error('Method not implemented.')
  }
}
