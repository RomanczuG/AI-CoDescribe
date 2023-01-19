import React, {useEffect, useState} from 'react'
import axios from 'axios'

function DataFetching() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/members')
        .then(res => {
            console.log(res)
            
        })
        .catch(err => {
            console.log(err)
        })
    })
    return (
        <div>
            <ul>
                {
                    posts.map(post => <li key={post.id}>{post.title}</li>)
                }
            </ul>
        </div>
    )
}

export default DataFetching