const {PORT, server} = require('./src/app.js')
const { database } = require('./src/db.js')

server.listen(PORT, async ()=>{
    try {
        await database.sync({ alter: true, logging: false });
        console.log('Base de datos escuchando en el puerto 5432');
        console.log(`Servidor escuchando en el puerto: ${PORT}`);
        
        // * {force:true} -> tras cada save hace un reset de todas asl tablas creadas. false para que no se ejecute 
        // * {alter:true} -> modifica las tablas a medida que se va trabajando sin borrar otras ya creadas      
        
    } catch (error) {
        console.error('Error al iniciar el servidor:', error)
    }
})
