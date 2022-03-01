const express = require('express');
const express_hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const produtoRoute = require('./routes/produto');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use(express.static('public'));

// Template Engine
const handlebars = express_hbs.create({ extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// Routes
app.use('/', produtoRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
