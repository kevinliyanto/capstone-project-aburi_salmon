import React from 'react';
import { withStyles, TextField, WithStyles, createStyles, Modal, Grid, FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';

import history from '../../history';
import { LeftBox, RightBar } from '../../components';

import { styles } from './styles';
import { Client } from '../../api/client';
import { Menu as MenuModel, Item as ItemModel } from '../../api/models';

interface IProps extends WithStyles<typeof styles> { }

interface OrderItemState {
  id: number;
  quantity: number;
}

interface OrderState {
  items: Array<OrderItemState>;
}

interface IState {
  menu: MenuModel | null;
  value: string;
  openModal: boolean;

  // For modal inside this component
  modal: ItemModel | null;
  modalQuantity: number;

  // For list of items that user wants to order
  orders: Array<OrderItemState>;
}

class MenuPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // If menu is null, then nothing will be generated
      menu: null,
      // Even if initial value is an empty string, componentDidMount will fill in according to the first item on cats array
      value: "",
      openModal: false,
      modal: null,
      modalQuantity: 0,
      orders: new Array<OrderItemState>(),
    }
    // To bind the tab change
    this.handleTabChange = this.handleTabChange.bind(this);

    // To bind with modal change
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.openModal = this.openModal.bind(this);

    // To bind with quantity
  }

  generateItemsInCategory(items: Array<ItemModel>, categoryName: string) {
    const { classes } = this.props;
    return (
      <div hidden={this.state.value !== categoryName} id={`tabpanel-${categoryName}`} key={categoryName} aria-labelledby={`tab-${categoryName}`}>
        {
          items.map(item => (
            <Card className={classes.itemcard} key={item.id}>
              <CardContent>
                <Typography variant="h5">
                  {item.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => this.openModal(item)}>Add item</Button>
              </CardActions>
            </Card>
          ))
        }
      </div>
    )
  }

  goToTable() {
    history.push('/table');
  }

  handleTabChange(event: React.ChangeEvent<{}>, newValue: string) {
    this.setState({
      value: newValue,
    });
  }

  openModal(item: ItemModel) {
    this.setState({
      openModal: true,

      // Note: always pass in the whole ModalState object when setting new state on open modal. It will break if you're not passing the whole object
      // Read https://stackoverflow.com/questions/49348996/react-change-a-json-object-in-setstate
      modal: item,

      // Set quantity to 0 for new item. Might need to change this if entry exists
      modalQuantity: 0,
    });
  }

  removeModalQuantity() {
    this.setState(prevState => {
      let pq = prevState.modalQuantity;
      if (pq <= 1) pq = 0;
      else pq--;
      return {
        modalQuantity: pq,
      }
    });
  }

  addModalQuantity() {
    this.setState({
      modalQuantity: this.state.modalQuantity + 1
    })
  }

  handleCloseModal(event: React.ChangeEvent<{}>) {
    this.setState({
      openModal: false,
    })
  }

  tabProps(index: string) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
      value: `${index}`,
    };
  }

  // Component did mount gets called before render
  async componentDidMount() {
    const client = new Client();
    const m: MenuModel | null = await client.getMenu();
    this.setState({
      menu: m,
      value: m?.menu[0].name ? m?.menu[0].name : "",
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.menupage}>
        <LeftBox
          first={
            <div className={classes.title}>
              Select item
            </div>
          }
          second={
            <div>
              <AppBar position="static">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleTabChange}
                >
                  {
                    this.state.menu?.menu.map(category => (
                      <Tab label={category.name} key={category.name} {...this.tabProps(category.name)} />
                    ))
                  }
                </Tabs>
              </AppBar>
              {
                this.state.menu?.menu.map(category => this.generateItemsInCategory(category.items, category.name))
              }
              <Modal
                aria-labelledby=""
                aria-describedby=""
                open={this.state.openModal}
                onClose={this.handleCloseModal}
                className={classes.itemmodal}
              >
                <div className={classes.divmodal}>
                  <Grid container spacing={2}>
                    {/* First col */}
                    <Grid item xs={11}>
                      <Typography variant="h4">{this.state.modal?.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Ingredients</Typography>
                    </Grid>

                    {/* Second col */}
                    <Grid item xs={11}>
                      insert image here
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl>
                        <FormGroup>
                          {
                            this.state.modal?.ingredients.map(ingredient => (<FormControlLabel
                              control={<Checkbox checked={true} />}
                              disabled
                              label={ingredient}
                            />))
                          }
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    {/* Third col */}
                    <Grid item xs={11}>
                      <Typography variant="subtitle1">{this.state.modal?.description}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">$ {this.state.modal?.price.toString()}</Typography>
                      <Typography variant="subtitle1">Quantity</Typography>
                      <IconButton aria-label="remove" disabled={this.state.modalQuantity <= 0} onClick={() => this.removeModalQuantity()}>
                        <Icon>remove_circle</Icon>
                      </IconButton>
                      {this.state.modalQuantity}
                      <IconButton aria-label="add" onClick={() => this.addModalQuantity()}>
                        <Icon>add_circle</Icon>
                      </IconButton>
                    </Grid>

                    {/* Last col */}
                      <Grid item xs={9}>
                        {/* nothing here */}
                      </Grid>
                      <Grid item xs={6}>
                        <Button onClick={this.handleCloseModal}>Cancel</Button>
                        <Button disabled={this.state.modalQuantity < 1}>Add to Order</Button>
                      </Grid>
                    </Grid>
                </div>
              </Modal>
            </div>
          }
        />

        <RightBar
                first={
                  <div>
                    <Button className={classes.assistancebutton} variant="contained" color="primary">Help</Button>
                    <Button className={classes.gobackbutton} variant="contained" color="secondary" onClick={() => this.goToTable()}>Go back</Button>
                  </div>
                }
                second={
                  <div></div>
                }
                third={
                  <div></div>
                }
              />
            </div >
    );
  }
}

export const Menu = withStyles(styles)(MenuPage);
