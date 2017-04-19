
import React from 'react';

const refreshDivStyle = {
  marginTop: '50px',
};

const refreshBtnStyle = {
  float: 'right',
};

const formFeedDataStyle = {
  marginLeft: '35px',
};

const defaultInput = 1;
let input;

const GetFeedForm = ({ onGetDataClick, onRefreshDatapoints, location }) => {
  console.log('location in GetFeedForm: ', location);
  let refreshBtn = '';
  if (location === '/') {
    refreshBtn =
      (<button
        onClick={(e) => onRefreshDatapoints(e, input.value)}
        className="btn btn-default btn-sm"
        style={refreshBtnStyle}
      >
        Refresh Datapoints
      </button>);
  }
  return (
    <div>
      <div style={formFeedDataStyle} >
        <input
          type="number"
          ref={node => {
            input = node;
          }}
          defaultValue={defaultInput}
        />
        <button
          onClick={(e) => onGetDataClick(e, input.value, location)}
          className="btn btn-default btn-sm"
        >
          Get data
        </button>
      </div>
      <div style={refreshDivStyle}>
        {refreshBtn}
      </div>
    </div>
  );
};

GetFeedForm.propTypes = {
  location: React.PropTypes.string.isRequired,
  onGetDataClick: React.PropTypes.func.isRequired,
  onRefreshDatapoints: React.PropTypes.func.isRequired,
};

export default GetFeedForm;
