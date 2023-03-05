// link = https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

//Api key here
var api_id = ('efhB5wQwPSgAiYha4IxdQhv9K_ETeWCwWXN-46U7WkY');

var page = 1

var search_submit = document.querySelector('.d-flex')
search_submit.addEventListener('submit', (e) => {
  e.preventDefault()
  var display = document.getElementById('container')
  display.innerHTML = ""
  var search = document.querySelector('[placeholder="Search"]')
  var search_value = search.value
  api(search_value)
})

async function api(data) {
  v = fetch(`https://api.unsplash.com/search/photos?client_id=${api_id}&query=${data}&per_page=50`)
  try {
    out = await v
    prom = out.json()
    res = await prom
    var display = document.getElementById('container')

    for (let i of res.results) {
      var image_ele = document.createElement('div')

      //Here insert the html code to display
      image_ele.innerHTML = `
      <div class="container_main">
        <a target="myTab" href="${i.urls.full}">
          <img src="${i.urls.regular}" alt="" title="${i.alt_description}">
        </a>
        </div>
        `
      display.appendChild(image_ele);
    }
  } catch {
    console.log("error");
  }

}

//Here the scrolling

// window.addEventListener('scroll', () => {
//   if ((window.scrollY + window.innerHeight) > document.querySelector('body').offsetHeight) {
//     page++
//     var search = document.querySelector('[placeholder="Search"]')
//     var search_value = search.value
//     api(page, search_value)
//     console.log(page);
//   }
// })

//dictionary API

var search_submit = document.querySelector('.d-flex')
search_submit.addEventListener('submit', (e) => {
  e.preventDefault()
  var display = document.getElementById('distionary-container')
  display.innerHTML = ""
  var search = document.querySelector('[placeholder="Search"]')
  var search_value = search.value
  dic_api(search_value)
})

async function dic_api(search_value) {
  d = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_value}`)
  try {
    list = await d
    d1 = list.json()
    data = await d1
    var source = document.getElementById('distionary-container')
    var create_dis = document.createElement('div')
    //Display Distionary Card
    create_dis.innerHTML = `
    <div class="card mb-3">
<div class="card-body">
  <h5 class="card-title">${data[0].word}<sub>${data[0].phonetic}<sub></h5>
  <p class="card-text">synonyms : ${data[0].meanings[0].synonyms[0]} | ${data[0].meanings[0].synonyms[1]} | ${data[0].meanings[0].synonyms[2]} | ${data[0].meanings[0].synonyms[3]}</p>
  <p class="card-text">${data[0].meanings[0].definitions[1].definition}</p>
  <p class="card-text"><small class="text-muted">${data[0].meanings[0].definitions[0].definition} | ${data[0].meanings[0].definitions[2].definition} | ${data[0].meanings[0].definitions[3].definition}</small></p>
  <audio controls autoplay>
  <source src="${data[0].phonetics[0].audio}" type="audio/mpeg">
Your browser does not support the audio element.
</audio><br>
  <a href="${data[0].sourceUrls[0]}" target="_blank" class="btn btn-link">Reference link</a>
  </div>`

    source.append(create_dis)

  } catch {
    // Erro catch
    var source = document.getElementById('distionary-container')
    var create_dis = document.createElement('div')
    create_dis.setAttribute("class", "Error");
    create_dis.innerHTML = ` 
    <div id="scroll-container">
  <div id="scroll-text">SORRY :( "${data[0].word}" not found in the Dictionary API, Search any another word! <div>
</div>
    `
    source.append(create_dis)

  }
}
dic_api()






