import { useEffect, useState } from 'react'
import React from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'

function Home() {

    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
        } catch (err) {
            console.log(err)
            setError('Failed to fetch popular movies. Please try again later.')
        }
        finally {
            setLoading(false)
           }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchTerm.trim() === '') {
            setError(alert('Please enter a search term.'))
            return
        }
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchTerm)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError('Failed to fetch search results. Please try again later.')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className='search-form'>
                <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for a movie...' className='search-input' />
                <button type='submit' className='search-button'>Search</button>
            </form>
                {error && <div className='error-message'>{error}</div>}
            <div className='movies-grid'>
                {loading ? (<div className='loading'>Loading...</div>) : movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />

                    ))                   
                }
            </div>
        </div>
    )
}

export default Home