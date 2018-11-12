import React from "react";
import PropTypes from "prop-types";

class Contest extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.id);
    };
    render() {
        return (
            <div className="Contest" >
                <div className="contest-description">
                    {this.props.description}
                </div>
                <div className="home-link link"
                     onClick={this.props.contestListClick}>
                    Contest Link
                </div>
            </div>
        );
    }
}

Contest.propTypes = {
    description: PropTypes.string.isRequired,
    contestListClick: PropTypes.func.isRequired
};

export default Contest;