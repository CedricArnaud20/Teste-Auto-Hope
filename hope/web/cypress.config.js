const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);

      // implement node event listeners here
    },
    baseUrl:'http://localhost:3000',
    viewportWidth:1920,
    viewportHeight:1080,
    env:{ 
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.of8esdk.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=Cluster0',
        database: 'HopeDB',
    }
    }
  
  },
});
