import * as React from 'react'
// import styles from './style.scss'
// import './style'
import "./index.scss";


interface Props { }

export default class About extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            txtInfo: ''
        }
    }
    componentWillMount() {
        this.setState({
            txtInfo: "zhangsan"
        })
    }
    componentDidMount() {
        this.getInfo()
    }
    render() {
        return (
            <section>
                <p className="title">About Page</p>
                <p className="txt-info">{this.state.txtInfo}</p>
            </section>
        )
    }
    getInfo() {
        fetch('http://127.0.0.1:3000/getInfo/', {
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain; application/json; charset=utf8'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            this.setState({
                txtInfo: data.name
            })
        })
    }
}
