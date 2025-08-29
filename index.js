const express = require('express');
const app = express();

app.use(express.json());

// 🔹 Your details (replace with your info)
const FULL_NAME = 'john_doe'; // lowercase with underscore
const DOB = '17091999'; // ddmmyyyy
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

// 🔹 Function to process data
function processData(data) {
  let odd_numbers = [];
  let even_numbers = [];
  let alphabets = [];
  let special_characters = [];
  let sum = 0;

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      // number
      let num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) even_numbers.push(item);
      else odd_numbers.push(item);
    } else if (/^[a-zA-Z]+$/.test(item)) {
      // alphabets
      alphabets.push(item.toUpperCase());
    } else {
      // special chars
      special_characters.push(item);
    }
  });

  // 🔹 Concat string (reverse + alternating caps)
  let concatStr = alphabets
    .join('')
    .split('')
    .reverse()
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string: concatStr,
  };
}

// 🔹 POST /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, error: 'Invalid input' });
    }
    return res.status(200).json(processData(data));
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
});

module.exports = app; // ✅ needed for Vercel
if (require.main === module) {
  app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
  });
}
