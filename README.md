# Suntik

A minimal dependency injection for Node.Js that doesn't depend on anything else.

## Installation

```
npm install suntik
```

## Motivation

I have a hard time understanding dependency injection. You don't have to.

`suntik` is intended for learning purpose. It has less features compared to other dependency injection frameworks out there. But on the other hand, it is simple and almost un-opinionated. No high-level Javascript magic. Just classes and that's all. The core of `suntik` is even less than 100 lines of code (currently it is even less 50 lines).

## Alternative Projects

* [kata-ai/merapi](https://github.com/kata-ai/merapi)
* [inversify/InversifyJS](https://github.com/inversify/InversifyJS)

# Example

TLDR: Click [this](./example)

## The Container

Suppose you have 3 components, `warrior`, `weapon`, and `throwableWeapon`. The `warrior` should depend on `weapon` and `throwableWeapon`. A `warrior` has an `attack()` method.

Now you want your `warrior` to be a `Ninja` from `./ninja.js`, your `weapon` to be `Katana` from `./katana.js`, and your `throwableWeapon` to be `Shuriken` from `./shuriken.js`. This is what you should write:

```javascript
// file: index.js
const Container = require('suntik');

// set up the container
const container = new Container({
    basepath: __dirname, // this is the basepath to resolve you component files
    component: { // here are the components
        warrior: './ninja.js',
        weapon: './katana.js',
        throwableWeapon: './kunai.js',
    },
    main: 'warrior.attack' // this is the action when you cast container.main()
});

// cast warrior.attack
const warrior = container.initComponent('warrior');
warrior.attack();

// or just cast container.main()
container.main();
```

## The Components

### Ninja as warrior

```javascript
// file: ninja.js
class Ninja {
    attack() {
        this.weapon.slash();
        this.throwableWeapon.throw();
    }
}
Ninja._dependencies = ['weapon', 'throwableWeapon'];

module.exports = Ninja;
```

The `Ninja._dependencies` define that the container should inject `weapon` and `throwableWeapon` to the component. If you are using typescript, you can define `_dependencies` as static property.

__Note__ If you are aware, this approach is not so common, since both `merapi` and `inversify` use constructor's parameter as injection medium. The reason behind this decision is to emulate `lazy loading` and allow the developer to not write the `constructor`.

### Katana as weapon

```javascript
// file: katana.js
class Katana {
    slash() {
        console.log('katana slash')
    }
}

module.exports = Katana;
```

### Shuriken as throwableWeapon

```javascript
// file: shuriken.js
class Shuriken {
    throw() {
        console.log('shuriken thrown')
    }
}

module.exports = Shuriken;
```