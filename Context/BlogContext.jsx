import React, { useState } from "react";

const BlogContext = React.createContext()

export default BlogContext;

function BlogContextProvider({children})
{
    const [blog,setBlog]=useState([])
    return (
        <BlogContext.Provider value={{blog,setBlog}}>
           {children}
        </BlogContext.Provider>

    )
}

export {BlogContextProvider};