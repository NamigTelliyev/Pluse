const products=document.getElementById("products")
const formSrc = document.getElementById("formSrc")
const inpSrc = document.getElementById("inpSrc")

function getProduct() {
    axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/product`)
        .then(response => {
            const data = response.data;
            db = data;
            db.forEach(item => {
                const box = document.createElement('div');
                box.className = 'col content';
                box.innerHTML = `<img src="${item.image}" alt="img">
                            <h2>${item.title}</h2>
                            <h3>${item.name}</h3>
                            <p>${item.price} $</p>
                            <div class="basket"><button class="btn" onclick="addToBasket(${item.id})">Add to Basket</button>
                            <i class="fa-solid fa-heart" onclick="wishlist(${item.id})"></i></div>
                        `;
                products.appendChild(box);
            });
        })
}
getProduct();


function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem("cart", JSON.stringify(cart))
}



function wishlist(id) {
    let heart = JSON.parse(localStorage.getItem("heart")) || []
    heart.push(db.find(item => item.id == id))
    localStorage.setItem("heart", JSON.stringify(heart))
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