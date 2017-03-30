var jsf = require('json-schema-faker');

var schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/positiveInt'
        },
        firstName: {
          type: 'string',
          faker: 'name.firstName'
        },
        lastName: {
          type: 'string',
          faker: 'name.lastName'
        },      
        phone: {
          type: 'string',
          faker: 'phone.phoneNumber'
        },  
        email: {
          type: 'string',
          format: 'email',
          faker: 'internet.email'
        },
        nationality: {
          type: 'string',
          faker: 'address.country'
        },        
        status: {
          "type": "string",
          "pattern": "yes|no|complicated"
        },
        aboutMe: {
          "type": "string",
          faker: 'lorem.paragraphs'
        },        
        balance: {
          "type": "string",
          "faker": {
            "finance.amount": [100, 1000000, 2, "$"]
          }
        }
      },
      required: ['id', 'firstName', 'lastName', 'phone', 'email', 'nationality', 'status', 'aboutMe']
    }
  },
  required: ['user'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

for(var num = 1; num <= 2; num++) {
  var result = [];

  for (var i = 0; i < 5000; i++) {
    result.push(jsf(schema).user)
  }

  var jsonfile = require('jsonfile')
   
  var file = 'data' + num + '.json'
   
  jsonfile.writeFile(file, result, function (err) {
    console.error(err)
  })
}