export interface __filter__ {
  [key: string]: [] | null
}

export interface __filter_list__ {
  [key: string]: __filter__[]
}

class FiltersStorage {
  filters = JSON.parse(localStorage.getItem('filters')) || {}

  setFilters(filters: __filter_list__, page: string) {
    this.filters[page] = filters
    localStorage.setItem('filters', JSON.stringify(this.filters))
  }

  getFilters() {
    return this.filters
  }
}

export const filtersStore = new FiltersStorage()