import "./Articles.css"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { fetchArticles, deleteOption } from "../ApiManger.js"

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])
    const navigate = useNavigate()
    
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

useEffect (
    ()=> {
        fetchArticles() //fetch call to get articles
        .then((articlesData)=> {
            setArticles(articlesData)
        })
    },
    []
  ) 
  
//   useEffect =(
//     ()=> {
//     const myArticles = () => {
//     articles.filter((article)=>{article.userId === nutshellUserObject.id})
//     setFilteredArticles(myArticles)
//     }
//     },
//     [articles] 
// )
 
return (<>
    <h2>Articles</h2>
        <section className="articles">
            {
            articles.map((article)=> ( //articles display: title, url, synopsis...  with modify & delete button if belong to current user.
            <>
               {article.userId === nutshellUserObject.id 
                    ?<div className="article-each" key={article.id}>
                        <h3 className="header">Article</h3> 
                        <p class="card-title">Title:  {article.title}</p>
                        <p className="card-url">URL:  {article.url}</p>
                        <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                        <p className="card-time">Time Stamp:  {article.timestamp}</p>
                        <button className="modify">Modify</button>
                        <button className="delete">Delete</button>
                    </div>
                
                    :<div className="article-each" key={article.id}>
                        <h3 className="header">Article</h3> 
                        <p class="card-title">Title:  {article.title}</p>
                        <p className="card-url">URL:  {article.url}</p>
                        <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                        <p className="card-time">Time Stamp:  {article.timestamp}</p>
                    </div>
                }
            </>
            ))}
        </section>
        <section>
            <button className="add-article" onClick={() => navigate("/articles/create")}>New Article</button>
        </section>
</>)
}