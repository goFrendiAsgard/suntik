const path = require('path');
const process = require('process');

class Container{
    constructor(config = {}) {
        this.config = Object.assign({basepath: process.cwd(), component: {}}, config);
    }

    initComponent(componentName, ...args) {
        const {basepath, component} = this.config;
        const componentPath = component[componentName];
        // resolve component class
        let ComponentClass;
        try {
            ComponentClass = require(componentPath);
        } catch(error) {
            ComponentClass = require(path.resolve(basepath, componentPath));
        }
        // create component object
        const componentObj = new ComponentClass(...args);
        // read dependencies and inject them into component object
        const dependencies = '_dependencies' in ComponentClass ? ComponentClass._dependencies : [];
        for(const dependency of dependencies) {
            componentObj[dependency] = this.initComponent(dependency);
        }
        return componentObj;
    }

    main(...args) {
        if (!('main' in this.config)) {
            return undefined;
        }
        const actionPath = this.config.main;
        const actionParts = actionPath.split('.');
        const componentName = actionParts[0];
        const action = actionParts[1];
        const component = this.initComponent(componentName);
        return component[action](...args);
    }
}

module.exports = Container;