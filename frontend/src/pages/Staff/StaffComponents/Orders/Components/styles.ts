import { createStyles, Theme} from "@material-ui/core";

export const styles = (theme: Theme) =>
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
    headingQueue: {
      height: '50px',
      border: '2px solid green',
      background: 'radial-gradient(circle, rgba(161, 237, 255, 1) 0%, rgba(126, 141, 255, 1) 73%)',
    },
    boxQueue: {
      verticalAlign: 'top',
      flexGrow: 1,
      width: '100%',
      padding: '10px 5px 5px 10px',
      background: 'linear-gradient(0deg, rgba(177, 194, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
    },
    headingServed: {
      height: '50px',
      border: '2px solid green',
      background: 'radial-gradient(circle, rgba(148, 233, 152, 1) 0%, rgba(56, 171, 87, 1) 73%)',
    },
    boxServed: {
      verticalAlign: 'top',
      flexGrow: 1,
      width: '100%',
      padding: '10px 5px 5px 10px',
      background: 'linear-gradient(0deg, rgba(160, 235, 176, 1) 0%, rgba(255, 255, 255, 1) 100%)',
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
    },
    itemContainer: {
      border: '1px solid grey',
      position: 'static',
      borderRadius: '10px',
      width: '94%',
      flexGrow: 1,
      marginLeft: '3%',
      marginRight: '3%',
      height: 'auto',
      marginTop: '10px',
      overflow: 'hidden',
      padding: '4px 0px 4px 0px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(200, 231, 250, 1) 100%)',
      boxShadow: "0px 6px 8px 0 rgba(0, 0, 0, 0.2)",
    },
    currContainer: {
      border: '2px solid grey',
      position: 'static',
      borderRadius: '10px',
      width: '94%',
      flexGrow: 1,
      marginLeft: '3%',
      marginRight: '3%',
      height: 'auto',
      marginTop: '10px',
      overflow: 'hidden',
      padding: '4px 0px 4px 0px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(200, 231, 250, 1) 100%)',
      boxShadow: "0px 6px 8px 0 rgba(0, 0, 0, 0.2)",
    }

  });