import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: #F5F5F5;
  }

  body, input, button {
    font-family: Roboto, sans-serif;
  }
`;