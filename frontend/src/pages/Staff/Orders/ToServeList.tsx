import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import ItemCont from './../Orders/ItemTemplate';
import { ItemList} from '../../../api/models';
import { Client } from '../../../api/client';

const styles = () =>
    createStyles({
        table: {
            border: '2px solid darkgreen',
            height: '95%',
            position: 'static',
            float: 'left',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '10px',
            marginBottom: '10px',
            borderCollapse: 'collapse',
            flexGrow: 1,
            width: '100%',
            boxShadow: "2px 7px 12px 0 rgba(0, 0, 0, 0.4)",
        },
        headingToBeServed: {
            height: '50px',
            border: '2px solid green',
            background: 'radial-gradient(circle, rgba(250, 255, 161, 1) 0%, rgba(255, 254, 92, 1) 73%)',
        },
        boxToBeServed: {
            verticalAlign: 'top',
            flexGrow: 1,
            width: '100%',
            padding: '10px 5px 5px 10px',
            background: 'linear-gradient(0deg, rgba(255, 254, 218, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        },
        scroll: {
            height: '100%',
            display: 'block',
            overflow: 'auto',
            flexGrow: 1,
        },
        table2: {
            height: '100%',
            position: 'static',
            float: 'left',
            borderCollapse: 'collapse',
            flexGrow: 1,
            width: '100%',
        }
        
    });
export interface IProps extends WithStyles<typeof styles> {
    update: any;
 }
interface IState{
    itemList: ItemList | null
}

class ToServe extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props);
        this.state = {
            itemList: null,
        }

    }

    async componentDidMount() {
        const client = new Client();
        const m: ItemList | null = await client.getListItem(3);
        this.setState({
            itemList: m
        });
    }

    //Get items depending on name
    getHeading(){
        return (
            <thead>
                <tr className={this.props.classes.headingToBeServed}>
                    <th className={this.props.classes.headingToBeServed}>
                        To Be Served
                    </th>
                </tr>
            </thead>
        );
    }

    getBox(){
        if (this.state.itemList?.itemList !== null) {
            return (
                <td className={this.props.classes.boxToBeServed}>
                    {this.state.itemList?.itemList.map((item, index) => (
                        <ItemCont listName="Queue" itemName={item.itemName} amount={item.quantity}
                            table={item.item_id} key={index} time="sometime" itemId={index}
                            update={this.props.update} />
                    ))}
                </td>
            );
        } else {
            return (
                <td className={this.props.classes.boxToBeServed}>
                </td>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <table className={classes.table}>
                {this.getHeading()}
                <tbody>
                <tr >
                    <td className={classes.scroll}>
                    <table className={classes.table2}>
                        <tbody>
                            <tr>
                                {this.getBox()}     
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default withStyles(styles)(ToServe);