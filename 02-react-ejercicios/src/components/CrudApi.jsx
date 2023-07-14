import { useState, useEffect } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import { helpHttp } from '../helpers/helpHttp'
import Loader from './Loader'
import Message from './Message'

const CrudApi = () => {
  const [db, setDb] = useState([])
  const [dataToEdit, setDataToEdit] = useState(null)

  const api = helpHttp()
  const url = 'http://localhost:5000/santos'

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res)
      } else {
        setDb(null)
      }
    })
  }, [])

  const createData = (data) => {
    data.id = Date.now()

    setDb([...db, data])
  }

  const updateData = (data) => {
    const newData = db.map((el) => (el.id === data.id ? data : el))
    setDb(newData)
  }

  const deleteData = (id) => {
    const isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id ${id}`
    )

    if (isDelete) {
      const newData = db.filter((el) => el.id !== id)
      setDb(newData)
    }
  }

  return (
    <div>
      <h2>CRUD Api</h2>
      <article className='grid-1-2'>
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
        <Loader />
        <Message />
      </article>
    </div>
  )
}

export default CrudApi
