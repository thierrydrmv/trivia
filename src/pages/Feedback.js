import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const minAssertions = 3;
    const feedbackText = assertions < minAssertions ? 'Could be better...' : 'Well Done!';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ feedbackText }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
