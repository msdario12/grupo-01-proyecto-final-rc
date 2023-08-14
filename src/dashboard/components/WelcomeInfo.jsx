import { Spinner } from 'react-bootstrap';
import { WelcomeInfoCard } from './WelcomeInfoCard/WelcomeInfoCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { formatDateCustom, formatTimeCustom } from '../../helpers/format-dates';
import { formatDistance } from 'date-fns';
import es from 'date-fns/locale/es';

export const WelcomeInfo = () => {
	const { privateBackendAPI } = useAxiosPrivate();
	const [welcomeData, setWelcomeData] = useState();
	const { addToast } = useContext(ToastContext);

	useEffect(() => {
		privateBackendAPI
			.get('/api/statistics')
			.then((res) => {
				setWelcomeData(res.data.data);
			})
			.catch(() => {
				addToast({
					message: 'Error al obtener los datos',
					variant: 'error',
				});
			});
	}, [addToast]);

	if (!welcomeData) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center h-100'>
				<Spinner animation='border' size='md' />
				<span>Cargando datos</span>
			</div>
		);
	}

	const {
		totalTurns,
		completedTurns,
		pendingTurns,
		patientsSeenInWeek,
		totalRegisteredPatients,
		nextTurns,
		mostCommonSpecie,
	} = welcomeData;

	return (
		<div>
			<div className='row gy-3 gx-3'>
				<div className='col-md-4 '>
					<WelcomeInfoCard>
						<WelcomeInfoCard.Title title='Estado de turnos' />

						<div className='d-flex gap-2 align-items-center'>
							<h2 className=''>{totalTurns}</h2>
							<span className='text-muted ms-2'>Turnos programados</span>
						</div>

						<hr className='my-1'></hr>
						<div className='row gy-3'>
							<div className='col-xl-6 d-flex gap-1 align-items-baseline'>
								<h3>{completedTurns}</h3>
								<span className='text-muted ms-2'>Turnos completados</span>
							</div>
							<div className='col-xl-6 d-flex gap-1 align-items-baseline'>
								<h3>{pendingTurns}</h3>
								<span className='text-muted ms-2'>Turnos pendientes</span>
							</div>
						</div>
					</WelcomeInfoCard>
				</div>
				<div className='col-md-4 '>
					<WelcomeInfoCard>
						<WelcomeInfoCard.Title title='Próximos turnos' />
						<div className='row gy-3 my-auto'>
							{nextTurns.map((turn) => (
								<div
									key={turn._id}
									className='col-6 col-md-12 col-xl-6 d-flex gap-2 align-items-center justify-content-around'>
									<div className='d-flex justify-content-center flex-column align-items-center gap-0'>
										<h2 className='mb-1'>{formatTimeCustom(turn.date)}</h2>
										<p className='mb-1 small'>{formatDateCustom(turn.date)}</p>
										<p className='small'>
											(
											{'en ' +
												formatDistance(new Date(), new Date(turn.date), {
													locale: es,
												})}
											)
										</p>
									</div>
									<div className='d-flex flex-column justify-content-center align-items-end'>
										<span className='text-muted text-capitalize fw-bold fs-5'>
											{turn.patient_id.pet_id.name}
										</span>
										<span className='text-muted text-capitalize'>
											{turn.patient_id.pet_id.specie}
										</span>
									</div>
								</div>
							))}
						</div>
					</WelcomeInfoCard>
				</div>
				<div className='col-md-4 '>
					<WelcomeInfoCard>
						<WelcomeInfoCard.Title title='Estadísticas de Atención y Resumen de Mascotas' />

						<div className='d-flex gap-2 align-items-baseline justify-content-between'>
							<span className='text-muted'>
								Mascotas atendidas esta semana:{' '}
							</span>
							<h5 className=''>{patientsSeenInWeek}</h5>
						</div>
						<div className='d-flex gap-2 align-items-baseline justify-content-between'>
							<span className='text-muted'>Tipo de mascota más común: </span>
							<h5 className='text-capitalize'>{mostCommonSpecie[0]._id}</h5>
						</div>

						<div className='d-flex gap-2 align-items-baseline justify-content-between'>
							<span className='text-muted'>
								Total de mascotas registradas:{' '}
							</span>
							<h5 className=''>{totalRegisteredPatients}</h5>
						</div>
					</WelcomeInfoCard>
				</div>
			</div>
		</div>
	);
};
