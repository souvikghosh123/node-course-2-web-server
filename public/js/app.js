

console.log('Client side Java Script file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then(function(response) {
// 	response.json().then( function(data) {
// 		console.log(data)
// 	})
// })


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ' '
messageTwo.textContent = ' '



weatherform.addEventListener('submit', function (event) {
	event.preventDefault()
	const Location = search.value
//	console.log(Location)
messageOne.textContent = 'Loading...'
messageTwo.textContent = ' '

	fetch('http://localhost:3000/weather/?search=' + Location).then(function(response) {
	response.json().then( function(data) {
	//	console.log(data)

		if(data.error) {
			messageOne.textContent = data.error
			messageTwo.textContent = ' '
		} else if(data.Error_Description) {
			messageOne.textContent = data.Error_Description
			messageTwo.textContent = ' '
		} else {
			messageOne.textContent = data.Location
			messageTwo.textContent = data.Forecast
		}
	})
})
})