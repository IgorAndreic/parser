import {useState} from "react";

function filter({id, values, setValue}) {
  let input = <></>
  if (values != null) {
    input = (
      <input type="checkbox" onChange={setValue}>

      </input>
    )
  }

  return (
    <div className="filter" id={id}>
      { input }
    </div>
  )
}

interface __Filter__ {
  title: string,
  values: []|null
}

export default function Filters() {
  const filters_list: __Filter__[] = [
    {title: "Сайт", values: null}
  ]
  const [filters, setFilters] = useState({})

  return (
    <div id="filters" className="p-2">

    </div>
  )
}