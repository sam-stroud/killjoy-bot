const { Admin } = require('./models.js');
const { owner } = require('./config.json');

(async () => {
    const test = new Admin(owner);
    await test.insert();
})();

