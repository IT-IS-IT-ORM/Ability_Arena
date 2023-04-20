// React & Router
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Hooks
import { useMouse, useUpdateEffect } from 'ahooks';

// 内置组件
import Sider from './Sider';
import PageContent from './PageContent';

// Routes
import gameRoutes from '@/routes/game-routes';

// Scoped style
import classes from './style.module.scss';

export default function LayoutTemplate() {
	const location = useLocation();

	const inGame = useMemo(
		() => gameRoutes.some(({ path }) => location.pathname === path),
		[location],
	);

	const boxRef = useRef<HTMLDivElement>(null);
	const { pageX, pageY } = useMouse(boxRef);

	useUpdateEffect(() => {
		const $box = boxRef.current as HTMLDivElement;

		// const xTranslate = pageX;
		// const yTranslate = pageY;

		// $box.style.cssText = `
		// transform: translate3d(${xTranslate}px, ${yTranslate}px, 0);
		// `;
	}, [pageX, pageY]);

	return (
		<div className={classes.layout}>
			<div ref={boxRef} className="box">
				{!inGame && <Sider />}
				<PageContent />
			</div>
		</div>
	);
}
