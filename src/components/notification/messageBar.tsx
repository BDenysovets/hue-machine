import { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface MessageProps {
    type: 'success' | 'error'
    message?: string
}

interface MessageState extends MessageProps {
    open: boolean
}

const initialState: MessageState = {
    open: false,
    type: 'success',
    message: ''
}

export class MessageBar extends Component<MessageProps> {
    state = initialState

    constructor(props: MessageProps) {
        super(props)
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    }
    
    handleCloseSnackbar = () => {
        this.setState({open: false})
    }

    componentDidUpdate() {
        if (this.props.message !== this.state.message || this.props.type !== this.state.type) {
            this.setState({
                open: true,
                type: this.props.type,
                message: this.props.message
            })
        }
    }

    render() {
        return (
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
            <Alert onClose={this.handleCloseSnackbar} severity={this.state.type}>
            {this.state.message}
            </Alert>
        </Snackbar>
    )}
}