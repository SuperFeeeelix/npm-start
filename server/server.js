const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const auth = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const dbConnection = require('./config/connection');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors());

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = auth(token);

        return { user };
    }
});

dbConnection.on('error', (error) => {
    console.error('Error connecting to the database:', error);
});

dbConnection.once('open', async () => {
    console.log('Connected to the database');
    await server.start();
    // Apply Apollo Server as middleware to Express app
    server.applyMiddleware({ app });

    // Serve static assets (for production)
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});


