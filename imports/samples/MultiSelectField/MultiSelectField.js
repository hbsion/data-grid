import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const Groups = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const MultiSelectField = React.createClass({
  displayName: 'MultiSelectField',
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
        <h3 className="section-heading">{this.props.label}</h3>
        <Select multi simpleValue value={this.state.value} placeholder="Select groups" options={this.state.options} onChange={this.handleSelectChange} />
      </div>
    );
  },
});

export default MultiSelectField;
