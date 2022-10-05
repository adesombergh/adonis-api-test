import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Forum from 'App/Models/Forum'

export default class extends BaseSeeder {
  public async run() {
    await Forum.updateOrCreate(
      {},
      {
        title: 'Super Forum',
        description: 'Super dooper forum',
        userId: 2,
      }
    )
    // Write your database queries inside the run method
  }
}
