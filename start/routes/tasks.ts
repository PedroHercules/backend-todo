import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

  //Tasks
  Route.post('/', 'TasksController.create');
  Route.get('/', 'TasksController.index');
  Route.get('/:id', 'TasksController.show');
  Route.put('/:id', 'TasksController.update');
  Route.delete('/:id', 'TasksController.destroy');

  //SubTasks
  Route.post('/:taskId/subtask', 'SubTasksController.create');
  Route.get('/:taskId/subtask', 'SubTasksController.index');
  Route.get('/:taskId/subtask/:id', 'SubTasksController.show');
  Route.put('/:taskId/subtask/:id', 'SubTasksController.update');
  Route.delete('/:taskId/subtask/:id', 'SubTasksController.destroy');
}).prefix('/task').middleware('auth');