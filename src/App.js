import React, {Component} from 'react';
import Cards from './components/Cards';
import Card from './components/CardSwitcher'
import waiterData from './waiterData';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-title">Rota</h1>
                <div>
                    <Cards className='master-root'>
                        {waiterData.map((item, key) =>
                            <Card key={key}>
                                <img src={item.pictureUrl} alt='Pic' className = 'card-img'></img>
                                <h2>{item.name}</h2>
                            </Card>
                        )}
                    </Cards>
                </div>
            </div>
        );
    }
}

export default App;
