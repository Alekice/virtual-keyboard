import { data } from './js/data';
import { Keyboard } from './js/Keyboard';

// Local Storage
// Language
let language = 'ru';
let textCase = 'lowerCase';
let capslockOn = false;
let keyboard;

function setLocalStorage() {
    if (keyboard) {
        localStorage.setItem('lang', keyboard.language);
    } else {
        localStorage.setItem('lang', language);
    }    
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        language = localStorage.getItem('lang');
        createKeyboard();
    }
}

window.addEventListener('load', getLocalStorage);

const createKeyboard = () => {
    keyboard = new Keyboard(data, language, capslockOn, textCase);
    keyboard.buildKeyboard();
};