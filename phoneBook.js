'use strict';

var phoneBook = []; // массив объектов

var regPhone = /^\+*\d* *(\(\d{3}\)|\d{3}) *\d{3}( |-)*\d\2\d{3}$/;
var regName = /([А-Яа-я]+)( \1| \d+)*/;
var regEmail = /[\w\-]+@[a-zа-я\-]+\.[a-zа-я]+\.*[a-z]*/;
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (!regName.test(name)) {
        console.log('Неверное имя', name);
        return;
    } else if (!regPhone.test(phone)) {
        console.log('Неверный номер телефона', phone);
        return;
    } else if (!regEmail.test(email)) {
        console.log('Неверный email-адрес', email);
        return;
    }

    // типа забота о пользователе. хотелось бы интерактивности, но со считыванием с консоли всё плохо
    for (var i in phoneBook) {
        if (phoneBook[i].name === name) {
            console.log('Контакт с именем', name, 'уже имеется!');
            return;
        } else if (phoneBook[i].phone === phone) {
            console.log('Контакт с номером', phone, 'уже имеется!');
            return;
        } else if (phoneBook[i].email === email) {
            console.log('Контакт с почтой', email, 'уже имеется!');
            return;
        }
    }

    var newRecord = {
        name: name,
        phone: phone,
        email: email,
        glue: function () {
            return this.name + ', ' + this.phone + ', ' + this.email;
        },
        withoutSymbols: function () {
            var tempArr = this.phone.split(' ');
            var tempStr = tempArr.join('');
            tempArr = this.phone.split('-');
            tempStr = tempArr.join('');
            tempArr = this.phone.split('(');
            tempStr = tempArr.join('');
            tempArr = this.phone.split(')');
            tempStr = tempArr.join('');
            return tempStr;
        }
    };
    phoneBook.push(newRecord);
};

/*
   Функция поиска записи в телефонной книге.
   Поиск ведется по всем полям.
*/
var justSearching = true;
var forRemoving = [];

module.exports.find = function find(query) {
    if (query === '') {
        for (var i in phoneBook) {
            console.log((phoneBook[i].glue()));
        }
        return;
    }

    if (query.search(/[a-zа-я@]/i) === -1) { // запрос - телефон
        for (var i in phoneBook) {
            if (phoneBook[i].withoutSymbols().indexOf(query) > -1 && justSearching) {
                console.log((phoneBook[i].glue()));
            } else if (phoneBook[i].withoutSymbols().indexOf(query) > -1) {
                forRemoving.push(i);
            }
        }
        return;
    }
    for (var i in phoneBook) {
        if ((phoneBook[i].name.indexOf(query) > -1 || phoneBook[i].email.indexOf(query) > -1) &&
            justSearching) {
            console.log((phoneBook[i].glue()));
        } else if (phoneBook[i].name.indexOf(query) > -1 ||
            phoneBook[i].email.indexOf(query) > -1) {
            forRemoving.push(i);
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    justSearching = false;
    this.find(query);
    var removed = 0;
    if (forRemoving.length != 0) {
        for (var i in forRemoving) {
            phoneBook.splice(forRemoving[i], 1);
            removed++;
        }
    }
    console.log('Контактов удалено:', removed);
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь

};
