document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('nameInput');
    const priceInput = document.getElementById('priceInput');
    const imgUrlInput = document.getElementById('imgUrlInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkOut = document.getElementById('checkOut');
    const cartList = document.getElementById('cartList');
    const selectAllButton = document.getElementById('selectAllButton');
    const disselectAllButton = document.getElementById('dis-selectAllButton');
    let cartItems = [];

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedCheckboxes.forEach(checkbox => {
            const listItem = checkbox.closest('li');
            const priceSpan = listItem.querySelector('.priceSpan');
            const quantityInput = listItem.querySelector('.quantityInput');
            const price = parseFloat(priceSpan.textContent.replace('Price: ', '').replace(' $', ''));
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(price)) {
                totalPrice += price * quantity;
            }
        });
        totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} $`;
    };
    
    const addItem = () => {
        const nameValue = nameInput.value.trim();
        const priceValue = Number(priceInput.value.trim());
        const imgUrlValue = imgUrlInput.value.trim();

        if (!nameValue || !imgUrlValue || isNaN(priceValue) || priceValue < 0) {
            alert('Please enter valid input.');
            return;
        }

        const newItem = { id: Date.now(), name: nameValue, price: priceValue, imgUrl: imgUrlValue };
        renderProduct(newItem);

        nameInput.value = '';
        priceInput.value = '';
        imgUrlInput.value = '';
    };

    const renderProduct = (item) => {
        const newItem = document.createElement('li');
        newItem.classList.add('p-2', 'border-b', 'last:border-b-0');
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mr-4');
        newItem.appendChild(checkbox);
    
        const imgElement = document.createElement('img');
        imgElement.src = item.imgUrl;
        imgElement.alt = item.name;
        imgElement.classList.add('w-16', 'h-16', 'object-cover', 'inline-block', 'ml-4', 'mr-4');
        newItem.appendChild(imgElement);
    
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `Name: ${item.name}, `;
        newItem.appendChild(nameSpan);
    
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `Price: ${item.price.toFixed(2)} $ `;
        priceSpan.classList.add('priceSpan');
        newItem.appendChild(priceSpan);
    
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.classList.add('quantityInput', 'ml-2', 'w-16', 'border', 'border-gray-400', 'rounded', 'p-1', 'text-center');
        newItem.appendChild(quantityInput);
    
        itemList.appendChild(newItem);
    };
    

    const addToCart = () => {
        const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedItems.forEach(item => {
            const listItem = item.closest('li');
            const nameSpan = listItem.querySelector('span');
            const priceSpan = listItem.querySelector('.priceSpan');
            const quantityInput = listItem.querySelector('.quantityInput');
            const name = nameSpan.textContent.replace('Name: ', '').replace(', ', '');
            const price = parseFloat(priceSpan.textContent.replace('Price: ', '').replace(' $', ''));
            const imgUrl = listItem.querySelector('img').src;
            const quantity = parseInt(quantityInput.value);
            for (let i = 0; i < quantity; i++) {
                cartItems.push({ id: Date.now(), name: name, price: price, imgUrl: imgUrl });
            }
        });
        renderCart();
    };

    const renderCart = () => {
        cartList.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            const itemTotalPrice = item.price * item.quantity; 
            listItem.textContent = `${item.name}, Price: ${itemTotalPrice.toFixed(2)} $`; 
            cartList.appendChild(listItem);
            totalPrice += itemTotalPrice; 
        });
        totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} $`; 
    };
    

    addButton.addEventListener('click', addItem);

    selectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        calculateTotalPrice(); 
    });

    disselectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        calculateTotalPrice(); 
    });

    checkOut.addEventListener('click', () => {
        alert('Please pay what you ordered');
        cartItems = [];
        renderCart();
    });

    const resetItemList = () => {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        calculateTotalPrice(); 
    };

    itemList.addEventListener('change', calculateTotalPrice);

    const addToCartButton = document.getElementById('addToCartButton');
    addToCartButton.addEventListener('click', addToCart);

    checkOut.addEventListener('click', () => {
        alert('Please pay what you ordered');
        resetItemList();
    });

});
