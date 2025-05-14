import AlbumPage from "../pages/Album/Album";
import AlbumDetailPage from "../pages/Album/AlbumDetail";
import UserPage from "../pages/User/User";
import UserDetailPage from "../pages/User/UserDetail";
import { userRoute, albumRoute, albumDetailRoute, userDetailRoute } from "./routes.contants";

export const publicProtectedFlattenRoutes = [
    {
        path: userRoute, element: <UserPage />
    },
    {
        path: albumRoute, element: <AlbumPage />
    },
    {
        path: albumDetailRoute, element: <AlbumDetailPage />
    },
    {
        path: userDetailRoute, element: <UserDetailPage />
    }
]
