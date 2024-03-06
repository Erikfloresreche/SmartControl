import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";
import { abrirFormularioGasto } from "./eventoBtnForumlarioGasto";

const contenedorGastos = document.getElementById('gastos');

contenedorGastos.addEventListener('click', (e) => {
    const gasto = e.target.closest('.gasto');

    //Comprobamos si estamos haciendo click en un gasto:
    if(gasto){
        //ScrollLeft nos permite saber la posición del scroll.
        if(gasto.scrollLeft > 0 ){
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        } else {
            //ScrollIntoView SIEMPRE recibe un objeto con 3 propiedades, 1. Comportamiento, 2. Hacia dnd se desplaza, 3. Indicamos que elemento recibe el scroll.
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        }
    }

    //Editar gasto:
    if(e.target.closest('[data-accion="editar-gasto"]')){
        //Obtenemos le id del gasto que queremos editar:
        const id = gasto.dataset.id;
        
        //Obtenemos los datos guardados:
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '';
        let descripcion = '';
        
        //Comprobamos si hay gastos guardados:
        if(gastosGuardados && gastosGuardados.length > 0) {
            gastosGuardados.forEach((gasto) => {
                if(gasto.id === id) {
                    precio = gasto.precio;
                    descripcion = gasto.descripcion;
                }
            });
            //Le ponemos la descripcion y el precio a los inputs del formulario.
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;
            abrirFormularioGasto('editarGasto');
        }
    }
    //Eliminar gasto:
    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        //Obtenemos el id del gasto que queremos eliminar:
        const id = e.target.closest('.gasto').dataset.id
        
        //Obtener los gastos guardados:
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        if (gastosGuardados) {
            const nuevosGastos = gastosGuardados.filter((gasto) => {
                if(gasto.id !== id){
                    return gasto;
                }
            });

            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }
        cargarGastos();
        cargarTotalGastado();
    }
});