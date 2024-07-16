// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. 
// Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).
document.addEventListener("DOMContentLoaded", () => {
    const addReviewButton = document.getElementById("add-review-button");
    const productNameInput = document.getElementById("product-name");
    const productReviewInput = document.getElementById("product-review");
    const productList = document.getElementById("product-list");
    const reviewList = document.getElementById("review-list");

    addReviewButton.addEventListener("click", () => {
        const productName = productNameInput.value.trim();
        const productReview = productReviewInput.value.trim();

        if (productName && productReview) {
            let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
            if (!reviews[productName]) {
                reviews[productName] = [];
            }
            reviews[productName].push(productReview);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            productNameInput.value = "";
            productReviewInput.value = "";
            alert("Отзыв добавлен!");
            displayProducts();
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    });

    function displayProducts() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
        productList.innerHTML = "";
        for (const product in reviews) {
            const productItem = document.createElement("div");
            productItem.className = "product-item";
            productItem.textContent = product;
            productItem.addEventListener("click", () => displayReviews(product));
            productList.appendChild(productItem);
        }
    }

    function displayReviews(product) {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
        reviewList.innerHTML = `<h3>Отзывы о ${product}</h3>`;
        if (reviews[product]) {
            reviews[product].forEach((review, index) => {
                const reviewItem = document.createElement("div");
                reviewItem.className = "review-item";
                reviewItem.innerHTML = `
                    <span>${review}</span>
                    <button onclick="deleteReview('${product}', ${index})">Удалить</button>
                `;
                reviewList.appendChild(reviewItem);
            });
        }
    }

    window.deleteReview = function(product, index) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
        if (reviews[product]) {
            reviews[product].splice(index, 1);
            if (reviews[product].length === 0) {
                delete reviews[product];
            }
            localStorage.setItem("reviews", JSON.stringify(reviews));
            displayReviews(product);
            displayProducts();
        }
    };

    displayProducts();
});
