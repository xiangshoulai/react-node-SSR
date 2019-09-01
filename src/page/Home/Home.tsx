
import * as React from "react"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { homeSuccess } from "@/store/Home/action"

interface HomeProps {
    updateDate: (homeModel: any) => {};
    initStatus: "start" | "success" | "fail" | "done" | "end";
}
interface HomeState {
    datas: any
}

class Home extends React.Component<HomeProps, HomeState>{
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            datas: {
                name: "xiangshoulai",
                content: "hello,everyone"
            }
        }
    }
    componentWillMount() {
        const { updateDate } = this.props;
        updateDate({
            datas: {
                name: "i am update"
            }
        })
    }
    render() {
        const { datas } = this.state;
        return (
            <div>
                <div>{datas.name}</div>
                <div>{datas.content}</div>

            </div>
        )
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return { ...state }
}

const mapDispatchProps = (dispatch: any) => {
    return {
        updateDate: (datas: any) => {
            dispatch(homeSuccess(datas))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Home));