const options = document.querySelectorAll(".sidebar")
const scenes = document.querySelectorAll(".scene")

const setState = (id) =>{
  options.forEach(item => {
    item.classList.remove("bg-purple-500")
    
    if(item.id == id){
        item.classList.add("bg-purple-500")
        setScene(id)
    }
  })
}

const setScene = (id) =>{
    scenes.forEach(item => {
        item.classList.remove("flex")
        item.classList.add("hidden")
        if(item.id == id){
            item.classList.add("flex")
            item.classList.remove("hidden")
        }
    })
}
