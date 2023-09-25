const op = require('sequelize').Op;

class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
        console.log('entrada al constructor', this.query);
    }

    async search(){
        const keyword = this.queryStr.keyword;
        
        if(keyword){
            console.log('en keyword', this.query)
            this.query =  await this.query.findAll({
                attributes:['name', 'email', 'profile', 'imageUrl', 'isActive'],
                where: {
                  name: {
                    [op.like]: `%${keyword}%`, // La opción 'iLike' hace que la búsqueda sea insensible a mayúsculas y minúsculas.
                  },
                },
              });
            
        }else{
            this.query = await this.query.findAll({
                attributes:['name', 'email', 'profile', 'imageUrl', 'isActive'],
              });
        }
        return this.query;
    }

    async filter(){
        const filters = this.queryStr;
        console.log(filters)
        if(filters.isActive){
            console.log('en filter', this.query.length)
            // this.query = await this.query.findAll({
            //     attributes:['name', 'email', 'profile', 'imageUrl', 'isActive'],
            //     where:{
            //         isActive:filters.isActive
            //     }               
            //   });
            //this.query = this.query.filter((user)=>user.isActive===filters.isActive);
            // console.log(this.query);
        }

        return this.query;
    }
};

module.exports = ApiFeatures;