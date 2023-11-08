import { IonInput, IonSelect, IonSelectOption, } from '@ionic/react';
import { useCase } from '@/context/Case';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { pick } from 'lodash'
import { SummaryForm } from '@/context/Case/types';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

interface Props {
	formikRef: any
}

const Form = ({ formikRef }: Props) => {
	const history = useHistory()
	const { case: caseItem, actions, crimes  } = useCase();

	const validationSchema = yup.object().shape({
    crimeId: yup.string().required('El tipo de delito es requerido'),
    riskLevel: yup.string().required('El nivel de riesgo es requerido'),
    casualties: yup.number().required('Los muertos es requerido'),
    injuries: yup.number().required('Los heridos son requerido'),
  });

  
  const formik = useFormik({
    initialValues: {
      crimeId: '', riskLevel: '', casualties: 0, injuries: 0,
      ...pick(caseItem?.summary, ['crimeId', 'riskLevel', 'casualties', 'injuries'])
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
    	await actions.saveSummary(values)
			history.push('/case')
		},
  });

	useEffect(() => {
		actions.getCrimes()
	}, [])
	
	useEffect(() => {
		formikRef.current = formik
	}, [formik])

	return <form className='my-5' onSubmit={formik.handleSubmit}>
			<div className='w-1/2 inline-block px-5'>
			<IonSelect label="Tipo de delito" labelPlacement="floating" 
					name="crimeId"
					value={formik.values.crimeId}
					onIonChange={formik.handleChange}
			>
					{crimes.map((item, index) => <IonSelectOption key={index} value={item.mongoId} defaultChecked={false}>{item.name}</IonSelectOption>)}
			</IonSelect>
			</div>
			<div className='w-1/2 inline-block px-5'>
			<IonSelect label="Nivel de riesgo" labelPlacement="floating"
					name='riskLevel'
					value={formik.values.riskLevel}
					onIonChange={formik.handleChange}
			>
					<IonSelectOption value="LOW">Bajo</IonSelectOption>
					<IonSelectOption value="MEDIUM">Medio</IonSelectOption>
					<IonSelectOption value="HIGH">Alto</IonSelectOption>
					<IonSelectOption value="VERY_HIGH">Muy alto</IonSelectOption>
			</IonSelect>
			</div>
			<div className='w-1/2 inline-block px-5 mt-5'>
			<IonInput label="Heridos" type="number" placeholder="0" labelPlacement="floating" 
					name='injuries'
					value={formik.values.injuries}
					onIonChange={formik.handleChange}
			/>
			</div>
			<div className='w-1/2 inline-block px-5 mt-5'>
			<IonInput label="Muertos" type="number" placeholder="0" labelPlacement="floating" 
					name='casualties'
					value={formik.values.casualties}
					onIonChange={formik.handleChange}
			/>
			</div>
	</form>
}

export default Form