alert("¡Hoy comemos asado!\n\nEstos son los cortes:\n· Vacío\n· Costilla\n· Entraña\n\nVamos a armar la lista para ir a la carnicería.");

//Construcción objeto CorteAsado
function CorteAsado(nombre, peso, preciokilo) {
    this.nombre = nombre;
    this.peso = peso;
    this.preciokilo = preciokilo;
    this.preciototal = this.peso * this.preciokilo;
}

//Declaramos el array asado
const asado = [];

//Pedimos que nos ingrese cuanto quiere de cada corte
let cantVacio = parseFloat(prompt("¿Cuántos kilos querés de Vacío? El kilo cuesta $80"));
while (isNaN(cantVacio)) {
    cantVacio = parseFloat(prompt("No ingresaste un número. Por favor, ¿cuánto querés de Vacío? El kilo cuesta $80"));
}
let cantCostilla = parseFloat(prompt("¿Cuántos kilos querés de Costilla? El kilo cuesta $120"));
while (isNaN(cantCostilla)) {
    cantCostilla = parseFloat(prompt("No ingresaste un número. Por favor, ¿cuánto querés de Costilla? El kilo cuesta $120"));
}
let cantEntrana = parseFloat(prompt("¿Cuántos kilos querés de Entraña? El kilo cuesta $100"));
while (isNaN(cantEntrana)) {
    cantEntrana = parseFloat(prompt("No ingresaste un número. Por favor, ¿cuánto querés de Entraña? El kilo cuesta $100"));
}

//Creamos los array por corte de carne
asado.push(new CorteAsado("Vacío", cantVacio, 80));
asado.push(new CorteAsado("Costilla", cantCostilla, 120));
asado.push(new CorteAsado("Entraña", cantEntrana, 100));

//Declaramos las variables para sumar los precios totales por corte
let precioVacio = asado[0].preciototal;
let precioCostilla = asado[1].preciototal;
let precioEntrana = asado[2].preciototal;
let precioCarbon = 0;

//Función sumar y asigna a resultado
const suma = (a, b, c, d) =>  a + b + c + d;

//Declaramos la variable totalPrecioAsado
let totalPrecioAsado;
let contenedor = document.getElementById("asado");

//Función para cuando no responde por Si o No
const noSeEntiende = () => alert("No entiendo lo que decís. Lo tomo como un NO.");

//Función para sumar el array para el carbón
const comprarCarbon = () => {
    asado.push(new CorteAsado("Carbón", 4, 20));
    let precioCarbon = asado[3].preciototal;
    totalPrecioAsado = suma(precioVacio, precioCostilla, precioEntrana, precioCarbon);
    return totalPrecioAsado;
}

//Función que chequea si tenés Carbón
const checkCarbon = () => {
    let hayCarbon = prompt("¿Tenés carbón? La bolsa es de 4kg (SI o NO)");
    if ((hayCarbon == "SI") || (hayCarbon == "si") || (hayCarbon == "Si")) {
        totalPrecioAsado = suma(precioVacio, precioCostilla, precioEntrana, precioCarbon);
        return totalPrecioAsado;
    } else if ((hayCarbon == "NO") || (hayCarbon == "no") || (hayCarbon == "No")) {
        comprarCarbon();
    } else {
        noSeEntiende();
        comprarCarbon();
    }
}
checkCarbon();

//Función que chequea si tenés descuento
let descuento = 0;
const checkDescuento = () => {
    let tarjetaBeneficios = document.getElementById("tarjetaBeneficios");
    let noTenesBeneficios = `<em>No tenés la tarjeta de beneficios</em><br>`;
    let hayDescuento = prompt("Con la tarjeta de beneficios, tenés 20\% de descuento. ¿La tenés? (SI o NO)");
    if ((hayDescuento == "SI") || (hayDescuento == "si") || (hayDescuento == "Si")) {
        descuento = totalPrecioAsado * 0.2;
        tarjetaBeneficios.innerHTML = `<em>¡Con tu tarjeta de beneficios te ahorraste \$${descuento}!</em><br>`;
        return descuento;
    } else if ((hayDescuento == "NO") || (hayDescuento == "no") || (hayDescuento == "No")) {
        tarjetaBeneficios.innerHTML = noTenesBeneficios;
    } else {
        noSeEntiende();
        tarjetaBeneficios.innerHTML = noTenesBeneficios;
    }
}

//Función que muestra resultado
const lista = () => {
    if (totalPrecioAsado !== 0) {

        contenedor.innerHTML = '<h2>¡Hoy hacemos asado!</h2><p>Lista para la carnicería:</p><ul id="listado"></ul><p id="tarjetaBeneficios"></p><p id="conclusion"></p>';
        
        //Creo un nuevo filtrando los array que no tienen un valor 0
        let asadoOK = asado.filter((item) => item.peso !== 0);
        console.log(asadoOK);

        let listado = document.getElementById("listado");

        for (const corte of asadoOK) {
            //Mantengo en consola para chequear los valores
            console.log(corte.nombre);
            console.log(corte.peso);
            console.log(corte.preciokilo);
            console.log(corte.preciototal);
            //Arma el listado en pantalla

            let listadoItems = document.createElement("li");
            listadoItems.innerHTML = `<strong> ${corte.nombre}:</strong> ${corte.peso}kg <em>(a $${corte.preciokilo} el kilo, son $${corte.preciototal})</em>`;
            listado.appendChild(listadoItems);
        }

        checkDescuento();
        let total = parseFloat(totalPrecioAsado) - descuento;

        let conclusion = document.getElementById("conclusion");
        conclusion.innerHTML = `<strong>Vas a necesitar llevar \$${total}</strong>`;
    } else {
        let conclusion = document.getElementById("conclusion");
        contenedor.innerHTML = '<h2>¡Hoy hacemos asado!</h2><p>¡No necesitás comprar nada!</p>'; //Si no necesitás comprar nada no te muestra la opción de pagar con tarjeta de beneficios
    }
}
console.log(totalPrecioAsado);
lista();
