import { Container, decorate, injectable } from "inversify";
import 'reflect-metadata';

export const container = new Container();

export const injectableService = (provider: any) => {
    decorate(injectable(), provider);
    container.bind(provider).toSelf();
    return provider;
}