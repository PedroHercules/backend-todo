import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import bcrypt from 'bcrypt'

import { v4 as uuidv4 } from 'uuid'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: string
  
  @column()
  public email: string

  @column()
  public username: string

  @column()
  public password: string

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(user: User) {
    user.id = uuidv4()
  }

  @beforeCreate()
  public static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10)
  }
}
