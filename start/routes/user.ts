import Route from '@ioc:Adonis/Core/Route'

Route.post('/user', 'UsersController.create');
Route.post('/user/login', 'UsersController.login');