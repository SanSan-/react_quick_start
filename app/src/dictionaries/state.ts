import { Route } from '~types/dictionary';
import Layout from '~components/forms/Layout';
import Roster from '~components/forms/Roster';

export const routes = [
  new Route('/', Layout),
  new Route('/roster', Roster),
  new Route('/schedule', Layout)
];
