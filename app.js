const express = require('express');
const app = express();

// Endpoint to track email opens
app.get('/track/:emailId', (req, res) => {
    const emailId = req.params.emailId;
    // Log the email open event, along with any additional information you want to track
    console.log(`Email opened: ${emailId}`);
    
    // Return a transparent pixel image
    res.sendFile('pixel.jpeg', { root: __dirname });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
