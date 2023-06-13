import { useState, useEffect } from "react";
import { Mostrar, id, agregar, modificar, borrar, enviarProduccion, finalizar, modal, idmodal } from "./Funciones"
//Autenticacion de usuario
export const Auth = () => {
  if (localStorage.getItem("usuario")) {
    let token = {
      token: JSON.parse(localStorage.getItem("usuario")).token,
      email: JSON.parse(localStorage.getItem("usuario")).email,
    };
    fetch("http://localhost:3000/auth", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token), // data can be `string` or {object}!
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status !== true) {
          history.pushState({}, "", "/Login");
        }
      });
  } else {
    history.pushState({}, "", "/Login");
  }
};
//OnSubmit para Login
export const SumLogin = (event) => {
  event.preventDefault();
  let url = "http://localhost:3000/";
  let email = document.getElementById("LoginEmail");
  let pass = document.getElementById("LoginPass");
  let usuario = {
    email: email.value.toLowerCase(),
    pass: pass.value,
  };
  fetch(url + "login", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario), // data can be `string` or {object}!
  })
    .then((resp) => resp.json())
    .then((data) => {
      let iterator = data.res;
      if (iterator.status === true) {
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            name: iterator.name,
            email: iterator.email,
            token: iterator.token,
          })
        );
        document.getElementById("errorLogin").innerHTML = "";
        logAuth();
      } else {
        document.getElementById("errorLogin").innerHTML = iterator;
      }
    });
  function logAuth() {
    let token = {
      token: JSON.parse(localStorage.getItem("usuario")).token,
      email: JSON.parse(localStorage.getItem("usuario")).email,
    };
    fetch(url + "auth", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token), // data can be `string` or {object}!
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status === true) {
          location.href = "/";
        }
      });
  }
};
//Header
export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header id="head" className="border-bottom mb-4 d-print-none">
      <div className="px-3 py-2 text-bg-dark">
        <div className="container">
          <nav className="d-flex navbar flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <h1 className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <i className="bi-gem display-2 text-center">AhlerSolutions</i>
            </h1>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <a
                  href="#"
                  className="nav-link text-secondary pe-none text-center"
                >
                  <i className="bi-house-fill display-6"></i>
                  <p className="m-0">Home</p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link text-secondary pe-none text-center"
                >
                  <i className="bi-speedometer2 display-6"></i>
                  <p className="m-0">Dashboard</p>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white text-center">
                  <i className="bi-grid display-6"></i>
                  <p className="m-0">Products</p>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white text-center"
                  onClick={handleDropdownToggle}
                  role="button"
                  aria-expanded={isDropdownOpen}
                >
                  <i className="bi-person-circle display-6"></i>
                  <p className="m-0 dropdown-toggle">Profile</p>
                </a>
                <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                  <li>
                    <a className="dropdown-item" href="/">
                      {JSON.parse(localStorage.getItem("usuario")).name}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      id="closeSession"
                      className="dropdown-item"
                      href="/login"
                      onClick={() => {
                        localStorage.removeItem("usuario");
                      }}
                    >
                      Sign off
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#foot" className="nav-link text-white text-center">
                  <i className="bi-envelope display-6"></i>
                  <p className="m-0">Contact</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
//Main
export const Main = () => {
  return (
    <main className="container">
      <div className="text-end fixed-top m-md-3 d-print-none">
        <a href="#h2Produccion">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            fill="currentColor"
            className="bi bi-plus-circle-fill text-success"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </a>
      </div>
      <div className="text-end fixed-bottom m-md-3 d-print-none">
        <a href="#top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            fill="currentColor"
            className="bi bi-arrow-up-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        </a>
      </div>
      <form id="validar" className="row g-3 d-print-none" noValidate>
        <div className="col-md-4 text-center mt-5">
          <div className="input-group">
            <span className="input-group-text">Producto</span>
            <input
              type="text"
              className="form-control"
              id="producto"
              required
            />
          </div>
        </div>
        <div className="col-md-4 text-center mt-5">
          <div className="input-group">
            <span className="input-group-text">Cantidad</span>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              required
            />
          </div>
        </div>
        <div className="col-md-4 text-center mt-5">
          <div className="input-group">
            <span className="input-group-text">ID</span>
            <input
              type="number"
              className="form-control"
              id="id"
              value={id()}
              aria-describedby="inputGroupPrepend"
              disabled
              required
            />
          </div>
        </div>
        <div className="text-center" id="errorProductos"></div>
        <div className="col-md-3 col-6 text-center text-white">
          <button
            className="w-100 btn btn-success"
            type="button"
            id="agregar"
            onClick={() => agregar()}
          >
            Añadir
          </button>
          <label htmlFor="agregar">Nuevo Producto</label>
        </div>
        <div className="col-md-3 col-6 text-center text-white">
          <button
            className="w-100 btn btn-warning"
            type="button"
            id="modificar"
            onClick={() => modificar()}
          >
            Modificar
          </button>
          <label htmlFor="agregar">Nombre/Stock</label>
        </div>
        <div className="col-md-3 col-6 text-center text-white">
          <button className="w-100 btn btn-danger" type="button" id="borrar" onClick={() => borrar()}>
            Borrar
          </button>
          <label htmlFor="agregar">Producto</label>
        </div>
        <div className="col-md-3 col-6 text-center text-white">
          <button className="w-100 btn btn-primary" type="button" id="mostrar" onClick={() => <Mostrar />}>
            Buscar
          </button>
          <label htmlFor="agregar">Productos</label>
        </div>
      </form>
      <div className="mt-5">
        <div className="text-white">
          {/*<!-- Mostrar Productos -->*/}
          <div className="text-end">
            <button className="bi bi-sort-numeric-up-alt me-2 h2 btn btn-secondary"></button>
            <button className="bi bi-sort-numeric-down-alt h2 btn btn-secondary"></button>
          </div>
          <div className="border w-100 d-print-none">
            <h2 className="text-center" id="h2Productos">
              Productos
            </h2>
            <div id="mostrarDatos" className="card-body row">
              {<Mostrar />}
            </div>
          </div>
          {/*"<!-- Produccion -->"*/}
          <div className="border w-100 mt-5">
            <div id="imprimir">
              <h2 className="text-center" id="h2Produccion">
                Producción
              </h2>
              <div id="produccion" className="row"></div>
              <h2 className="text-center mt-5" id="">
                Cantidades
              </h2>
              <table id="table" className="table text-center">
                <thead>
                  <tr>
                    <th scope="col" className="col-6 text-white">
                      Producto
                    </th>
                    <th scope="col" className="col-6 text-white">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody id="produccion2"></tbody>
              </table>
            </div>
            <div className="text-center d-print-none">
              <button className="btn btn-primary mt-3 col-12" id="finalizar" onClick={() => finalizar()}>
                Mostrar Cantidades
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*"<!-- Modal Bootstrap -->"*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-white">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title" id="exampleModalLabel">
                Anclar Productos a <span id="modalTitulo"></span>
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-secondary">
              <label htmlFor="buscProducto" className="form-label">
                Buscador
              </label>
              <input
                type="search"
                className="form-control bg-dark text-white mb-3"
                name=""
                onInput={() => modal(idmodal)}
                id="buscProducto"
              />
              <div id="anclados"></div>
              <div id="modal-body" className=""></div>
            </div>
            <div className="modal-footer bg-dark">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*"<!-- Modal Bootstrap Produccion -->"*/}
      <div
        className="modal fade"
        id="pModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabelprod"
        aria-hidden="true"
      >
        <div className="modal-dialog text-white">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title" id="exampleModalLabelprod">
                Cantidad de <span id="modalTituloProd"></span> a produccion.
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-secondary">
              <label htmlFor="cantProducto" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control bg-dark text-white mb-3"
                name=""
                id="cantProducto"
              />
              <div id="modal-body-prod" className=""></div>
            </div>
            <div className="modal-footer bg-dark">
              <button
                id="enviarProduccion"
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => enviarProduccion()}
              >
                Enviar a Produccion
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
//Footer
export const Footer = () => {
  return (
    <footer
      id="foot"
      className="text-center text-lg-start bg-dark text-white mt-5 d-print-none"
    >
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Left */}

        {/* Right */}
        <div>
          <a
            href=""
            target="_blank"
            className="me-4 text-reset text-decoration-none"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/agustin-ahlers/"
            target="_blank"
            className="me-4 text-reset text-decoration-none"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com/Agu0925"
            target="_blank"
            className="me-4 text-reset text-decoration-none"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}

      {/* Section: Links  */}
      <section>
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="mb-4 fw-bold">
                <i className="bi-gem"> AhlerSolutions </i>
              </h6>
              <p>
                We are dedicated to solving problems in the form of programs. We
                work with the latest and best tools.
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Nodejs
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Css
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Bootstrap
                </a>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="bi-house-fill"></i> Salto, UY
              </p>
              <p>
                <i className="bi-envelope-fill"></i>
                AhlerSolutions@hotmail.com
              </p>
              <p>
                <i className="bi-phone-fill"></i> +598 94523649
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}

      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 { }
        <a className="text-reset fw-bold">@AhlerSolutions</a>
      </div>
    </footer>
  );
};
