'use strict'
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagLinkSelector = '.post-tags a',
  optArticleAuthorSelektor = '.post-author',
  optArticleAuthorLinkSelector = '.post-author a',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
//optAuthorsListSelector = '.list .authors'//


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

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);


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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagsClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}



function generateTags() {


  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      const linkHTMLData = { id: articleTags, title: articleTagsArray };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags.list');

  /* [NEW] create variable for all links HTML code */
  let allTagsData = { tags: [] };
  const tagsParams = calculateTagsParams(allTagsData);
  console.log('tagsParams:', tagsParams);

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    const tagLinkHTML = `<li><a class="tagi-size-${allTags[tag]}" href="#" >${tag}</a><span>${allTags[tag]}</span></li>`;
    console.log('tagi po prawej stronie zostaly wyswietlone');

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams)
    });
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

function generateAuthors() {

  /* [NEW] create a new variable Author with an empty object */
  let author = {};

  /*find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /*START LOOP : for every articles*/
  for (let article of articles) {

    /*find autor wrapper*/
    const authorWrapper = article.querySelector(optArticleAuthorSelektor);

    /*make html variabel with empty string*/
    let html = '';

    /*get autor from date-autor atribute*/
    const articleAuthor = article.getAttribute('data-author');


    /* generate html of the link*/
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code */
    html = linkHTML;

    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] check if this link is NOT already in allTags */
  if (!author['']) {
    /* [NEW] add generated code to allTags array */
    author[''] = 1;
  }
  else {
    author['']++;
  }

  /* END LOOP: for each tag */

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.list.authors');

  /* [NEW] create variable for all links HTML code */
  const authorData = { articles: [] };
  const authorParams = calculateTagsParams(authorData);
  console.log('authorParams:', authorParams);

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let article in authorData) {
    const authorsLinkHTML = `<li><a href="#"><span class=${author - name}>${author}</span>${author[article]}</a></li>`;
    console.log('tagi po prawej stronie zostaly wyswietlone');

    /* [NEW] generate code of a link and add it to allTagsHTML */
    authorData.articles.push({
      article: author,
      count: author[article],
      className: calculateTagsClass(authorData[article], authorParams)
    });

       /* [NEW] END LOOP: for each tag in allTags: */
       authorsList.innerHTML = templates.authorCloudLink(authorData);
  }
}

  generateAuthors();

  function authorClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    console.log('Author was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "autor" and extract autor from the "href" constant */
    const articleAutor = href.replace('data-author');

    /* find all autors links with class active */
    const authors = document.querySelectorAll(`a.active(href^="#articleAutor")`);

    /* START LOOP: for each active autor link */
    for (let author of authors) {

      /* remove class active */
      authors.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all autor links with "href" attribute equal to the "href" constant */
    const activeAuthor = document.querySelectorAll('a(href^="#author")');

    /* add class active */
    activeAuthor.classList.add('active');

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('data-author=' + author + '');

  }

  function addClickListenersToAuthor() {
    /* find all links to autors */
    const links = document.querySelectorAll(optArticleAuthorLinkSelector);

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthor()
