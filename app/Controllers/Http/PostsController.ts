import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    return await Post.query().preload('user')
  }

  public async show({ params }: HttpContextContract) {
    try {
      const post = await Post.find(params.id)
      if (post) {
        await post.load('user')
        return post
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.find(params.id)

    if (post) {
      post.title = request.input('title')
      post.content = request.input('content')
      if (await post.save()) {
        await post.preload('user')
        return post
      }
      return // 422
    }

    return // 401
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const post = new Post()
    post.title = request.input('title')
    post.content = request.input('content')
    await user.related('posts').save(post)
    return post
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const post = await Post.query().where('user_id', user.id).where('id', params.id).delete()
    return response.redirect('/dashboard')
  }
}
