'use strict';

var phoneBook = [];

var regPhone = /^\+?\d*\s*(\(\d{3}\)|\d{3})\s*\d{3}(\s|-)*\d\2\d{3}$/;
var regName = /[a-zа-я\d]+/i;
var regEmail = /[\w\-]+@[a-zа-я\-]+\.[a-zа-я]+\.*[a-z]*/i;
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
function checkName(splittedName) {
    for (var i in splittedName) {
        if (!regName.test(splittedName[i])) {
            return false;
        }
    }
    return true;
}

module.exports.add = function add(name, phone, email) {
    if (!checkName(name.split(" "))) {
        console.error('Неверное имя', name);
        return;
    }
    if (!regPhone.test(phone)) {
        console.error('Неверный номер телефона', phone);
        return;
    }
    if (!regEmail.test(email)) {
        console.error('Неверный email-адрес', email);
        return;
    }

    // типа забота о пользователе. хотелось бы интерактивности, но со считыванием с консоли всё плохо
    for (var i in phoneBook) {
        var currentRecord = phoneBook[i];
        if (currentRecord.name === name) {
            console.error('Контакт с именем', name, 'уже имеется!');
            return;
        }
        if (currentRecord.phone === phone) {
            console.error('Контакт с номером', phone, 'уже имеется!');
            return;
        }
        if (currentRecord.email === email) {
            console.error('Контакт с почтой', email, 'уже имеется!');
            return;
        }
    }

    var newRecord = {
        name: name,
        phone: phone,
        email: email,
        print: function () {
            console.log(this.name + ', ' + this.phone + ', ' + this.email);
        },
        sanitizePhone: function () {
            return this.phone.replace(/(\s|\-|\(|\))/g, '');
        }
    };
    phoneBook.push(newRecord);
};

/*
   Функция поиска записи в телефонной книге.
   Поиск ведется по всем полям.
*/
var justSearching = true;
var removeQueue = [];

function printOrAddToQueue(index) {
    if (justSearching) {
        phoneBook[index].print();
    } else {
        removeQueue.push(index);
    }
}

module.exports.find = function find(query) {
    if (query === '') {
        for (var i in phoneBook) {
            var currentRecord = phoneBook[i];
            phoneBook[i].print();
        }
        return;
    }

    if (query.search(/[a-zа-я@]/i) === -1) { // запрос - телефон
        for (var i in phoneBook) {
            currentRecord = phoneBook[i];
            if (currentRecord.sanitizePhone().indexOf(query) > -1) {
                printOrAddToQueue(i);
            }
        }
        return;
    }
    for (var i in phoneBook) {
        currentRecord = phoneBook[i];
        if (currentRecord.name.indexOf(query) > -1 || currentRecord.email.indexOf(query) > -1) {
            printOrAddToQueue(i);
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    justSearching = false;
    this.find(query);
    var removedRecords = 0;
    if (removeQueue.length !== 0) {
        for (var i in removeQueue) {
            phoneBook.splice(removeQueue[i], 1);
            removedRecords++;
        }
    }
    console.log('Контактов удалено:', removedRecords);
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

};
