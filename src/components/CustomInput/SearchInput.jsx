import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { Search } from "material-ui-icons";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

class SearchInput extends React.Component {
  state = {
    search: '',
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  
  handleSearch = () => {
    this.props.handleSearch(this.state.search)
  }

  render() {
    const { classes } = this.props;

    return (
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="search">Search</InputLabel>
          <Input
            id="search"
            type='text'
            value={this.state.password}
            onChange={this.handleChange('search')}
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  color="primary"
                  onClick={this.handleSearch}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
    );
  }
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInput);