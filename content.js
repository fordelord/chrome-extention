window.setInterval(function () {
	if (window.location.href.includes("https://todoist.com/app/activity")) {

		const parent = document.getElementsByClassName("section")
		const items = document.querySelectorAll("ul.items");
		const itemsArray = Array.from(items);
		// const itemsArray = Array.from(elem)
		const getItemsScores = items => {
			return items.map(item => {
				const childNodes = [...item.childNodes];
				return childNodes.map(i => {
					if (i.childNodes[0].childNodes[1].childNodes[0].dataset.svgsPath ===
						"sm1/notification_completed.svg") {
						return getItemName(i.innerText);
					} else {
						return 0;
					}

				}).reduce((v, k) => v + k, 0);

			})
		}

		const getItemName = name => {
			const scoreText = name.replaceAll("\n", " ").match(/^.+\[(?<score>\d+)\]\s*.*$/)?.groups?.["score"];
			return scoreText ? parseInt(scoreText) : 0;

		}

		const setSum = (points, numForId, parent) => {
			if (!(parent[numForId].childNodes[0].id === "counter")) {
				const div1 = document.createElement("div")
				div1.innerHTML = "Total Score For This Day: " + points;
				div1.id = `counter`
				div1.style.fontSize = "24px"
				div1.style.fontWeight = 600
				parent[numForId].childNodes[0].before(div1)
			}
		}
		getItemsScores(itemsArray).map((item, i = 0) => {
			return setSum(item, i, parent);
		})
		function getIcons() {
			const icons = document.getElementsByClassName("avatar_event_icon");
			Array.from(icons).forEach((element) => {
				if (
					element.children[0].dataset.svgsPath ===
					"sm1/notification_completed.svg"
				) {
					let text =
						element.parentElement.parentElement.childNodes[1].childNodes[0]
							.childNodes[2].childNodes[0].childNodes[0].textContent;
					const regexp = /\[\d*\]/;

					if (!text.match(regexp)) {
						element.parentElement.parentElement.childNodes[1].childNodes[0].childNodes[2].style.backgroundColor =
							"red";
					}
				}
			});
		}
		getIcons();
	} else if (window.location.href.includes("https://todoist.com/app/project")) {
		if (document.getElementsByClassName("button-href").length < 1) {
			const list = document.getElementsByClassName("items")
			Array.from(list[0].childNodes).forEach(element => {
				const button = document.createElement("div");
				// let url;
				button.innerHTML = "Link"
				button.className = "button-href";
				button.style.fontSize = "18px";
				button.style.display = "absolute"
				button.style.marginRight = "250px"
				const dataSet = element.dataset.itemId;
				const url = "https://todoist.com/app/task/" + dataSet + "/0"
				element.childNodes[0].childNodes[4].before(button)
				if (element.childNodes[0].childNodes[4]) {


				}
				button.addEventListener("click", () => {
					window.open(url, '_blank').focus();
				})
			});
		}
	}
}, 1000)