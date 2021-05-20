import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { prospectProviders } from '../../Firebase/ProspectosProvider';
import * as Yup from 'yup';
import { FcPlus } from "react-icons/fc";
import { IconContext } from "react-icons";

export default function Prospectos({ idProspecto, sethandleShowModal }) {
    const [id, setid] = useState(0)

    const [updateDatas, setupdateDatas] = useState([])
    // Toast to notifications
    const { addToast } = useToasts()
    // Context of ProspectsProvider component
    const { getDataIdProspecto, handledSaveProspect, handledUpdateProspect } = useContext(prospectProviders)
    // Save the document to create Form documents inputs 
    const [documentos, setDocumentos] = useState([])
    const [documentos1, setDocumentos1] = useState([])
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
    const validate = values => {
        const errors = {};
        if (!values.nombreProspecto) {
            errors.values.nombreProspecto = 'Required';
        }
        // } else if (values.length < 1) {
        //     errors.values = 'Must be 15 characters or less';
        // }
    };
    // //console.log('Prospectos', idProspecto);
    useEffect(() => {
        if (idProspecto) {
            // alert(idProspecto);
            // let res = getDataIdProspecto(idProspecto,setDataIdProspecto)
            getDataIdProspecto(idProspecto, setDataIdProspecto)
            // //console.log(dataIdProspecto);
            // dataIdProspecto.documento0 ? 
            // })
        }
    }, [])

    if (dataIdProspecto.documentos != '' && dataIdProspecto.documentos != undefined) {
        // alert(JSON.stringify(dataIdProspecto.documentos))
        let len = Object.keys(dataIdProspecto.documentos).length;
        for (let index = 0; index <= len; index++) {
            // setDocumentos(index)
            // console.log(index);
        }
        // console.log(documentos);
        // setDocumentos3()
        // console.log(dataIdProspecto.documentos);
    }
    const validated = val => {
        // addToast(`Captura los campos obligatorios *`, { appearance: 'error', autoDismiss: true })
    }
    const HideModal = (values, resetForm, idProspecto) => {
        console.log(values);
        idProspecto ? handledUpdateProspect(updateDatas, idProspecto) : handledSaveProspect(values)
        // setShow(false)
        sethandleShowModal(false)
        // alert(JSON.stringify(values));
        resetForm()
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
        const document = id;
        // let obj = [...documentos, 'documentoName-'+id]
        let obj = [...documentos, id]
        // //console.log(obj[1]);
        // setDocumentos(() => [...documentos, document, id]);
        // setDataIdProspecto({...dataIdProspecto, 'documentos': documentos})
        setDocumentos(obj);
        setid(id + 1)
    }
    if (dataIdProspecto.documentoName0) {
        let count = -1;
        Object.keys(dataIdProspecto).some(key => {
            // return (/W|^documento\W|/).test(key);
            // console.log(key);
        });
        Object.entries(dataIdProspecto).map(key => {
            if (key[0] == 'documentoName') {
                count = count + 1;
            }
            // console.log(count)
        })
        // (\W|^)documento(\W|$)

        // alert(JSON.stringify(dataIdProspecto.documentoName0));
    }
    const fieldChanges = (e) => {
        let documentoName = `documentoName-${id - 1}`;
        let documento = `documento-${id - 1}`;
        // console.log(e.target.name == documentoName, 'e.target.name: '+e.target.name, "documentoName: "+documentoName);
        if (e.target.name == documentoName) {
            let obj = { ...documentos1, [e.target.name]: e.target.value }
            setDocumentos1(obj)
            setDataIdProspecto({ ...dataIdProspecto, [e.target.name]: e.target.value, 'documentos': obj })
        }
        if (e.target.name == documento) {
            let obj = { ...documentos1, [e.target.name]: e.target.value }
            setDocumentos1(obj)
            setDataIdProspecto({ ...dataIdProspecto, [e.target.name]: e.target.value, 'documentos': obj })
        }
        let aux = updateDatas;
        let obj = { ...aux, [e.target.name]: e.target.value }
        setupdateDatas(obj)
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={dataIdProspecto}
                onSubmit={(values, { resetForm }) => HideModal(values, resetForm, idProspecto)}
                validationSchema={Yup.object({
                    nombreProspecto: Yup.string()
                        .required(() => validated('nombreProspecto')),
                    documentoName0: Yup.string()
                        .required(() => validated('nombreProspecto')),
                })}
            >
                {/* <form onSubmit={formik.handleSubmit}> */}
                <Form>
                    <span>{(idProspecto) ? idProspecto : 'nada'}</span>
                    <span>{(dataIdProspecto) ? (JSON.stringify(dataIdProspecto)) : 'nada'}</span>
                    <div className="col-md-4 mb-3 ml-auto d-flex align-content-center">
                        <label htmlFor="status" className="mt-1 ml-auto col-md-1">Estatus</label>
                        <Field name="status" type="text" className="form-control-sm col-md-5 ml-auto" disabled />
                    </div>
                    <div className="form-row m-1">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="nombreProspecto">Nombre del prospecto</label>
                            <Field name="nombreProspecto" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="nombreProspecto" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="primerApellido">Primer apellido </label>
                            <Field name="primerApellido" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="primerApellido" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="segundoApellido">Segundo Apellido</label>
                            <Field name="segundoApellido" type="text" className="form-control" onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                        </div>
                        <div className="col-md-5 mb-3">
                            <label htmlFor="calle">Calle</label>
                            <Field name="calle" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="calle" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="numero">Número</label>
                            <Field name="numero" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="numero" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="colonia">Colonia</label>
                            <Field name="colonia" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="colonia" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="codigoPostal">CP</label>
                            <Field name="codigoPostal" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="codigoPostal" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="telefono">Teléfono</label>
                            <Field name="telefono" type="number" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="telefono" component="span" className="text-danger" />
                        </div>
                        <div className="col-md-5 mb-3">
                            <label htmlFor="rfc">RFC</label>
                            <Field name="rfc" type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} disabled={dataIdProspecto.status != '' ? 'disabled' : ''} />
                            <ErrorMessage name="rfc" component="span" className="text-danger" />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="documentos">Documentos</label>
                            <IconContext.Provider value={{ size: '.5em', className: 'mb-2' }}>
                                <span onClick={(e) => add(e)}><FcPlus /></span>
                            </IconContext.Provider>
                        </div>
                        <div className="col-md-12 mb-3">
                            {documentos.map(id => {
                                return (
                                    <span key={id} className="form-row mb-3 d-flex align-items-center text-center">
                                        <div className="form-row col-md-6 mb-3 ml-5">
                                            <label htmlFor={`documentoName-${id}`}>Nombre del documento</label>
                                            <Field name={`documentoName-${id}`} type="text" className="form-control" validate={validations} onBlur={e => fieldChanges(e)} />
                                            <ErrorMessage name={`documentoName-${id}`} component="span" className="text-danger" />
                                        </div>
                                        <div className="col-md-5 mt-3">
                                            <Field name={`documento-${id}`} type="file" className="form-control-file" validate={validations} onBlur={e => fieldChanges(e)} />
                                            <ErrorMessage name={`documento-${id}`} component="span" className="text-danger" />
                                        </div>
                                    </span>
                                )
                            })}
                            {Object.keys(dataIdProspecto).forEach((key) => {
                                return (<span>{key}</span>)
                                {/* if (key == 'documentos') {
                                    console.log(dataIdProspecto[key].documento1)
                                    return (
                                        <span>{JSON.stringify(dataIdProspecto[key])}</span>
                                    )
                                } */}
                            })}
                        </div>
                        {dataIdProspecto.status != '' ?
                            <div className="col-md-12 mb-3">
                                <label htmlFor="observaciones">Observaciones</label>
                                <Field name="observaciones" type="textarea" className="form-control" onBlur={e => fieldChanges(e)} />
                            </div> : ''}
                    </div>
                    <div className="text-center">
                        <button className="btn bg-primary" type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
