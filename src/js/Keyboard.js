import { Key } from './Key';

class Keyboard {
    constructor(data, language, capslockOn, textCase) {
        this.data = data;
        this.language = language;
        this.capslockOn = capslockOn;
        this.textCase = textCase;
        this.title = '';
        this.container = '';
        this.textarea = '';
        this.keyboard = '';
        this.rows = [];
        this.rowCount = 5;
        this.description = '';
        this.note = '';
        this.pressedKeys = {};
    }

    buildKeyboard() {
        this.container = this.createDomNode(this.container, 'div', 'container');

        this.title = this.createDomNode(this.title, 'h1', 'title');
        this.title.textContent = 'RSS Virtual Keyboard';

        this.textarea = this.createDomNode(this.textarea, 'textarea', 'textarea');
        this.textarea.id = 'textarea';
        this.textarea.cols = '50';
        this.textarea.rows = '5';

        this.keyboard = this.createDomNode(this.keyboard, 'div', 'keyboard');

        for (let i = 0; i < this.rowCount; i++) {
            let row = this.createDomNode(row, 'div', 'keyboard__row');
            for (let j = 0; j < this.data[`row${i}`].length; j++) {
                let key = new Key(this.data[`row${i}`][j]);
                row.append(key.buildKey());
                key.insertText(this.language, this.textCase);
            }
            this.rows.push(row);
        }

        this.description = this.createDomNode(this.description, 'p', 'description');
        this.description.textContent = 'Keyboard is created in Windows';

        this.note = this.createDomNode(this.note, 'p', 'note');
        this.note.innerHTML = 'Press left <span class="bold">Ctrl + Alt</span> to switch languages';

        this.appendKeyboardElemnts();

        this.bindEvents();

        document.body.append(this.container);
    }

    createDomNode(node, tag, ...classes) {
        node = document.createElement(tag);
        node.classList.add(...classes);
        return node;
    }

    appendKeyboardElemnts() {
        this.container.append(this.title);
        this.container.append(this.textarea);
        this.container.append(this.keyboard);
        this.appendRows();
        this.container.append(this.description);
        this.container.append(this.note);
    }

    appendRows() {
        for (let i = 0; i < this.rowCount; i++) {
            this.keyboard.append(this.rows[i]);
        }
    }

    changeLang() {
        return (this.language === 'ru') ? 'en' : 'ru';
    }

    changeText(data) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < data[`row${i}`].length; j++) {
                document.getElementById(data[`row${i}`][j].id).textContent = data[`row${i}`][j][this.language][this.textCase];
            }
        }
    }

    bindEvents() {        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'AltLeft' || e.code === 'ControlLeft') {
                this.pressedKeys[e.code] = true;
            }

            if (e.code === 'CapsLock') {
                if (this.capslockOn) {
                    this.capslockOn = false;
                    this.textCase = 'lowerCase';
                    this.changeText(this.data);
                    document.getElementById(e.code).classList.remove('pressed');
                } else {
                    this.capslockOn = true;
                    this.textCase = 'capslock';
                    this.changeText(this.data);
                    document.getElementById(e.code).classList.add('pressed');
                }
            }

            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                if (this.capslockOn) {
                    this.textCase = 'shiftCapslock';
                    this.changeText(this.data);
                } else {
                    this.textCase = 'upperCase';
                    this.changeText(this.data);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            if ((this.pressedKeys['ControlLeft'] && e.code === 'AltLeft') || (this.pressedKeys['AltLeft'] && e.code === 'ControlLeft')) {
                this.language = this.changeLang();
                this.changeText(this.data);
            }

            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                if (this.capslockOn) {
                    this.textCase = 'capslock';
                    this.changeText(this.data);
                } else {
                    this.textCase = 'lowerCase';
                    this.changeText(this.data);
                }
            }

            this.pressedKeys = {};
        });

        this.keyboard.addEventListener('click', (e) => {
            if (e.target.id === 'CapsLock') {
                if (this.capslockOn) {
                    this.capslockOn = false;
                    this.textCase = 'lowerCase';
                    this.changeText(this.data);
                    e.target.classList.remove('pressed');
                } else {
                    this.capslockOn = true;
                    this.textCase = 'capslock';
                    this.changeText(this.data);
                    e.target.classList.add('pressed');
                }
            }            
        });

        this.keyboard.addEventListener('mousedown', (e) => {
            if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
                if (this.capslockOn) {
                    this.textCase = 'shiftCapslock';
                    this.changeText(this.data);
                } else {
                    this.textCase = 'upperCase';
                    this.changeText(this.data);
                }
            }

            if (e.target.id === 'AltLeft' || e.target.id === 'ControlLeft') {
                this.pressedKeys[e.target.id] = true;
            }
        });

        this.keyboard.addEventListener('mouseup', (e) => {
            if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
                if (this.capslockOn) {
                    this.textCase = 'capslock';
                    this.changeText(this.data);
                } else {
                    this.textCase = 'lowerCase';
                    this.changeText(this.data);
                }
            }
            
            if ((this.pressedKeys['ControlLeft'] && e.target.id === 'AltLeft') || (this.pressedKeys['AltLeft'] && e.target.id === 'ControlLeft')) {
                this.language = this.changeLang();
                this.changeText(this.data);
            }

            this.pressedKeys = {};
        });
    }
}

export { Keyboard };