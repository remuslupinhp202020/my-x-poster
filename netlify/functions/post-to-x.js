const { TwitterApi } = require('twitter-api-v2');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { text } = JSON.parse(event.body);
        if (!text) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Error: Text to post is missing." }),
            };
        }

        // --- NEW AND IMPROVED AUTHENTICATION ---
        // This creates a client that is specifically authenticated for a single user (you).
        const userClient = new TwitterApi({
            appKey: process.env.X_API_KEY,
            appSecret: process.env.X_API_SECRET,
            accessToken: process.env.X_ACCESS_TOKEN,
            accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
        });

        // Use the read-write client to post.
        const rwClient = userClient.readWrite;
        await rwClient.v2.tweet(text);
        
        // --- END OF NEW CODE ---

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Post was successful! Check your X account." }),
        };

    } catch (error) {
        console.error("ERROR LOG:", error);
        // Provide a more detailed error back to the user interface
        const errorMessage = error.data ? error.data.detail : error.message;
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Failed to post. X API Error: ${errorMessage}` }),
        };
    }
};
