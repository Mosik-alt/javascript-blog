'use strict'

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagLinkSelector = '.post-tags a',
  optArticleAutorSelektor = '. post post-author';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clikedElement', clickedElement);

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Href was clicked!');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);


  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + ' "><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML has been changed!');
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags() {

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('Artykul zostal wybrany!');

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log('Petla zostala rozpoczeta!');

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('found tags wrapper!');

    /* make html variable with empty string */
    let html = '';
    console.log('Empty string in html!');

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Wyszukano data-tags!');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('Podzielono tagi spacja');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log('Display each tag');
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML= 'html';
    /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  console.log('Tag was clicked');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tags = document.querySelectorAll('a.active[href^="#tag- ' + tag + '"]');

  /* START LOOP: for each active tag link */
  for (let tag of tags) {

    /* remove class active */
    tag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tag of activeTags) {

    /* add class active */
    tag.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll(optArticleTagLinkSelector);
  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAutors() {

  /*find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /*START LOOP : for every articles*/
  for (let article of articles) {

    /*find autor wrapper*/
    const autorWrapper = document.querySelector(optArticleAutorSelektor);

    /*make html variabel with empty string*/
    let html = '';

    /*get autor from date-autor atribute*/
    const autor = article.getAttribute('data-autor');

    /* generate html of the link*/
    const linkHTML = '<a href="#autor">' + autor + '</a>';

    html = html + linkHTML;


  }
  /* insert HTML of all the links into the autors wrapper */

  autorWrapper

  /* END LOOP: for every article: */
}


generateAutors();