import "./Hero.css";

export const HeroSection = () => {
  return (
    <section className="row mb-5">
      <div className="col-12 col-md-7 d-flex gap-3 flex-column justify-content-center align-items-start">
        <h1 className="display-1 fw-bold lh-1">
          Bienvenidos a <span className="text-info">RollingVet</span>
        </h1>
        <h5>
          Tu mejor amigo merece el mejor cuidado. Bienvenido a nuestra
          veterinaria, donde el amor por los animales es nuestra pasión.
        </h5>
        <div className="d-flex gap-3">
          {/* Redirigir hacia una pagina de contacto con el administrador */}
          <button className="btn btn-primary">Reservar Turno</button>
          {/* Redirigir a una pagina de contacto, con un mapa con ubicación */}
          <button className="btn btn-secondary">Donde estamos</button>
        </div>
      </div>
      <div className="col-12 col-md-5 container-img">
        <img
          className="img-fluid"
          src="https://source.unsplash.com/random/?cat,dog"
          alt="Imagen principal de una veterinaria"
        />
      </div>
    </section>
  );
};
