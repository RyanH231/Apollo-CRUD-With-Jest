import {MongoDataSource} from "apollo-datasource-mongodb"

//CRUD implement
export default class DisneyDataSource extends MongoDataSource
{
    async GetMovies()
    {
        console.log(this.model.collection.find({}).toArray());
       return await this.model.collection.find({}).toArray();
    }

    async GetMovieByName(title)
    {
       await this.model.collection.findOne({Name:title})
    }
    
    async AddMovie({name, director, year})
    {
        await this.model.create({name,director,year});
    }
    
    async UpdateMovie({name, update})
    {
        await this.model.findOneAndUpdate(name,update);
    }

    async DeleteMovie(title)
    {
        await this.model.deleteOne({name:title});
    }
}