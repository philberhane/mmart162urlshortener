const sendUrl = () => {

    const input = {
        longUrl : document.getElementById('original').value ,
        code : document.getElementById('code').value
    }



    fetch(`${window.location.href}/response`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
       // console.log(data)
       document.getElementById('results').innerHTML = data.message

    })
}

document.getElementById('button').onclick = sendUrl
