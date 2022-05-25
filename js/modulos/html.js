/* => Funciones para obtener datos de objeto Html <= */
export function getIntHtml(objectHtml){
    return parseInt(objectHtml.value);
}

export function getFloatHtml(objectHtml){
    return parseFloat(objectHtml.value);
}

/* => Funciones para los buttons <= */
export function enableBtn(btn){
    btn.removeAttribute("disabled");
}

export function disableBtn(btn){
    btn.setAttribute("disabled", "");
}

/* Funciones para la creacion de elementos html con clases */
export function createInput(className){
    let nuevoInput = document.createElement("input");
    nuevoInput.classList.add(className);
    return nuevoInput;
}

//Elimina todos los nodos hijos dentro de un contenedor
export function Limpiar(contenedor){
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild); 
    }
}

/* Funciones variadas */
export function changeVarCss(root, nameVar, param){
    root.style.setProperty(nameVar, param);
}

export function placeholder(objectHtml, texto){
    objectHtml.setAttribute("placeholder", texto)
}