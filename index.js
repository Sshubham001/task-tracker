const title = document.getElementById("getTitle");
const task = document.getElementById("getTask");
const form = document.querySelector("form");
const container = document.getElementById("container");

const list = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list"))
  : [];
displayTask();
function removeTask() {
  for (let i = 0; i < list.length; i++) {
    let div = document.querySelector(".card");
    div.remove();
  }
}

function displayTask() {
  list.forEach((value, index) => {
    const card = document.createElement("div");
    container.append(card);

    card.setAttribute("class", "card");
    const innerDiv = document.createElement("div");
    const delBtn = document.createElement("button");
    delBtn.innerText = "-";
    delBtn.addEventListener("click", (index) => {
      removeTask();
      list.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(list));
      displayTask();
    });
    card.append(innerDiv);
    card.append(delBtn);

    const para = document.createElement("p");
    para.innerText = value.title;
    const span = document.createElement("span");
    span.innerText = value.task;
    innerDiv.append(para);
    innerDiv.append(span);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTask();
  list.push({
    title: title.value,
    task: task.value,
  });
  localStorage.setItem("list", JSON.stringify(list));

  displayTask();
  title.value = "";
  task.value = "";
});
