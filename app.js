const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const listen = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Service API is ready to use on port ${PORT}`);
  });
};
 
exports.app = app;
exports.listen = listen;