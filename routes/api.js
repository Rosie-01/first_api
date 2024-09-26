var express = require('express');
// const { request, response } = require('../app');
var router = express.Router();

let subscribers = [];

router.get('/', (request, response) => {
  return response.status(200).send('Hi, how are you doing .....?');
});

// homework .. create a DELETE METHOD FOR THE subscribe ENDPOINT THAT REMOVES A SUBSCRIBER BASED ON THE EMAIL ..IF THE EMAIL IS NOT FOUND .. SEND BACK A RESPONSE EMAIL NOT FOUND, BUT IF EMAIL IS FOUND REMOVED THE EMAIL AND THEN SENDS BACK A RESPONSE OF EMAIL DELETED SUCCESSFULLY

router.post('/subscribe', (request, response) => {
  const email = request.body['email'];
  subscribers.push(email);
  return response.status(200).send('Data recieve successfully');
});

router.get('/subscribe', (request, response) => {
  const form = `<form method='post'>
    <input type='email' required placeholder='subscribe with your email' name='email'>
    <button type='submit'>Submit </button>
    </form>`;
  return response.status(200).send(form);
});

router.get('/subscriber/delete', (request, response) => {
  let select_tag = "<select name='email' required>";
  subscribers.forEach((email, index) => {
    select_tag += `<option value='${index}'> ${email} </option>`;
  });
  select_tag += '</select>';
  const delForm = `<h2 align='center'>Select a user to delete </h2><form method='delete' action='/subscriber/delete'>
      ${select_tag}
    <button type='submit'>Delete </button>
    </form>`;

  return response.status(200).send(delForm);
});

router.delete('/subscriber/delete', (request, response) => {
  const email_index = Number(request.body['email']);
  let new_subscribers = [];
  let was_found = false;
  subscribers.forEach((email, index) => {
    if (index == email_index) {
      was_found = true;
    } else {
      new_subscribers.push(email);
    }
  });
  subscribers = new_subscribers;
  if (was_found) {
    return response.status(200).json({
      message: 'Email deleted successfully',
    });
  } else {
    return response.status(404).json({
      message: 'Email not found',
    });
  }
});

router.get('/subscribers', (request, response) => {
  return response.status(200).json(subscribers);
});

module.exports = router;

/*
  create a router named appuser 
  create diff end point for logining in a user , signing up a user 
  for the sign up the route should collect four parameters :
  1. email 2. username 3. password 1 4.password 2 

  hence if the request body doesn't have the required parameters return ajson message saying one or more of the required parameters are missing
  cross check if password 1 and password2 are the same send a json message "both password doesnt match"
*/ 