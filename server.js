const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {

});


app.listen(PORT, () => console.log(`server started on port ${PORT}`));
