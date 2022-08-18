//Module authored by Trey, Toni, Jason and Shane
//Module handles API fetches

export const fetchUsers = (resource = "", options = {}) => {
    return fetch(`http://localhost:8088/users${resource}`, options)
    .then(response => response.json())
}

export const fetchTasks = (resource = "", options = {}) => {
    return fetch(`http://localhost:8088/tasks${resource}`, options)
    .then(response => response.json())
}

export const fetchArticles = (resource = "", options = {}) => {
    return fetch(`http://localhost:8088/articles${resource}`, options)
    .then(response => response.json())
}

export const fetchEvents = (resource = "", options = {}) => {
    return fetch(`http://localhost:8088/events${resource}`, options)
    .then(response => response.json())
}

export const fetchMessages= (resource = "", options = {}) => {
    return fetch(`http://localhost:8088/messages${resource}`, options)
    .then(response => response.json())
}

export const postOption = (bodyContent) => {

    const post = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      }
    
  return post

}

export const getLoggedInUser = () => {
  return {...JSON.parse(localStorage.getItem("nutshell_user"))}
}
export const putOption = (bodyContent) => {

    const put = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      }

    return put

  }

  export const deleteOption = () => {

    const deleteOpt = {
        method: "DELETE",
    }
    
    return deleteOpt
  }
