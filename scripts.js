//VARIABLES
const cantVacio = parseFloat(document.querySelector('#cantVacio').value);
const cantCostilla = parseFloat(document.querySelector('#cantCostilla').value);
const cantEntrana = parseFloat(document.querySelector('#cantEntrana').value);
const checkCarbon = document.querySelector('#checkCarbon').checked;
const checkBeneficios = document.querySelector('#checkBeneficios').checked;

const precioVacio = parseFloat(document.querySelector('#precioVacio').value);
const precioCostilla = parseFloat(document.querySelector('#precioCostilla').value);
const precioEntrana = parseFloat(document.querySelector('#precioEntrana').value);

//Declaramos el array asado
const asado = [];

//Construcción objeto CorteAsado
function CorteAsado(nombre, peso, preciokilo) {
    this.nombre = nombre;
    this.peso = peso;
    this.preciokilo = preciokilo;
    this.preciototal = this.peso * this.preciokilo;
}

//Creamos los array por corte de carne y carbon
asado.push(new CorteAsado("Vacío", cantVacio, precioVacio));
asado.push(new CorteAsado("Costilla", cantCostilla, precioCostilla));
asado.push(new CorteAsado("Entraña", cantEntrana, precioEntrana));
asado.push(new CorteAsado("Carbón", 4, 20));

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    total;
})




//FUNCIONES

//Chequeo si algún valor (peso x kilo o precio) no es un número. Si es así, lo convierte en 0
const checkIsNAN = () => {
    for (const item of asado) {
        if (isNaN(item.peso)) {
            console.log('No ingresaste un número. Lo tomo como un 0');
            item.peso = parseFloat(0);
            item.preciototal = parseFloat(0);
        }
        else {
            console.log('es un numero')
        }
    }
    for (const item of asado) {
        if (isNaN(item.preciokilo)) {
            console.log('No ingresaste un número. Lo tomo como un 0');
            item.preciokilo = parseFloat(0);
            item.preciototal = parseFloat(0);
        }
        else {
            console.log('es un numero')
        }
    }
}
checkIsNAN();

//Defino los precios finales

//Función sumar y asigna a resultado
const suma = (a, b, c, d) => a + b + c + d;


//Función para sumar el array para el carbón si necesito
if (checkCarbon == false) {
    asado[3].preciototal = parseFloat(0);
};

//Declaro precios finales del asado
const precioVacioFinal = asado[0].preciototal;
const precioCostillaFinal = asado[1].preciototal;
const precioEntranaFinal = asado[2].preciototal;
const precioCarbonFinal = asado[3].preciototal;
const totalPrecioAsado = suma(precioVacioFinal, precioCostillaFinal, precioEntranaFinal, precioCarbonFinal);

//Creo un nuevo filtrando los array que no tienen un valor 0
let asadoOK = asado.filter((item) => item.peso !== 0);


//Si tengo la tarjeta de beneficios, descuento un 20% al total
let descuento;
let leyendaBeneficios;
if (checkBeneficios == true) {
    descuento = totalPrecioAsado * 0.2;
    leyendaBeneficios = `¡Con tu tarjeta de beneficios te ahorraste \$${descuento}!`;
} else {
    descuento = 0;
    leyendaBeneficios = `No tenés la tarjeta de beneficios`;
};

//Defino la constante total con el resultado final
const total = parseFloat(totalPrecioAsado) - descuento;


//Función que muestra resultado
let listadoItems;
const lista = () => {
    if (totalPrecioAsado !== 0) {

        let conclusion = document.querySelector("#conclusion");
        conclusion.innerText = `Vas a necesitar llevar \$${total}`;
        console.log(`Vas a necesitar llevar $${total}`)

        let listado = document.querySelector("#listado");
        listado.innerHTML = "<h3>Esto es lo que vas a necesitar comprar:</h3>";
        for (const corte of asadoOK) {
            listadoItems = document.createElement("li");
            listadoItems.innerHTML = `<strong> ${corte.nombre}:</strong> ${corte.peso}kg <em>(a $${corte.preciokilo} el kilo, son $${corte.preciototal})</em>`;
            listado.appendChild(listadoItems);
            console.log(`Listado final HTML: ${listadoItems.innerHTML}`)
        }
        listado.innerHTML += leyendaBeneficios;
    } else {
        conclusion = document.querySelector("#conclusion");
        conclusion.innerHTML = '¡No necesitás comprar nada!'; //Si no necesitás comprar nada no te muestra la opción de pagar con tarjeta de beneficios
        console.log('¡No necesitás comprar nada!')
    }
}
lista();

//CONSOLE
console.log('*********************************************');
console.log(asado);
console.log('---------------------------------------------');
console.log(`Cantidad Vacío: ${asado[0].peso}`);
console.log(`Cantidad Costilla: ${asado[1].peso}`);
console.log(`Cantidad Entraña: ${asado[2].peso}`);
console.log(`Sumar Carbón: ${checkCarbon}`);
console.log(`Tengo Descuento: ${checkBeneficios}`);
console.log('---------------------------------------------');
console.log(`Precio del Vacío: ${asado[0].preciokilo}`);
console.log(`Precio del Costilla: ${asado[1].preciokilo}`);
console.log(`Precio de la Entraña: ${asado[2].preciokilo}`);
console.log(`Precio del Carbón: ${asado[3].preciokilo}`);
console.log('---------------------------------------------');
console.log(`Precio Final del Vacío: ${asado[0].preciototal}`);
console.log(`Precio Final del Costilla: ${asado[1].preciototal}`);
console.log(`Precio Final de la Entraña: ${asado[2].preciototal}`);
console.log(`Precio Final del Carbón: ${asado[3].preciototal}`);
console.log('---------------------------------------------');
console.log(`Suma de la carne y carbón: ${totalPrecioAsado}`);
console.log('---------------------------------------------');
console.log(`Descuento: ${descuento}`);
console.log('---------------------------------------------');
console.log(`Total: ${total}`);
console.log('*********************************************');
console.log(leyendaBeneficios);
console.log(`Leyenda: ${conclusion.innerHTML}`)
console.log('---------------------------------------------');
console.log(asadoOK);

