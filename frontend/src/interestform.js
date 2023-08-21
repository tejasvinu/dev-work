// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  Chip,
  Paper,
  Grid,
} from '@mui/material';

function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  const handleAddInterest = () => {
    if (interest) {
      setInterests([...interests, interest]);
      setInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user-data', {
        name,
        age,
        education,
        interests,
        location, // Include location data
      });
      // Reset the form after submission
      setName('');
      setAge('');
      setEducation('');
      setInterests([]);
      setLocation('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Collect User Information</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Education"
          variant="outlined"
          fullWidth
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
        <TextField
          label="Interest"
          variant="outlined"
          fullWidth
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddInterest}
        >
          Add Interest
        </Button>
        <br />
        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          value={location?.latitude || ''}
          disabled
        />
        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          value={location?.longitude || ''}
          disabled
        />
        <br />
        <Paper elevation={3} style={{ marginTop: '20px', padding: '10px' }}>
          <Typography variant="h6">Interests:</Typography>
          <Grid container spacing={1}>
            {interests.map((item, index) => (
              <Grid item key={index}>
                <Chip
                  label={item}
                  onDelete={() => handleRemoveInterest(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default UserForm;
