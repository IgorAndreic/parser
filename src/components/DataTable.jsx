import {useParams} from "react-router-dom";
import axiosInstance from "../api/axiosInstance"
import {useState, useEffect} from "react";

function DataObj({data}) {
  let data_out = ""
  if (typeof data == "object" && data != null) {
    if (Array.isArray(data)) {
      console.log(data)
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
  } else {
    data_out = JSON.stringify(data)
  }

  return (
    <th>
      {data_out}
    </th>
  )
}

function DataLine({line}) {
  console.log(line)
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(table_name);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [table_name]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              data.results && data.results[0] &&
              Object.keys(data.results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.results &&
            Object.values(data.results).map((line, id) => <DataLine key={id} line={line} />)
          }
        </tbody>
      </table>
    </>
  )
}