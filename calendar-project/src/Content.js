import React, { Component } from 'react';

class Content extends Component {
    render() {
        return (
            <div>
                {this.props.title}
                {this.props.desc}
            </div>
        );
    }
}

export default Content;