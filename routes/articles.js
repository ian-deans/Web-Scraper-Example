const router = require( 'express' ).Router();
const controller = require( '../controllers/articles' );

module.exports = router
    .post( '/', controller.create )
    // .get( '/', controller.getAll )
    // .param( 'id', controller.idParam )
    // .get( '/:id', controller.getById )
    // .put( '/:id', controller.update )
    // .delete( '/:id', controller.delete )
    .get('/scrape', controller.scrape ) // Decided to put the scrape function on the Article Controller