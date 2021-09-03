const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Pint", {
    useUnifiedTopology: true,
  })

  .then((db) => console.log(`DB is conected`))
  .catch((err) => console.error(err));
