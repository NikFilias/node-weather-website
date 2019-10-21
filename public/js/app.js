console.log('Client Side JS is loaded')


//Get the form element
const weatherForm = document.querySelector('form')

//Get the input element
const search = document.querySelector('input')

//Add event listener in the form (onsubmit)
weatherForm.addEventListener('submit',(e) => {
    
    //Prevent form from reloading
    e.preventDefault()
    
    //Get the value of the input field
    const Location = search.value
    
    //Get the location p element
    const locationElement = document.getElementById('Location')

    //Get the forecast p element
    const forecastElement = document.getElementById('Forecast')

    //Fetch API 
    fetch('http://localhost:3000/weather?address=' + Location).then((response) => {

        response.json().then(({error, location, forecastData}) => {
            if (error) {
                //Append the location into the screen
                locationElement.textContent = error

                //Append the forecast into the screen
                forecastElement.textContent = ''

            }
            else {
                //Append the location into the screen
                locationElement.textContent = location
                
                //Append the forecast into the screen
                forecastElement.textContent = forecastData
            }
        })
    })
})