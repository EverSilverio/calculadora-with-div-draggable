const btns = document.querySelectorAll('.btn');
const visor = document.querySelector('#numeros');

var clickIgual = false;

const acao = function () {
    let cl = this.classList;
    let value = this.getAttribute('val');

    if (cl.contains('clear')) {
        fnAc();
    } else if (cl.contains('num')) {
        fnNum(value);
    } else if (cl.contains('oper')) {
        fnOper(value);
    } else if (cl.contains('del')) {
        fnDel();
    }
}

btns.forEach(element => {
    element.addEventListener('click', acao)
});

const fnAc = function () {
    visor.innerHTML = '';
}

const fnNum = function (value) {
    if (clickIgual) {
        visor.innerHTML = value;
    } else {
        visor.append(value);
    }
    clickIgual = false;
}

const fnDel = function () {
    let valor = visor.getInnerHTML();
    if (clickIgual) {
        visor.innerHTML = '';
    } else {
        visor.innerHTML = valor.substring(0, valor.length - 1);
    }
}

const fnOper = function (oper) {
    let valor = visor.getInnerHTML();
    let ultimo = valor.substring(valor.length - 1, valor.length);
    let ultimoIsOperador = ['-', '+', '/', '*'].includes(ultimo);

    clickIgual = false;

    if (valor !== '') {
        if (oper === '=') {
            if (!ultimoIsOperador) {
                visor.innerHTML = eval(valor);
                clickIgual = true;
            }
        } else {
            if (ultimoIsOperador) fnDel();
            visor.append(oper);
        }
    } else {
        if (oper === '+' || oper === '-') {
            visor.append(oper);
        }
    }
}

const calculadora = document.querySelector(".calculadora");

function onDrag({ movementX, movementY }) {
    let getStyle = window.getComputedStyle(calculadora);
    let leftVal = parseInt(getStyle.left);
    let topVal = parseInt(getStyle.top);
    console.log(getStyle.left);
    calculadora.style.left = `${leftVal + movementX}px`;
    calculadora.style.top = `${topVal + movementY}px`;
};

calculadora.addEventListener("mousedown", () => {
    calculadora.classList.add("active");
    calculadora.addEventListener("mousemove", onDrag);
});

document.addEventListener("mouseup", () => {
    calculadora.classList.remove("active");
    calculadora.removeEventListener("mousemove", onDrag);
});