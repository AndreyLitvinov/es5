import AuthorizationRoute from './authorizationRoute';
import AuthorizationComponent from './authorizationComponent';

// права на переходы
const UserRoute = AuthorizationRoute(['User', 'Librarian', 'Admin']);
const LibrarianRoute = AuthorizationRoute(['Librarian', 'Admin']);
const AdminRoute = AuthorizationRoute(['Admin']);

// права на компонеты
const UserComponent = AuthorizationComponent(['User', 'Librarian', 'Admin'])
const LibrarianComponent = AuthorizationComponent(['Librarian', 'Admin'])
const AdminComponent = AuthorizationComponent(['Admin'])
export { UserRoute, LibrarianRoute, AdminRoute,
    UserComponent, LibrarianComponent, AdminComponent }