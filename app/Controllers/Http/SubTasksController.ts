import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from '../../Models/Task'
import SubTask from '../../Models/SubTask'


type SubTaskType = {
  title: string
}

export default class SubTasksController {
  public async create({ request, response, params } : HttpContextContract) {
    const { title } = request.body() as SubTaskType;
    const taskId = params.taskId;

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

  public async index({ response, params } : HttpContextContract) {

    const taskId = params.taskId;

    if (isNaN(taskId)) {
      return response.status(400).json({ message: "Parameters must be a number" });
    }

    const task = await Task.find(taskId);

    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    const subTasks = await SubTask.query().where({task_id: taskId});

    if (subTasks.length == 0) {
      return response.status(404).json({ message: "Subtasks empty" });
    }

    return response.status(200).json({ subTasks });
  }

  public async show({ params, response } : HttpContextContract) {
    const taskId = params.taskId;
    const subtaskId = params.id;

    if (isNaN(taskId) || isNaN(subtaskId)) {
      return response.status(400).json({ message: "Parameters must be a number" });
    }

    const task = await Task.find(taskId);

    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    const subtask = await SubTask.find(subtaskId)

    if (!subtask) {
      return response.status(404).json({ message: "Subtask not found" });
    }

    return response.status(200).json({
      subtask
    });
  }

  public async update({ params, request, response } : HttpContextContract) {
    const taskId = params.taskId;
    const subtaskId = params.id;

    if (isNaN(taskId) || isNaN(subtaskId)) {
      return response.status(400).json({ message: "Parameters must be a number" });
    }

    const task = await Task.find(taskId);

    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    const { title } = request.body() as SubTaskType;

    const subtask = await SubTask.find(subtaskId)

    if (!subtask) {
      return response.status(404).json({ message: "Subtask not found" });
    }

    if (title !== subtask.title || title != null){
      subtask.title = title
      subtask.save()
    }

    return response.status(200).json({
      message: "subtask updated successfully",
      subtask
    });
  }

  public async destroy({ params, response } : HttpContextContract) {
    const taskId = params.taskId;
    const subtaskId = params.id;

    if (isNaN(taskId) || isNaN(subtaskId)) {
      return response.status(400).json({ message: "Parameters must be a number" });
    }

    const task = await Task.find(taskId);

    if (!task) {
      return response.status(404).json({ message: "task not found" });
    }

    const subtask = await SubTask.find(subtaskId)

    if (!subtask) {
      return response.status(404).json({ message: "Subtask not found" });
    }

    await subtask.delete();

    return response.status(200).json({
      message: "Subtask deleted successfully",
      subtask
    });
  }
}
