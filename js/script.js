const URL = "http://localhost:5074/Producto/";
const btn_submit_guardar = document.querySelector(".btn-guardar");
const formulario = document.querySelector(".form-joya"); //Obtengo la etiqueta del formulario
const submit_bar_value = document.getElementById("search-bar-value");

async function Listar() {
    try{
        const respuesta = await fetch('http://localhost:5074/Producto/Listar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Otras cabeceras si son necesarias
            }
        });
        
        if (respuesta.ok){
            const datos = await respuesta.json(); //Recibo la respuesta en json
            //querySelector se usa para obtener una etiqueta marcada por una clase
            const contenedor_info = document.querySelector(".container-info");
            
            datos.Entidades.forEach(entidad => {
                const contenedor = document.createElement("div");
                contenedor.className = "container-each-joya";
                contenedor.innerHTML = `
                        <div class="cnt-each-joya-label-input">
                            <label for="Id">Id: </label>
                            <input type="text" name="Id" id="text-input-id" value="${entidad.Id}" disabled>
                        </div>
                        <div class="cnt-each-joya-label-input">
                            <label for="Nombre">Nombre: </label>
                            <input type="text" name="Nombre" id="text-input-nombre" value="${entidad.Nombre}" disabled>
                        </div>
                        <div class="cnt-each-joya-label-input">
                            <label for="Descripcion">Descripcion: </label>
                            <input type="text" name="Descripcion" id="text-input-descripcion" value="${entidad.Descripcion}" disabled>
                        </div>
                        <div class="cnt-each-joya-label-input">
                            <label for="Precio">Precio: </label>
                            <input type="number" name="Precio" id="text-input-precio" value="${entidad.Precio}" disabled>
                        </div>
                        <div class="buttons-joya">
                            <button class="btn-borrar">Borrar</button>
                            <button class="btn-modificar">Modificar</button>
                            <button class="btn-aceptar" disabled>Aceptar</button>
                            <button class="btn-cancelar" disabled>Cancelar</button>
                        </div>
                    `;
                contenedor_info.appendChild(contenedor); //Meto mi contenedor pequeño dentro del contenedor padre 
            });
        }
    } catch (error){
        console.log("Se ejecutó la parte del catch, hay algún error.");
        console.log(error);
    }
}

//Evento que cuando el DOM se carga por completo, lista las joyas (productos)
document.addEventListener('DOMContentLoaded', Listar);

async function Guardar(){
    try{
        
        const nombre = document.getElementById("form-input-nombre").value; //Obtengo el valor del input nombre (Ingresado por el usuario)
        const descripcion = document.getElementById("form-input-descripcion").value; //Obtengo el valor del input decripcion (Ingresado por el usuario)
        const precio = document.getElementById("form-input-precio").value; //Obtengo el valor del input precio (Ingresado por el usuario)
        
        //Creo la entidad a guardar
        const entidad = {
            Entidad: {
                Nombre:nombre,
                Descripcion:descripcion,
                Precio:precio
            }
        };
        
        const respuesta = await fetch('http://localhost:5074/Producto/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Otras cabeceras si son necesarias
            },
            body: JSON.stringify(entidad)
        });
        
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log("Guardado exitoso: " + datos);
        } else{
            console.log("Algo fallo en el guardado");
        }
    } catch (error){
        console.log("Se ejecutó la parte del catch, hay algún error.");
        console.log(error);
    }
}

//Evento que detecta cuando se envia el formulario, llama al metodo guardar
formulario.addEventListener('submit', async function(){
    await Guardar();
    const contenedor_info = document.querySelector(".container-info");
    contenedor_info.innerHTML = "";
    await Listar();
})

//Incompleto
async function Buscar(nombreJoya){
    try{
        //Creo la entidad con el nombre para filtrar (buscar)
        const entidad = {
            Entidad:{
                Nombre: nombreJoya
            }
        }
        
        const respuesta = await fetch('http://localhost:5074/Producto/Buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Otras cabeceras si son necesarias
            },
            body: JSON.stringify(entidad)
        });
        
        if (respuesta.ok){
            const datos = await respuesta.json(); //Recibo la respuesta en json
            //querySelector se usa para obtener una etiqueta marcada por una clase
            
            const contenedor_info = document.querySelector(".container-info");
            
            //Dejar vacio el contenedor_info
            contenedor_info.innerHTML = "";
            
            //Verifico que si hayan datos resultantes
            if(datos.Entidades.length > 0){ //La cantidad de entidades obtenidas debe ser minimo 1
                datos.Entidades.forEach(entidad => {
                    const contenedor = document.createElement("div");
                    contenedor.className = "container-each-joya";
                    contenedor.innerHTML = `
                            <div class="cnt-each-joya-label-input">
                                <label for="Id">Id: </label>
                                <input type="text" name="Id" id="text-input-id" value="${entidad.Id}" disabled>
                            </div>
                            <div class="cnt-each-joya-label-input">
                                <label for="Nombre">Nombre: </label>
                                <input type="text" name="Nombre" id="text-input-nombre" value="${entidad.Nombre}" disabled>
                            </div>
                            <div class="cnt-each-joya-label-input">
                                <label for="Descripcion">Descripcion: </label>
                                <input type="text" name="Descripcion" id="text-input-descripcion" value="${entidad.Descripcion}" disabled>
                            </div>
                            <div class="cnt-each-joya-label-input">
                                <label for="Precio">Precio: </label>
                                <input type="number" name="Precio" id="text-input-precio" value="${entidad.Precio}" disabled>
                            </div>
                            <div class="buttons-joya">
                                <button class="btn-borrar">Borrar</button>
                                <button class="btn-modificar">Modificar</button>
                                <button class="btn-aceptar" disabled>Aceptar</button>
                                <button class="btn-cancelar"disabled>Cancelar</button>
                            </div>
                        `;
                    contenedor_info.appendChild(contenedor); //Meto mi contenedor pequeño dentro del contenedor padre 
                });
            } else{
                const p_contenedor_info = document.createElement("p");
                p_contenedor_info.className = "p-contenedor-info";
                p_contenedor_info.innerHTML = "No se encontraron coincidencias";
                
                contenedor_info.appendChild(p_contenedor_info);
            }
        } else{
            console.log("Algo falló en la búsqueda.");
        }
    } catch (error){
        console.log(error);
    }
}

//Crear el addEvenListener cuando den click a la lupita, obtener el valor del input y mandarlo
const img_lupa_search = document.getElementById("search-icon-img");
img_lupa_search.addEventListener('click',function(){
    const value_text_search = document.getElementById("search-bar-value").value;
    Buscar(value_text_search);
});


async function Borrar(id_joya){
    try{
        //Creo la entidad con el id a eliminar
        const entidad = {
            Entidad:{
                Id: id_joya,
                Nombre : "nombre", //dato provicional
                Descripcion: "descripcion", //dato provicional
                Precio: 3312 //dato provicional
            }
        };
        
        const respuesta = await fetch('http://localhost:5074/Producto/Borrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Otras cabeceras si son necesarias
            },
            body: JSON.stringify(entidad)
        });
        
        if(respuesta.ok){
            console.log("Se borro la entidad con exito");
        } else{
            console.log("Ocurrió un error en el borrado");
        }
        
    } catch (error){
        console.log(error);
    }
}


//Evento que detecta click y si el click fue a un boton de borrar entonces obtendo el id de esa joya en especifico para enviarlo al borrar
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains("btn-borrar")){ //El elemento "e" es de la clase "btn-borrar"
        //.closest() obtiene la etiqueta del contenedor padre
        
        //Confirmar que desea borar el elemento
        const confirmacion = confirm("¿Esta seguro de eliminar la joya?");
        if(confirmacion == true){
            const contenedorPrincipal = e.target.closest(".container-each-joya"); //e.target obtiene la etiqueta del boton
            const id_input_value = contenedorPrincipal.querySelector("#text-input-id").value;
            
            await Borrar(id_input_value);
            const contenedor_info = document.querySelector(".container-info");
            contenedor_info.innerHTML = "";
            await Listar();
        }
    }
})

async function Modificar(id, nombre, descripcion, precio){
    try{
        //Creo la entidad a modificar
        const entidad = {
            Entidad : {
                Id: id,
                Nombre: nombre,
                Descripcion: descripcion,
                Precio: precio
            }
        }
        
        const respuesta = await fetch('http://localhost:5074/Producto/Modificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Otras cabeceras si son necesarias
            },
            body: JSON.stringify(entidad)
        });
        
        return respuesta;
        
        
    } catch (error){
        console.log(error);
    }
}

let nombreAnterior;
let descripcionAnterior;
let precioAnterior;

//Evento que detecta click y si el click fue a un boton de borrar entonces obtendo el id de esa joya en especifico para enviarlo al borrar
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains("btn-modificar")){ //El elemento "e" es de la clase "btn-modificar"
        //.closest() obtiene la etiqueta del contenedor padre
        const contenedorPrincipal = e.target.closest(".container-each-joya"); //e.target obtiene la etiqueta del boton
        const btn_aceptar = contenedorPrincipal.querySelector(".btn-aceptar");
        const btn_cancelar = contenedorPrincipal.querySelector(".btn-cancelar");
        const btn_modificar = contenedorPrincipal.querySelector(".btn-modificar");
        const btn_borrar = contenedorPrincipal.querySelector(".btn-borrar");

        //Asigno a las variables nombreAnterior, descripcionAnterior y precioAnterior los valores presentes en los input antes de que sean editados (en caso de que se desee cancelar el proceso de modificacion)
        nombreAnterior = contenedorPrincipal.querySelector("#text-input-nombre").value;
        descripcionAnterior = contenedorPrincipal.querySelector("#text-input-descripcion").value;
        precioAnterior = contenedorPrincipal.querySelector("#text-input-precio").value;

        contenedorPrincipal.querySelector("#text-input-nombre").removeAttribute("disabled");
        contenedorPrincipal.querySelector("#text-input-descripcion").removeAttribute("disabled");
        contenedorPrincipal.querySelector("#text-input-precio").removeAttribute("disabled");

        //Activo los botones de aceptar y cancelar
        btn_aceptar.removeAttribute("disabled");
        btn_cancelar.removeAttribute("disabled");

        //Desactivo los botones de modificar y borrar
        btn_modificar.setAttribute("disabled",true);
        btn_borrar.setAttribute("disabled",true);

        // await Borrar(id_input_value);
        // const contenedor_info = document.querySelector(".container-info");
        // contenedor_info.innerHTML = "";
        // await Listar();
    }
})

//Evento para cuando se le de click al boton de aceptar modificación
document.addEventListener('click', async (e) => {
    if(e.target.classList.contains("btn-aceptar")){
        const contenedorPrincipal = e.target.closest(".container-each-joya");
        const id = contenedorPrincipal.querySelector("#text-input-id").value;
        const nombre = contenedorPrincipal.querySelector("#text-input-nombre").value;
        const descripcion = contenedorPrincipal.querySelector("#text-input-descripcion").value;
        const precio = contenedorPrincipal.querySelector("#text-input-precio").value;

        const respuesta = await Modificar(id,nombre,descripcion,precio);

        if(respuesta.ok){
            //obtengo la entidad que me devuelva como respuesta
            const datos = await respuesta.json();
            contenedorPrincipal.innerHTML = `
                <div class="cnt-each-joya-label-input">
                    <label for="Id">Id: </label>
                    <input type="text" name="Id" id="text-input-id" value="${datos.Entidad.Id}" disabled>
                </div>
                <div class="cnt-each-joya-label-input">
                    <label for="Nombre">Nombre: </label>
                    <input type="text" name="Nombre" id="text-input-nombre" value="${datos.Entidad.Nombre}" disabled>
                </div>
                <div class="cnt-each-joya-label-input">
                    <label for="Descripcion">Descripcion: </label>
                    <input type="text" name="Descripcion" id="text-input-descripcion" value="${datos.Entidad.Descripcion}" disabled>
                </div>
                <div class="cnt-each-joya-label-input">
                    <label for="Precio">Precio: </label>
                    <input type="number" name="Precio" id="text-input-precio" value="${datos.Entidad.Precio}" disabled>
                </div>
                <div class="buttons-joya">
                    <button class="btn-borrar">Borrar</button>
                    <button class="btn-modificar">Modificar</button>
                    <button class="btn-aceptar" disabled>Aceptar</button>
                    <button class="btn-cancelar" disabled>Cancelar</button>
                </div>
            `}   
    } 
    //window.location.reload(); Para recargar la página cada que se acepte la modificación (Ya no, ya optimice esto para actualizr solo la cajita, no toda la pag)
})

//Evento para cuando se le de click al boton de cancelar modificacion
document.addEventListener('click', async (e) => {
    if(e.target.classList.contains("btn-cancelar")){
        const contenedorPrincipal = e.target.closest(".container-each-joya"); //e.target obtiene la etiqueta del boton
        const btn_aceptar = contenedorPrincipal.querySelector(".btn-aceptar");
        const btn_cancelar = contenedorPrincipal.querySelector(".btn-cancelar");
        const btn_modificar = contenedorPrincipal.querySelector(".btn-modificar");
        const btn_borrar = contenedorPrincipal.querySelector(".btn-borrar");

        //Restauro los values de los inputs a como estaban antes de querer modificarlos
        contenedorPrincipal.querySelector("#text-input-nombre").value = nombreAnterior;
        contenedorPrincipal.querySelector("#text-input-descripcion").value = descripcionAnterior;
        contenedorPrincipal.querySelector("#text-input-precio").value = precioAnterior;

        contenedorPrincipal.querySelector("#text-input-nombre").setAttribute("disabled",true);
        contenedorPrincipal.querySelector("#text-input-descripcion").setAttribute("disabled",true);
        contenedorPrincipal.querySelector("#text-input-precio").setAttribute("disabled",true);

        //Desactivo los botones de aceptar y cancelar
        btn_aceptar.setAttribute("disabled",true);
        btn_cancelar.setAttribute("disabled",true);

        //Activar los botones de modificar y borrar
        btn_modificar.removeAttribute("disabled");
        btn_borrar.removeAttribute("disabled");
    }
})




// document.getElementById("myButton").addEventListener("click", function () {
//     window.location.href = 'otraPagina.html'});