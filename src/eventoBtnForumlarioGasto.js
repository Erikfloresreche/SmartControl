const btn = document.getElementById('toggle-form-gasto');
const formulario = document.getElementById('formulario-gasto');

const abrirFormularioGasto = (modo = 'agregarGasto') => {
    btn.classList.add('agregar-gasto__btn--active');
    formulario.classList.add('formulario-gasto--active');

    if(modo === 'editarGasto') {
        document.querySelector('.formulario-gasto__titulo').innerText = 'Editar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Editar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'editarGasto';
    } else {
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        document.querySelector('.formulario-gasto__titulo').innerText = 'Agregar Gasto';
        document.querySelector('.formulario-gasto__btn').innerText = 'Agregar Gasto';
        document.getElementById('formulario-gasto').dataset.modo = 'agregarGasto';
    }
}

const cerrarFormularioGasto = () => {
    btn.classList.remove('agregar-gasto__btn--active');
    formulario.classList.remove('formulario-gasto--active');
}

btn.addEventListener('click', (e) => {
    if([...formulario.classList].includes('formulario-gasto--active')){
        cerrarFormularioGasto();
    } else {
        abrirFormularioGasto();
    }
});

export {cerrarFormularioGasto, abrirFormularioGasto};