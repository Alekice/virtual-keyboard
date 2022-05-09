class Key {
    constructor({ id, ru, en }) {
        this.id = id;
        this.ru = ru;
        this.en = en;
        this.key = '';
        this.class = 'keyboard__key';
    }

    buildKey() {
        this.key = document.createElement('div');
        this.key.id = this.id;
        this.key.classList.add(this.class);
        this.bindEvents();
        return this.key;
    }

    insertText(language, textCase) {
        this.key.textContent = this[language][textCase];
    }

    addActiveStatusKeyByPress(e) {
        document.getElementById(`${e.code || e.target.id}`).classList.add('pressed');
    }

    removeActiveStatusKey() {
        document.querySelectorAll('.keyboard__key').forEach(key => {
            if (key.id !== 'CapsLock') {
                key.classList.remove('pressed');
            }
        });
    }

    bindEvents() {
        this.key.addEventListener('mousedown', this.handleEvent);
        this.key.addEventListener('mousedown', this.addActiveStatusKeyByPress);
        this.key.addEventListener('mouseup', this.removeActiveStatusKey);
        document.addEventListener('keydown', this.handleEvent);
        document.addEventListener('keydown', this.addActiveStatusKeyByPress);
        document.addEventListener('keyup', this.removeActiveStatusKey);
    }

    handleEvent(e) {
        document.getElementById('textarea').focus();
        e.preventDefault();       

        if (e.target.id === 'Tab' || e.code === 'Tab') {
            document.getElementById('textarea').value += '    ';
        } else if (e.target.id === 'Backspace' || e.code === 'Backspace') {
            let length = document.getElementById('textarea').value.length;
            let start = document.getElementById('textarea').selectionStart;
            let end = document.getElementById('textarea').selectionEnd;

            if (start === end) {
                if (start === 0) {
                    return; 
                } else if (start === length) {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').slice(0, length - 1).join('');
                } else {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').slice(0, start - 1).join('') + document.getElementById('textarea').value.split('').slice(start).join('');
                    document.getElementById('textarea').selectionStart = start - 1;
                    document.getElementById('textarea').selectionEnd = start - 1;
                }
            } else {
                document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + document.getElementById('textarea').value.split('').splice(end).join('');
                document.getElementById('textarea').selectionStart = start;
                document.getElementById('textarea').selectionEnd = start;
            }            
        } else if (e.target.id === 'Delete' || e.code === 'Delete') {
            let length = document.getElementById('textarea').value.length;
            let start = document.getElementById('textarea').selectionStart;
            let end = document.getElementById('textarea').selectionEnd;

            if (start === end) {
                if (start === length) {
                return;
                } else if (start === 0) {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').slice(1).join('');
                    document.getElementById('textarea').selectionStart = 0;
                    document.getElementById('textarea').selectionEnd = 0;
                } else {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').slice(0, start).join('') + document.getElementById('textarea').value.split('').slice(start + 1).join('');
                    document.getElementById('textarea').selectionStart = start;
                    document.getElementById('textarea').selectionEnd = start;
                }
            } else {
                document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + document.getElementById('textarea').value.split('').splice(end).join('');
                document.getElementById('textarea').selectionStart = start;
                document.getElementById('textarea').selectionEnd = start;
            }            
        } else if (e.target.id === 'Enter' || e.code === 'Enter') {
            document.getElementById('textarea').value += '\n';
        } else if (e.target.id === 'CapsLock' || e.code === 'CapsLock') {
            return;
        } else if ( e.target.id === 'ShiftLeft' || e.code === 'ShiftLeft' || e.target.id === 'ShiftRight' || e.code === 'ShiftRight'
                    || e.target.id === 'ControlLeft' || e.code === 'ControlLeft' || e.target.id === 'AltLeft' || e.code === 'AltLeft'
                    || e.target.id === 'AltRight' || e.code === 'AltRight' || e.target.id === 'ControlRight' || e.code === 'ControlRight'
                    || e.target.id === 'MetaLeft' || e.code === 'MetaLeft') {
            return;
        } else {
            let length = document.getElementById('textarea').value.length;
            let start = document.getElementById('textarea').selectionStart;
            let end = document.getElementById('textarea').selectionEnd;

            if (start === length) {
                if (e.code) {
                    document.getElementById('textarea').value += document.getElementById(e.code).textContent;
                } else {
                    document.getElementById('textarea').value += e.target.textContent;
                }
            } else if (start === 0 && start === end) {
                if (e.code) {
                    document.getElementById('textarea').value = document.getElementById(e.code).textContent + document.getElementById('textarea').value;
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                } else {
                    document.getElementById('textarea').value = e.target.textContent + document.getElementById('textarea').value;
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                }
            } else if (start === 0 && end === length) {
                if (e.code) {
                    document.getElementById('textarea').value = document.getElementById(e.code).textContent;
                } else {
                    document.getElementById('textarea').value = e.target.textContent;
                }
            } else if (start !== end) {
                if (e.code) {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + document.getElementById(e.code).textContent + document.getElementById('textarea').value.split('').splice(end).join('');
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                } else {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + e.target.textContent + document.getElementById('textarea').value.split('').splice(end).join('');
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                }
            } else {
                if (e.code) {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + document.getElementById(e.code).textContent + document.getElementById('textarea').value.split('').splice(start).join('');
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                } else {
                    document.getElementById('textarea').value = document.getElementById('textarea').value.split('').splice(0, start).join('') + e.target.textContent + document.getElementById('textarea').value.split('').splice(start).join('');
                    document.getElementById('textarea').selectionStart = start + 1;
                    document.getElementById('textarea').selectionEnd = start + 1;
                }
            }
            
        }        
    }
}

export { Key };