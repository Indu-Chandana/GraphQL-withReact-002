const UserList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        natianality: "CANADA",
        friends: [
            {
                id: 2,
                name: "Pedro",
                username: "pedroTech",
                age: 20,
                natianality: "BRAZIL",
            },
            {
                id: 3,
                name: "Sarah",
                username: "cameron",
                age: 25,
                natianality: "INDIA",
            },
        ]
    },
    {
        id: 2,
        name: "Pedro",
        username: "pedroTech",
        age: 20,
        natianality: "BRAZIL",
    },
    {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        natianality: "INDIA",
        friends: [
            {
                id: 3,
                name: "Sarah",
                username: "cameron",
                age: 25,
                natianality: "INDIA",
            },
        ]
    },
    {
        id: 4,
        name: "Rafe",
        username: "rafe123",
        age: 60,
        natianality: "GERMANY",
    },
    {
        id: 5,
        name: "Kelly",
        username: "kelly2019",
        age: 5,
        natianality: "CHILE",
    }
];

const MovieList = [
    {
        id: 1,
        name: "Avengers Endgame",
        yearOfPublication: 2019,
        isInTheaters: true,
    },
    {
        id: 2,
        name: "Interstellar",
        yearOfPublication: 2007,
        isInTheaters: true,
    },
    {
        id: 3,
        name: "Superbad",
        yearOfPublication: 2009,
        isInTheaters: true,
    },
    {
        id: 4,
        name: "PedroTech The Movie",
        yearOfPublication: 2035,
        isInTheaters: false,
    },
];

module.exports = { UserList, MovieList };