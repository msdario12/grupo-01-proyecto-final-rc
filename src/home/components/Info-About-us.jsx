import React from 'react';

export const InfoAboutUs = () => {
	return (
		<>
			<div className='container-card container-lg'>
				<div className='content-card-aboutus row overflow-hidden'>
					<div className='col-12 col-md-6 px-0 mb-3 mb-md-0'>
						<img
							className='img-fluid object-fit-cover w-100 h-100'
							src='https://www.bunko.pet/__export/1662147203237/sites/debate/img/2022/09/02/dxberman_qux_tan_fuerte_puede_llegar_a_ser_un_perro_de_esta_razax_segxn_expertos.jpg_423682103.jpg'
							alt='Una imagen de un perro Doberman'
						/>
					</div>
					<div className='col-12 col-md-6  fs-5 px-5 d-flex flex-column justify-content-around align-align-items-center'>
						<h2 className='display-3 fw-semibold'>Sobre nosotros</h2>
						<p>
							RollingVet es una empresa familiar con más de 60 años en el rubro
							veterinario. Comenzó siendo la más famosa peluquería canina para
							convertirse en la empresa más prometedora del rubro.
						</p>
						<p>
							Un poco de historia: Instalado en General Paz 576, con importantes
							clientes del ámbito de la política y artístico se estableció
							Walter Esteban Juarez Rivas.
						</p>
						<p>
							Ya con la fama de ser la mejor peluquería de Tucuman se comenzaron
							a agregar el servicio de venta de accesorios, en una primera etapa
							los que se conseguía de la industria local. La segunda generación
							de la familia incursiono en la importación, venta y distribución
							de accesorios.
						</p>
						<p>
							Ya consolidado como uno de los locales más completos en accesorios
							y novedades la tercer generacion comienza la expansion con locales
							propios que hoy cuentan con 9 locales.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
