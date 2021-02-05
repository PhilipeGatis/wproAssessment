import express, { Application } from 'express';
import expressLoader from '@provi/loaders/express';
import mongooseLoader from '@provi/loaders/mongoose';

export default async (): Promise<Application> => {
  await mongooseLoader();
  return expressLoader(express());
};
