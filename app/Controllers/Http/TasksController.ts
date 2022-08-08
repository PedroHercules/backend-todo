import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'


type taskType = {
  title: string
  description: string
  date: string
}

export default class TasksController {
  public async store({ request, response } : HttpContextContract) {

    const taskData = request.body() as taskType;

    const task = await Task.create(taskData);

    return response.status(201).json({task})
  }

  public async index({ response } : HttpContextContract) {
    const tasks = await Task.all();

    return response.status(200).json({ tasks });
  }

  public async show({ params, response } : HttpContextContract) {
    const id = params.id;
    
    if (isNaN(id)) {
      return response.status(400).json({ message: "Parameter must be a number" });
    }
    
    const task = await Task.find(id)
    
    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    return response.status(200).json({
      task
    });
  }
}
