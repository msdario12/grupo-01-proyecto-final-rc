import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export const BannerAboutUs = () => {
    return (
        <>
            <div className='mb-5'>
                <div className="col-12 banner-about-us">
                    <h1>RESERVA ONLINE TODOS LOS PRODUCTOS PARA TU MASCOTA</h1>
                    <p>Necesitas Ayuda: 381 1234567</p>
                </div>
            </div>

            <div className='container-card'>
                <div className='content-card-aboutus'>
                    <img src="https://www.bunko.pet/__export/1662147203237/sites/debate/img/2022/09/02/dxberman_qux_tan_fuerte_puede_llegar_a_ser_un_perro_de_esta_razax_segxn_expertos.jpg_423682103.jpg" alt="Una imagen de un perro Doberman" />
                    <div>
                        <h2>Sobre nosotros</h2>
                        <p>
                            RollingVet es una empresa familiar con más de 60 años en el rubro veterinario. Comenzó siendo la más famosa peluquería canina para convertirse en la empresa más prometedora del rubro.
                        </p>
                        <p>
                            Un poco de historia: Instalado en General Paz 576, con importantes clientes del ámbito de la política y artístico se estableció Walter Esteban Juarez Rivas.
                        </p>
                        <p>
                            Ya con la fama de ser la mejor peluquería de Tucuman se comenzaron a agregar el servicio de venta de accesorios, en una primera etapa los que se conseguía de la industria local. La segunda generación de la familia incursiono en la importación, venta y distribución de accesorios.
                        </p>
                        <p>
                            Ya consolidado como uno de los locales más completos en accesorios y novedades la tercer generacion comienza la expansion con locales propios que hoy cuentan con 9 locales.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
