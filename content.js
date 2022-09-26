window.setInterval(function () {
	if (window.location.href.includes("https://todoist.com/app/activity")) {
		const parent = document.getElementsByClassName("section")
		const items = document.querySelectorAll("ul.items");
		const itemsArray = Array.from(items);
		const getItemsScores = items => {
			const regex = /^.+\[(?<score>\d+)\]\s*.*$/;
			return items.map(item => {
				const childNodes = [...item.childNodes];
				return childNodes.map(i => {
					if (i.childNodes[0].childNodes[1].childNodes[0].dataset.svgsPath ===
						"sm1/notification_completed.svg") {
						return getItemScore(i.innerText, regex) ?? 0;
					} else {
						return 0;
					}

				}).reduce((v, k) => v + k, 0);

			})
		}
		const getItemScore = (name, regex) => {
			const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
			return scoreText ? parseInt(scoreText) : undefined;
		}
		const pastDivToPage = (points, numForId, parent) => {
			const div1 = document.createElement("div")
			const regex = /^.*\:\s*(?<score>\d+)\s*$/;
			const counterNum = parent[numForId].childNodes[0];
			div1.innerHTML = "Total Score For This Day: " + points;
			div1.id = `counter`
			div1.style.fontSize = "24px"
			div1.style.fontWeight = 600
			if (counterNum.id === "counter" && getItemScore(counterNum.textContent, regex) !== points) {
				counterNum.remove();
				div1.innerHTML = "Total Score For This Day: " + points;
				counterNum.before(div1)
			}
			if (counterNum.id === "counter") {
				return
			}
			counterNum.before(div1);
		}

		getItemsScores(itemsArray).map((item, i = 0) => {
			return pastDivToPage(item, i, parent);
		})

		function getIcons() {
			const icons = document.getElementsByClassName("avatar_event_icon");
			const regex = /^.+\[(?<score>\d+)\]\s*.*$/;
			Array.from(icons).map(element => {
				const element_parent = element.parentElement.parentElement.childNodes[1].childNodes[0];
				if (element.children[0].dataset.svgsPath !== "sm1/notification_completed.svg") {
					return;
				}

				const text = element_parent.childNodes[2].childNodes[0].childNodes[0].textContent;

				const score = getItemScore(text, regex);

				if (!score) {
					element_parent.childNodes[2].style.backgroundColor = "red";
				}
			});
		}
		getIcons();

	} else if (window.location.href.includes("https://todoist.com/app/project")) {
		if (document.getElementsByClassName("button-href").length < 1) {
			const list = document.getElementsByClassName("items")
			Array.from(list[0].childNodes).map(element => {
				const button = document.createElement("a");
				const dataSet = element.dataset.itemId;
				const btn_link_parent = element.childNodes[0].childNodes[4].childNodes;
				button.innerHTML = "Link"
				button.className = "button-href";
				button.style.fontSize = "18px";
				button.style.display = "absolute"
				button.style.marginRight = "50px"

				element.addEventListener("mouseenter", () => {
					if (!(btn_link_parent[0].className === "button-href")) {
						btn_link_parent[0].before(button)
					}
				})
				const url = "https://todoist.com/app/task/" + dataSet + "/0"
				if (btn_link_parent.length > 1)
					btn_link_parent[0].before(button)
				button.addEventListener("click", () => {
					window.open(url, '_blank').focus();
				})
			});
		}
	}
}, 1000)