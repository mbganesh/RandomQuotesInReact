import { AppBar, Button, CircularProgress, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Helpers from './Helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(to right ,#d7b3ff, #b3ccff)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    padding: '0.6%',
    width: '35%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection:'column',
    [theme.breakpoints.down('sm')]:{
      width: "80vw",
      padding: '2%',
      // height:'20vh',
    },
    [theme.breakpoints.between('sm','md')]:{
      width: "55vw",
      padding: '2%',
    },
  },
  bodyWithText: {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
  },
  bodyWOText: { display: 'flex', height: '150px', justifyContent: 'center', alignItems: 'center' },
  quoteStl: { color: Helpers.textColor, padding: '0.6%', fontWeight: 'bold', fontSize: '20px' },
  authorStl: { padding: '0.6%', fontSize: '18px' },
  bottonDiv: { display: 'flex', justifyContent: 'space-between', padding: '0.6%', backgroundColor: 'white',
  [theme.breakpoints.down('sm')]:{
   flexDirection:'column',
  },
},
  bottonStl: {
    color: 'white', fontWeight: 'bold', margin: '0.9%',
  },
}));

function App() {
  const classes = useStyles()
  const [myQuote, setMyQuote] = useState({ text: "", author: "" })
  const getQuote = () => {
    axios.get(Helpers.api).then(result => {
      var res = result.data
      console.log(res.length);
      let randomNum = Math.floor(Math.random() * res.length)
      console.log(randomNum);
      setMyQuote(res[randomNum])
      console.log(myQuote);
    })
  }
  useEffect(() => {
    getQuote()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar style={{backgroundColor:Helpers.textColor}} >
          <div style={{width:'100%'}} >
          <Typography style={{fontWeight:'bold', fontSize: '22px'  , textAlign:'center'}} >Random Quote</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Paper className={classes.body} elevation={12} >
        {
          myQuote.text !== "" ?
            <div className={classes.bodyWithText} >
              <Typography className={classes.quoteStl}> "{myQuote.text}" </Typography>
              <Typography className={classes.authorStl} > Author :  {myQuote.author} </Typography>
            </div> :
            <div className={classes.bodyWOText}>
              <CircularProgress style={{ color: Helpers.btnCol2 }} />
            </div>
        }

        <div className={classes.bottonDiv} >
          <Button className={classes.bottonStl} style={{ backgroundColor: Helpers.btnCol1 }} onClick={() => { getQuote() }} > Get New Quote </Button>

          <Button className={classes.bottonStl} style={{ backgroundColor: Helpers.btnCol2 }} onClick={() => { navigator.clipboard.writeText(myQuote.text) }} > Copy Quote </Button>
        </div>
      </Paper>


      <div style={{ display: 'flex', placeContent: 'center', position: 'fixed', bottom: 5, left: '0px', right: '0px' }}>
        <p> Developed By  <span onClick={() => { window.open("https://mbganesh.github.io/my_profile/") }} style={{ color: Helpers.textColor, fontWeight: 'bold', cursor: 'pointer' }}> @mbganesh </span> </p>
      </div>

    </div>
  );
}

export default App;
