// React
import { useEffect, useRef } from 'react';

// Hooks
import { useMouse } from 'ahooks';

// 样式组件
import { HomePageStyled } from './style';

export default function HomePage() {
	const pageRef = useRef<HTMLDivElement>(null);
	const { elementX, elementY, elementW, elementH } = useMouse(pageRef.current);

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

	return (
		<HomePageStyled ref={pageRef}>
			<div className="flashlight"></div>

			<div className="grid">
				{Array.from(Array(23)).map((_, idx) => (
					<div key={idx} className={`box-${idx + 1}`}></div>
				))}

				<h1 className="title">
					开源项目: <code>playground</code>
				</h1>
			</div>
		</HomePageStyled>
	);
}
