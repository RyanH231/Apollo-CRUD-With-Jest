import {disneyModel} from "../models/disneyModel.js"

export const typeDefs = `#graphql
    type Director
    {
        firstName:String!,
        lastName:String!
    }

    type Film {
        name: String!,
        director: Director,
        year: Int
    }

    input DirectorInput
    {
        firstName:String,
        lastName:String
    }

    input FilmInput{
        name:String!,
        director: DirectorInput!,
        year:Int!
    }

  
    input UpdateInput{
        name:String,
        director: DirectorInput,
        year:Int
    }

    type Query{
        GetMovies: [Film]
        GetMovieByName(name:String!) : Film
    }

    type Mutation{
        AddMovie(input: FilmInput!): Boolean
        UpdateMovie(input: UpdateInput!): Film
        DeleteMovie(name:String!):Boolean
    }
`


export const resolvers = {
    Query: {
        GetMovies: async () => {
            // console.log(await disneyModel.collection.find({}).toArray());
            return await disneyModel.collection.find({}).toArray();
        },

        GetMovieByName: async (_, args) => {
            return await disneyModel.collection.findOne({name: args.name})
        },
    },

    Mutation: {
        AddMovie:async (_, {input}) => {
            let film = {
                name:input.name,
                director: {
                    firstName: input.director.firstName,
                    lastName: input.director.lastName
                },
                year:input.year
            }
            return await disneyModel.create(film).then(()=>{return true}).catch(()=>{return false});
        },

        UpdateMovie: async (_,{input}) => {

            let title = input.name;
            let filter = {name:title};

            let original = await disneyModel.collection.findOne({name:name});
            if(input.director.firstName == "")
            {
                input.director.firstName = original.director.firstName;
            }
            if(input.director.lastName == "")
                input.director.lastName = original.director.lastName;
            if(input.year == 0)
                input.year = original.year;
            return await disneyModel.findOneAndUpdate(filter, input);
        },
        DeleteMovie: async (_, {name}) => {
            if(await disneyModel.collection.findOne({name: name}))
                return await disneyModel.deleteOne({name:name}).then(()=>{return true}).catch(()=>{return false});
            else
            {
                console.error("Movie didn't exist in collection");
                return false;
            }
        }
    }
}