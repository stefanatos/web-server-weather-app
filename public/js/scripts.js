console.log("client side javascript is loaded");


const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = searchValue.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = `ERROR -> ${data.error}`;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = '';
            messageTwo.textContent = `Στην περιοχή: ${data.location} η θερμοκρασία είναι:${data.temperature} η ταχύτητα του ανέμου: ${data.wind_speed} και η προγνωση:${data.summary}`;
        }
    });
});    
});