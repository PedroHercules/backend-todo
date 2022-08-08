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

    if (tasks.length == 0) {
      return response.status(404).json({ message: "tasks empty" });
    }

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

  public async update({ params, request, response } : HttpContextContract) {
    const id = params.id;
    
    if (isNaN(id)) {
      return response.status(400).json({ message: "Parameter must be a number" });
    }

    const task = await Task.find(id)
    
    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    const { title, description, date } = request.body();

    if (title !== task.title && title != null) {
      task.title = title;
    }
    if (description !== task.description && description != null) {
      task.description = description;
    }
    if (date !== task.date && date != null) {
      task.date = date;
    }

    await task.save();

    return response.status(200).json({ 
      message: "Task update successfully",
      task
    });
  }

  public async destroy({ params, response } : HttpContextContract) {
    const id = params.id;
    
    if (isNaN(id)) {
      return response.status(400).json({ message: "Parameter must be a number" });
    }

    const task = await Task.find(id)
    
    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    await task.delete();

    return response.status(200).json({
      message: "Task deleted successfully",
      task
    });

  }
}
