import AlbumPage from "../pages/Album/Album";
import AlbumDetailPage from "../pages/Album/AlbumDetail";
import UserPage from "../pages/User/User";
import { userRoute, albumRoute, albumDetailRoute } from "./routes.contants";

export const publicProtectedFlattenRoutes = [
    {
        path: userRoute, element: <UserPage />
    },
    {
        path: albumRoute, element: <AlbumPage />
    },
    {
        path: albumDetailRoute, element: <AlbumDetailPage />
    }
]
