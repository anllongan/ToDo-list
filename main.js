
"use strict"



let gorevListesi =[
	{"id": 1, "gorevAdi": "Gorev 1"},
	{"id": 2, "gorevAdi": "Gorev 2"},
	{"id": 3, "gorevAdi": "Gorev 3"},
	{"id": 4, "gorevAdi": "Gorev 4"},
]

displayTask();

function displayTask() {

	let ul = document.getElementById("task-list");
	ul.innerHTML = "";

	for(let gorev of gorevListesi) {

		let li = `
			<li id="task-id">
				<div class="form-check">
					<input type="checkbox" id="${gorev.id}" class="form-check-input">
					<label for="${gorev.id}" class="form-check-label"> ${gorev.gorevAdi} </label>
				</div>
				<div class="menu">
					<ul>
						<li><a class="item" id="" href="#"><i class="fa-solid fa-pen-to-square"></i> Düzenle</a></li>
						<li><a class="item" id="clear" href="#"><i class="fa-solid fa-trash"></i> Sil</a></li>
					</ul>
				</div>
			</li>
		`;

		ul.insertAdjacentHTML("beforeend",li);
	}
}


// let sonuc = document.querySelector("#task-list").children[""].remove();


// document.querySelector("#task-list").removeAttribute("class");

// console.log(sonuc);


document.querySelector("#btnAddNewTask").addEventListener("click",newTask);


function newTask(event) {
	
	let taskInput = document.querySelector("#txtTaskName");


	if(taskInput.value == "") {
		alert("Görev Girmelisiniz.")
	}else{
		gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value});
		taskInput.value = "";
		displayTask();
	}
	


	event.preventDefault();
}








