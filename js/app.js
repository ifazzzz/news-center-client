const loadCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category)) 
}

const displayCategories = (categories) =>{
    //  categories.forEach(category =>{
    //     console.log(category);
    //  })
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" class="btn btn-link">${category.category_name}</button>
        `;
        categoryContainer.appendChild(div);

    })
    
}

const loadNews = (category_id) =>{
    const url =` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayNews(data.data))
}

const displayNews = (allnews) =>{
       const newsContainer = document.getElementById('news-container');
       newsContainer.textContent = '';
        allnews.forEach( news =>{
        // console.log(news);       
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl">
            <figure><img src=${news.thumbnail_url} alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details.length > 250 ? news.details.slice(0, 250) + '...' : news.details}</p>
                
                <div class="card-actions justify-end">
                <img class="w-10 rounded-full" src=${news.author.img}/>
                <p>${news.author.name} | ${news.author.published_date}</p>
                <button class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        
        newsContainer.appendChild(newsDiv);
        
    })
}
loadNews();
loadCategories();

