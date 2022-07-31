const express = require('express');
const app = express()
const util = require( 'util' );
const mysql =  require('mysql')
const port = 3000
//const port = 3001

const config = {
    host: 'db',
    //host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    //port:33060
};

let retorno = '';

app.get('/', async function (req, res) {
    
    const db = makeDb(config);

    try
    {
        retorno = '<h1>Full Cycle Rocks!</h1><br><br>';

        await db.query(`INSERT INTO peoples(name) values (CONCAT('Anderson ', CAST((SELECT count(*) + 1 as qtde FROM peoples as temp) AS CHAR)))`)
        console.log('Dado Inserido...')

        const peoples = await db.query(`SELECT * FROM peoples`);
        console.log(peoples);
        retorno += '<b>List Peoples</b><br><table border="1"><tr><th>Id</th><th>Name</th></tr>'

        for (const i in peoples) {
            retorno += '<tr><td>' + peoples[i].id + '</td><td>' + peoples[i].name + '</td></tr>'
        }

        retorno += '</table>'
    }
    catch (err)
    {
        throw err;
    }
    finally
    {
        await db.close();
        console.log(retorno);
        res.send(retorno);
    }

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }