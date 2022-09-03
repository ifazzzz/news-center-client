const loadCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category)) 
}

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
    
    categories.forEach(category =>{
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

       const resultsFound = document.getElementById('result-field');
       const numberOfResults = allnews.length;
       resultsFound.innerText = numberOfResults;

            allnews.sort((a, b) => {
                return b.total_view - a.total_view;
            })
         
        allnews.forEach( news =>{     
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
                <p>View : ${news.total_view}</p>
                <label onclick="loadDetails('${news._id}')" for="my-modal-4" class="btn btn-primary modal-button">Details</label>
            </div>
        </div>
        `;
        
        newsContainer.appendChild(newsDiv);
        
    })
}

const loadDetails = (_id) =>{
    const url =`https://openapi.programming-hero.com/api/news/${_id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = (newsDetails) => {
     const detailsField = document.getElementById('details-container');
     newsDetails.forEach( news => {
        // console.log(news);
        detailsField.innerHTML = `
        <img src="${news.image_url}"/><br/>
        <p>${news.details}</p></br>
        <p>Author Name : ${news.author.name}</p></br>
        <p>Published Date :${news.author.published_date}</p></br>
        <p>Total View : ${news.total_view}</p>
     `
     })
     
}
loadNews();
loadCategories();

