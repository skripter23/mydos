let button = document.getElementById('loadData');
let parentDiv = document.getElementById('solution');
let child = document.createElement('input')
let hledej = document.createElement('button');
let nazev = document.createElement('div');
let meli = document.createElement("div")
hledej.innerText = 'Hledej!';
var xhr = new XMLHttpRequest()
button.onclick = () => {
    child.value = '';
    button.disabled = true;
    xhr.open(
        'GET',
        'https://gist.githubusercontent.com/oldamalec/4856cd1a06204df7cef8e61e2569fd12/raw/40062658d4a8c0fbd38e7ea2495da336f7c43455/stops.json',
        true
    )
    xhr.send()
    xhr.addEventListener("load", function() {
        while (button.nextElementSibling) {
            parentDiv.removeChild(button.nextElementSibling);
        }
        while (button.nextSibling) {
            parentDiv.removeChild(button.nextSibling);
        }
        button.disabled = false;
        hledej.disabled = true;
        button.innerHTML = '<i class="fa fa-certificate" aria-hidden="true"></i> Aktualizovat data o zastávkách';
        button.insertAdjacentHTML('afterend', '<span class="hledat"><br><br>Hledat </span>');
        hledej.classList.add('hledej');
        parentDiv.append(child);
        parentDiv.append(hledej);
    });
}

function ifMoreElements(el) {
    let elem = document.getElementById(el);
    let ob = JSON.parse(xhr.responseText);
    while (hledej.nextElementSibling) {
        parentDiv.removeChild(hledej.nextElementSibling);
    }
    while (hledej.nextSibling) {
        parentDiv.removeChild(hledej.nextSibling);
    }
    for (let i = 0; i < ob.stopGroups.length; i++) {
        if (elem.innerText == ob.stopGroups[i].name) {
            parentDiv.append(nazev);
            nazev.insertAdjacentHTML('beforebegin', `<h1 class="nazev"><i class="fa fa-check-square" aria-hidden="true"></i> ${ob.stopGroups[i].name}</h1>`)
            for (let j = 0; j < ob.stopGroups[i].stops.length; j++) {
                nazev.insertAdjacentHTML('beforebegin', `<br><br><a href="https://www.google.com/maps/place/${ob.stopGroups[i].stops[j].lat},${ob.stopGroups[i].stops[j].lon}" target="_blank" class="nastupiste">Nástupiště ${j + 1}</a>`);
                for (let k = 0; k < ob.stopGroups[i].stops[j].lines.length; k++) {
                    if (ob.stopGroups[i].stops[j].lines[k].type == 'bus') {
                        nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-bus" aria-hidden="true"></i><span class="type"> ${ob.stopGroups[i].stops[j].lines[k].type} ${ob.stopGroups[i].stops[j].lines[k].id} → ${ob.stopGroups[i].stops[j].lines[k].direction}</span>`);
                    } else if (ob.stopGroups[i].stops[j].lines[k].type == 'tram') {
                        nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-subway" aria-hidden="true"></i><span class="type"> ${ob.stopGroups[i].stops[j].lines[k].type} ${ob.stopGroups[i].stops[j].lines[k].id} → ${ob.stopGroups[i].stops[j].lines[k].direction}</span>`);
                    } else if (ob.stopGroups[i].stops[j].lines[k].type == 'metro') {
                        nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-train" aria-hidden="true"></i><span class="type"> ${ob.stopGroups[i].stops[j].lines[k].type} ${ob.stopGroups[i].stops[j].lines[k].id} → ${ob.stopGroups[i].stops[j].lines[k].direction}</span>`);
                    } else {
                        nazev.insertAdjacentHTML('beforebegin', `<br><br>• <span class="type">${ob.stopGroups[i].stops[j].lines[k].type} ${ob.stopGroups[i].stops[j].lines[k].id} → ${ob.stopGroups[i].stops[j].lines[k].direction}</span>`);
                    }
                }
            }
        }
    }
}

const checkInput = function(evt) {
    if (child.value.length > 0) {
        hledej.removeAttribute('disabled');
    } else {
        hledej.disabled = true;
    }
}
child.addEventListener('keyup', checkInput);
child.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        hledej.click();
    }
})


hledej.onclick = () => {
    // child.value = написанное в инпуте
    while (hledej.nextElementSibling) {
        parentDiv.removeChild(hledej.nextElementSibling);
    }
    while (hledej.nextSibling) {
        parentDiv.removeChild(hledej.nextSibling);
    }
    let obj = JSON.parse(xhr.responseText);
    let kol = 0;
    for (let i = 0; i < obj.stopGroups.length; i++) {
        if (obj.stopGroups[i].name.includes(child.value)) {
            kol += 1;
        }
    }
    if (kol == 1) {
        for (let i = 0; i < obj.stopGroups.length; i++) {
            if (child.value == obj.stopGroups[i].name) {
                parentDiv.append(nazev);
                nazev.insertAdjacentHTML('beforebegin', `<h1 class="nazev"><i class="fa fa-check-square" aria-hidden="true"></i> ${obj.stopGroups[i].name}</h1>`)
                for (let j = 0; j < obj.stopGroups[i].stops.length; j++) {
                    nazev.insertAdjacentHTML('beforebegin', `<br><br><a href="https://www.google.com/maps/place/${obj.stopGroups[i].stops[j].lat},${obj.stopGroups[i].stops[j].lon}" target="_blank" class="nastupiste">Nástupiště ${j + 1}</a>`);
                    for (let k = 0; k < obj.stopGroups[i].stops[j].lines.length; k++) {
                        if (obj.stopGroups[i].stops[j].lines[k].type == 'bus') {
                            nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-bus" aria-hidden="true"></i><span class="type"> ${obj.stopGroups[i].stops[j].lines[k].type} ${obj.stopGroups[i].stops[j].lines[k].id} → ${obj.stopGroups[i].stops[j].lines[k].direction}</span>`);
                        } else if (obj.stopGroups[i].stops[j].lines[k].type == 'tram') {
                            nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-subway" aria-hidden="true"></i><span class="type"> ${obj.stopGroups[i].stops[j].lines[k].type} ${obj.stopGroups[i].stops[j].lines[k].id} → ${obj.stopGroups[i].stops[j].lines[k].direction}</span>`);
                        } else if (obj.stopGroups[i].stops[j].lines[k].type == 'metro') {
                            nazev.insertAdjacentHTML('beforebegin', `<br><br>• <i class="fa fa-train" aria-hidden="true"></i><span class="type"> ${obj.stopGroups[i].stops[j].lines[k].type} ${obj.stopGroups[i].stops[j].lines[k].id} → ${obj.stopGroups[i].stops[j].lines[k].direction}</span>`);
                        } else {
                            nazev.insertAdjacentHTML('beforebegin', `<br><br>•<span class="type"> ${obj.stopGroups[i].stops[j].lines[k].type} ${obj.stopGroups[i].stops[j].lines[k].id} → ${obj.stopGroups[i].stops[j].lines[k].direction}</span>`);
                        }
                    }
                }
            }
        }
    } else if (kol < 1) {
        parentDiv.append(nazev);
        nazev.insertAdjacentHTML('beforebegin', `<h1 class="zadne"><i class="fa fa-times-circle" aria-hidden="true"></i> Žádné výsledky!</h1>`);
    } else if (kol > 1) {
        parentDiv.append(nazev);
        nazev.insertAdjacentHTML('beforebegin', `<h1 class="meli">Měli jste na mysli:</h1>`);
        for (let i = 0; i < obj.stopGroups.length; i++) {
            if (obj.stopGroups[i].name.includes(child.value)) {
                nazev.insertAdjacentHTML('beforebegin', `<a href="javascript:void(0);" class="linki" id="${obj.stopGroups[i].name}" onclick="ifMoreElements(this.id)">${obj.stopGroups[i].name}</a><br>`);
            }
        }

    } else {
        parentDiv.append(nazev);
        nazev.insertAdjacentHTML('beforebegin', `<h1>Žádné výsledky!</h1>`);
    }
}
