import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { prospectProviders } from '../../Firebase/ProspectosProvider';
import * as Yup from 'yup';
import { FcPlus } from "react-icons/fc";
import { IconContext } from "react-icons";
import Button from 'react-bootstrap/Button'

export default function Prospectos({ idProspecto, sethandleShowModal }) {
    const { getDataIdProspecto, handledSaveProspect, handledUpdateProspect, prospectoAccion } = useContext(prospectProviders)
    // Get data 
    const [dataIdProspecto, setDataIdProspecto] = useState({
        nombreProspecto: '',
        primerApellido: '',
        segundoApellido: '',
        calle: '',
        numero: '',
        colonia: '',
        codigoPostal: '',
        telefono: '',
        rfc: '',
        // documentoName: '',
        // documento: '',
        observaciones: '',
        status: '',
        documentos: ''
    })
    const formikRef = useRef(dataIdProspecto)
    const [updateDatas, setupdateDatas] = useState([])
    // Toast to notifications
    const { addToast } = useToasts()
    // Context of ProspectsProvider component
    const [id, setid] = useState(0)
    // Save the document to create Form documents inputs 
    const [documentos, setDocumentos] = useState([])
    const [documentos1, setDocumentos1] = useState([])

    const [arr, setArr] = useState([])
    useEffect(() => {
        if (idProspecto) {
            getDataIdProspecto(idProspecto, setDataIdProspecto)
        }
    }, [])
    const validated = val => {
        addToast(`Capturar todos los campos con '*' son obligatorios`, { appearance: 'error', autoDismiss: true })
    }
    const HideModal = (values, resetForm, idProspecto) => {
        values = { ...values, 'documentos': documentos1 }
        // idProspecto ? handledUpdateProspect(updateDatas, idProspecto) : handledSaveProspect(values)
        handledSaveProspect(values)
        sethandleShowModal(false)
        resetForm()
        // alert(JSON.stringify(values));
    }
    function validations(value) {
        let error;
        if (!value) {
            error = 'Campo Requerido';
        }
        return error;
    }

    const add = (e) => {
        e.preventDefault()
        // let prospectsObj = {...document, input }
        // documentoName
        const document = id;
        let newDocumentInput = { ...dataIdProspecto, [`documentoName${id}`]: '', [`documento${id}`]: '' }
        // let obj = { ...documentos1, [e.target.name]: e.target.value }
        // setDataIdProspecto(newDocumentInput)
        // console.log("newDocumentInput: ", newDocumentInput);
        // let obj = [...documentos, id]
        let obj = [...documentos, id]
        // //console.log(obj[1]);
        // setDocumentos(() => [...documentos, document, id]);
        setDocumentos(obj);
        // setDataIdProspecto({...dataIdProspecto, 'documentos': id})
        setid(id + 1)
    }
    useEffect(() => {
        // alert(JSON.stringify(documentos));
        // alert(JSON.stringify(dataIdProspecto));
    }, [id])
    const fieldChanges = (e) => {
        // console.log('value: ',e.target.files);
        let documentoName = `documentoName${id - 1}`;
        let documento = `documento${id - 1}`;
        // console.log(e.target.name == documentoName, 'e.target.name: '+e.target.name, "documentoName: "+documentoName);
        if (e.target.name == documentoName) {
            // let obj = { ...documentos1, [id - 1]: { [e.target.name]: e.target.value } }
            setDocumentos1({
                ...documentos1,
                [id - 1]:
                {
                    'nombre': e.target.value,
                }
            })
            // setDocumentos1(obj)
            // alert(JSON.stringify(documentos1));
            // dataIdProspecto.documentos = obj
            // console.log(dataIdProspecto.documentos);
            // setDataIdProspecto({ ...dataIdProspecto, [e.target.name]: e.target.value, 'documentos': obj })
        }
        if (e.target.name == documento) {
            // console.log();
            // let obj = { ...documentos1, [id-1]:{[e.target.name]: e.target.files[0] }}
            let name = id-1
            // console.log(documentos1[id-1]);
            setDocumentos1({
                ...documentos1,
                [id - 1]:
                {
                    ...documentos1[id-1],
                    'documento': e.target.files[0]
                }
            })
            // documentos1.row = {[e.target.name]: e.target.files[0] }
            // setDocumentos1(obj)
            // alert(JSON.stringify(documentos1));
            // dataIdProspecto.documentos = obj
            // setDataIdProspecto({ ...dataIdProspecto, [e.target.name]: e.target.value, 'documentos': obj })
        }
        let aux = updateDatas;
        let obj = { ...aux, [e.target.name]: e.target.value }
        setupdateDatas(obj)
    }

    useEffect(() => {
        console.log(documentos1);
    }, [documentos1])

    const handleAtorizar = () => {
        let obj = { ...updateDatas, 'status': 'Autorizado' }
        handledUpdateProspect(obj, idProspecto);
        getDataIdProspecto(idProspecto, setDataIdProspecto)
    }
    const handleRechazar = () => {
        // if(initialValues.observaciones.length)
        if (dataIdProspecto.observaciones.length == 0) {
            if (!updateDatas.observaciones) {
                addToast(`Captura el campo: Observaciones, es obligatorio *`, { appearance: 'error', autoDismiss: true })
                // alert(JSON.stringify(updateDatas.observaciones));
            }
        }
        else {
            let obj = { ...updateDatas, 'status': 'Rechazado' }
            handledUpdateProspect(obj, idProspecto);
            getDataIdProspecto(idProspecto, setDataIdProspecto)
            setupdateDatas([])
        }
    }
    useEffect(() => {
        // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
        // console.log("values: ", formikRef);
        // console.log("values: ", updateDatas);
    }, [formikRef.current]);

    // const validate = values => {
    //     const errors = {};
      
    //     if (!values.telefono) {
    //         errors.telefono = 'Required';
    //         console.log(values.telefono);
    //     } else if (values.telefono.length > 2) {
    //         alert(values.telefono.length);
    //       errors.firstName = 'Must be 15 characters or less';
    //     }
      
    //     return errors;
    //   };
    return (
        <>
            <Formik
                // validate={validate}
                innerRef={formikRef}
                enableReinitialize
                initialValues={dataIdProspecto}
                onSubmit={(values, { resetForm }) => HideModal(values, resetForm, idProspecto)}
                validationSchema={Yup.object(
                    {
                        telefono: Yup.string()
                        .max(10, 'Este campo solo acepta mximo 10 caracteres')
                        // nombreProspecto: Yup.string()
                        //     .required(() => validated('nombreProspecto')),
                        // observaciones: Yup.string()
                        //     .required(() => validated('observaciones')),
                    }
                )
                }
            >
                {/* <form onSubmit={formik.handleSubmit}> */}
                <Form>
                    {/* <span>{(idProspecto) ? idProspecto : 'nada'}</span> */}
                    {/* <span>{(dataIdProspecto) ? (JSON.stringify(dataIdProspecto)) : 'nada'}</span> */}
                    <div className="col-md-10 mb-3 d-flex justify-content-between">
                        <div>
                            <label htmlFor="status" className="mr-2">Estatus</label>
                            <Field name="status" type="text" className={`text-white text-center ${dataIdProspecto.status == 'Autorizado' ? 'bg-success' : dataIdProspecto.status == 'Rechazado' ? 'bg-danger' : dataIdProspecto.status == 'Enviado' ? 'bg-secondary' : ''}`} disabled />
                        </div>
                        {/* {dataIdProspecto.status != '' && dataIdProspecto.status == 'Enviado' ? */}
                        {prospectoAccion == 'evaluar' ?
                            <div className="col-md-8">
                                <Button variant="outline-success btn-sm mr-2" onClick={() => handleAtorizar()}>Autorizar</Button>
                                <Button variant="outline-danger btn-sm" onClick={() => handleRechazar()}>Rechazar</Button>
                            </div>
                            : ''}
                    </div>
                    <div className="form-row m-1">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="nombreProspecto">Nombre del prospecto<b className="text-danger">*</b></label>
                            <Field name="nombreProspecto" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="nombreProspecto" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="primerApellido">Primer apellido<b className="text-danger">*</b></label>
                            <Field name="primerApellido" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="primerApellido" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="segundoApellido">Segundo Apellido</label>
                            <Field name="segundoApellido" type="text" className="form-control" onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                        </div>
                        <div className="col-md-5 mb-3">
                            <label htmlFor="calle">Calle<b className="text-danger">*</b></label>
                            <Field name="calle" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="calle" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="numero">Número<b className="text-danger">*</b></label>
                            <Field name="numero" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="numero" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="colonia">Colonia<b className="text-danger">*</b></label>
                            <Field name="colonia" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="colonia" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="codigoPostal">CP<b className="text-danger">*</b></label>
                            <Field name="codigoPostal" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="codigoPostal" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="telefono">Teléfono<b className="text-danger">*</b></label>
                            <Field name="telefono" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} maxLength="10" />
                            <ErrorMessage name="telefono" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-5 mb-3">
                            <label htmlFor="rfc">RFC<b className="text-danger">*</b></label>
                            <Field name="rfc" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="rfc" component="span" className="text-danger" />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="documentos">Documentos</label>
                            <IconContext.Provider value={{ size: '1em', className: 'mb-2' }}>
                                <span onClick={(e) => add(e)}>{dataIdProspecto.status != '' ? '' : <FcPlus />}</span>
                            </IconContext.Provider>
                        </div>
                        <div className="col-md-12 mb-3">
                            {documentos.map(id => {
                                return (
                                    <span key={id} className="form-row mb-3 d-flex align-items-center text-center">
                                        <div className="form-row col-md-6 mb-3 ml-5">
                                            <label htmlFor={`documentoName${id}`}>Nombre del documento<b className="text-danger">*</b></label>
                                            <Field name={`documentoName${id}`} type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} />
                                            <ErrorMessage name={`documentoName${id}`} component="span" className="text-danger" />
                                        </div>
                                        <div className="col-md-5 mt-3">
                                            <Field name={`documento${id}`} type="file" className="form-control-file" onChange={e => {setTimeout(e.target.select.bind(fieldChanges(e)))}}/>
                                            {/* <input name={`documento${id}`} type="file" className="form-control-file" onChange={e => {setTimeout(e.target.select.bind(fieldChanges(e)))}}/> */}
                                            <ErrorMessage name={`documento${id}`} component="span" className="text-danger" />
                                        </div>
                                    </span>
                                )
                            })}
                            {dataIdProspecto.documentos ?
                                <span className="form-row mb-3">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Documento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(dataIdProspecto.documentos).map((value,key) => {
                                                return(
                                                    <tr key={key}> 
                                                        <td>{value.nombre}</td>
                                                        <td><a href={value.documento} target="_blank"><span className="text-dark">{value.documento}</span></a></td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </span>
                                : ''}
                        </div>
                        {prospectoAccion == 'evaluar' ?
                            <div className="col-md-12 mb-3">
                                <label htmlFor="observaciones">Observaciones<b className="text-danger">*</b></label>
                                <Field name="observaciones" type="text" className="form-control" onBlur={e => fieldChanges(e)} required />
                                <ErrorMessage name="observaciones" component="span" className="text-danger" />
                            </div> : ''}
                    </div>
                    <div className="text-center">
                        {/* <button className="btn bg-primary" type="submit">Enviar</button> */}
                        {dataIdProspecto.status == '' ? <Button variant="primary" type="submit">Guardar Prospecto</Button>: ''}
                    </div>
                </Form>
            </Formik>
        </>
    )
}
