import * as React from "react"
import Table from "react-bootstrap-table-next"
import cellEditFactory from 'react-bootstrap-table2-editor'
import { registerUrl, deleteUrl } from '../utils/api'

function UrlTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        text: 'Shortened Url',
        dataField: 'short',
      },
      {
        text: 'Destination Url',
        dataField: 'dest',
      },
    ],
    []
  )

  if (!data) {
    return (<p className="text-danger text-center">Could not get urls</p>)
  }

  return (
    <Table keyField='short'
             data={data}
             columns={columns}
             cellEdit={cellEditFactory({
               mode: 'click',
               afterSaveCell: (oldValue, newValue, row, _) => {
                 newValue === "" ? deleteUrl(row.short).then(_ => window.location.reload(false))
                   : registerUrl(row.short, newValue).then(_ => window.location.reload(false))
               }
             })
             }
      />
  )
}

export default UrlTable
