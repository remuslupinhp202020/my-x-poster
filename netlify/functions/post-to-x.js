// This is a special function Netlify will run on its servers
exports.handler = async (event) => {
    // Get the text to post from the request
    const { text } = JSON.parse(event.body);

    // This is where we will add the X API logic later.
    // For now, it just pretends to work.
    console.log(`Received text to post: ${text}`);

    // Return a success message
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Post sent to backend successfully!" }),
    };
};
