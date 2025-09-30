document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('postButton');
    const postContent = document.getElementById('postContent');

    postButton.addEventListener('click', async () => {
        const textToPost = postContent.value;

        // Don't do anything if the text box is empty
        if (!textToPost) {
            alert("Please enter some text to post.");
            return;
        }

        // The path to our backend function
        const endpoint = '/.netlify/functions/post-to-x';

        try {
            // Send the text to our backend
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textToPost }),
            });

            // Get the success message from the backend
            const result = await response.json();

            // Show the result to the user
            alert(result.message);
            postContent.value = ''; // Clear the text box after posting

        } catch (error) {
            // Show an error if something went wrong
            console.error('Error:', error);
            alert('An error occurred. Could not post.');
        }
    });
});