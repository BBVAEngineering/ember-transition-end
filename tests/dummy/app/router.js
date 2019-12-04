import EmberRouter from '@ember/routing/router';
import config from './config/environment';

<<<<<<< HEAD
const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
});
=======
export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
>>>>>>> 3732de2... message

Router.map(() => {
});
