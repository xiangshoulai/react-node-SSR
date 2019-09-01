
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {

}
class Hello extends React.PureComponent<Props, any>{
    constructor(props: Props) {
        super(props)
    }
    componentWillMount() {
        console.log("I am componentWillMount");
    }

    render() {
        return (
            <div onClick={() => {
                console.log("hellow")
            }}>
                <h3>hello</h3>
                <Link to="/home" key="1">
                    <div>去首页</div>
                </Link>
                <Link to="/about" key="2">
                    <div><h3>关于我们</h3></div>
                </Link>
            </div>
        )
    }
}

export default Hello;