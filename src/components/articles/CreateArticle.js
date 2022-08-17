
import { useEffect, useState } from "react"
import { fetchArticles, postOption } from "../ApiManger"
import { useNavigate } from "react-router-dom"


export const CreateArticle = () => {
    // default properties for initial state
    const [article, createArticle] = useState ({ 
        userId: "",
        url: "",
        title: "",
        synopsis: "",
        timestamp: ""
    })
    const navigate = useNavigate()
    
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        let date = new Date().toUTCString().slice(0,16)//today's date
        
        const articleToSendToAPI = {
            userId: nutshellUserObject.id,
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            timestamp: date
       }
       fetchArticles("", postOption(articleToSendToAPI))
       .then(()=> {
        navigate("/articles")
    }) 
    }

    return (
    <>
            <h2>Create Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="createURL">URL</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter URL of Article Here"
                        value={article.url}
                        onChange={
                            (evt)=> {
                               const copy = {...article} 
                               copy.url = evt.target.value
                               createArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="createTitle">Title</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Title of Article Here"
                        value={article.title}
                        onChange={
                            (evt)=> {
                               const copy = {...article} 
                               copy.title = evt.target.value
                               createArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="createSynopsis">Synopsis</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Synopsis of Article Here"
                        value={article.synopsis}
                        onChange={
                            (evt)=> {
                               const copy = {...article} 
                               copy.synopsis = evt.target.value
                               createArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
            onClick ={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Article
            </button>
    
    </>
    )
}