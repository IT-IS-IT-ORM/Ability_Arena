import { useState } from 'react';

import { getScreenHeight } from './utils';

import { ThemeProvider } from 'styled-components';
import { Home, Game } from './components';
import { theme, GlobalStyle, AppStyled } from './style';

function App() {
	const [box, setBox] = useState('HOME');

	return (
		<ThemeProvider theme={theme}>
			<AppStyled height={getScreenHeight()}>
				<GlobalStyle />
				{box === 'HOME' && <Home setBox={setBox} />}
				{box === 'GAME' && <Game setBox={setBox} />}
			</AppStyled>
		</ThemeProvider>
	);
}

export default App;
