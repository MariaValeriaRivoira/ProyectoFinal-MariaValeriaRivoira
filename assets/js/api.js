let datosMostrar = [];

class Materia{
    
    constructor(nombre, nota){
        this.materia = nombre;
        this.nota = nota;
        
    }

    
    notaGuardada(){ 

        let notas = this.nota; 
        return notas;
        
    }
};

{   
    const datosCargados = async () =>{
        try {
            const origen = await axios.get(`https://my-json-server.typicode.com/MariaValeriaRivoira/MisDesarrollos/entradas`);
            
            origen.data.forEach(objeto => {
                datosMostrar.push(new Materia(objeto.materia,objeto.nota));
            });
            datosAMostrar();
        } catch (error) {
            console.log(error);
        }
    }

    if (localStorage.getItem('datosMostrar') != null){
        let entradas = [];
        entradas = JSON.parse(window.localStorage.getItem('datosMostrar'));
        
        entradas.forEach(objeto => {
            datosMostrar.push(new Materia(objeto.materia,objeto.nota));
        });
    }else{
        datosCargados();
    }   
} 
document.getElementById('notaPromedio').value = "0"; 


const agregar = () => {
    
    let formulario = document.createElement("div");
    formulario.innerHTML = `
            <h5>Complete los campos<h5>
            </br>
            <h4>Materia</h4>
            <input autocomplete="off" class="form-control d-inline-block" id="MateriaInput" style="width: 89%" type="text"/>

            <h4>Nota</h4>
            <input autocomplete="off" class="form-control d-inline-block" id="NotaInput" style="width: 89%;margin-bottom:2rem;" type="text"/>
            
          `;

    Swal.fire({
        title: 'Ingresar Materia',
        html: formulario,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",

    }).then(resultado => {
        if (resultado.value) {
        nombreMateria = document.getElementById('MateriaInput').value;
        nota = document.getElementById('NotaInput').value;
                
        if(nombreMateria != "" && nota != ""){
            let materiaNueva = new Materia(nombreMateria, nota);
            datosMostrar.push(materiaNueva);
            localStorage.datosMostrar = JSON.stringify(datosMostrar); 
            datosAMostrar(datosMostrar);
        }else{
            Swal.fire('Llenar datos');
            setTimeout(() => {
                agregar();
              }, 1000)
        }

        }
    });
};


  const eliminar = () => {

    Swal
    .fire({
        title: "Borrar una materia",
        text: "Anote el nombre de la materia a borrar",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            Swal.fire({
                title: '¿Confirma borrar la materia?',
                
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Borrar'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if(!(datosMostrar.find(elemento => elemento.materia == resultado.value)===undefined)){
                        datosMostrar.splice(datosMostrar.indexOf(datosMostrar.find(elemento => elemento.materia == resultado.value)),1);
                        localStorage.datosMostrar = JSON.stringify(datosMostrar); 
                        datosAMostrar(datosMostrar);
                        Swal.fire('Materia Borrada');
                    }else{
                        Swal.fire('La materia no existe');
                    }
                    
                }
            })
            }
    }); 
};


const datosAMostrar = (arreglo=datosMostrar) => {
    let suma = 0;
    limpiarTabla();
    limpiarPromedio();
    arreglo.forEach(objeto => {
        nota = parseFloat(objeto.notaGuardada());
        console.log('nota', nota);

        suma = suma + nota;
        console.log('suma', suma);
        
        mostrarEnTabla(objeto.materia,objeto.nota);
    });
    promedio = suma/ arreglo.length;
        console.log('promedio', promedio);
    
        mostrarPromedio(promedio);
    
    
};

const mostrarPromedio = (promedio) =>{
    document.getElementById('notaPromedio').value = promedio;
};

const mostrarEnTabla = (materia, nota) =>{ 
    

    document.getElementById('Tabla1').insertRow(-1).innerHTML = `<tr>
        <td>${materia}</td><td>${nota}</td><tr>`
};

const limpiarPromedio = () => {
    document.getElementById('notaPromedio').value = '';
}

const limpiarTabla = () => {
    document.getElementById('Tabla1').innerHTML= `
        <thead>
            <tr>
                <th>Materia</th>
                <th>Nota</th>
                
            </tr>
        </thead>
        <tbody id="body">
            <!--Contenido de la tabla-->
        </tbody>`
};

datosAMostrar();