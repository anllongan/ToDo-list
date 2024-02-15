
"use strict"


//Gorev Listesi dizisi bu şekilde JSON formatında tanımlanır.
let gorevListesi =[
	// {"id": 1, "gorevAdi": "Gorev 1"},
	// {"id": 2, "gorevAdi": "Gorev 2"},
	// {"id": 3, "gorevAdi": "Gorev 3"},
	// {"id": 4, "gorevAdi": "Gorev 4"},
];

let editId;
let isEditTask = false;

const clearBtn = document.querySelector("#btnClear");
const taskInput = document.querySelector("#txtTaskName");




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
						<li><a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="item" id="" href="#"><i class="fa-solid fa-pen-to-square"></i> Edit</a></li>
						<li><a onclick="deleteTask(${gorev.id})" class="item" id="clear" href="#"><i class="fa-solid fa-trash"></i> Delete</a></li>
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



// Eleman Ekleme
document.querySelector("#btnAddNewTask").addEventListener("click",newTask);


function newTask(event) {
	

	if(taskInput.value == "") {
		alert("Görev Girmelisiniz.")
	}else{
		if(!isEditTask) {
			gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value});

		} else{
			//güncelleme
			for(let gorev of gorevListesi) {
				if(gorev.id == editId){
					gorev.gorevAdi = taskInput.value;
				}
				isEditTask = false;
			}

		}
		taskInput.value = "";
		displayTask();
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
	deletedId = gorevListesi.findIndex(function(gorev){
		return gorev.id == id;
	})

	gorevListesi.splice(deletedId, 1);
	displayTask();
}




function editTask(taskId, taskName) {
	editId = taskId;
	isEditTask = true;
	taskInput.value = taskName;
	taskInput.focus();
	taskInput.classList.add("active");

	console.log("edit id:",editId);
	console.log("edit mode", isEditTask);

}

clearBtn.addEventListener("click", function(){
	gorevListesi.splice(0,gorevListesi.length);
	displayTask();
})








