import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      {},
      {
        name: 'Deba Desom',
        email: 'aldealdo@gmail.com',
        password: 'Password1!',
      }
    )
  }
}
