// regiones-comunas.js — datos y lógica del select dependiente Región → Comuna

const REGIONES = [
    {
        nombre: 'Región Metropolitana de Santiago',
        comunas: ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto']
    },
    {
        nombre: 'Región de Valparaíso',
        comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana']
    },
    {
        nombre: 'Región del Biobío',
        comunas: ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles']
    },
    {
        nombre: 'Región de la Araucanía',
        comunas: ['Temuco', 'Villarrica', 'Angol']
    },
    {
        nombre: 'Región de Ñuble',
        comunas: ['Chillán', 'San Carlos', 'Bulnes']
    }
];

function poblarRegiones(selectRegion) {
    REGIONES.forEach((region, index) => {
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = region.nombre;
        selectRegion.appendChild(opcion);
    });
}

function actualizarComunas(selectRegion, selectComuna) {
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

    const indice = selectRegion.value;
    if (indice === '') return;

    REGIONES[indice].comunas.forEach(comuna => {
        const opcion = document.createElement('option');
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });
}
