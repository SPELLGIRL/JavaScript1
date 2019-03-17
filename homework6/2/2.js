'use strict';

/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров, которые купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },

    goods: [],
    basketCountEl: null,
    basketPriceEl: null,

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init(settings = {}) {
        this.settings = Object.assign(this.settings, settings);
        this.basketCountEl = document.querySelector(this.settings.countSelector);
        this.basketPriceEl = document.querySelector(this.settings.priceSelector);
        this.render();
    },

    /**
     * Отображает количество всех товаров и их цену.
     */
    render() {
        this.basketCountEl.textContent = this.goods.length;
        this.basketPriceEl.textContent = this.getGoodsPrice();
    },

    /**
     * Считает и возвращает цену всех купленных товаров из массива this.goods.
     * @returns {number} Цена всех купленных товаров.
     */
    getGoodsPrice() {
        return this.goods.reduce((prev, current) => prev + current.price, 0);
        /*
        Менее оптимальный вариант:
        let cost = 0;
        for (const good of this.goods) {
            cost += good.price;
        }
        return cost;
        */
    },

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех
     товаров.
     * @param goodName Название товара.
     * @param goodPrice Цена товара.
     */
    add(goodName, goodPrice) {
        this.goods.push({name: goodName, price: goodPrice});
        let obj = {name: goodName, price: goodPrice};
        let serialObj = JSON.stringify(obj);
        let myKey = localStorage.length.toString() + 'key';
        localStorage.setItem(myKey, serialObj);
        this.render();
    },

    /**
     * Загружает значения из localStorage.
     */
    loadGoods() {
        let ls = localStorage;
        for (let i = 0; i < ls.length; i++) {
            let key = ls.key(i);
            let returnObj = JSON.parse(ls.getItem(key));
            this.goods.push(returnObj);
        }
    },
};


if (localStorage) {
    basket.loadGoods();
}

window.onload = () => basket.init();


document.querySelectorAll('.buy-btn').forEach(el => {
    el.addEventListener('click', e => {
        basket.add(e.target.dataset.name, +e.target.dataset.price);
    })

});
document.querySelectorAll('.clear-btn').forEach(el => {
    el.addEventListener('click', e => {
        localStorage.clear();
        basket.goods = [];
        basket.render();
    })

});