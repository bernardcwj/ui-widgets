import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import axios from 'axios';
import {GridListTile, GridList} from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import FilterList from 'material-ui-icons/FilterList'

const styles = {
  root: {
    padding: 24
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1075,
    height: 500,
    overflow: 'initial',
  },
};


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: ['All', 'Button', 'ProgressBar'],
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(w) {
        console.log(w);
        axios.get('/' + w.toLowerCase())
          .then((response) => {
            console.log(response);
            this.setState({data: response.data});
          })
          .catch((error) => {
            console.log(error);
            this.setState({data: []});
          });
    }

    componentDidMount() {
        console.log("componentDidMount()");
        axios.get('/all')
          .then((response) => {
            console.log(response);
            this.setState({data: response.data});
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {

        const { classes } = this.props;

        //.map(function callback(currentValue, index, array) {
        const listItems = this.state.widgets.map((widget, idx) =>
            <a className={idx == 0 ? "nav-link p-2 active" : "nav-link p-2"} data-toggle="pill" href="#" role="tab" aria-expanded="true" key={widget} onClick={this.handleClick.bind(this, widget)}>{widget}</a>
        );

        console.log(this.state.data);

        /*const gallery = this.state.data.map((widget, idx) =>
            <img src={widget.filepath} key={idx} alt="..." class="img-thumbnail"/>
        );*/

        return (
            /*<div className="row">
                <div className="nav flex-column nav-pills ml-5 mt-5" role="tablist">
                    <h6>Palette</h6>
                    {listItems}
                </div>
                <div className="flex-column">
                    {gallery}
                </div>
            </div>*/
            //<img src={tile.filepath} key={idx} style={styles.img}/>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12} >
                  <Grid container justify={'flex-end'}>
                    <Grid item>
                      <Button className={classes.btn} style={{ outline: 'none' }}>
                        <FilterList />
                        FILTER
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider light />
                  <div className={classes.gridRoot}>
                    <GridList
                      cols={5}
                      cellHeight={150}
                      spacing={0}
                      className={classes.gridList}
                      style={{ margin: 0 }}
                    >
                      {this.state.data.map((tile, idx) => (
                        <GridListTile key={idx} style={{'backgroundImage': 'url('+tile.filepath.replace(/\\/g, "\\\\")+')', 'backgroundSize': 'contain', 'backgroundPosition': 'center', 'backgroundRepeat': 'no-repeat',}} />
                      ))}
                    </GridList>
                  </div>
                </Grid>
              </Grid>
            </div>
        );
    }
}

//export default Palette;

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Palette);