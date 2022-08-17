import "./Articles.css"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { fetchArticles, deleteOption } from "../ApiManger.js"

export const Articles = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

useEffect (
    ()=> {
        fetchArticles() //fetch call to get articles and sort by descending timestamp
        .then((articlesData)=>{
            const sortedByTimestamp = articlesData.sort((objA, objB) => (objB.timestamp) - (objA.timestamp))
            setArticles(sortedByTimestamp)
            })
        },
    []
  ) 
  
const deleteButton = (article) => {
    if(nutshellUserObject.id === article.userId){
        return <button onClick={()=>{
            
            fetchArticles(`/${article.id}`, deleteOption())
            .then (()=>{
                fetchArticles( )
                    .then((articlesData)=> {
                    setArticles(articlesData)
                })
            })
        }} className="ticket__delete">Delete</button> 
    }
} 


 
return (<>
    <h2>Articles</h2>
        <section className="articles">
            {
            articles.map((article)=> ( //articles display: title, url, synopsis...  with modify & delete button if belong to current user.
            
            <>
               {article.userId === nutshellUserObject.id 
                    ?<div className="article-each" key={article.id}>
                        <h3 className="header">Article</h3> 
                        <p className="card-title">Title:  {article.title}</p>
                        <p className="card-url">URL:  {article.url}</p>
                        <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                        {/* <p className="card-time">Time Stamp:  {article.timestamp}</p> */}
                        <button className="modify">Modify</button>
                        {deleteButton(article)}
                        
                        </div>
                
                    :<div className="article-each" key={article.id}>
                        <h3 className="header">Article</h3> 
                        <p className="card-title">Title:  {article.title}</p>
                        <p className="card-url">URL:  {article.url}</p>
                        <p className="card-synopsis">Synopsis:  {article.synopsis}</p>
                        {/* <p className="card-time">Time Stamp:  {article.timestamp}</p> */}
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