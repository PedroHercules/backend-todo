import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

import bcrypt from 'bcrypt'

type UserType = {
  name: string
  email: string
  password: string
}

export default class UsersController {
  public async create({ request, response } : HttpContextContract) {
    const userData = request.body() as UserType;

    const user = await User.create(userData);

    user.password = "";

    return response.status(201).json({user})
  }

  public async login({ request, response, auth } : HttpContextContract) {
    const { email, password } = request.body() as UserType;

    try {
      const user = await User.findByOrFail('email', email);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      } 

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return response.status(401).json({ message: "Invalid password" });
      }
      user.password = "";

      const token = await auth.use('api').generate(user, {expiresIn: '1 days'});
      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
