// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("project-2-todolist JS imported successfully!");
// });

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// const dropDownButton = document.getElementById("btn");
// const addButton = document.getElementById("add");

// addButton.addEventListener("click", handleClick);
// dropDownButton.addEventListener("click", myFunction);
// function myFunction(e) {
//   document.getElementById("myDropdown").classList.toggle("show");
//   showDropDown(e);
// }

// // Close the dropdown menu if the user clicks outside of it
// function showDropDown(event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// }

// const listElement1 = document.getElementById("unorderedList1");

// function handleClick(event) {
//   const li = document.createElement("li");
//   li.textContent = document.getElementById("myInput").value;
//   listElement1.append(li);
// }

// const listElement2 = document.getElementById("unorderedList2");

// function handleClick(event) {
//   const li = document.createElement("li");
//   li.textContent = document.getElementById("myInput").value;
//   listElement2.append(li);
// }

// const listElement3 = document.getElementById("unorderedList3");

// function handleClick(event) {
//   const li = document.createElement("li");
//   // li.textContent = document.getElementById("myInput").value;
//   listElement3.append(li);
// }

// const listElement4 = document.getElementById("unorderedList4");

// function handleClick(event) {
//   const li = document.createElement("li");
//   li.textContent = document.getElementById("myInput").value;
//   listElement4.append(li);
// }

// =========================

const editBtns = document.querySelectorAll(".titlesIcon");

editBtns.forEach((btn) => {
  addEventListener("click", handleEdit);
});

async function handleEdit(event) {
  try {
    if (event.target.className !== "titlesIcon") return;

    const h2 = event.target.parentNode.querySelector("h2");

    if (!h2.getAttribute("contenteditable")) {
      h2.setAttribute("contenteditable", "true");
    } else {
      h2.removeAttribute("contenteditable");
      await axios.post(`/list/${h2.id}/update`, { title: h2.textContent });
    }
  } catch (error) {
    console.log(error);
  }
}
