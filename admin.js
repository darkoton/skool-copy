  const fileInput = document.getElementById("userAvatar");
  const output = document.getElementById("avatar-output");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0]; // Получаем первый файл
    if (file) {
      const reader = new FileReader(); // Создаем объект FileReader
      reader.onload = () => {
        const base64URL = reader.result; // Получаем строку Base64
        output.src = base64URL; // Отображаем результат

        data[1].value = base64URL

        fetch(`https://6769692fcbf3d7cefd3ab9d8.mockapi.io/db/${data[1].id}`, {
          method: "PUT",
          body: JSON.stringify(data[1]),
          headers: {
            "Content-Type": "application/json",
          }
        })
      };
      reader.onerror = (error) => {
        console.error("Ошибка чтения файла:", error);
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  });

  let data
  function getData() {
    fetch("https://6769692fcbf3d7cefd3ab9d8.mockapi.io/db", {
      method: "GET"
    }).then(r => r.json()).then(d => {
      data = d

      data.forEach(field => {
        const input = document.querySelector(`#${field.name}`)

        if (input.type === 'text') {
          input.value = field.value

          let timeOut = null
          input.addEventListener('input', ({ target }) => {
            if (timeOut) {
              clearTimeout(timeOut)
            }
            timeOut = setTimeout(() => {
              const value = target.value
              field.value = value

              console.log(field);

              fetch(`https://6769692fcbf3d7cefd3ab9d8.mockapi.io/db/${field.id}`, {
                method: "PUT",
                body: JSON.stringify(field),
                headers: {
                  "Content-Type": "application/json",
                }
              })
            }, 500)
          })
        }
        if (input.type === 'file') {
          output.src = field.value
        }
      })
    })
  }

  getData()


