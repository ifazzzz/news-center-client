const loadCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then((response) => response.json())
    .then(data => displayCategories(data.data.news_category)) 
}

const displayCategories = (categories) =>{
    //  categories.forEach(category =>{
    //     console.log(category);
    //  })
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn btn-link">${category.category_name}</button>
        `;
        categoryContainer.appendChild(div);

    })
    
}
loadCategories();

