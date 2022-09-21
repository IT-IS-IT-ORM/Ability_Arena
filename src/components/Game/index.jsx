import { useState } from 'react';

import { getRandomContent } from '../../utils';

import { SiAcclaim } from 'react-icons/si';
import { TiArrowBack } from 'react-icons/ti';
import { ImShuffle } from 'react-icons/im';

import Card from './Card';
import Slot from './Slot';
import ActionBtn from './ActionBtn';
import {
	GameStyled,
	CardContainer,
	DrawnCards,
	SlotContainer,
	Toolbar,
} from './styled';

// 初始化卡槽信息
const initSlots = [];
for (let i = 1; i <= 7; i++) {
	initSlots.push({
		id: i,
		isEmpty: true,
		card: null,
	});
}

export default function Game() {
	const [title, setTitle] = useState('First Round');
	const [slots, setSlots] = useState(initSlots);

	return (
		<GameStyled>
			{/* 关卡信息 */}
			<p className="title">{title}</p>

			{/* 所有卡牌 */}
			<CardContainer>
				<Card />
			</CardContainer>

			{/* 抽出的卡牌 */}
			<DrawnCards></DrawnCards>

			{/* 卡槽 */}
			<SlotContainer slots={slots}>
				{slots.map(slot => (
					<Slot key={slot.id} />
				))}
			</SlotContainer>

			{/* 道具栏 */}
			<Toolbar>
				{/* 移出 */}
				<ActionBtn icon={<SiAcclaim />} />
				{/* 撤回 */}
				<ActionBtn icon={<TiArrowBack />} />
				{/* 打乱 */}
				<ActionBtn icon={<ImShuffle />} />
			</Toolbar>
		</GameStyled>
	);
}
