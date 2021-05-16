import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { prospectProviders } from '../../Firebase/ProspectosProvider';
import Modal from '../Tools/Modal/Modal'
import './index.css'

export default function ProspectosList() {
    const { getAllProspects, prospectos } = useContext(prospectProviders)
    // const data = [Object.keys(prospectos).map(key => {
    //     return (prospectos[key])
    // })][0]
    const data = []

    getAllProspects()
    const [idProspecto, setidProspecto] = useState([])
    const columns = [
        {
            name: 'Nombre del prospecto',
            // selector: 'id',
            selector: 'name',
            sortable: true,
            grow: 0.6,
            center: true,
            //   width: '199px'
        },
        {
            name: 'Primer Apellido',
            // selector: 'first_name',
            selector: 'surname',
            sortable: true,
            //   right: true,
            center: true,
            grow: 0.5,
            //   width: '150px',
        },
        {
            name: 'Segundo Apellido',
            // selector: 'last_name',
            selector: 'second_surname',
            sortable: true,
            //   right: true,
            grow: 0.5,
            center: true
        },
        {
            name: 'Estatus',
            selector: 'estatus',
            // selector: 'email',
            sortable: true,
            //   right: true,
            center: true,
        },
        {
            name: 'Observaciones',
            selector: 'documentos',
            sortable: true,
            //   right: true,
            center: true,
            // cell: row => <div data-tag="allowRowEvents"><div style={{ fontWeight: 'bold' }}>Name</div>Text</div>,
            cell: row => <button className="raised btn bg-primary" onClick={() => prospecto(row)}>Action</button>,
            // omit: 'true',
        },

    ];

    const prospecto = (e) => {
        setidProspecto(prev => (e))
    }
    const paginacion = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <>
            <DataTable
                title="Lista de Prospectos"
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginacion}
                fixedHeader
                striped
                pointerOnHover
                subHeader
                dense
                highlightOnHover
                onRowClicked={(rowData) => prospecto(rowData.id)}
            />
            {/* <Modal dataprospecto={dataprospecto.id}/> */}
            <Modal idProspecto={idProspecto} />
        </>
    )
}
