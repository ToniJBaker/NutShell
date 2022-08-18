import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Articles.css"
import { fetchArticles, putOption } from "../ApiManger"

export const ModifyArticle = () => {
    
    const navigate = useNavigate()
    const { articleId } = useParams()
    const [article, updateArticle] = useState({
        userId: 0,
        url: "",
        title: "",
        synopsis:"",
        timestamp:0
    })

    
    useEffect(
        ()=>{
            fetchArticles(`/${articleId}`)
            .then ((articleFromAPI) =>{
                updateArticle(articleFromAPI)
            })
        },
        [articleId],
    )
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

       // TODO: Write the fetch for the PUT request to replace the object being edited
        // return fetch(`http://localhost:8088/articles/${articleId}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(article)
        // } )

        fetchArticles(`/${articleId}`, putOption(article))
        .then(response => response.json())
        .then(()=> {
            navigate("/articles")
        })
        
    }
     
    return (
    <>
        <h2>Modify Article</h2>
        
        <button
            onClick={(changeEvent) => handleSaveButtonClick(changeEvent)}
            className="btn btn-primary">
            Save Changes
        </button>
    </>
    )
}



