import Layout from '~components/Layout';
import { Route } from '~types/dictionary';

export const routes = [
  new Route('/', Layout),
  new Route('/roster', Layout),
  new Route('/schedule', Layout)
];
