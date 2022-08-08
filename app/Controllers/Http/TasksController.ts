// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksController {
  public async store() {
    return {
      msg: "Rota para criar task"
    }
  }
}
