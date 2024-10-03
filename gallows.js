// ПРОЕКТЫ ГЛАВЫ 10 : Игра "Виселица" -----------------------------------------

let words = [//"ПАРАША И КАКАША", "Говно", "Параша", "Трындец", "Пипец", "Капец"
    "То чем мы грешны в молодости приходится искупать в старости",
    "Скупость начинается там где кончается бедность",
    "С сильной любовью не могут ужиться черные подозрения",
    "Вера не просветленная разумом недостойна человека",
    "Не верить чтобы понимать а понимать чтобы верить",
    "Безрассудно судить о мыслях и понимании одного по мыслям и пониманию другого",
    "Люби и делай что хочешь",
    "Пусть дела твои будут такими какими ты хотел бы их вспомнить на склоне лет",
    "Самый презренный вид малодушия это жалость к самому себе",
    "Человек должен быть честным по натуре а не по обстоятельствам",
    "Женщина слишком чистосердечна и принципиальна чтобы внять голосу рассудка",
    "Нельзя сильней страдать чем вспоминая счастье в дни несчастья",
    "Удовольствие благо но только когда оно не вызывает раскаяния",
    "Лекарство от любви брак",
    "Трудности похожи на собак они кусают лишь тех кто к ним не привык",
    "Целью войны является мир",
    "Остроумие это дерзость получившая образование",
    "Искренна скорбь того кто плачет в тайне"
];

const MAX_ERROR = 5; // Максимально допустимое кол-во ошибок

class Solution {
    #chars = "";            // полученные символы
    #word = "";             // заданное слово (сочетание)
    #AlphabetsWord = "";    // русские буквы заданного слова
    #err_count = 0;         // количество ошибок при вводе русских букв
    toAlphabetsWord()
    // Построение AlphabetsWord
    {
        this.#AlphabetsWord = "";
        // Удаляем второстепенные символы (пробелы)
        for (let i = 0; i < this.#word.length; ++i) {
            if (this.CheckRusChar(this.#word[i]))
                this.#AlphabetsWord += this.#word[i].toUpperCase();
        };
    }
    NewGame()
    // Запуск / перезапуск игры
    {
        // Инициализация переменных
        this.#chars = "";
        this.#word = "";
        this.#AlphabetsWord = "";
        this.#err_count = 0;
        // Случаным образом выбираем слово из words
        let n = [Math.floor(Math.random() * (words.length - 1))];
        this.setWord(words[n]);
        // Построение AlphabetsWord
        this.toAlphabetsWord(); // получение AlphabetsWord
        this.GallowsPlot();     // отрисовка виселицы     
        this.buildTable();      // построение таблицы символов
    }
    ShowSolution()
    // Отображение решения
    {
        this.toAlphabetsWord();
        this.#chars = this.#AlphabetsWord;
        this.buildTable();          // построение таблицы символов
        this.GallowsPlot();         // отрисовка виселицы        
    }
    setWord(wrd) {
        this.#word = wrd;
        // console.log("this.#word: ", this.#word);
    }
    addChar(ch)
    // Добавление символа в chars, если он русский и уникальный
    {
        if (this.CheckRusChar(ch) && !this.CheckExistsChar(ch)) { // Русская буква? && Не было такой буквы?
            // this.#chars.push(ch);
            this.#chars += ch;
        }
    }
    addChars(ach)
    // Добавление массива символов``
    {
        ach.forEach(ch => {
            this.addChar(ch.toUpperCase());
        });
    }
    checkSolution()
    // Проверка, отгаданы ли все слова (завершена ли игра)
    {
        let inp_chrs = this.#chars; // набор введенных букв в виде строки
        for (let i = 0; i < this.#AlphabetsWord.length; ++i) {
            let ind = inp_chrs.indexOf(this.#AlphabetsWord[i]);
            if (ind === -1) return false;
        }
        return true;
    }
    ErrorsCount()
    // Определение количества ошибок (для построения виселицы)
    {
        this.#err_count = 0;
        for (let i = 0; i < this.#chars.length; ++i) {
            let ind1 = this.#word.indexOf(this.#chars[i].toUpperCase()); // поиск прописной буквы
            let ind2 = this.#word.indexOf(this.#chars[i].toLowerCase()); // поиск заглавной буквы
            let find = ind1 + ind2; //
            if (find === -2) { // буква не найдена, если ind1=-1 и ind2=-1
                this.#err_count += 1;
            }
        };
        return this.#err_count;
    }
    buildTable()
    // Построение таблицы символов
    {
        var body = document.querySelector("body");
        let tbl_exist = document.querySelector("tbl");
        // Создание и настройка таблицы
        let tbl = document.createElement("tbl");
        let tr = document.createElement("tr");
        if (tbl != null) {
            tbl.classList.add("boxT");
        }

        // Создание сетки таблицы и наполнение ее данными из T
        for (let i = 0; i < this.#word.length; i++) {
            // Создание ячеек строки
            let td = document.createElement('td');
            this.#word[i] === " " ? td.classList.add("boxD") : td.classList.add("boxE");
            // Сохранение данных в атрибутах ячейки
            td.setAttribute("data-name", this.#word[i]);
            // Создание текста и добавление его в ячейки
            let text = (this.#word[i] === " ") ? " " : "*";
            if (this.#chars.indexOf(this.#word[i].toUpperCase()) != -1) {
                text = this.#word[i].toUpperCase();
                td.setAttribute("data-name", text);//this.#word[i]);
            }
            td.setAttribute("data-name", text);
            let txt = document.createTextNode(text);//this.#word[i]*.toUpperCase());
            td.appendChild(txt);
            // Добавление ячеек в строку, строки в таблицу
            tr.appendChild(td);
            tbl.appendChild(tr);
        }
        // Таблица: создание или замена существующей
        if (tbl_exist == null) {
            // Таблица tbl не существует, добавляем новую tbl
            body.appendChild(tbl);
        }
        else {
            // Таблица существует, заменяем на tbl
            document.body.replaceChild(tbl, tbl_exist);
        }
    }

    constructor(aw = []) {
        this.NewGame(aw);
    }

    CheckRusChar(ch)
    // Проверка: true - для русских символов, false - для остального
    {
        if (!(ch >= "а" && ch <= "я") &&
            !(ch >= "А" && ch <= "Я") &&
            !(ch >= "a" && ch <= "z") &&
            !(ch >= "A" && ch <= "Z")
        ) {
            return false; // не символ
        }
        return true; // символ
    }

    CheckExistsChar(ch)
    // Проверка: true - символ уже вводился, false - нет
    {
        return (this.#chars.indexOf(ch) != -1);
    }

    setChar()
    // Ввод символа
    {
        let achr = prompt("Введите букву").trim();
        // Выбираем первую введенную букву
        for (let i = 0; i < achr.length; ++i) {
            this.addChar(achr[i].toUpperCase());
        };
        this.buildTable();          // построение таблицы символов
        this.GallowsPlot();         // отрисовка виселицы
        console.log("test");
        if (this.checkSolution())   // проверка, отгаданы ли все буквы
        {
            if (confirm("ВЫ ВЫЙГРАЛИ! СЫГРАЕМ ЕЩЕ?")) {
                // Рестарт игры
                this.NewGame();
                console.log("Start game!");
            } else; // Ничего не делаем
        }
        else {
            // Проверка на количество ошибок
            if (this.ErrorsCount() < MAX_ERROR) {
                // Ошибок меньше допустимого количества: ничего не делаем
            } else {
                // Ошибок больше допустимого количества
                if (confirm("ВЫ ПРОИГРАЛИ! СЫГРАЕМ ЕЩЕ?")) {
                    // Рестарт игры
                    this.NewGame();
                    console.log("Start game!");
                } else; // Ничего не делаем
            }

            console.log("error count:", this.ErrorsCount());
        }
    }

    GallowsPlot()
    // Отрисовка виселицы
    {
        // Расчет количества ошибок ---------------------------
        let errs = this.ErrorsCount();

        // Вывод количества оставшихся жизней
        // console.log("errs: ", errs)
        let ttl = document.getElementById('ttl');
        ttl.textContent = "ВИСЕЛИЦА: " + Number(MAX_ERROR - errs) + " ЖИЗНИ";

        // Отрисовка  -----------------------------------------
        var canvas = document.getElementById('canvas');
        canvas.setAttribute('width', 150);
        canvas.setAttribute('height', 250);
        var ctx = canvas.getContext('2d');
        // Основание
        ctx.beginPath();
        ctx.moveTo(0, 220);
        ctx.lineTo(20, 220);
        ctx.stroke();
        // Столб
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, 220);
        // Перекладина
        ctx.moveTo(10, 10);
        ctx.lineTo(130, 10);
        // Уголок
        ctx.moveTo(10, 30);
        ctx.lineTo(30, 10);
        // Веревка
        ctx.moveTo(80, 10);
        ctx.lineTo(80, 30);
        ctx.stroke();

        if (errs-- > 0) {
            // Голова
            ctx.beginPath();
            ctx.arc(80, 50, 20, 0, Math.PI * 2);
            ctx.strokeStyle = '#1a2edb'; // тёмно-синий цвет
            ctx.lineWidth = 2; // толщина линии в 5px
            ctx.fillStyle = '#50c843'; // зелёный цвет
            ctx.fill();
            ctx.stroke();
            if (errs-- > 0) {
                // Туловище
                ctx.beginPath();
                ctx.ellipse(80, 110, 15, 40, 0, 0, 2 * Math.PI);
                ctx.fillStyle = '#50c843'; // зелёный цвет
                ctx.fill();
                ctx.stroke();
                if (errs-- > 0) {
                    // Левая рука
                    ctx.beginPath();
                    ctx.moveTo(80, 70);
                    ctx.lineTo(40, 70);
                    ctx.stroke();
                    if (errs-- > 0) {
                        // Правая рука
                        ctx.lineTo(120, 70);
                        ctx.stroke();
                        if (errs-- > 0) {
                            // Левая нога
                            ctx.beginPath();
                            ctx.moveTo(80, 150);
                            ctx.lineTo(60, 190);
                            ctx.stroke();
                            if (errs-- > 0) {
                                // Правая нога
                                ctx.beginPath();
                                ctx.moveTo(80, 150);
                                ctx.lineTo(100, 190);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
        }
    }
}

let S = new Solution(words);

window.onload = function () {
    S.GallowsPlot();
    document.getElementById("btn1").addEventListener("click", startGame);
    document.getElementById("btn2").onclick = function () { S.ShowSolution(); };
    document.getElementById("btn3").onclick = function () { S.setChar(); };
}

function startGame() {
    S.NewGame(words);
    S.buildTable();
}

