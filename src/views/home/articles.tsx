import Articles from "../blog/articles"
import blogSource from "../blog/data.json"

const articles = blogSource.slice(0, 3)

const HomeArticles = () => {
  return <Articles blogs={articles} />
}

export default HomeArticles
