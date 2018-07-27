const Container = require('../index.js');

// set up the container
const container = new Container({
    basepath: __dirname,
    component: {
        warrior: './ninja.js',
        weapon: './katana.js',
        throwableWeapon: './kunai.js',
    },
    main: 'warrior.attack'
});

// call the main action
container.main();

// or just init the component and do whatever we like
const warrior = container.initComponent('warrior');
warrior.introduce();
