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
const Message = require('./Message').Message;

class Login extends Message{

}

class Success extends Message {
	constructor( code ){
		this.code = code;
	}
}

/**
 * Add your Modules to this Summary 
 */
module.exports = {
	CreateMailUser: require('./ServerConfigPackage/Mail/CreateMailUser').CreateMailUser,
	GetMailUser: require('./ServerConfigPackage/Mail/GetMailUser' ).GetMailUser,
	ChangeMailUserPassword: require('./ServerConfigPackage/Mail/ChangeMailUserPassword').ChangeMailUserPassword,
	RemoveMailUser: require( './ServerConfigPackage/Mail/RemoveMailUser' ).RemoveMailUser,
	VactionMessage: require( './ServerConfigPackage/Mail/VacationMessage').VacationMessage,

	AddServer: require( './ServerConfigPackage/ServerManagement/AddServer' ).AddServer,
	GetServer: require( './ServerConfigPackage/ServerManagement/GetServer' ).GetServer,
	RemoveServer: require( './ServerConfigPackage/ServerManagement/RemoveServer' ).RemoveServer,
}
