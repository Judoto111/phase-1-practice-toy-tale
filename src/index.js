let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form');

  
  fetchToys();

  
  function fetchToys() {
      fetch('http://localhost:3000/toys')
          .then(response => response.json())
          .then(toys => {
              toys.forEach(toy => renderToyCard(toy));
          });
  }

  
  function renderToyCard(toy) {
      const card = document.createElement('div');
      card.className = 'card';
      
      const h2 = document.createElement('h2');
      h2.textContent = toy.name;
      
      const img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar';
      
      const p = document.createElement('p');
      p.textContent = `${toy.likes} Likes`;
      
      const likeBtn = document.createElement('button');
      likeBtn.className = 'like-btn';
      likeBtn.textContent = 'Like ❤️';
      likeBtn.dataset.id = toy.id;
      
      likeBtn.addEventListener('click', () => {
          increaseLikes(toy, p);
      });
      
      card.append(h2, img, p, likeBtn);
      toyCollection.appendChild(card);
  }

  
  toyForm.addEventListener('submit', handleFormSubmit);

  
  function handleFormSubmit(event) {
      event.preventDefault();
      
      const name = event.target.name.value;
      const image = event.target.image.value;
      
      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              image: image,
              likes: 0
          })
      })
      .then(response => response.json())
      .then(newToy => {
          renderToyCard(newToy);
          event.target.reset();
      });
  }

  
  function increaseLikes(toy, likesElement) {
      const newLikes = toy.likes + 1;
      
      fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              likes: newLikes
          })
      })
      .then(response => response.json())
      .then(updatedToy => {
          likesElement.textContent = `${updatedToy.likes} Likes`;
      });
  }
});
