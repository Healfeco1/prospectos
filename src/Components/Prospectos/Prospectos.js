import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import {methods} from '../../Firebase/methods'


export default function Prospectos({ idProspecto }) {
    const { addToast } = useToasts()
    const [prospecto, setProspecto] = useState({})
    const validate = values => {
        const errors = {};
        if (!values.nombreProspecto) {
            errors.values.nombreProspecto = 'Required';
        } else if (values.length < 1) {
            errors.values = 'Must be 15 characters or less';
        }
    };
    useEffect(() => {
        if(idProspecto){
            // let res = methods.getProspectById();
            // methods.getProspectById(setProspecto);
            // setProspecto(prev=>(prev,))
        }
    }, [prospecto])
    // console.log(prospecto);
    const validated = val => {
        //   addToast(`Captura el campo: ${val.target.name}`, { appearance: 'error', autoDismiss: true })
        val.preventDefault()
        addToast(`Captura el campo: ${val.target.name}`, { appearance: 'error', autoDismiss: true })
    }
    const formik = useFormik({
        initialValues: {
            nombreProspecto: '',
            primerApellido: '',
            segundoApellido: '',
            calle: '',
            numero: '',
            colonia: '',
            codigoPostal: '',
            telefono: '',
            rfc: '',
            documentos: '',
            observaciones: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 10));
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-row m-1">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="nombreProspecto">Nombre del prospecto</label>
                        <input id="nombreProspecto"
                            name="Nombre del Prospecto"
                            type="text"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.nombreProspecto}
                            // onInput={validated}
                            onInvalid={validated}
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="primerApellido">Primer apellido </label>
                        <input id="primerApellido"
                            name="primerApellido"
                            type="text"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.primerApellido}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="segundoApellido">Segundo Apellido</label>
                        <input id="segundoApellido"
                            name="segundoApellido"
                            type="text"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.segundoApellido}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="calle">Calle</label>
                        <input id="calle"
                            name="calle"
                            type="text"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.calle}
                        />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="numero">Número</label>
                        <input id="numero"
                            name="numero"
                            type="number"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.numero}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="colonia">Colonia</label>
                        <input id="colonia"
                            name="colonia"
                            type="colonia"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.colonia}
                        />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="codigoPostal">Código Postal</label>
                        <input id="codigoPostal"
                            name="codigoPostal"
                            type="number"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.codigoPostal}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono"
                            name="telefono"
                            type="number"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.telefono}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="rfc">RFC</label>
                        <input id="rfc"
                            name="rfc"
                            type="text"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.rfc}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="documentos">Documentos</label>
                        <input id="documentos"
                            name="documentos"
                            type="file"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.documentos}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea id="observaciones"
                            name="observaciones"
                            rows="2"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.observaciones}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn bg-primary" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
