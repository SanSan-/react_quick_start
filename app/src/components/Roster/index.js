import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, message } from 'antd';

const Search = Input.Search;

class Roster extends PureComponent {
  constructor (props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (value) => {
    if (!value || value === null || value.length === 0) {
      message.warning('Search field is empty!');
    }
  };

  render () {
    return <div id='simple_layout'>
      <Search id={'roster-search'}
        placeholder={'Find some rosters by name or other things'}
        onSearch={this.handleSearch}
        style={{ width: 500 }}/>
    </div>;
  }
}

Roster.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  something: PropTypes.object
};

export default connect()(Roster);
