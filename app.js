const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint to track email opens
app.get('/track/:emailId', async (req, res) => {
    const emailId = req.params.emailId;
    
    // Get the requester's IP address
    const ipAddress = req.ip;
    console.log(req.headers)
    console.log('Requester IP:', ipAddress);
    try {
         const response = await axios.get(`https://ipinfo.io/${parseIPv4FromIPv6(ipAddress )}/json`);
        const location = response.data; // "loc" contains latitude and longitude
      
        function parseIPv4FromIPv6(ipv6Address) {
             if (ipv6Address.startsWith("::ffff:")) {
                 return ipv6Address.replace("::ffff:", "");
            }
             return ipv6Address;
        }
        console.log('Location:', parseIPv4FromIPv6(ipAddress ));
         console.log(`Email opened: ${emailId}`);
        console.log('User Location:', location);

        const hashmap = {
            browser: req.headers['user-agent'],
        }
        console.log(hashmap)

         res.sendFile('pixel.jpeg', { root: __dirname });
    } catch (error) {
        console.error('Error fetching location:', error.message);
         res.sendFile('pixel.jpeg', { root: __dirname });
    }
});

// Start the server
const PORT = process.env.PORT || 9998;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
