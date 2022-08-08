import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from '../../Models/Task'
import SubTask from '../../Models/SubTask'


type SubTaskType = {
  title: string
}

export default class SubTasksController {
  public async store({ request, response, params } : HttpContextContract) {
    const { title } = request.body() as SubTaskType;
    const taskId = params.taskId;

    if (isNaN(taskId)) {
      return response.status(400).json({ message: "Parameter must be a number" });
    }

    const task = await Task.find(taskId)

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    const subTask = await SubTask.create({
      title,
      taskId
    })

    return response.status(201).json({
      message: "subtask created successfully",
      subTask
    });
  }
}
