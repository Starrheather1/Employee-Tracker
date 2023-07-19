function initializeDatabase() {

    createTables();

    console.log('Database created successfully.');


}
function createTables() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Heatherstarr1234',
        database: 'Company'
    });

    connection.connect((error) => {
        if (error) {
            console.error('Error connecting to the database:', error);
        } else {
            console.log('Connected to the database.');

            const createTableQuery = `
            CREATE TABLE employee (   
              id INT PRIMARY KEY AUTO_INCREMENT,  
              first_name VARCHAR(30) ,
                last_name VARCHAR(30) ,
              role_id INT,
              manger_id INT ) `; 
            connection.query(createTableQuery, (error, results) => {
                if (error) {
                    console.error('Error creating table:', error);
                } else {
                    console.log('Table created successfully.');

                }
                connection.end(); // Close the database connection
            });


        }
    });
}
initializeDatabase()