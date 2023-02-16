import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'

import { v4 as uuidv4 } from 'uuid'

export default class SubTask extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public taskId: string

  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(subtask: SubTask) {
    subtask.id = uuidv4()
  }
}
