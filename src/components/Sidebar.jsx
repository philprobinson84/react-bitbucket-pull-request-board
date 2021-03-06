import React, { Component } from 'react'
import { Box, Collapsible } from 'grommet'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'


export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.setOpen = this.setOpen.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            isOpen: true
        }
    }

    setOpen(state) {
        this.setState({
            isOpen: state
        });
    }

    onClick(event) {
        this.setOpen(!this.state.isOpen);
    }

    render() {
        const iconSize = '2.5em'
        const openIcon = <AiOutlineMenuFold size={iconSize} />;
        const closedIcon = <AiOutlineMenuUnfold size={iconSize} />;

        return (
            <Box
                direction='row'
                flex='shrink'
                elevation='small'
            >
                <Collapsible
                    direction='horizontal'
                    open={this.state.isOpen}
                >
                    <Box
                        flex='grow'
                    >
                        {this.props.children}
                    </Box>
                </Collapsible>
                <Box
                    onClick={this.onClick}
                    hoverIndicator={!this.state.isOpen}
                    flex='grow'
                    justify='around'
                >
                    {this.state.isOpen ? openIcon : closedIcon}
                </Box>
            </Box>
        );
    }
}
