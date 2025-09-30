document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('postButton');
    const postContent = document.getElementById('postContent');
    const charCounter = document.getElementById('charCounter'); // Get the new counter element

    const MAX_CHARS = 280; // Set the character limit

    // Listen for any typing in the text area
    postContent.addEventListener('input', () => {
        const currentLength = postContent.value.length;

        // Update the counter text
        charCounter.textContent = `${currentLength} / ${MAX_CHARS}`;

        // Check if the character count is over the limit
        if (currentLength > MAX_CHARS) {
            charCounter.style.color = 'red'; // Change counter color to red
            postButton.disabled = true;      // Disable the post button
        } else {
            charCounter.style.color = '#555'; // Revert color to normal
            postButton.disabled = false;     // Re-enable the post button
        }
    });

    // The existing logic to post the content
    postButton.addEventListener('click', async () => {
        const textToPost = postContent.value;
        const currentLength = textToPost.length;

        if (!textToPost) {
            alert("Please enter some text to post.");
            return;
        }

        // A final check in case something goes wrong
        if (currentLength > MAX_CHARS) {
            alert("Character count is too high. Please shorten your post.");
            return;
        }

        const endpoint = '/.netlify/functions/post-to-x';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToPost }),
            });

            const result = await response.json();
            alert(result.message);
            
            // If the post was successful, clear the text box and reset the counter
            if (response.ok) {
                postContent.value = '';
                charCounter.textContent = `0 / ${MAX_CHARS}`;
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Could not post.');
        }
    });
});
