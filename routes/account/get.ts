import express from 'express';
const router = express.Router();

// Types
import type GlobalObject from 'types/GlobalObject';

const routerInvoker = (global: GlobalObject) => {
  // TODO: Implement the route here

  return router;
};

export default routerInvoker;
