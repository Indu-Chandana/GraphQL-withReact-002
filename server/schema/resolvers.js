const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash")

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: (parent, args, context) => {
            // console.log(context)
            if (UserList) return {users: UserList};

            return {message: "Yo, there was an error"}
        },
        user: (parent, args) => {
            const id = args.id
            const user = _.find(UserList, {id: Number(id)})
            return user
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(MovieList, {name})
            return movie
        },
    },

    User: {
        favoriteMovies: () => {
            return _.filter(
                MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            );
        }
    },

    UserResult: {
        __resolveType(obj) {   // resolver and union uses something called a __resolveType -> that do - what is the two option now return.
            if(obj.users) {  // if object return users
                return "UsersSuccessfullResult";
            } 
            
            if(obj.message) {  // if object return users
                return "UsersErrorResult";
            } 

            return null;
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            // console.log(user)
            const lastId = UserList[UserList.length - 1].id //2.07.00min UserList vala anthima eke ID eka genima 
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            // const id = args.input.id; we can do that very easily
            const { id, newUsername } = args.input;  

            let userUpdated;
            UserList.forEach((user) => {
                if(user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user; 
                }
            });

            return userUpdated;
        },

        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null
        },
    },
};

module.exports = { resolvers };