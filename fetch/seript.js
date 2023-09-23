let continer = document.createElement('div');
 continer.className = 'continer';

 let sk = document.createElement('div')
   sk.className = 'row';
   sk.id ='sk'

   continer.appendChild(sk);
   document.body.appendChild(continer);

document.addEventListener('DOMContentLoaded', function () {
let siva = document.getElementById('sk');
    fetch("https://restcountries.com/v3.1/all")
        .then((as) => as.json())
        .then((data) => {
        data.forEach(country => {
            const cards = document.createElement('div')
            cards.classList.add("card-group", "col-lg-4", "col-sm-14")
            sk.appendChild(cards);
           const Body = document.createElement('div')
            Body.classList.add("card", "card-header", "card-body",'bg-info')
            cards.appendChild(Body);
            const capital=country.capital?country.capital[0]:'NA'
            Body.innerHTML = `<h4 class="d-flex justify-content-center">${country.name.common}</h4>
            <img src="${country.flags.png}" class="card-img">
            <p class="card-text d-flex justify-content-center">Captial:${capital}</p>
            <p class="card-text d-flex justify-content-center">Region:${country.region}</p>
            <p class="card-text d-flex justify-content-center">Country Code:${country.cca2}</p>
            <button class="btn btn-danger" id="hi">Check To Whether</button>
            <div class="whether"></div> `
         
            let whetherButton = cards.querySelector("button")
            let whether=cards.querySelector('.whether')
            whetherButton.addEventListener('click', () => {
                let key = "cc86f1689f25fe0c147c87a9e570177c"
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`)
                    .then(sa => sa.json())
                    .then((data) => {
                        let tempra = data.main.temp;
                        whether.innerHTML = `
                        <p class="card-text d-flex justify-content-center">Temprature:${tempra}℃</p>
                        `
                    })
                    .catch(error => {
                        console.log('error', error)
                        whether.innerHTML = `
                        <p class="card-text d-flex justify-content-center">weather is not found</p>`
                })
            })
            
        });
        })
        .catch(error => {
        console.log(error)
    })
})

