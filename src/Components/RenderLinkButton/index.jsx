import React, { Component } from './node_modules/react'
import PropTypes from './node_modules/prop-types'
import './index.less'

export default class LinkButton extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired
    }

    render() {
        return (
            <button className='link-button' {...this.props}></button>
        )
    }
}
