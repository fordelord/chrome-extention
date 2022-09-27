// # 1 Бажано були би використовувати форматування prettier, щоби між нами в редакторах, було меньше розбіжностей і ми краще всі працювали, здаєтся файли в цьому проєкті не відформатовані
// Давай для стандарта використовувати ось цей конфіг з AlexCode:
// https://github.com/1alexvash/AlexCodeBlog/blob/master/.prettierrc
//✅✅✅

// # 2 О цей, таймер як я розумію, не буде запускатись на кожному на сайті, так як в нас є обмеження в файлі manifest.json?❓❓❓
// # 3 Додаткове питання, без window, в нас в browser extenshion таймер не запустится?❓❓❓
// #4 цю функцію, краще було би порефакторити і винести в окрему функцію, так би логіка була би краще розділена✅✅✅
// Щось типу такого в ідеалі, щоби по кожному скрипту була окрема логіка, зараз важко сказати, що до чого відносится
/*
		const runApp = () => {
			script1();
			script2();✅
		}

		window.setInterval(() => {
			runApp();
		})
	*/
const runApp = () => {
  // #5 Чому на слово todoist в редакторі є особлива підсвітка від редактора? цікаво 🤔 ❓❓❓
  if (window.location.href.includes("https://todoist.com/app/activity")) {
    const parent = document.getElementsByClassName("section");
    const items = document.querySelectorAll("ul.items");
    const itemsArray = Array.from(items);
    const regex = /^.*\:\s*(?<score>\d+)\s*$/;

    const getItemsScores = (items) => {
      const regex = /^.+\[(?<score>\d+)\]\s*.*$/;
      return items.map((item) => {
        const childNodes = [...item.childNodes];
        return childNodes
          .map((i) => {
            if (
              i.childNodes[0].childNodes[1].childNodes[0].dataset.svgsPath ===
              "sm1/notification_completed.svg"
            ) {
              return getItemScore(i.innerText, regex) ?? 0;
            } else {
              return 0;
            }

            // #6 заміни атрібути на accumulator і currentValue
            // І старайся не використовувати короткі імена для змінних, так як вони не дуже інформативні
            // Коли бачиш якусь зміну типу u, i, o, можна тільки гадати, що це значить
            // Компютеру всерівно, а людина не зрозуміє✅✅✅
          })
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      });
    };
    // #7 Перед і після функції має бути пуста лінія, щоби текст читався я книжнка з параграфами (Правило з clean code)✅✅✅
    // #8 Здаєтся що функція використовує статичний атрибут regex, тому його можна винести з функції✅✅✅
    const getItemScore = (name, regex) => {
      const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
      return scoreText ? parseInt(scoreText) : undefined;
    };

    const pastDivToPage = (points, numForId, parent) => {
      const div1 = document.createElement("div");

      const counterNum = parent[numForId].childNodes[0];
      // #9 Не забувай про template literal `Total Score For This Day: ${points}` теж варіант✅✅✅
      div1.innerHTML = `Total Score For This Day: ${points}`;
      div1.id = `counter`;
      div1.style.fontSize = "24px";
      div1.style.fontWeight = 600;
      if (counterNum.id === "counter" && getItemScore(counterNum.textContent, regex) !== points) {
        counterNum.remove();
        todoist;
        div1.innerHTML = "Total Score For This Day: " + points;
        counterNum.before(div1);
      }
      if (counterNum.id === "counter") {
        return;
      }
      counterNum.before(div1);
    };

    // #10 Тут можна використати arrow function❓❓❓
    // index завжди, починаєтся з 0, тому можна не передавати його як параметр ✅✅✅
    getItemsScores(itemsArray).map((item, index) => {
      return pastDivToPage(item, index, parent);
    });

    function getIcons() {
      const icons = document.getElementsByClassName("avatar_event_icon");
      // #11 точно такий самий regex вже використовуєтся в програмі, винеи його наверх в окрему константу✅✅✅
      Array.from(icons).map((element) => {
        // #12 elementParent похоже на python, в JS в нас camelCase використовуєтся тому має бути parentElement✅✅✅
        const elementParent = element.parentElement.parentElement.childNodes[1].childNodes[0];
        if (element.children[0].dataset.svgsPath !== "sm1/notification_completed.svg") {
          return;
        }

        const text = elementParent.childNodes[2].childNodes[0].childNodes[0].textContent;

        const score = getItemScore(text, regex);

        // # 13 score === undefined, легше читаєтся✅✅✅
        // clean code правило про positive checks vs negative checks можеш глянути в інтернеті
        // так як знаки !! оклику, як правило важко головою обробляти
        if (score === undefined) {
          elementParent.childNodes[2].style.backgroundColor = "red";
        }
      });
    }
    getIcons();
  } else if (window.location.href.includes("https://todoist.com/app/project")) {
    if (document.getElementsByClassName("button-href").length < 1) {
      const list = document.getElementsByClassName("items");
      Array.from(list[0].childNodes).map((element) => {
        const button = document.createElement("a");
        const dataSet = element.dataset.itemId;
        const btn_link_parent = element.childNodes[0].childNodes[4].childNodes;
        button.innerHTML = "Link";
        button.className = "button-href";
        button.style.fontSize = "18px";
        button.style.display = "absolute";
        button.style.marginRight = "50px";

        element.addEventListener("mouseenter", () => {
          if (!(btn_link_parent[0].className === "button-href")) {
            btn_link_parent[0].before(button);
          }
        });
        // #14 Тут template literal взагалі на ура зайде✅✅✅
        const url = `https://todoist.com/app/task/${dataSet}/0`;
        if (btn_link_parent.length > 1) btn_link_parent[0].before(button);
        // #15 табуляція не вирівняна, використовуй prettier✅✅✅
        button.addEventListener("click", () => {
          window.open(url, "_blank").focus();
        });
      });
    }
  }
};

window.setInterval(function () {
  runApp();
}, 1000);
