import {useParams} from "react-router-dom";

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

interface __filter__ {
  [key: string]: []|null
}

interface __filter_list__ {
  [key: string]: __filter__[]
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

    for (const i of [document.querySelectorAll(".filter input")]){

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