//ZONA MODAL DE ANCLAJE
//Funcion para anclar productos a productos "padres" en modal
const url = "http://localhost:3000/";
function anclar(id) {
  fetch(url)
      .then((resp) => resp.json())
      .then((datos) => {
          if (document.getElementById(id).value != 0) {
              let iterator = datos[datos.findIndex(datos => datos.id == id)];
              document.getElementById("anclados").innerHTML += `
              <div id="anclaDiv${iterator.id}" class="row border bg-success p-2">
                  <div class="col text-center m-auto"><p class="m-auto"><span id="prod${iterator.id}">${iterator.Producto}</span></p></div>
                  <div class="col text-center m-auto"><p class="m-auto">Cant - <span id="cant${iterator.id}">${document.getElementById(id).value}</span></p></div>
                  <div class="col-2 text-center m-auto"><p class="m-auto">ID - <span id="id${iterator.id}">${iterator.id}</span></p></div>
                  <div class="col text-end"><span onclick="elimAncla(${iterator.id})" class='btn btn-danger'>X</span></div>
              </div>
              `;
              let objeto = {
                  Producto: iterator.Producto,
                  cantidad: parseInt(document.getElementById(id).value),
                  id: parseInt(iterator.id)
              };
              fetch(url + "anclar/" + datos[datos.findIndex(datos => datos.Producto == document.getElementById("modalTitulo").innerHTML)].id, {
                  method: "PUT", // or 'POST'
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(objeto) // data can be `string` or {object}!
              });
              document.getElementById("modal-body").removeChild(document.getElementById("div" + id));
          } else {
              document.getElementById(id).style.background = "red";
          }
      });
};
//Funcion para elminiar producto anclado en modal
function elimAncla(id) {
  fetch(url)
      .then((resp) => resp.json())
      .then((datos) => {
          //Identifico el producto
          let iterator = datos[datos.findIndex(datos => datos.id == id)];
          //Agrego el div al body
          document.getElementById("modal-body").innerHTML += `
      <div id="div${iterator.id}" class="row border bg-dark p-2">
          <div class="col my-auto">${iterator.Producto}</div>
          <div class="col my-auto"><input type="number" class="input-group" name="" id="${iterator.id}"></div>  
          <div class="col text-end"><span onclick="anclar(${iterator.id})" class='btn btn-success'>+</span></div>
      </div>
      `;
          fetch(url + "anclar/" + datos[datos.findIndex(datos => datos.Producto == document.getElementById("modalTitulo").innerHTML)].id, {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: id })
          });
          document.getElementById("anclados").removeChild(document.getElementById("anclaDiv" + id));
      });
};