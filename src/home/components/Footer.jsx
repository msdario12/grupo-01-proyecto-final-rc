import React from "react";
import "./Footer.css";
import { Icon } from "./Icon";

export const Footer = () => {
  return (
    <>
      <footer className="page-footer font-small blue pt-4 footer-container">
        <div className="container text-center text-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Rolling Vet</h5>
              <p>Tu veterinaria de confianza</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Redes Sociales</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!"><Icon icon={faWhatsapp} /></a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
                <li>
                  <a href="#!">Link 3</a>
                </li>
                <li>
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li>
                  <a href="#!">Link 2</a>
                </li>
                <li>
                  <a href="#!">Link 3</a>
                </li>
                <li>
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="#"> RollingVet.com</a>
        </div>
      </footer>
    </>
  );
};
