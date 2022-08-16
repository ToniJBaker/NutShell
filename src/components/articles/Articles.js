import "./Articles.css"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { fetchArticles } from "../ApiManger.js"





export const Articles = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    
  useEffect (
    ()=> {
        fetchArticles()
        .then((articlesData)=> {
            setArticles(articlesData)
        })
    },
    []
  )  
   
    return (<>
    <h2>Articles</h2>
        <section className="articles">
            {
            articles.map((article)=> (
            <><div className="article-each">
                <h3 className="header">Article</h3> 
                    <p class="card-title">Title:  {article.title}</p>
                    <p className="card-url">URL:  {article.url}</p>
                    <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                    <button>Modify</button>
            </div></>
            ))}
        </section>
        
        <section>
            <button className="add-article">
                Add an Article
            </button>
        </section>
</>)
}