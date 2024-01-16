const products=document.getElementById("products")
const formSrc = document.getElementById("formSrc")
const inpSrc = document.getElementById("inpSrc")

function getProduct(){
    products.innerHTML=""
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    db=cart
    db.map((item, index) => {
        const box = document.createElement('div');
        box.className = 'col content';
        box.innerHTML = `<img src="${item.image}" alt="img">
                <h2>${item.title}</h2>
                <h3>${item.name}</h3>
                <p>${item.price} $</p>
                <div class="basket"><button class="btnRemove" onclick="remove(${index})">Remove</button>
                <i onclick="wishlist(${item.id})" class="fa-solid fa-heart"></i></div>
            `;
        products.appendChild(box);
    });
}
getProduct()


function wishlist(id) {
    let heart = JSON.parse(localStorage.getItem("heart")) || []
    heart.push(db.find(item => item.id == id))
    localStorage.setItem("heart", JSON.stringify(heart))
}



function remove(index){
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    cart.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(cart))
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
                    <i onclick="wishlist(${item.id}) class="fa-solid fa-heart"></i></div>
                `;
                products.appendChild(box);
            });

        })


}