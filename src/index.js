// write your code here
let ramenMenu = document.getElementById('ramen-menu')
//fetch the data from api
let fetchedData = fetch(' http://localhost:3002/ramens').then(res => res.json())
fetchedData.then(data => addImages(data))
fetchedData.then(data => console.log(data))

//create a function to add images to the menu

function addImages(data){
    for(let i=0;i<data.length;i++){
        let img = document.createElement('img')
        img.src = data[i].image
        ramenMenu.appendChild(img)
    }
} 
//Select the images
setTimeout(()=>{
    let ramenImages =ramenMenu.children
    for (let i=0;i<ramenImages.length;i++){
    ramenImages[i].addEventListener('click', e =>{
        //console.log(document.querySelector('.detail-image').src)
        document.querySelector('.detail-image').src=ramenImages[i].src
         fetchedData.then(data => assignName(data))
        
        function assignName(data){
            document.querySelector('.name').innerText= data[i].name
            document.querySelector('.restaurant').innerText= data[i].name
        }
    })
}
},100)


//create new ramen
let newRamen ={
    name: '', 
    restaurant:'', 
    image: '', 
    rating: '',
    comment:'',
}
let addMenu = document.querySelector('#new-ramen')
addMenu.addEventListener('submit', e => addNewMenu(e))
function addNewMenu(e){
    e.preventDefault()
    newRamen[0]= e.target.querySelectorAll('input')[0].value
    newRamen[1]= e.target.querySelectorAll('input')[1].value
    newRamen[2]= e.target.querySelectorAll('input')[2].value
    newRamen[3]= e.target.querySelectorAll('input')[3].value
    newRamen[4]= e.target.querySelectorAll('input')[4].value
    e.target.querySelectorAll('input')[4].addEventListener('click', e =>postData(e))
    e.reset()
}

//add event listener to create to post the data to the server


function postData(e){
    fetch('http://localhost:3002/ramens',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newRamen)
    }).then(res =>res.json()).then(data => console.log(data))

}