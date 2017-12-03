import React, {Component, cloneElement} from 'react'
import ReactDOM from 'react-dom'
import waiterData from '../waiterData.js'

class SwipeCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liked: [],
            disliked: [],
            index: 0,
            alertLeft: false,
            alertRight: false,
            containerSize: {x: 0, y: 0}
        }
        this.removeCard = this.removeCard.bind(this);
        this.setSize = this.setSize.bind(this)
    }

    removeCard(side, name) {

        const {children} = this.props;

        setTimeout(() => this.setState({[`alert${side}`]: false}), 300);


        if (side === 'Right') {
            this.state.liked.push(name)
        }
        else {
            this.state.disliked.push(name)
        }

        console.log(" this.state.liked.join(', '): ", this.state.liked.join(', '));

        if (children.length === (this.state.index + 1)) {
            const likedNamesString = this.state.liked.join(', ');
            const alertMsg = 'You have liked ' + likedNamesString
            alert(alertMsg);
        }

        this.setState({
            index: this.state.index + 1,
            [`alert${side}`]: true
        })
    }

    componentDidMount() {
        this.setSize()
        window.addEventListener('resize', this.setSize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSize)
    }

    setSize() {
        const container = ReactDOM.findDOMNode(this);
        const containerSize = {
            x: container.offsetWidth,
            y: container.offsetHeight
        }
        this.setState({containerSize})
    }

    render() {
        const {index, containerSize} = this.state;
        const {children, className} = this.props;

        if (!containerSize.x || !containerSize.y) return <div className={className}/>
        
        const _cards = children.reduce((memo, c, i) => {
            const name = waiterData[i].name;

            if (index > i) return memo;

            const props = {
                key: i,
                containerSize,
                index: children.length - index,
                onSwipeLeft : () => this.removeCard('Left', name),
                onSwipeRight : () => this.removeCard('Right', name),
                active: index === i
            };

            return [cloneElement(c, props), ...memo]
        }, []);

        return (
            <div className={className}>
                <div key='Right' className={`${this.state['alertRight'] ? 'alert-visible': ''} alert-right alert`}>
                    Like!
                </div>

                <div key='Left' className={`${this.state[`alertLeft`] ? 'alert-visible': ''} alert-left alert`}>
                    Dislike!
                </div>

                <div id='cards'>
                    {_cards}
                </div>
            </div>
        )
    }
}

export default SwipeCards