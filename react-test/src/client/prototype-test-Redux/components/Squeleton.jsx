import React from 'react';
import { titleStyle } from '../constants/css-styles/main';
import { browserHistory, IndexLink } from 'react-router';
import FeedForm from '../containers/FeedForm';
import { connect } from 'react-redux';

const buttonStyle = {
  marginLeft: '35px',
};

const FeedFormStyle = {
  marginTop: '30px',
};

const Squeleton = ({ children, ownProps }) => {
  return (
    <div>
      <header>
        <p style={titleStyle}>This is a React.js + Redux test !</p>
          <div style={buttonStyle}>
            <button
              type="button"
              className="btn btn-sm btn-default"
              onClick={() => browserHistory.push('/')}
            >
              <span className="glyphicon glyphicon-chevron-left"></span>&nbsp;
              Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-default"
              onClick={() => browserHistory.push('/instant')}
            >
              <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
              Next
            </button>
          </div>
      </header>
      <main style={FeedFormStyle}>
        <FeedForm location={ownProps.location.pathname} />
        <div style={{ marginTop: '1.5em' }}>
          {children}
        </div>
      </main>
      <footer>
        <div>
          <IndexLink to="/address" activeClassName={{ color: '#53acff' }}>Address</IndexLink>
          {' '}
          <IndexLink to="/about" activeClassName={{ color: '#53acff' }}>About</IndexLink>
        </div>
      </footer>
    </div>
  );
};

Squeleton.propTypes = {
  children: React.PropTypes.object.isRequired,
  ownProps: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ownProps,
  };
};

export default connect(
  mapStateToProps
)(Squeleton);
