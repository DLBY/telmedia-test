import './style.scss';

const fetchProducts = () => {
  fetch('https://dummyjson.com/products?limit=6')
  .then(res => res.json())
  .then((response) => {
    let products = response.products;
    let output = '';
    // use Set to get unique categories
    let categories = new Set();
    products.forEach(product => {
      categories.add(product.category);
      output += `
        <div class="card" data-id="${product.id}" data-category="${product.category}">
          <img src="${product.thumbnail}" alt="${product.title}" class="card-thumbnail" />
          <div class="card-body">
            <div class="card-inner">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <p>${product.category}</p>
            </div>
          </div>
        </div>
      `;
    });
    // Create category buttons
    document.querySelector('#products').innerHTML = output;
    let categoryButtons = '';
    categories.forEach(category => {
      categoryButtons += `
        <button class="filter-button" data-category="${category}">${category}</button>
      `;
    });
    document.querySelector('#category-buttons').innerHTML = categoryButtons;
  });
}

fetchProducts();

const filterProducts = (category) => {
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.querySelector('#category-buttons').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-button')) {
    filterProducts(e.target.dataset.category);
  }
});

// reset button
document.querySelector('#reset').addEventListener('click', () => {
  filterProducts('all');
});