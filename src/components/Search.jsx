import React from 'react'
import { LuSearch } from 'react-icons/lu'


const Search = () => {
    return (
        <div className="search">
            <label htmlFor="searchInput"><LuSearch /></label>
            <input type="text" id="searchInput" placeholder="Search" />
        </div>
    )
}

export default Search