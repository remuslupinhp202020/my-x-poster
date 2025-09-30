// This library helps us talk to the X API easily
const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event) => {
    // Stop if this isn't a POST request
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Get the text to post from the request
        const { text } = JSON.parse(event.body);

        // Check if text was provided
        if (!text) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Error: Text to post is missing." }),
            };
        }
        
        // Initialize the X client with our secret keys from Netlify
        const client = new TwitterApi({
            appKey: process.env.X_API_KEY,
            appSecret: process.env.X_API_SECRET,
            accessToken: process.env.X_ACCESS_TOKEN,
            accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
        });

        // Make the API call to create a new post
        await client.v2.tweet(text);

        // Return a success message
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Post was successful!" }),
        };

    } catch (error) {
        // Log the error for debugging
        console.error("Error posting to X:", error);

        // Return a detailed error message
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Failed to post. Error: ${error.message}` }),
        };
    }
};
