document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here

  let burgerMenu = document.getElementById("burger-menu")

  function addBurgerToMenu(data) {
    data.forEach(burger => {
      newDiv = document.createElement("div")
      newDiv.class = "burger"
      newDiv.innerHTML = `
        <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description"> ${burger.description}</p>
        <button class="button">Add to Order</button>
      `
      burgerMenu.appendChild(newDiv)
    })
  }

  fetch("http://localhost:3000/burgers")
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    addBurgerToMenu(data)
  })

  let orderList = document.getElementById("order-list")  
  
  function orderBurger(burger) {
  
    let burgerName = burger.parentNode.getElementsByClassName("burger_title")[0].innerText
    let newLi = document.createElement("li")
    newLi.innerText = `${burgerName}`
    orderList.appendChild(newLi)
  }
  
  burgerMenu.addEventListener("click", e => { 
    if (e.target.className === "button") {
      // console.log(e)
      // console.log(e.target.className)
      // console.log(e.target.parentNode)
      // console.log(e.target.parentNode.h3)
      orderBurger(e.target)
    }  
  })

  let burgerForm = document.getElementById("custom-burger")
  let newBurger = []
  
  burgerForm.addEventListener("submit", e=> {
    e.preventDefault()
    // console.log("target", e.target)
    // console.log("target input name:",e.target[0].value)
    // console.log("target input desc:",e.target[1].value)
    // console.log("target input URL:",e.target[2].value)
    // console.log(e.target[0].value,e.target[1].value,e.target[2].value)
    
    newBurger.push({
      name: e.target[0].value,
      description: e.target[1].value,
      image: e.target[2].value
    })
    addBurgerToMenu(newBurger)

    let newLi = document.createElement("li")
    newLi.innerText = `${e.target[0].value}`
    orderList.appendChild(newLi)

    fetch("http://localhost:3000/burgers",{
      method: "POST",
      headers: {
        "Application": "application/json",
        "Content-type":"application/json"
      },
      body: JSON.stringify (newBurger[0])
    })
  })

  
  // end of master listener
})

