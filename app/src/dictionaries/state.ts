import Layout from '~components/forms/Layout';
import { Route } from '~types/dictionary';

export const routes = [
  new Route('/', Layout),
  new Route('/roster', Roster),
  new Route('/schedule', Layout)
];
