/*
	Copyright 2018 [4ddev *see github.com/4ddev]

	Permission is hereby granted, free of charge, to any person obtaining a copy 
	of this software and associated documentation files (the "Software"), 
	to deal in the Software without restriction, including without limitation 
	the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software 
	is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be 
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
	DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
	OTHER DEALINGS IN THE SOFTWARE.
*/
/** 
 * Attention!: You have to write a configuration File for this server
 *             to run properly 
 * It is possible to configure any part of this Server 
 * Look at 'configuration.json' for an example
*/
const serverConfiguration = require('./configuration.json');
const Communication = require('./Communication/ConnectionController');

// Creates the pipelines and the whole communication of this server 
// also this Controller handles the complete frontend and Backend Communication
console.log(serverConfiguration);
const connection = new Communication.ConnectionController(  serverConfiguration );
