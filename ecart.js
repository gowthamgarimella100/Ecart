let main=document.querySelector(".main");
let cartIcon=document.querySelector(".cart-icon");
let cartContainer=document.querySelector(".cart-container");
let cartItemsContainer=document.querySelector(".cart-items");
let cartCheckout=document.querySelector(".cart-checkout");
let cartChairs=[];
let cartItems=[];



const fetchData=()=>{
    fetch("http://localhost:3000/chairs").then((res)=>res.json()).then((e)=>e.forEach((el)=>{
        cartChairs.push(el);
        renderChairs(el); 
    }))
}

const renderChairs=(item)=>{
    let cartItem=document.createElement("div");
    cartItem.classList.add("chair");
    cartItem.dataset.id=item.id;
    cartItem.innerHTML+=`
    <img src=${item.image}>
    <p>${item.name}</p>
    <span>Rs.${item.price}</span>
    <button class="cart-button">Add to cart</button>
    `
    main.appendChild(cartItem);
}
const closeCart=()=>{
    cartContainer.style.display="none";
    cartIcon.name="cart";
}
cartIcon.addEventListener("click",()=>{
    if(cartIcon.name=="cart"){
        cartContainer.style.display="block";
        cartIcon.name="close";
    }
    else{

    }
})

main.addEventListener("click",(e)=>{
    let itemClicked=e.target;
    if(itemClicked.classList.contains("cart-button")){
        let itemId=itemClicked.parentElement.dataset.id;
        addToCart(itemId);
    }

    
})
const addToCart = (item_id) =>{
    let checkItemInCart = cartItems.findIndex((val)=> val.itemId == item_id);
    if(cartItems.length <= 0){
      cartItems = [{
        itemId: item_id,
        quantity: 1
      }]
    }else if(checkItemInCart < 0){
      cartItems.push({
        itemId: item_id,
        quantity: 1
      })
    }else{
      cartItems[checkItemInCart].quantity++;
    }
    renderCartItems();
    
  }
const renderCartItems=()=>{
    let cartItemTotal=0;
    if(cartItems.length<=0){
        cartItemsContainer.innerHTML=`<div class="cart-empty">Your Cart is empty!</div>`
    }else{
        cartItemsContainer.innerHTML="";
        cartItems.forEach((item)=>{
            let cartItem=document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.dataset.id=item.itemId;
            let checkItem=cartChairs.findIndex((val)=> val.id == item.itemId);
            let info=cartChairs[checkItem];
            cartItemTotal=parseInt(info.price)*parseInt(item.quantity);
            cartItem.innerHTML = `
            <img src=${info.image}>
            <span class="cart-item-name">${info.name}</span>
            <span class="cart-item-price">Rs.${cartItemTotal}</span>
            <span class="cart-item-quantity">
                ${item.quantity}
            </span><span><ion-icon class="delete" name="trash"></ion-icon></span>`
            cartItemsContainer.appendChild(cartItem);
        })
    }

}
cartItemsContainer.addEventListener("click",(e)=>{
    let btnClicked=e.target
    if(btnClicked.classList.contains("delete")){
       let deleteId= btnClicked.parentElement.parentElement.dataset.id;
       let positionItemCheck = cartItems.findIndex((val)=> val.itemId == deleteId);
       cartItems.splice(positionItemCheck,1);
       btnClicked.parentElement.parentElement.remove();
    }
    
})
cartCheckout.addEventListener("click",()=>{
    alert("Order Placed!!");
    cartItemsContainer.innerHTML="";
    cartItems=[];
})
fetchData()






