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
