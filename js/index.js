let car = document.querySelector('#car')
// console.log($(car));


document.addEventListener('keydown', (e)=>{

    switch(e.key){
        case 'ArrowLeft':
        $(car).offsetLeft =  100;
        break;
    }
})