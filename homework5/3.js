"use strict";

/**
 * Объект, содержащий методы проверки.
 */
const validationMethods = {

    /**
     * Метод проверки длины поля.
     * @param {HTMLInputElement} field Проверяемое поле.
     * @param {Array} args Массив с аргументами.
     * @returns {string|null} Строка с ошибкой или null, если ошибок нет.
     */
    length(field, args) {
        const valLength = field.value.length,
            sign = args[0],
            then = args[1];

        let message = null;
        switch (sign) {
            case '>':
                if (!(valLength > then)) {
                    message = `Минимальная длина поля ${then + 1}`;
                }
                break;
            case '<':
                if (!(valLength < then)) {
                    message = `Максимальная длина поля ${then - 1}`;
                }
                break;
            case '>=':
                if (!(valLength >= then)) {
                    message = `Минимальная длина поля ${then}`;
                }
                break;
            case '<=':
                if (!(valLength <= then)) {
                    message = `Максимальная длина поля ${then}`;
                }
                break;
            case '==':
                if (!(valLength === then)) {
                    message = `Длина поля должна равняться ${then} символам`;
                }
                break;
        }

        return message;
    },

    /**
     * Проверяет, содержжит ли поле только цифры.
     * @param {HTMLElement} field Проверяемое поле.
     * @returns {string|null} Строка с ошибкой или null, если ошибок нет.
     */
    containsOnlyNumbers(field) {
        for (const val of field.value) {
            if (!Number.isInteger(Number.parseInt(val))) {
                return 'Поле должно содержать только цифры';
            }
        }

        return null;
    },

    /**
     * Проверка совпадения полей на содержимое.
     * @param {HTMLElement} field Проверяемое поле.
     * @param {Array} args Массив с аргументами.
     * @returns {string|null} Строка с ошибкой или null, если ошибок нет.
     */
    fieldsMatch(field, args) {
        return field.value !== document.querySelector(args[0]).value ? 'Поля не совпадают' : null;
    },
};

const form = {
    formElement: null,
    rules: null,

    /**
     * Инициализация формы.
     */
    init() {
        this.formElement = document.querySelector('.my-form');
        this.formElement.addEventListener('submit', event => this.formSubmit(event));

        this.rules = [
            {
                selector: 'input[name="name"]',
                methods: [
                    {name: 'length', args: ['>=', 1]},
                    {name: 'length', args: ['<=', 50]},
                ],
            },
            {
                selector: 'input[name="phone"]',
                methods: [
                    {name: 'containsOnlyNumbers'},
                    {name: 'length', args: ['==', 11]},
                ],
            },
            {
                selector: 'input[name="password"]',
                methods: [
                    {name: 'length', args: ['>=', 5]},
                    {name: 'length', args: ['<=', 50]},
                ],
            },
            {
                selector: 'input[name="password_repeat"]',
                methods: [
                    {name: 'fieldsMatch', args: ['input[name="password"]']},
                    {name: 'length', args: ['>=', 5]},
                    {name: 'length', args: ['<=', 50]},
                ],
            },
        ];
    },

    /**
     * Метод, запускаеиый перед отправкой формы.
     * @param {Event} event Событие отправки формы.
     */
    formSubmit(event) {
        if (!this.validate()) {
            event.preventDefault();
        }
    },

    validate() {
        let isValid = true;
        for (let rule of this.rules) {
            const inputElement = document.querySelector(rule.selector);
            for (let method of rule.methods) {
                const validFunction = validationMethods[method.name];
                const errorMessage = validFunction(inputElement, method.args);

                if (errorMessage) {
                    this.setInvalidField(inputElement, errorMessage);
                    isValid = false;
                    break;
                } else {
                    this.setValidField(inputElement);
                }
            }
        }

        return isValid;
    },

    /**
     * Устанавливает уровень ошибки и выводит сообщение о ней
     * @param {Element} inputElement Элемент инпута, который проверяет валидацию.
     * @param {string} message Сообщение об ошибке.
     */
    setInvalidField(inputElement, message) {
        const lvl = inputElement.classList;
        lvl.remove('is-valid');
        lvl.add('is-invalid');

        let hint = inputElement.parentNode.querySelector('.invalid-feedback');
        if (!hint) {
            hint = document.createElement('div');
            hint.classList.add('invalid-feedback');
            inputElement.parentNode.appendChild(hint);
        }
        hint.textContent = message;
    },

    /**
     *Уустанавливает уровень валидации и стирает сообщение о непрохождении валидации.
     * @param {Element} inputElement Элемент инпута, который проверяет валидацию
     */
    setValidField(inputElement) {
        const lvl = inputElement.classList;
        lvl.remove('is-invalid');
        lvl.add('is-valid');
    }
};

form.init();