const graphql= require ('graphql');
const axios = require('axios');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
}=graphql;

const CompanyType = new GraphQLObjectType({
    name:"company",
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        desc:{type:GraphQLString}
    }
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields : {
        id:{type:GraphQLString} ,
        firstName:{type:GraphQLString} ,
        age: {type:GraphQLInt},
        company:{type:CompanyType,
        resolve(parentValue,args){
            return axios.get(`http://localhost:3000/companies/1`).then(response => response.data)
        }}
    }
});
 const RootQuery = new GraphQLObjectType({
     name:"RootQueryType",
     fields : {
         user: {
             type:UserType,
             args:{id:{type:GraphQLString}},
             resolve(parentValue,args){
                return axios.get(`http://localhost:3000/users/${args.id}`) 
                .then(response => response.data).then(data=>data)
             }
         },
         company:{
             type:CompanyType,
             args:{id:{type:GraphQLString}},
             resolve(parentValue,args){
                 return axios.get(`http://localhost:3000/companies/${args.id}`)
                 .then(response=>response.data)
             }

         }

     }
 });
 module.exports=new GraphQLSchema({
     query:RootQuery
 });

