export function CrearArrayBidim(numFilas, numColumnas){
    let nuevoArreglo = [];
    for(let i = 0; i < numFilas; i++){
        nuevoArreglo.push(new Array(numColumnas));
    }
    return nuevoArreglo;
}

export function getValoresArregloBidim(numFilas, numColumnas, objectArreglo){
    let arrayBidimencional = CrearArrayBidim(numFilas, numColumnas);
    for(let i = 0; i < numFilas; i++){
        for(let j = 0; j < numColumnas; j++){
            arrayBidimencional[i][j] = parseInt(objectArreglo[i][j].value);
        }
    }
    return arrayBidimencional;
}

export function RecorrerColumnasBidim(arreglo, numFilas, NumColumnas){
    let ColumnasValue = [];
    for(let i=0; i<numFilas; i++){
        for(let j=0; j<NumColumnas; j++){
            ColumnasValue[i] = arreglo[j][i];
        }
    }
}

export function limpiarArregloBidim(arreglo){
    for(let i=arreglo.length; i > 0; i--){
        arreglo.pop();
    }
}