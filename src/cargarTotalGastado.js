import { parseISO } from 'date-fns';
import isThisMonth from 'date-fns/isThisMonth'

const cargarTotalGastado = () => {
    const contenedorTotal = document.getElementById('total-gastado');

    const gastos = JSON.parse(window.localStorage.getItem('gastos'));
    let total = 0;

    if(gastos){
        const gastosDelMes = gastos.filter((gasto) => {
            if(isThisMonth(parseISO(gasto.fecha))){
                return gasto;

            }
        });
        if(gastosDelMes){
            gastosDelMes.forEach((gasto) => {
                total += parseFloat(gasto.precio);
            })
        }
        //Formateamos el número y lo agregamos al contenedor:
        const formatoMoneda = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'});
        contenedorTotal.innerText = formatoMoneda.format(total);
    }
};


export default cargarTotalGastado;