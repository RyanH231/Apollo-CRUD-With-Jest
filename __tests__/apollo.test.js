import { typeDefs,resolvers } from "../typedefs/typedefs.js";
import { disneyModel } from "../models/disneyModel.js";

import {mongoose} from "mongoose";
import ("dotenv/config.js");
import {jest} from "@jest/globals";


describe("Runs CRUD operations on Mongo successfully", () => {
    let connection;
    let mockFilm;
    let disneyCollection;

    beforeAll(async ()=>{
        connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        disneyCollection = disneyModel.collection;
        mockFilm = {
            name:"The Incredibles 234",
            director: {
                firstName:"Brad",
                lastName:"Bird"
            },
            year:2004
        };
    })

    it("Adds a movie to the database", async() => {
        //Arranged in BeforeAll
       
        //Act
        disneyModel.create(mockFilm);
        let mongoResult = await disneyCollection.findOne({name:"The Incredibles 234"});

        let mockResult = {
            name: mongoResult.name,
            director: {
                firstName: mongoResult.director.firstName,
                lastName: mongoResult.director.lastName
            },
            year: mongoResult.year
        }
        //Assert
        expect(mockResult).toEqual(mockFilm);
    });

    it("Deletes a movie from the database", async() => {
        //Arrange 
            let beforeDelete = disneyModel.collection.findOne({name:"The Incredibles"})
        //Act
            let afterDelete = disneyModel.deleteOne({name:"The Incredibles"});

        //Assert
            expect(beforeDelete).not.toEqual(afterDelete);
    })
})




// describe("Runs CRUD operations for the server from Mongo DB using Mongoose", async () => {
//     beforeAll(async ()=>{
//         let connection;
    
//         connection = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
    
//         const testServer = new ApolloServer({
//             typeDefs,
//             resolvers
//         })
//     })
    
//     afterAll(async() => {
//        await mongoose.connection.close();
//     })
    
//     it("returns a film given the proper parameters", async() =>
//     {
       

//         const response = await testServer.executeOperation({
//             query: "query GetMovieByName($name:String!) { GetMovieByName($name:name) {name, director {firstName, lastName}, year}}",
//             variables:{name:"The Lion King"}
//         });
//         assert(response.body.kind === 'single');
//         expect(response.body.singleResult.errors).toBeUndefined();
//         expect(response.body.singleResult.data?.GetMovieByName.name).toBe('The Lion King');
//     });

//     it("returns a list of films from the Mongo database", async() =>{
//         const response = await testServer.executeOperation({
//             query: "query GetMovies{ GetMovies() {name, director {firstName, lastName}, year}}"
//         });
//     });
// })
