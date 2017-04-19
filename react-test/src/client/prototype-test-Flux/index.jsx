import React from 'react';
import {render} from 'react-dom';
import MainPage from './components/MainPage';

class App extends React.Component {
    render() {
        return(
            <MainPage />
        )
    }
}

render(<App/>, document.getElementById('app'));
