import { v4 as uuidv4 } from 'uuid';
import { cerrarFormularioGasto } from './eventoBtnForumlarioGasto';
import cargarGastos from './cargarGastos';
import cargarTotalGastado from './cargarTotalGastado';


const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;

const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;
const precio = formulario.precio;

const comprobarDescripcion = () => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');
        
        formulario.descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');
    
        return false;
    }else {
        descripcion.classList.remove('formulario-gasto__input--error');
        
        formulario.descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
    
    
};
const comprobarPrecio = () => {
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add('formulario-gasto__input--error');
        
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');
    
        return false;
    }else {
        precio.classList.remove('formulario-gasto__input--error');
        
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    }
    
    
};

//EventListener para cuando el input descripción pierde el focus.
descripcion.addEventListener ('blur', (e) => comprobarDescripcion());
//EventListener para cuando el input tiene un err y el usuario empieza a corregirlo:
descripcion.addEventListener ('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarDescripcion();

    }
});
//EventListener para cuando el input precio pierde el focus.
precio.addEventListener ('blur', (e) => comprobarPrecio());
//EventListener para cuando el input tiene un err y el usuario empieza a corregirlo:
precio.addEventListener ('keyup', (e) => {
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarPrecio();

    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtenemos el modo del formulario:
    const modo = formulario.closest('#formulario-gasto')?.dataset?.modo;


    if(comprobarDescripcion() && comprobarPrecio()){
        const nuevoGasto = {
            //Creamos un id unico con 'uuid'
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        }

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));      

        if(modo === 'agregarGasto'){
        //Comprobamos si hay gastos:
            if(gastosGuardados){
                //Creamos una nueva lista de gastos para agregar uno nuevo:
                    const nuevosGastos = [...gastosGuardados, nuevoGasto];
                    window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
                } else{
                    //Guardamos la info en LocalStorage:
        
                    window.localStorage.setItem('gastos', JSON.stringify([{...nuevoGasto}]));
                }
        } else if (modo === 'editarGasto'){
            //Obtenemos el id del gasto que queremos editar:
            const id = document.getElementById('formulario-gasto').dataset?.id;
            
            //Obtenemos los valores de descripcion y precio:

            //Obtenemos el index del elemento que queremos eliminar.
            let indexGastoAEditar = '';
            if(id && gastosGuardados){
                gastosGuardados.forEach((gasto, index) => {
                    if(gasto.id === id){
                        indexGastoAEditar = index;
                    }
                })
            }

            //Hacemos una copia de los gastos guardados para poder editarlo:
            const nuevosGastos = [...gastosGuardados];

            nuevosGastos[indexGastoAEditar] = {
                ...gastosGuardados[indexGastoAEditar],
                descripcion: descripcion.value,
                precio: precio.value,
            };
            //Remplazamos le localStorage con los nuevos gastos.
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        //Reiniciamos valores:
        descripcion.value = '';
        precio.value = '';
        
        cargarGastos();
        cargarTotalGastado();
        cerrarFormularioGasto();


    }

});