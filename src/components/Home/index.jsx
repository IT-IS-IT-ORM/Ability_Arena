import { sleep } from '../../utils';

import { HomeStyled } from './styled';

export default function Home({ setBox }) {
	return (
		<HomeStyled>
			<h1 className="title">Three consecutive</h1>

			<button
				className="start-btn"
				onClick={async () => {
					await sleep(360);
					setBox('GAME');
				}}>
				Start
			</button>
		</HomeStyled>
	);
}
