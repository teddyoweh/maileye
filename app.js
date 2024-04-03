const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint to track email opens
app.get('/track/:emailId', async (req, res) => {
    const emailId = req.params.emailId;
    
    // Get the requester's IP address
    const ipAddress = req.ip;

    try {
        // Make a request to ipinfo.io API to get location information
        const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
        const location = response.data.loc; // "loc" contains latitude and longitude

        // Log the email open event along with location details
        console.log(`Email opened: ${emailId}`);
        console.log('User Location:', location);

        // Return a transparent pixel image
        res.sendFile('pixel.png', { root: __dirname });
    } catch (error) {
        console.error('Error fetching location:', error.message);
        // Return a transparent pixel image even if location fetching fails
        res.sendFile('pixel.png', { root: __dirname });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
