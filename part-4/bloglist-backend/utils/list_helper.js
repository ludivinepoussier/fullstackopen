const dummy = blogs => {
  blogs = 1
  return blogs
}

const totalLikes = blogs => blogs.reduce(function (acc, obj) { return acc + obj.likes }, 0)

module.exports = {
  dummy,
  totalLikes
}
