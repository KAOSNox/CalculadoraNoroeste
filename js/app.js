//Imports
import * as arreglo from './modulos/arreglos.js'
import * as html from './modulos/html.js';

//Elementos HTML
let root = document.documentElement;
let tamañoFilas = document.querySelectorAll(".generar-input")[0];
let tamañoColumnas = document.querySelectorAll(".generar-input")[1];
let btnGenerar = document.querySelector(".btn--generar");
let btnReset = document.querySelector(".btn--reset");
let btnCalcular = document.querySelector(".btn--calcular");
let matriz = document.querySelector(".matriz");
let resultado = document.querySelector(".resultado");
//Tamaño de la matriz
let columnas = 0;
let filas = 0;
//Objetos en matriz
let InputsArray;
let InputArrayValues;
//
// Fin de las variables globales

tamañoFilas.oninput = function(){ 
    filas = html.getIntHtml(tamañoFilas) + 1;
    refreshInputArray();
};

tamañoColumnas.oninput = function(){
    columnas = html.getIntHtml(tamañoColumnas) + 1;
    refreshInputArray();
}

function refreshInputArray(){
    InputsArray = arreglo.CrearArrayBidim(filas, columnas);
    InputArrayValues = arreglo.CrearArrayBidim(filas, columnas);
}

//Evento al clickear el boton de generar tabla
btnGenerar.onclick = function (){
    html.changeVarCss(root, '--columnas', "auto ".repeat(columnas));
    //Genera la tabla o matriz dentro del HTML y guarda el acceso a los objetos en una matriz
    GenerarTabla();
    //Buttons
    html.enableBtn(btnReset);
    html.enableBtn(btnCalcular);
    html.disableBtn(btnGenerar);
}

//Genera la tabla que estara dentro de la matriz
function GenerarTabla(){
    for(let i = 0; i < filas; i++){
        for(let j = 0; j < columnas; j++){
            let nuevaCelda = html.createInput("matriz__input");
            //Le añade un Placeholder dependiendo la celda creada
            if(i < filas-1 && j < columnas-1 ){
                html.placeholder(nuevaCelda, `${i+1}, ${j+1}`);
            }
            else if(i === filas-1){
                html.placeholder(nuevaCelda, "Demanda");
            }
            else if(j === columnas-1){
                html.placeholder(nuevaCelda, "Suministro");
            }
            //Añade la celda dentro de la matriz html
            matriz.appendChild(nuevaCelda);
            //Guarda el acceso al objeto celda en el arreglo bidimencional
            InputsArray[i][j] =  nuevaCelda;
        }
    }
    //Remueve el ultimo hijo (no es necesaria la ultima celda en vogel)
    matriz.removeChild(matriz.lastChild);
}

//Evento al clickear el boton de Reset
btnReset.onclick = function(){
    tamañoFilas.value = "";
    tamañoColumnas.value = "";
    columnas = 0;
    filas = 0;
    arreglo.limpiarArregloBidim(InputsArray);
    arreglo.limpiarArregloBidim(InputArrayValues);
    html.Limpiar(matriz);
    html.enableBtn(btnGenerar);
    html.disableBtn(btnReset);
    html.disableBtn(btnCalcular);
}

//Evento al darle click al boton de calcular
btnCalcular.onclick = function(){
    InputArrayValues = arreglo.getValoresArregloBidim(filas, columnas, InputsArray)
    if(verificarValores() === true){
        calcular();
    }
}

function verificarValores(){
    let sumaFilas = 0;
    let sumaColumna = 0;
    //Suma todos los datos de demanda
    for(let i=1; i<=columnas-1; i++){
        sumaFilas += InputArrayValues[filas-1][(columnas-1)-i]
    }
    //Suma todos los datos de suministro
    for(let i=1; i<=filas-1; i++){
        sumaColumna += InputArrayValues[i-1][columnas-1]
    }
    //Verifica que todas las celdas de precio este llenas
    for(let i=0; i<filas; i++){
        for(let j=0; j<columnas; j++){
            if(InputsArray[i][j].value === "" && i+j != (filas + columnas - 2)){
                alert("Celda Vacia")
                break;
            }
        }
    }
    //Verifica que la demanda sea igual al suministro disponible
    if(sumaFilas != sumaColumna){
        alert("La suma de la demanda es diferente a la del suministro");
    }

    return true;
}

function calcular(){
    //Guardan la demanda y suministro ingresado en la tabla en forma de vector
    let demanda = [];
    let suministro = [];

    //Recorre las columnas de la fila de demanda y las guarda en un vector
    for(let i=0; i<=columnas-2; i++){
        demanda.push(InputArrayValues[filas-1][i]);
    }
    //Recorre las filas de la columna suministro y las guarda en un vector
    for(let i=0; i<=filas-2; i++){
        suministro.push(InputArrayValues[i][columnas-1])
    }
    let PosFila = 0;
    let PosColumna = 0;
    let AsigPosFila = [];
    let AsigPosColumna = [];
    let asignacion = [];
    for(let i =1; i<=columnas-1; i++){
        for(let j=1; j<=filas-1; j++){
            if(demanda[PosFila] < suministro[PosColumna]){
                // console.log("==========================================")
                // console.log("DEMANDA MENOR A SUMINISTRO")
                // console.log(`ASIGNADO  ${suministro[PosColumna]} - ${demanda[PosFila]}` )
                // console.log(`X1: ${PosFila} X2: ${PosColumna}` )
                // console.log(demanda)
                // console.log(suministro)
                AsigPosFila.push(PosFila);
                AsigPosColumna.push(PosColumna);
                asignacion.push(demanda[PosFila])
                suministro[PosColumna] -= demanda[PosFila];
                demanda[PosFila] = 0;
                PosFila += 1;
            }else if(demanda[PosFila] > suministro[PosColumna]){
                // console.log("DEMANDA MAYOR A SUMINISTRO")
                // console.log(`ASIGNADO ${demanda[PosFila] - suministro[PosColumna]}` )
                // console.log(`X1: ${PosFila} X2: ${PosColumna}` )
                AsigPosFila.push(PosFila);
                AsigPosColumna.push(PosColumna);
                asignacion.push(suministro[PosColumna])
                demanda[PosFila] -= suministro[PosColumna];
                suministro[PosColumna] = 0;
                PosColumna += 1;
            }else if(demanda[PosFila] === suministro[PosColumna] && demanda[PosFila] > 0 && suministro[PosColumna] > 0){
                AsigPosFila.push(PosFila);
                AsigPosColumna.push(PosColumna);
                asignacion.push(suministro[PosColumna])
                demanda[PosFila] -= suministro[PosColumna];
                suministro[PosColumna] = 0;
                demanda[PosColumna] = 0;
                PosFila += 1;
                PosColumna += 1;
            }
        }
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    }
    asignarEnTabla(AsigPosFila, AsigPosColumna, asignacion);
}

function asignarEnTabla(posFilas, posColumnas, asignacion){
    let celdaAsigValor = [] //Guarda el valor de la celda al cual se asigne un valor
    let posVector = 0; //Posicicion del vector de posFila y posColuma
    let posAsig = 0; //Posicicion del vector de asignacion
    console.log(posFilas)
    console.log(posColumnas)
    console.log(asignacion)
    console.log("_______________-----_____________")
    for(let i=0; i<filas; i++){
        for(let j=0; j<columnas; j++){
            console.log(`I:${i} J:${j}`)
            if(j == posFilas[posVector] && i == posColumnas[posVector]){
                console.log(`COINCIDENCIA EN i:${i} fila:${posFilas[posVector]}`)
                console.log(`COINCIDENCIA EN j:${j} columna:${posColumnas[posVector]}`)
                console.log(`ASIGNAR EN CELDA: ${j},${i}`)
                console.log("_______________-----_____________")
                celdaAsigValor.push(InputsArray[i][j].value)
                InputsArray[i][j].value = asignacion[posAsig];
                posVector += 1
                posAsig += 1;
            }else{
                InputsArray[i][j].value = "-";
            }
            // if(i == posColumnas[posVector] && j == posFilas[posVector]){

            //    // InputsArray[i][j].value = asignacion[posAsig];
            //     posAsig += 1;
            //     posVector += 1;
            // }
            //  console.log("______________________________________________________________")
        }
    }
    console.log(celdaAsigValor)
    mostrarCalculo(celdaAsigValor, asignacion)
}

function mostrarCalculo(celdasValor, asignacion){
    let Calculo = "";
    let CalculoNumerico = 0;
    for(let i=0; i<celdasValor.length; i++){
        Calculo += `(${celdasValor[i]}*${asignacion[i]}) + `;
        CalculoNumerico += celdasValor[i] * asignacion[i];
    }
    Calculo = Calculo.substring(0, Calculo.length - 2)
    resultado.innerHTML = `<span>${Calculo}= <b>${CalculoNumerico}</b></span>`
}