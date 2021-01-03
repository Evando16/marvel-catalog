var fs = require('fs');

function readWriteSync() {
    var data = fs.readFileSync('./src/environments/environment.prod.ts', 'utf-8');  
    var newValue = data.replace('$API_KEY', process.env.API_KEY);
  
    fs.writeFileSync('./src/environments/environment.prod.ts', newValue, 'utf-8');

    console.log('Keys replaced with success! :)');
}

readWriteSync();