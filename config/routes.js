/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'GET /person/create': 'PersonController.create',
  'POST /person/create': 'PersonController.create',

  'GET /person/json': 'PersonController.json',
  'GET /person/admin': 'PersonController.admin',

  'GET /person/read/:id': 'PersonController.read',

  'GET /person/update/:id': 'PersonController.update',
  'POST /person/update/:id': 'PersonController.update',
  'POST /person/delete/:id': 'PersonController.delete',

  'GET /person/search': 'PersonController.search',
  //'GET /person/search': 'PersonController.paginate',
  //'POST /person/search': 'PersonController.search',

  'GET /': 'PersonController.home',

  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /person/registeredStudents/:id': 'PersonController.findStudents',
  'GET /user/registeredEvents': 'UserController.findEvents',
  'GET /user/populate/:id': 'UserController.populate',
  'GET /person/populate/:id': 'PersonController.populate',
  
  'POST /user/registeredEvents/add/:fk': 'UserController.add',
  'GET /user/registeredEvents/add/:fk': 'UserController.add',
  'POST /user/registeredEvents/remove/:fk': 'UserController.remove',
  'GET /user/registeredEvents/remove/:fk': 'UserController.remove',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
