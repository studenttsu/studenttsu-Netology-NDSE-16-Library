const { Container, decorate, injectable} = require('inversify');
require("reflect-metadata");

const container = new Container();

exports.injectableService = provider => {
    decorate(injectable(), provider);
    container.bind(provider).toSelf();
    return provider;
}

exports.container = container;