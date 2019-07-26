const cheerio = require('cheerio');
const axios = require( 'axios' );
let $;



function scraper() {
    console.log( 'Scraping articles...' )
    const newsUrl = 'https://www.nytimes.com';
    const rawHTML = ( await axios( newsUrl ) ).data;
    // console.log(rawHTML.data)
    $ = cheerio.load( rawHTML );
    console.log( 'Scraped' )

    const articles = $( 'article' );
    console.log( 'ARTICLEs :: ', articles[ 0 ] )
    const articlesData = articles.map( extractArticleData )
    console.log(articlesData)
}


function extractArticleData( index, article ) {
    // console.log('Article :: ', article)
    const title = $( article ).find( 'h2' ).text();
    console.log( 'TITLE :: ', title );

    const summary = $( article ).find( 'p' ).text();
    console.log( 'SUMMARY :: ', summary );

    const link = $( article ).find( 'a' )[ 0 ];
    const url = newsUrl + $( link ).attr( 'href' );
    console.log( 'URL :: ', url );
    return {title, link, summary}
}