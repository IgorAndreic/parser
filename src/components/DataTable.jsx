import {useParams} from "react-router-dom";
import axiosInstance from "../api/axiosInstance"
import {useState, useEffect} from "react";
import {filtersStore} from "../stores/filtersStorage";
import login from "./Login.jsx";

// eslint-disable-next-line react/prop-types
function DataObj({data}) {
  let data_out = ""
  if (typeof data == "object" && data != null) {
    if (Array.isArray(data)) {
      for (let i in Object.values(data)) {
        if (typeof data[i] == "object" && data[i] != null) {
          const vals = Object.values(data[i])
          for (let i in Object.keys(vals)) {
            data_out += `${(vals[i])}\n`
          }
        }
      }
    } else {
      const vals = Object.values(data)
      for (let i in Object.keys(vals)) {
        data_out += `${(vals[i])}\n`
      }
    }
  } else if (typeof data === "boolean") {
    data_out = JSON.stringify(data)
  } else {
    data_out = JSON.parse(JSON.stringify(data))
  }

  return (
    <th>
      {data_out}
    </th>
  )
}

// eslint-disable-next-line react/prop-types
function DataLine({line}) {
  return (
    <tr>
      {
        line &&
        Object.values(line).map((data, key) => <DataObj key={key} data={data}/>)
      }
    </tr>
  )
}

export default function DataTable() {
  const { table_name } = useParams()
  const [data, setData] = useState({})

  async function fetchData() {
    try {
      const response = await axiosInstance.get(table_name);
      setData(response.data.results);

      const filter = await filtersStore.getFilters()[table_name]

      if (table_name === "product") {
        if (filter["Синонимы"]) {
          setData(prevState => prevState.filter(obj => {
            return obj.synonyms === filter["Синонимы"]
        }))}
        if (filter["Связь"]) {
          setData(prevState => prevState.filter(obj => {
            return obj.linked_id === filter["Связь"]
        }))}
        if (filter["Конкурент"]) {
          setData(prevState => prevState.filter(obj => {
            return obj.author.username === filter["Конкурент"]
        }))}
      } else if (table_name === "product_price") {
        if (filter["Товар"]) {
          setData(prevState => prevState.filter(obj => {
            return filter["Товар"] === obj.product.id || filter["Товар"] === obj.product.name
        }))}
        if (filter["Задача"]) {
          setData(prevState => prevState.filter(obj => {
            return filter["Задача"] === obj.task.id || filter["Задача"] === obj.task.name
        }))}
        if (filter["Настройка"]) {
          setData(prevState => prevState.filter(obj => {
            return filter["Настройка"] === obj.parse_settings.id || filter["Настройка"] === obj.parse_settings.domain
        }))}
        if (filter["Статус"]) {
          // TODO настроить
          setData(prevState => prevState.filter(obj => {
            return obj
        }))}
      } else if (table_name === "parse_task") {
        if (filter["Статус"]) {
          setData(prevState => prevState.filter(obj => {
            return filter["Статус"] === obj.status
        }))}
        if (filter["Название"]) {
          setData(prevState => prevState.filter(obj => {
            return filter["Название"] === obj.name
        }))}
        if (filter["Дата (с)"]) {
          setData(prevState => prevState.filter(obj => {
            return new Date(filter["Дата (с)"]) === new Date(obj.last_run_at)
        }))}
        if (filter["Дата (до)"]) {
          setData(prevState => prevState.filter(obj => {
            return new Date(filter["Дата (до)"]) === new Date(obj.last_run_at)
        }))}
      } else if (table_name === "parse_settings") {
        console.log("Фильтров нет")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [table_name]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              data && data[0] &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data &&
            Object.values(data).map((line, id) => <DataLine key={id} line={line} />)
          }
        </tbody>
      </table>
    </>
  )
}