import React, { Component } from 'react';
import '../../stylessheet/dashboard.css'

class Dashboard extends Component {
    constructor(props){
        super(props)
        //initialize methods
        
        //define states
        this.state={
            angle:-90,
            display:0
        }

    }

    componentDidMount(){
        let increment = 180/(this.props.range[1]-this.props.range[0])
        let total = (this.props.nominal-this.props.range[0]) * increment
        this.setState({
            angle:this.state.angle+total,
            display:total
        })        
    }

    render(){
        return(
            <div className='dashboard-container'>
                <div className = 'dashboard'>
                    <div className ='shaft'></div>
                    <div className ='pin'style={{transform:`rotate(${this.state.angle}deg)`}}></div>
                    <div className='title'>{this.props.nominal}{this.props.unit}</div>
                    <div className='range1'>
                        {this.props.range[0]}{this.props.unit}
                    </div>
                    <div className='range1p5'>
                    </div>
                    <div className='range2'>
                        {this.props.range[1]}{this.props.unit}
                    </div>
                <div className = 'dashtext'>
                    <p>{this.props.title}</p>
                </div>
                </div>
            </div>
        )
    }
}

export default Dashboard