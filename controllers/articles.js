const mongoose = require( 'mongoose' );
const Article = mongoose.model( 'Article' );
const cheerio = require( 'cheerio' );
const axios = require( 'axios' );
let $;
const newsUrl = 'https://www.nytimes.com';



module.exports = {
    create: ( request, response, next ) => {
        const {
            body
        } = request;

        // Make sure the article has a title.
        if ( !body.title ) {
            return response.status( 422 ).json( {
                errors: {
                    title: 'is required',
                },
            } );
        }

        // Make sure the article has a summary.
        if ( !body.summary ) {
            return response.status( 422 ).json( {
                errors: {
                    summary: 'is required',
                },
            } );
        }

        const finalArticle = new Article( body );

        return finalArticle.save()
            .then( () => response.json( {
                article: finalArticle.toJSON(),
            } ) )
            .catch( next );
        // ^ catch any errors and pass it down the pipe to the error handling in app.js

    },

    scrape: async ( request, response, next ) => {
        console.log( 'Scraping articles...' )
        const rawHTML = ( await axios( newsUrl ) ).data;
        $ = cheerio.load( rawHTML );
        console.log( 'Scraped' )

        const articleObjs = $( 'article' )
        const articlesArray = articleObjs.toArray()
        const articlesData = articlesArray.map( extractArticleData )

        await Promise.all( articlesData.map( article => {
            const finalArticle = new Article( article );
            console.log( 'Article Created: ', finalArticle.toJSON() )
            return finalArticle.save()
                .catch( error => console.error( error ) )
        } ) )

        response.redirect( '/' );
    },
}

function extractArticleData( article, index ) {
    const link = $( article ).find( 'a' )[ 0 ];
    const articleData = {
        title: $( article ).find( 'h2' ).text(),
        summary: $( article ).find( 'p' ).text(),
        urls: newsUrl + $( link ).attr( 'href' ),
    }
    return articleData
}