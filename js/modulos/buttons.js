function EnableBtn(btn){
    btn.removeAttribute("disabled");
}

function DisableBtn(btn){
    btn.setAttribute("disabled", "");
}

export {EnableBtn, DisableBtn};