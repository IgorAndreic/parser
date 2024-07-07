import {useParams} from "react-router-dom";
import {filtersStore, __filter_list__, __filter__} from "../stores/filtersStorage";

function Filter({filter}) {
  const title = Object.keys(filter)[0]
  const values = filter[title]

  let input = <></>
  if (values != null) {
    input = (
      <input style={{borderWidth: "2px"}} type="checkbox">

      </input>
    )
  } else {
    input = <input style={{borderWidth: "2px"}} type="text" />
  }

  return (
    <div className="filter m-1 flex justify-between" style={{width:"280px"}} id={title}>
      <label htmlFor="input" className="mr-2">{title}</label>
      { input }
    </div>
  )
}

export default function Filters() {
  const filters_list: __filter_list__ = {
    "product": [
      {"Синонимы": null},
      {"Связь": null},
      {"Конкурент": null}
    ]
  }
  const { table_name } = useParams()
  const this_filters = filters_list[table_name]

  function saveFilters(e) {
    let filters = {}

    // @ts-ignore
    for (const i of document.querySelectorAll(".filter")){
      const filter_title = i.id
      const filter_value = JSON.stringify(document.querySelector(`.filter#${filter_title} input`).value)

      filters[filter_title] = filter_value
      filtersStore.setFilters(filters, table_name)
    }
  }

  return (
    <div id="filters" className="p-2">
      {
        this_filters.map((f, id) => <Filter key={id} filter={f}/> )
      }
      <div className="set" onClick={saveFilters}>
        <p>Применить</p>
      </div>
    </div>
  )
}