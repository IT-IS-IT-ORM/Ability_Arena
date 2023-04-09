// React
import { useEffect, useRef } from 'react';

// i18n
import { useTranslation } from 'react-i18next';

// Hooks
import { useMouse, useEventListener } from 'ahooks';

// Scoped style
import classes from './style.module.scss';

export default function HomePage() {
	const { t } = useTranslation();
	const pageRef = useRef<HTMLDivElement>(null);
	const { elementX, elementY, elementW, elementH } = useMouse(pageRef.current);

	// 桌面端 移动光源
	useEffect(() => {
		let [transformX, transformY] = [elementX, elementY];
		// 初始阶段
		if (!transformX && !transformY) {
			const { width, height } = pageRef.current!.getBoundingClientRect();

			transformX = width / 2;
			transformY = height / 2;
		}

		// 超出盒子范围
		if (transformX < 0) {
			transformX = 0;
		}
		if (transformX > elementW) {
			transformX = elementW;
		}
		if (transformY < 0) {
			transformY = 0;
		}
		if (transformY > elementH) {
			transformY = elementH;
		}

		pageRef.current!.style.setProperty('--transformX', `${transformX}px`);
		pageRef.current!.style.setProperty('--transformY', `${transformY}px`);
	}, [elementX, elementY]);

	// 移动端 移动光源
	useEventListener(
		'touchmove',
		e => {
			let touchData = e.targetTouches[0];

			pageRef.current!.style.setProperty(
				'--transformX',
				`${touchData.clientX}px`,
			);
			pageRef.current!.style.setProperty(
				'--transformY',
				`${touchData.clientY}px`,
			);
		},
		{
			target: pageRef,
		},
	);

	return (
		<main className={classes.homePage} ref={pageRef}>
			<div className="flashlight"></div>

			<div className="grid">
				{Array.from(Array(23)).map((_, idx) => (
					<div key={idx} className={`box-${idx + 1}`}></div>
				))}

				<h1 className="title">
					{t('HomePage__title')}: <code>playground</code>
				</h1>
			</div>
		</main>
	);
}
