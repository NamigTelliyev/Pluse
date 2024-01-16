const products=document.getElementById("products")
const formSrc = document.getElementById("formSrc")
const inpSrc = document.getElementById("inpSrc")

function getProduct(){
    products.innerHTML=""
    let cart=JSON.parse(localStorage.getItem("heart")) || []
    db=cart
    db.map((item, index) => {
        const box = document.createElement('div');
        box.className = 'col content';
        box.innerHTML = `<img src="${item.image}" alt="img">
                <h2>${item.title}</h2>
                <h3>${item.name}</h3>
                <p>${item.price} $</p>
                <div class="basket"><button class="btnRemove" onclick="remove(${index})">Remove</button>
               
            `;
        products.appendChild(box);
    });
}
getProduct()





function remove(index){
    let heart=JSON.parse(localStorage.getItem("heart")) || []
    heart.splice(index,1)
    localStorage.setItem("heart",JSON.stringify(heart))
    getProduct()
}



formSrc.addEventListener("submit", srcFunc)
function srcFunc(e) {
    e.preventDefault()
    products.innerHTML = ''
    axios.get("https://655c846525b76d9884fd70e4.mockapi.io/products")
        .then(res => {
            let data = res.data;
            let datas = data.filter((item) => item.title.toLowerCase().includes(inpSrc.value.toLowerCase()))
            datas.forEach(item => {
                const box = document.createElement('div');
                box.className = 'col content';
                box.innerHTML = `<img src="${item.image}" alt="img">
                    <h2>${item.title}</h2>
                    <h3>${item.name}</h3>
                    <p>${item.price} $</p>
                    <div class="basket"><button class="btn" onclick="addToBasket(${item.id})">Add to Basket</button>
                    <i class="fa-solid fa-heart"></i></div>
                `;
                products.appendChild(box);
            });

        })


}