import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const MultiSelectFilter = React.createClass({
  displayName: 'MultiSelectFilter',
  propTypes: {
    label: React.PropTypes.string,
  },
  getInitialState() {
    return {
      options: this.props.groups,
      value: [],
    };
  },
  handleSelectChange(value) {
    if (this.props.onUpdate) {
      this.props.onUpdate({ value });
    }
    this.setState({ value });
  },
  render() {
    return (
      <div className="section">
        <Select multi simpleValue value={this.state.value} placeholder="Select groups" options={this.state.options} onChange={this.handleSelectChange} />
      </div>
    );
  },
});

export default MultiSelectFilter;
