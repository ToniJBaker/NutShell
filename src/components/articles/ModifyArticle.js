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
            fetchArticles(`/${articleId}`) //fetch call
            .then ((articleFromAPI) =>{
                updateArticle(articleFromAPI)
            })
        },
        [],
    )
    
    const handleSaveButtonClick = (event) => { //function to save the modified article
        event.preventDefault()
        fetchArticles(`/${articleId}`, putOption(article))  //fetch call with PUT option
        .then(()=> {
            navigate("/articles") //return to articles
        })
        
    }
     
    return (
    <>
        <h2>Modify Article</h2>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="createTitle">Title</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={article.title}
                        onChange={
                            (evt)=> {
                               const copy = {...article} 
                               copy.title = evt.target.value
                               updateArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="createURL">URL</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            
                            value={article.url}
                            onChange={
                                (evt)=> {
                                const copy = {...article} 
                                copy.url = evt.target.value
                                updateArticle(copy)
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
                               updateArticle(copy)
                            }
                        } />
                </div>
            </fieldset>

            
        
        <button
            onClick={(changeEvent) => handleSaveButtonClick(changeEvent)}
            className="btn btn-primary">
            Save Changes
        </button>
    </>
    )
}



