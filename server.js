const express = require('express');
const path = require('path');

const app = express();
const port = 4000; // You can choose any port you like

// Expose the /assets folder so that it can serve new files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});