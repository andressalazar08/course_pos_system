const op = require('sequelize').Op;

class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword;
        
        if(keyword){   
            this.query = this.query.findAll({
                attributes:['name', 'email', 'profile', 'imageUrl', 'isActive'],
                where: {
                  name: {
                    [op.like]: `%${keyword}%`, 
                  },
                },
              });
        }else{
            this.query = this.query.findAll({
                attributes:['name', 'email', 'profile', 'imageUrl', 'isActive']
            });
        }
   
        return this;
    }
};

module.exports = { ApiFeatures };