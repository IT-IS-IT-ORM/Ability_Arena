// React
import { memo } from 'react';

// Hooks
import { useWebSocket } from 'ahooks';

// Scoped style
import classes from './style.module.scss';

export default memo(function LiarCard() {
	const { sendMessage, latestMessage } = useWebSocket('ws://127.0.0.1:3000');

	console.log('latestMessage: ', latestMessage);

	return <div className={classes.liarCard}></div>;
});
