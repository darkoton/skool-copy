const loader = document.querySelector('.modal__load')
const content = document.querySelector('.modal__content-wrapper')

function getData(){

  loader.style.display = 'block'
  content.style.display = 'none'

  fetch("https://6769692fcbf3d7cefd3ab9d8.mockapi.io/db", {
    method: "GET"
  }).then(r => r.json()).then((data)=>{
    data.forEach(field => {
      const replaceItems = document.querySelectorAll(`#${field.name}`)
      
      replaceItems.forEach(replaceItem=>{
      
      if (field.name === 'userAvatar') {
        if (field.value) {
          const img = document.createElement('img')
          img.src = field.value
          img.alt = 'Avatar'
  
          replaceItem.innerHTML = ''
          replaceItem.appendChild(img) 
        }else{
          replaceItem.textContent = data[0].value[0]
        }
      }else{
        replaceItem.textContent = field.value
      }
    })
      });
  }).then(()=>{
    setTimeout(() => {
      loader.style.display = 'none'
      content.style.display = 'flex'
  }, 300);
  })
}

getData()


document.querySelector('.modal__reload').addEventListener('click', getData)