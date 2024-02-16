
"use strict"


//Gorev Listesi dizisi bu şekilde JSON formatında tanımlanır.
let gorevListesi = [];

if(localStorage.getItem("gorevListesi") !== null){
	gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let editId;
let isEditTask = false;

const clearBtn = document.querySelector("#btnClear");
const taskInput = document.querySelector("#txtTaskName");
const filters = document.querySelectorAll(".filters span");




displayTask("all");

function displayTask(filter) {

	let ul = document.getElementById("task-list");
	ul.innerHTML = "";

	if (gorevListesi.length == 0) {
		ul.innerHTML = "<p style = 'margin-top: 4rem;' class= 'p-3 m-0'>No Task </p>"
	} else {
		for (let gorev of gorevListesi) {

			let completed = gorev.durum == "completed" ? "checked" : "";

			if (filter == gorev.durum || filter == "all") {

				let li = `
					<li id="task-id">
						<div class="form-check">
							<input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
							<label for="${gorev.id}" class="form-check-label ${completed}"> ${gorev.gorevAdi} </label>
						</div>
						<div class="menu">
							<ul>
								<li><a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="item" id="" href="#"><i class="fa-solid fa-pen-to-square"></i> Edit</a></li>
								<li><a onclick="deleteTask(${gorev.id})" class="item" id="clear" href="#"><i class="fa-solid fa-trash"></i> Delete</a></li>
							</ul>
						</div>
					</li>
				`;
				ul.insertAdjacentHTML("beforeend", li);
			}

		}
	}
}

for (let span of filters) {
	span.addEventListener("click", function () {
		document.querySelector("span.active").classList.remove("active");
		span.classList.add("active");
		displayTask(span.id);
	})
}


// let sonuc = document.querySelector("#task-list").children[""].remove();


// document.querySelector("#task-list").removeAttribute("class");

// console.log(sonuc);



// Eleman Ekleme
document.querySelector("#btnAddNewTask").addEventListener("click", newTask);


function newTask(event) {


	if (taskInput.value == "") {
		alert("Görev Girmelisiniz.")
	} else {
		if (!isEditTask) {
			gorevListesi.push({ "id": gorevListesi.length + 1, "gorevAdi": taskInput.value, "durum": "pending" });

		} else {
			//güncelleme
			for (let gorev of gorevListesi) {
				if (gorev.id == editId) {
					gorev.gorevAdi = taskInput.value;
				}
				isEditTask = false;
			}

		}
		taskInput.value = "";
		displayTask(document.querySelector("span.active").id);
		localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
	}



	event.preventDefault();
}

//Elemanı Silme

function deleteTask(id) {
	let deletedId;

	// (For döngüsü ile Silme İşlemi)
	// for (let index in gorevListesi) {
	// 	if(gorevListesi[index].id == id){
	// 		deletedId = index;
	// 	}
	// }

	// (Farklı metodla silme işlemi)
	deletedId = gorevListesi.findIndex(function (gorev) {
		return gorev.id == id;
	})

	gorevListesi.splice(deletedId, 1);
	displayTask(document.querySelector("span.active").id);
	localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));

}



//Taskı Editleme
function editTask(taskId, taskName) {
	editId = taskId;
	isEditTask = true;
	taskInput.value = taskName;
	taskInput.focus();
	taskInput.classList.add("active");

	console.log("edit id:", editId);
	console.log("edit mode", isEditTask);

}

clearBtn.addEventListener("click", function () {
	gorevListesi.splice(0, gorevListesi.length);
	localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
	displayTask("All");
})

// Taskları işaretleme
function updateStatus(selectedTask) {
	let label = selectedTask.nextElementSibling;
	let durum;

	if (selectedTask.checked) {
		label.classList.add("checked");
		durum = "completed";
	} else {
		label.classList.remove("checked");
		durum = "pending";
	}

	for (let gorev of gorevListesi) {
		if (gorev.id == selectedTask.id) {
			gorev.durum = durum;
		}
	}

	displayTask(document.querySelector("span.active").id);
	localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));

}









