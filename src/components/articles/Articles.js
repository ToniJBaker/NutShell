import "./Articles.css"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { fetchArticles } from "../ApiManger.js"





export const Articles = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    
  useEffect (
    ()=> {
        fetchArticles() //fetch call to get articles
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
            articles.map((article)=> ( //articles display: title, url, synopsis, modify button
            <>
                <div className="article-each" key={article.id}>
                    <h3 className="header">Article</h3> 
                    <p class="card-title">Title:  {article.title}</p>
                    <p className="card-url">URL:  {article.url}</p>
                    <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                    <p className="card-time">Time Stamp:  {article.timestamp}</p>
                    <button>Modify</button>
                </div>
            </>
            ))}
        </section>
        
        <section>
            <button className="add-article" onClick={() => navigate("/articles/create")}>Add Article</button>
        </section>
</>)
}