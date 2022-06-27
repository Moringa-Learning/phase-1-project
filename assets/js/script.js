document.addEventListener("DOMContentLoaded", () => {
  const projectUrl = "https://phase2backend.herokuapp.com/project"

  // containers
  let projectContainer = document.getElementById('projectContainer')

  // get projects from server
  function getProjects() {
    let reqOptions = {
      method: 'GET'
    }

    fetch(projectUrl, reqOptions)
      .then((response) => response.json())
      .then(results => {
        results.forEach(proitem => {
          displayProject(proitem)
        })
      })
  }

  // display card project
  function displayProject(itemPro) {
    const proCard = `
        <div class="col-4">
          <div class="proCont">
            <img src="${itemPro.image}" alt="">
            <h3>${itemPro.title}</h3>
            <a href = "${itemPro.livesite}" > Live Site </a>
            <a href = "${itemPro.gitRepo}" > Github Repo </a>
            <div class="languages">
              ${itemPro.language.split(',').map(item => `<span>${item}</span>`).join('')}
            </div>
          </div>
        </div>
      `
    projectContainer.innerHTML += proCard
  }


  const addproForm = document.querySelector('#addproject')

  if (addproForm !== null) {
    addproForm.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log(e.target.imageUrl.value)

      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          id: 0,
          image: e.target.imageUrl.value,
          title: e.target.title.value,
          livesite: e.target.livelink.value,
          gitRepo: e.target.gitrepo.value,
          language: e.target.languanges.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      };


      fetch(projectUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
          alert('Project Saved Successfully')
          console.log(result)
          window.location.reload();
        })
        .catch(error => {
          alert('Saving Unsuccessfully')
          console.log('error', error)
        });
    })
  }

  getProjects()
})
