import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { prospectProviders } from '../../Firebase/ProspectosProvider';
import Modal from '../Tools/Modal/Modal'
import './index.css'

export default function ProspectosList() {
    const { prospectos, sethandleShowModal, getAllProspects } = useContext(prospectProviders)
    const [idProspecto, setidProspecto] = useState()
    const [hideObservaciones, sethideObservaciones] = React.useState(false);
    const [data, setdata] = useState([prospectos][0])
    // const test =[([Object.keys(prospectos).map(key => {
    //     console.log(prospectos[key].observaciones);
    //     // return (prospectos[key])
    // })][0])][0]
    // const data = 
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
    ];
    const prospecto = (e) => {
        setidProspecto(prev => (e))
        sethandleShowModal(true)
    }
    const paginacion = {
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    }
    useEffect(() => {
        // getAllProspects()
        // setdata([prospectos][0])
    }, [])
    useLayoutEffect(() => {
        setdata([prospectos][0])
    }, [prospectos])
    
    const table =
     <DataTable
        title="Lista de Prospectos"
        columns={columns}
        data={data}
        initalData={data}
        pagination
        paginationComponentOptions={paginacion}
        fixedHeader
        striped
        pointerOnHover
        subHeader
        dense
        highlightOnHover
        onRowClicked={(rowData) => prospecto(rowData.id)}
        noDataComponent= "No hay datos capturados"
    />
    const dataTable = useRef(prospectos)
    // useEffect(() => {
    //     // data = [prospectos][0]
    //     setdata([prospectos][0])
    // }, [data])
    useEffect(() => {
        // data = [prospectos][0]
        // setdata([prospectos][0])
    }, [data])
    //console.log(table.props.data);

    return (
        <>
            {table}
            {/* <Modal dataprospecto={dataprospecto.id}/> */}
            <Modal idProspecto={idProspecto} setidProspecto={setidProspecto} />
        </>
    )
}
