import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { prospectProviders } from '../../Firebase/ProspectosProvider';
import Modal from '../Tools/Modal/Modal'
import './index.css'
import { methods } from '../../Firebase/methods';
import firebase from 'firebase'
import Button from 'react-bootstrap/Button'

export default function ProspectosList() {
    const { prospectos, sethandleShowModal, setProspectoAccion, } = useContext(prospectProviders)
    const [idProspecto, setidProspecto] = useState()
    const [hideObservaciones, sethideObservaciones] = React.useState(false);
    const [data, setdata] = useState([])

    const columns =[
        {
            name: 'Nombre del prospecto',
            // selector: 'id',
            selector: 'nombreProspecto',
            sortable: true,
            grow: 0.6,
            center: true,
            //   width: '199px'
        },
        {
            name: 'Primer Apellido',
            // selector: 'first_name',
            selector: 'primerApellido',
            sortable: true,
            //   right: true,
            center: true,
            grow: 0.5,
            //   width: '150px',
        },
        {
            name: 'Segundo Apellido',
            // selector: 'last_name',
            selector: 'segundoApellido',
            sortable: true,
            //   right: true,
            grow: 0.5,
            center: true
        },
        {
            name: 'Estatus',
            selector: 'status',
            // selector: 'email',
            sortable: true,
            //   right: true,
            center: true,
        },
        {
            name: 'Acciones',
            cell: row => <Button variant="outline-success btn-sm mr-2" onClick={() => prospecto(row.id, 'evaluar')}>Evaluar</Button>,
          },
    ];
    const prospecto = (e, accion) => {
        setProspectoAccion(accion)
        setidProspecto(prev => (e))
        sethandleShowModal(true)
    }
    const paginacion = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    }
    useLayoutEffect(() => {
        setdata([prospectos][0])
        methods.dataTable(setdata, '');
    }, [prospectos])
    
    const table =
     <DataTable
        title="Lista de Prospectos"
        columns={columns}
        data={data}
        // initalData={data}
        pagination
        paginationComponentOptions={paginacion}
        fixedHeader
        striped
        pointerOnHover
        subHeader
        dense
        highlightOnHover
        onRowClicked={(rowData) => prospecto(rowData.id, 'visualizar')}
        noDataComponent= "No hay datos capturados"
        defaultPageSize={2}
    />
    // const dataTable = useRef(prospectos)
    return (
        <>
            {table}
            <Modal idProspecto={idProspecto} setidProspecto={setidProspecto} />
        </>
    )
}
