import { useState, useEffect } from "react";
import imagen from "./assets/herramientas.jpg";
const url = "http://localhost:3000/";
let idProd = "";
export let idmodal = "";
let idProduccion = "";
//Funciones para manejar los productos
export const Mostrar = () => {
  const [productos, setProductos] = useState([]);
  let DOMproducto = document.getElementById("producto");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.log(error));
  });

  function codigoHTML(id, nombre, cantidad, productoAnclado) {
    if (cantidad < 10) {
      return (
        <div
          key={id}
          className="col-md-6 py-md-3 m-auto border btn btn-danger"
          onClick={() => selecID(id)}
        >
          <div className="row">
            <div className="col-md-6 my-2 my-md-1">
              <h4 className="card-title">{nombre}</h4>
              <p className="card-text my-md-4 text-start">Stock: {cantidad}</p>
              <p className="card-text text-start">Partes: {productoAnclado} </p>
            </div>
            <div className="col-md-6 m-auto text-center">
              <img className="w-50" src={imagen} alt={nombre} />
            </div>
            <div className="col-md-12 my-2 my-md-1"></div>
            <div className="col-md-6 my-2 my-md-1">
              <span
                onClick={() => produccion(id)}
                data-bs-toggle="modal"
                data-bs-target="#pModal"
                className="btn btn-success w-100"
              >
                +
              </span>
            </div>
            <div className="col-md-6 my-2 my-md-1">
              <span
                onClick={() => modal(id)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-warning w-100"
              >
                Anclar Productos
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          className="col-md-6 py-md-3 m-auto border btn btn-dark"
          onClick={() => selecID(id)}
        >
          <div className="row">
            <div className="col-md-6 my-2 my-md-1">
              <h4 className="card-title">{nombre}</h4>
              <p className="card-text my-md-4 text-start">Stock: {cantidad}</p>
              <p className="card-text text-start">Partes: {productoAnclado} </p>
            </div>
            <div className="col-md-6 m-auto text-center">
              <img className="w-50" src={imagen} alt={nombre} />
            </div>
            <div className="col-md-12 my-2 my-md-1"></div>
            <div className="col-md-6 my-2 my-md-1">
              <span
                onClick={() => produccion(id)}
                data-bs-toggle="modal"
                data-bs-target="#pModal"
                className="btn btn-success w-100"
              >
                +
              </span>
            </div>
            <div className="col-md-6 my-2 my-md-1">
              <span
                onClick={() => modal(id)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-warning w-100"
              >
                Anclar Productos
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      {productos.map((producto) => {
        let productoAnclado = "";
        if (producto.partes && producto.partes != "") {
          productoAnclado = "Tiene Productos Anclados";
          if (producto.Producto.toLowerCase().includes(
            DOMproducto.value.toLowerCase()) || DOMproducto.value == "") {
            return codigoHTML(
              producto.id,
              producto.Producto,
              producto.Cantidad,
              productoAnclado
            );
          }
        } else {
          productoAnclado = "No Tiene Productos Anclados";
          if (producto.Producto.toLowerCase().includes(
            DOMproducto.value.toLowerCase()) || DOMproducto.value == "") {
            return codigoHTML(
              producto.id,
              producto.Producto,
              producto.Cantidad,
              productoAnclado
            );
          }
        }
      })}
    </div>
  );
};
//Seleccionar producto y llevar la info a los inputs
function selecID(id) {
  fetch(url + id)
    .then((resp) => resp.json())
    .then((datos) => {
      document.getElementById("producto").value = datos.Producto;
      document.getElementById("cantidad").value = datos.Cantidad;
      document.getElementById("id").value = datos.id;
    });
}
//ID aleatoria
export function id() {
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      idProd = Math.floor(Math.random() * 999999);
      if (datos[datos.findIndex((datos) => datos.id == idProd)]) {
        idProd = Math.floor(Math.random() * 999999);
        document.getElementById("id").value = idProd;
      } else {
        document.getElementById("id").value = idProd;
      }
    });
}
//Agregar Productos
export function agregar() {
  id();
  if (
    document.getElementById("producto").value != "" &&
    document.getElementById("cantidad").value != "" &&
    document.getElementById("id").value != ""
  ) {
    let objeto = {
      Producto: document.getElementById("producto").value,
      Cantidad: parseInt(document.getElementById("cantidad").value),
      id: parseInt(idProd),
    };
    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objeto), // data can be `string` or {object}!
    })
      .then((resp) => resp.json())
      .then((datos) => {
        if (datos.status === true) {
          document.getElementById(
            "errorProductos"
          ).innerHTML = `<label className="text-success" for="validar"> ${datos.res} </label>`;
          <Mostrar />
        } else {
          document.getElementById(
            "errorProductos"
          ).innerHTML = `<label className="text-danger" for="validar"> ${datos.res} </label>`;
        }
      });
  } else {
    document.getElementById(
      "errorProductos"
    ).innerHTML = `<label className="text-danger" for="validar"> No puede enviar datos vacios </label>`;
  }
}
//Modificar Productos
export function modificar() {
  if (document.getElementById("producto").value != "" && document.getElementById("cantidad").value != "" && document.getElementById("id").value != "") {
    let objeto = {
      Producto: document.getElementById("producto").value,
      Cantidad: parseInt(document.getElementById("cantidad").value),
      email: JSON.parse(localStorage.getItem("usuario")).email
    };
    fetch(url + document.getElementById("id").value, {
      method: "PUT", // or 'POST'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objeto) // data can be `string` or {object}!
    })
      .then((resp) => resp.json())
      .then((datos) => {
        if (datos.status === true) {
          document.getElementById("errorProductos").innerHTML = `<label className="text-success" for="validar"> ${datos.res} </label>`;
          <Mostrar />
        } else { document.getElementById("errorProductos").innerHTML = `<label className="text-danger" for="validar"> ${datos.res} </label>`; }
      });
  } else {
    document.getElementById("errorProductos").innerHTML = `<label className="text-danger" for="validar"> No se pueden enviar datos vacios </label>`;
  }
}
//Borrar Productos
export function borrar() {
  if (document.getElementById("producto").value != "" && document.getElementById("cantidad").value != "" && document.getElementById("id").value != "") {
    fetch(url + document.getElementById("id").value, {
      method: "DELETE"
    })
      .then((resp) => resp.json())
      .then((datos) => {
        if (datos.status === true) {
          document.getElementById("errorProductos").innerHTML = `<label className="text-success" for="validar"> ${datos.res} </label>`;
        } else { document.getElementById("errorProductos").innerHTML = `<label className="text-danger" for="validar"> ${datos.res} </label>`; }
      });
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    <Mostrar />
  }
}
//Modal llenar datos y buscador
export function modal(id) {
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      let ids = [];
      let anclados = document.getElementById("anclados");
      idmodal = id;
      //Que inicie vacio el html de anclados
      anclados.innerHTML = "";
      //Declaro el producto
      let prod = datos[datos.findIndex((datos) => datos.id == idmodal)];
      //Le doy el titulo al modal
      document.getElementById("modalTitulo").innerHTML = prod.Producto;
      //Muestro los productos anclados
      if (prod.partes) {
        for (const partes of prod.partes) {
          anclados.innerHTML += `
              <div id="anclaDiv${partes.id}" className="row border bg-success p-2">
                  <div className="col text-center m-auto"><p className="m-auto"><span id="prod${partes.id}">${partes.Producto}</span></p></div>
                  <div className="col text-center m-auto"><p className="m-auto">Cant - <span id="cant${partes.id}">${partes.cantidad}</span></p></div>
                  <div className="col-2 text-center m-auto"><p className="m-auto">ID - <span id="id${partes.id}">${partes.id}</span></p></div>
                  <div className="col text-end"><span onclick="elimAncla(${partes.id})" className='btn btn-danger'>X</span></div>
              </div>
              `;
          ids.push(partes.id);
        }
      }
      //Mostrar productos en el modal
      let modalInfo = "";
      for (const iterator of datos) {
        if (iterator.Producto) {
          //Filtros para no mostrar el producto seleccionado y sus anclados
          if (
            iterator.Producto !=
            document.getElementById("modalTitulo").innerHTML &&
            !ids.includes(iterator.id)
          ) {
            if (
              iterator.Producto.toLowerCase().includes(
                document.getElementById("buscProducto").value.toLowerCase()
              ) ||
              document.getElementById("buscProducto").value == ""
            ) {
              modalInfo += `
                      <div id="div${iterator.id}" className="row border bg-dark p-2">
                        <div className="col my-auto">${iterator.Producto}</div>
                        <div className="col my-auto"><input type="number" className="input-group" name="" id="${iterator.id}"></div>  
                        <div className="col text-end"><span onclick='anclar(${iterator.id})' className='btn btn-success'>+</span></div>
                      </div>
                      `;
            }
          }
        }
      }
      document.getElementById("modal-body").innerHTML = modalInfo;
    });
}
//ZONA DE ENVIO A PRODUCCION
//Modal Produccion
function produccion(id) {
  idProduccion = id;
  document.getElementById('cantProducto').value = "";
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      let iterator = datos[datos.findIndex(datos => datos.id == id)];
      document.getElementById('modalTituloProd').innerHTML = iterator.Producto;
    });
};
//Funcion para enviar a "producción"
export function enviarProduccion() {
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      let iterator = datos[datos.findIndex(datos => datos.id == idProduccion)];
      let productoAnclado = "";
      if (document.getElementById('cantProducto').value > 0) {
        if (iterator.partes) {
          for (const partes of iterator.partes) {
            productoAnclado += " - " + partes.Producto + ": <span className='" + "idproduccion" + partes.id + "'>" + partes.cantidad * document.getElementById('cantProducto').value + "</span>" + " ";
          };
          if (!document.getElementById(`produc${iterator.id}`)) {
            document.getElementById('produccion').innerHTML += `
  <div id="produc${iterator.id}" className="col-md-6 py-md-3 m-auto border btn btn-success">
  <div className="row">
    <div className="col-12 text-end my-2 my-md-1">
    <button id="boton${iterator.id}" type="button" className="btn-close" aria-label="Close"></button>    
    </div>
    <div className="col-12 text-center my-2 my-md-1"></div>
    <div className="col-12 my-2 my-md-1">
        <h4 className="card-title">${iterator.Producto}</h4>
        <p className="card-text my-md-4 text-start">Cantidad - <span id="c${iterator.id}">${parseInt(document.getElementById('cantProducto').value)}</span></p>
        <p className="card-text my-md-4 text-start">Partes ${productoAnclado}</p>
    </div>
    <div className="col-md-12 my-2 my-md-1">
    </div>
  </div>
  </div>
        `;
            //Fetch para cambiar el stock
            let objeto = {
              Producto: iterator.Producto,
              Cantidad: parseInt(iterator.Cantidad) + parseInt(document.getElementById('cantProducto').value),
            };
            fetch(url + iterator.id, {
              method: "PUT", // or 'POST'
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(objeto) // data can be `string` or {object}!
            });
            document.getElementById('cantProducto').value = "";
            const boton = document.getElementById(`boton${iterator.id}`);
            boton.addEventListener('click', () => {
              sacarProduc(iterator.id);
            });
          }
        } else {
          if (!document.getElementById(`produc${iterator.id}`)) {
            document.getElementById('produccion').innerHTML += `
  <div id="produc${iterator.id}" className="col-md-6 py-md-3 m-auto border btn btn-success">
  <div className="row">
    <div className="col-12 text-end my-2 my-md-1">
    <button id="boton${iterator.id}" type="button" className="btn-close" aria-label="Close"></button>    
    </div>
    <div className="col-12 text-center my-2 my-md-1"></div>
    <div className="col-12 my-2 my-md-1">
        <h4 className="card-title">${iterator.Producto}</h4>
        <p className="card-text my-md-4 text-start">Cantidad - <span id="c${iterator.id}">${parseInt(document.getElementById('cantProducto').value)}</span></p>
        <p className="card-text my-md-4 text-start">Partes - </p>
    </div>
    <div className="col-md-12 my-2 my-md-1">
    </div>
  </div>
  </div>
        `;
            //Fetch para cambiar el stock
            let objeto = {
              Producto: iterator.Producto,
              Cantidad: parseInt(iterator.Cantidad) + parseInt(document.getElementById('cantProducto').value),
            };
            fetch(url + iterator.id, {
              method: "PUT", // or 'POST'
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(objeto) // data can be `string` or {object}!
            });
            document.getElementById('cantProducto').value = "";
            const boton = document.getElementById(`boton${iterator.id}`);
            boton.addEventListener('click', () => {
              sacarProduc(iterator.id);
            });
          }
        };
      } else {
        document.getElementById('cantProducto').value = "";
      };
    });
}
//MEJORAR FUNCION PORQUE SOLAMENTE PUEDO BORRAR EL ULTIMO AGREGADO
//Funcion para sacar de producción
function sacarProduc(id) {
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      let iterator = datos[datos.findIndex(datos => datos.id == id)];
      //Fetch para cambiar el stock
      let objeto = {
        Producto: iterator.Producto,
        Cantidad: parseInt(iterator.Cantidad) - parseInt(document.getElementById(`c${id}`).innerHTML),
      };
      fetch(url + "elimProduccion/" + iterator.id, {
        method: "PUT", // or 'POST'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto) // data can be `string` or {object}!
      });
      document.getElementById("produccion").removeChild(document.getElementById(`produc${id}`));
    })
};
//Funcion Finalizar El envio a produccion
export function finalizar() {
  fetch(url)
    .then((resp) => resp.json())
    .then((datos) => {
      document.getElementById("produccion2").innerHTML = "";
      let cantidades = "";
      for (const iterator of datos) {
        if (document.getElementsByClassName("idproduccion" + iterator.id)) {
          let suma = [];
          for (const iterator2 of document.getElementsByClassName("idproduccion" + iterator.id)) {
            suma.push(parseInt(iterator2.innerHTML));
            if (document.getElementById("suma" + iterator.id)) {
              document.getElementById("produccion2").removeChild(document.getElementById("suma" + iterator.id));
            }
            cantidades = `
                                <tr id="suma${iterator.id}">
                                    <td>${iterator.Producto}</td>
                                    <td>${suma.reduce((a, b) => a + b, 0)}</td>
                                </tr>
                                `;
            document.getElementById("produccion2").innerHTML += cantidades;
          }
        }
      }
      window.print();
      document.getElementById("produccion2").innerHTML = "";
      document.getElementById("produccion").innerHTML = "";
    });
}