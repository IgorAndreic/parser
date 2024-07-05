import {useParams} from "react-router-dom";
import axiosInstance from "../api/axiosInstance"
import {useState, useEffect} from "react";

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
          {/*{*/}
          {/*  data.results.map((item, index) => (*/}
          {/*    <tr key={index}>*/}
          {/*      {*/}
          {/*        Object.values(item).map((value, i) => (*/}
          {/*          <td key={i}>{value}</td>*/}
          {/*        ))*/}
          {/*      }*/}
          {/*    </tr>*/}
          {/*  ))*/}
          {/*}*/}
        </tbody>
      </table>
    </>
  )
}