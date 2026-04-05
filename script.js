// глобальная переменная с массивом товаров и их ценами
const booksCatalog = [
    {
        id: 1,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        price: 499,
        category: "romance",
        image: "images/book1_small.jpg",
        link: "master.html"
    },
    {
        id: 2,
        title: "Преступление и наказание",
        author: "Фёдор Достоевский",
        price: 599,
        category: "classic",
        image: "images/book2_small.jpg",
        link: "crime.html"
    },
    {
        id: 3,
        title: "1984",
        author: "Джордж Оруэлл",
        price: 449,
        category: "dystopia",
        image: "images/book3_small.jpg",
        link: "orwell.html"
    }
];

// массив корзины
let cart = [];

// функция подсчета итогов
const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
};

// функция отрисовки корзины
const renderCart = () => {
    // находим элементы корзины на странице
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    if (!cartItems) return;

    // очищаем текущий список корзины
    cartItems.innerHTML = '';

    // если корзина пуста
    if (cart.length === 0) {
        cartTotal.textContent = 'Итого: 0 ₽';
        if (cartCount) cartCount.textContent = '0';

        // сообщение о пустой корзине
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Корзина пуста';
        cartItems.appendChild(emptyMessage);

        return;
    }

    // если есть товары 
    cart.forEach((item, index) => {
        // создаем блок для одного товара
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.title} - ${item.price} ₽</span>
            <button class="remove-from-cart" data-index="${index}">Удалить</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // обновляем сумму
    const total = calculateTotal();
    cartTotal.textContent = `Итого: ${total} ₽`;

    // обновляем счетчик
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    // добавляем обработчики на кнопки удаления
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeFromCart(index);
        });
    });
};

// функция удаления
const removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
};

// функция очистки 
const clearCart = () => {
    if (cart.length > 0) {
        cart = [];
        renderCart();
    }
};

// функция оплаты
const checkout = () => {
    if (cart.length === 0) {
        alert('Корзина пуста! Добавьте товары перед оплатой.');
        return;
    }

    alert('Покупка прошла успешно! Спасибо за заказ.');
    clearCart();
};

// фильтрация
const filterBooks = (category) => {
    const catalogItems = document.querySelectorAll('.catalog-item');

    catalogItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'inline-block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
};

// при загразке страницы
document.addEventListener('DOMContentLoaded', () => {

    // 1. настройка кнопок "Добавить в корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // получаем ID книги
            const bookId = parseInt(e.target.dataset.id);

            // ищем книгу в каталоге
            const book = booksCatalog.find(b => b.id === bookId);

            if (book) {
                // добавляем в корзину
                cart.push(book);
                // обновляем корзину
                renderCart();
            }
        });
    });

    // 2. кнопки корзины
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // 3. настройка фильтров
    const filterSelect = document.getElementById('category-filter');

    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            filterBooks(e.target.value);
        });
    }

    // 4. пустая корзина при загрузке
    renderCart();
});