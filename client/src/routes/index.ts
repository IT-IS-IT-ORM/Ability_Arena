// 公共路由
import commonRoutes from './common-routes';
// 游戏路由
import gameRoutes from './game-routes';
// 其他路由
import otherRoutes from './other-routes';

export default [...commonRoutes, ...gameRoutes, ...otherRoutes];
