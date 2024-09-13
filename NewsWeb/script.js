const API_KEY = "b31b3d8d165a4ae7aa6b7ef65531129e";
const URL=https= "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsConatainer= document.getElementById('cards-container');
    const newsCardTemplate= document.getElementById('template-news-card');

    cardsConatainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsConatainer.appendChild(cardClone);

});
}

function fillDataInCard(cardClone, article)
{
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=> {window.open(article.url, "_blank")});


}

let currentSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const NavItem=document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=NavItem;
    currentSelectedNav.classList.add('active');

}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click', ()=> {
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav= null;

});

function reload(){
    window.location.reload();
}