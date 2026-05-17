const express = require('express');
const router = express.Router();
const BmiRecord = require('../models/BmiRecord');

// Welcome page
router.get('/', (req, res) => {
  res.render('welcome'); 
});

// BMI
router.get('/bmi-stats', (req, res) => {
  res.render('bmi'); 
});

// Medical condition form
router.get('/medical', (req, res) => {
  res.render('medical'); // medical.ejs
});

// BMI calculation 
router.post('/bmi-stats', async (req, res) => {
  const { weight, height } = req.body;

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  let status = '';

  if (bmi < 18.5) status = 'Underweight';
  else if (bmi < 25) status = 'Normal Weight';
  else if (bmi < 30) status = 'Overweight';
  else status = 'Obese';

  try {
    await BmiRecord.create({
      weight,
      height,
      bmi,
      status
    });

    res.render('medical', { bmi, status });
  } catch (err) {
    console.error(" Failed to save BMI:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.get('/fitness-selection', (req, res) => {
  res.render('fitnessSelection');
});


router.post('/submit-medical', async (req, res) => {
  const conditions = req.body['conditions[]'] || req.body.conditions;

  try {
    

    res.redirect('/fitness-selection');
  } catch (err) {
    console.error("Error updating medical conditions:", err);
    res.status(500).send('Error saving medical conditions');
  }
});

router.post('/submit-fitness-goals', async (req, res) => {
  try {
    const { weight, height, conditions, focus_areas, fitness_goals } = req.body;

  
  


    res.render('workout')
  } catch (err) {
    console.error('Error saving BMI record:', err);
    res.status(500).send('Server error');
  }
});





module.exports = router;
