import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
          id
          name
          natianality
          age
          username
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
      movies {
        id
        name
      } 
    }
`
// 2.55.00 min
const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!){
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`

const GET_USER_BY_ID = gql`
    query User($id: ID!){
        user(id: $id) {
            name
        }
    }
`

const CREATE_USER_MUTATION = gql` 
    mutation CreateUser($input: CreateUserInput!) {   # CreateUserInput is same in the backend, so it recognizes the type...
        createUser(input: $input) {
            name
            id
        }
    }
`

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");
    const [userID, setUserID] = useState("");

    // Create User States
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    /////////////////////////////////////////////////////////////////////////////////
    // get All User and Movie
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

    // get User and Movie
    const [fetchMovie, { data: movieSearchData, error: movieSearchError }] = useLazyQuery(GET_MOVIE_BY_NAME);
    const [fetchUser, { data: userSearchData, error: userSearchError }] = useLazyQuery(GET_USER_BY_ID);

    //create User
    const [createUser] = useMutation(CREATE_USER_MUTATION)
    ///////////////////////////////////////////////////////////////////////////////////

    if (loading) {
        return <h1> DATA IS LOADING... </h1>
    }

    return (
        <div>
            <div>
                <input type="text" placeholder='Name...' onChange={(event) => {setName(event.target.value)}}/>
                <input type="text" placeholder='Username...' onChange={(event) => {setUsername(event.target.value)}} />
                <input type="number" placeholder='Age...' onChange={(event) => {setAge(event.target.value)}}/>
                <input type="text" placeholder='Nationality...' onChange={(event) => {setNationality(event.target.value.toUpperCase())}}/>
                <button onClick={() => {
                    createUser({ variables: {input: { name: name, username: username, age: Number(age), natianality: nationality }}});
                    refetch();
            }}> Create User </button>
            </div>
            {data &&
                data.users.map((user, i) => {
                    return (
                        <div key={i}>
                            <h1>Name: {user.name}</h1>
                            <h1>Username: {user.username}</h1>
                            <h1>Age: {user.age}</h1>
                        </div>
                    );
                })
            }

            {movieData &&
                movieData.movies.map((movie, i) => {
                    return (
                        <div key={i}>
                            <h1>movie name: {movie.name}</h1>
                        </div>
                    )
                })
            }

            <div>
                <input
                    type="text"
                    placeholder='Interstellar...'
                    onChange={(event) => {
                        setMovieSearched(event.target.value)
                    }}
                />
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            name: movieSearched,
                        },
                    });
                }}
                > Fetch Data </button>
                <div>
                    {movieSearchData && (
                        <div>
                            <h1>MovieName: {movieSearchData.movie.name}</h1>
                            <h1>yearOfPublication: {movieSearchData.movie.yearOfPublication}</h1>
                        </div>
                    )}
                    {movieSearchError && (
                        <h1> There was an error fetching the data </h1>
                    )}
                </div>
            </div>

            <div>
                <input
                    type="text"
                    placeholder='serch User with ID ... '
                    onChange={(event) => {
                        setUserID(event.target.value)
                    }}
                />

                <button onClick={() => {
                    fetchUser({
                        variables: {
                            id: userID
                        }
                    })
                }}> find User </button>

                <div>
                    {userSearchData && (
                        <h1>name: {userSearchData.user.name}</h1>
                    )}
                    {userSearchError && (
                        <h1>There was an error fetching the user</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DisplayData
