const dummy = blogs => {
  blogs = 1
  return blogs
}

const totalLikes = blogs => blogs.reduce(function (acc, obj) { return acc + obj.likes }, 0)

const favoriteBlog = blogs => {
  const maxLikes = Math.max(...blogs.map(it => it.likes))
  const maxLikesObj =  blogs.find(it => it.likes === maxLikes)
  return { title: maxLikesObj.title, author: maxLikesObj.author, likes: maxLikesObj.likes }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
