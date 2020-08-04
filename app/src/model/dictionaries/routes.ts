import Route from '~types/classes/Route';
import Layout from '~forms/Layout';
import Roster from '~forms/Roster';

const routes = [
  new Route('/', Layout),
  new Route('/roster', Roster),
  new Route('/schedule', Layout)
];

export default routes;
