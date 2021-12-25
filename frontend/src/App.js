// "StAuth10244: I Utsavkumar Patel, 000820474 certify that this material is my original work.
//               No other person's work has been used without due acknowledgement. 
//               I have not made my work available to anyone else."

//Material UI website References: https://mui.com/ 

// Starter code for the front-end, includes examples of accessing all server 
// API routes with AJAX requests.
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';




// Material UI is included in the install of the front end, so we have access
// to components like Buttons, etc, when we import them.

function Pets() {
  
  // isLoaded keeps track of whether the initial load of pet data from the
  // server has occurred.  pets is the array of pets data in the table, and 
  // searchResults is the array of pets data after a search request.
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [id, setId] = React.useState(3);
  const [editId, setEditId] = React.useState(3);
  const [animal, setAnimal] = React.useState();
  const [description, setDescription] = React.useState();
  const [price, setPrice] = React.useState();
  const [age, setAge] = React.useState();
  const [buttonName, setbuttonName] = React.useState("Add");
 
  

  // fetches all pet data from the server
  function fetchPets()
  {
    fetch("http://localhost:3001/api?act=getall")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setPets(result);
      })    
  }
  
  // use fetchPets as an effect with an empty array as a 2nd argument, which 
  // means fetchPets will ONLY be called when the component first mounts
  useEffect(fetchPets, []);


  const handleAnimalChange=(event)=>{
    setAnimal(event.target.value);   
}
  const handleDescriptionChange=(event)=>{
     setDescription(event.target.value);
}
  const handleAgeChange=(event)=>{
     setAge(event.target.value);
}
  const handlePriceChange=(event)=>{
     setPrice(event.target.value); 
}
  const handleSearchChange=(event)=>{
     setSearch(event.target.value); 
}

  
  // Inserts a pet with hardcoded data in the URL for each query parameter, we 
  // could insert a pet with custom data by building a string like this:
  //
  // let url = "http://localhost:3001/api?act=add&animal=" + animal + ...
  //
  // fetch(url)
  // .then( ... )...
  //
  function addPet()
  {
    setId(id+1);
    if(id > 0 && animal!=null && description !=null && age > 0 && price > 0 ){
    fetch("http://localhost:3001/api?act=add&id="+id+ "&animal="+animal+"&description="+description +"&age="+age+"&price="+price)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })
      setAnimal("");  
      setDescription("");  
      setAge("");  
      setPrice("");  
      setSearch("");
      setbuttonName("Add");
    }
    else{
        alert(" Please enter all required data and make sure age and price are positive value.");
    }
       
  }

  // Deletes a pet from the pet inventory, using a hardcoded id query parameter
  // Again we could delete a pet with custom data by building a string like:
  //
  // let url = "http://localhost:3001/api?act=delete&id=" + id
  //
  // fetch(url)
  // .then( ... )...
  //
  // 
  function deletePet(newId)
  {
      fetch("http://localhost:3001/api?act=delete&id="+newId)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }


  // Edit a pet in the pet inventory.  Again it fetch data from the table and 
  // gives the user option to change the details of current item in the inventory.
  function editPet(id){
    
    for(let i=0;i<pets.length;i++){
      if(pets[i].id==id){
        
        setAnimal(pets[i].animal);
        setDescription(pets[i].description);
        setPrice(pets[i].price);
        setAge(pets[i].age);
        setbuttonName("Save");
        setEditId(pets[i].id);
      }
      
    }
    
  }
  useEffect(fetchPets, []);


  // Updates a pet in the pet inventory.  Again we use hardcoded data but 
  // could build a custom fetch URL string.
  function updatePet()
  {
    for(let i=0;i<pets.length;i++){

      console.log(i+"="+pets[i].id);
      
      if(pets[i].id==editId){
        fetch("http://localhost:3001/api?act=update&id="+editId+"&animal="+animal+"&description="+description +"&age="+age+"&price="+price)
        .then(res => res.json())
        .then(
          (result) => {
            fetchPets();        
            setAnimal("");  
      setDescription("");
      setPrice("");  
      setSearch("");  
      setAge("");  
      setbuttonName("Add");
      });
      }
    }
  }  
  
  
  // Searches for pets in the pet inventory.  Again we use hardcoded data but
  // we could build a custom fetch URL string.
  function searchPet()
  {
    if(search!=""){
      fetch("http://localhost:3001/api?act=search&term=" + search)
    .then(res => res.json())
    .then(
      (result) => {
        setSearchResults(result);
      });
      
    }
    else{
      let emptyArray=[];
      setSearchResults(emptyArray);
      alert("Enter somthing in search box!! ");
    }
  }

  // If data has loaded, render the table of pets, buttons that execute the 
  // above functions when they are clicked, and a table for search results. 
  // Notice how we can use Material UI components like Button if we import 
  // them as above.
  //

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 align="center"> PET INVENTORY MANAGEMENT </h1>
        <h2  align="center"> LIST OF PETS : </h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ANIMAL</StyledTableCell>
            <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
            <StyledTableCell align="center">AGE &nbsp;</StyledTableCell>
            <StyledTableCell align="center">PRICE &nbsp;</StyledTableCell>
            <StyledTableCell align="center"> EDIT / DELETE &nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {pets.map((row) => (
            <StyledTableRow key={row.id}>

               <StyledTableCell component="th" scope="row" align="center">{row.animal}</StyledTableCell>
               <StyledTableCell align="center">{row.description}</StyledTableCell>
               <StyledTableCell align="center">{row.age}</StyledTableCell>
               <StyledTableCell align="center">{row.price}</StyledTableCell>
               <StyledTableCell align="center">
                  <Button className="tableButton"  size="large"  startIcon={<ModeEditIcon fontSize="inherit"/>} onClick={()=>editPet(row.id)}> </Button>
                  <Button className="tableButton"  size="large"  startIcon={<DeleteIcon fontSize="inherit"/>} onClick={()=>deletePet(row.id)}> </Button>
                </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>

    <h2 align="center"> ADD / UPDATE PETS DETAILS : </h2>

        <Container maxWidth="md">
          <div className="addUpdateContainer">
              <TextField maxRows={5} required id="outlined-required" label="Animal" variant="filled" value={animal} onChange={handleAnimalChange} sx={{ m: 2, width: '40ch' }}/>&nbsp;
              <TextField required id="outlined-required" label="Description" variant="filled" value={description} onChange={handleDescriptionChange} sx={{ m: 2, width: '40ch' }} />&nbsp;<br/>      
              <TextField id="age"label="Age" type="number" InputLabelProps={{shrink: true,}} variant="filled" value={age} onChange={handleAgeChange} sx={{ m: 2, width: '15ch' }}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField id="Price"label="Price" type="number" InputLabelProps={{shrink: true,}} variant="filled" value={price} onChange={handlePriceChange}  sx={{ m: 2, width: '15ch' }}/>
                
              <br/>&nbsp;&nbsp;
              <Button className="addButton" size="large" endIcon={<SendIcon />} variant="contained" color="success" onClick={addPet} sx={{ m: 1}}>{buttonName}</Button>
              <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={updatePet} sx={{ m: 1}}>UPDATE PET DETAILS</Button>
              
        </div>
      </Container>   

      <h2 align="center">SEARCH PET : </h2>
      <Container maxWidth="md">
        <div className="searchContainer">
            <TextField id="Search"label="Search Any Pet Details Here" variant="filled" value={search} onChange={handleSearchChange} sx={{ m: 1, width: '40ch' }}/>   &nbsp;&nbsp;&nbsp;&nbsp;
            <SvgButton onClick={searchPet} variant="filled" sx={{ m: 1.5}}>SEARCH</SvgButton> 
          </div>
        </Container>
        <br />  


        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="caption table">
      <caption>This Table WILL Show List of Pets..</caption>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ANIMAL</StyledTableCell>
            <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
            <StyledTableCell align="center">AGE &nbsp;</StyledTableCell>
            <StyledTableCell align="center">PRICE &nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell align="center">{row.animal}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
        <Avatar alt="Utsavkumar Patel" label="Author" src="/avatar.jpg" />
   </StyledBadge>
   A#6 @copyright Utsavkumar Patel (000820474).. <br/>
      </div>
    );
  }
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



// Search Button Effect Code...
const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
    theme.palette.mode === 'light' ? 'rgb(25,118,210)' : 'rgb(144,202,249)'
  };
  --hover-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(25,118,210,0.04)'
      : 'rgba(144,202,249,0.08)'
  };
  --active-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(25,118,210,0.12)'
      : 'rgba(144,202,249,0.24)'
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});




// Table Designing Code...
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
