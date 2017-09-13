// class User{
// 	register(){
// 		console.log("User Registered...");
// 	}
// }
//=use of classes
"use strict";
/*
class User{
	constructor(username, email, password){
		this.username   = username;
		this.email      = email;
		this.password   = password;
	}

	static countUsers(){
		console.log("There are 50 Users.");
	}

	register(){
		console.log(this.username + " is now Registered...");
	}
}
*/

//====method to call a function of a class
//let bob = new User("bob", "bob@gmail.com", "dugar12345");
//bob.register();

//====static method calling process
//User.countUsers();

/*class Member extends User{
	constructor(username, email, password, memberPackage){
		super(username, email, password);
		this.package = memberPackage;
	}

	getPackage(){
		console.log(this.username + " is subscribed to the package " + this.package);
	}
}
*/

//===member class
//let mike = new Member("mike", "mike@gmail.com", "dugar12345", "standard");
//mike.getPackage();
//==============


//=templating

// let name = 'john';
// function makeUpperCase(word){
// 	return word.toUpperCase();
// }

// let template = 
// `<h3>${makeUpperCase("Hello")}, ${name}</h3>
// <p>This is a simple template in JS</p>`;

// document.getElementById('template').innerHTML = template;

//=================================================================

//=======================new string and number method
//let theString = "Hello, this is to test please take care.";

//=starts with
//console.log(theString.startsWith("Hello"));

//===ends with 
//console.log(theString.endsWith("care"));

//===includes
//console.log(theString.includes("test archit"));

//====number method
//-hexa
//console.log(0xFF);

///-----binary
//console.log(0b101011)
//console.log(Number.isInteger(4))
//=====================================================

//==================default params and spread method

// function greet($greeting = "Hello"){
// 	console.log($greeting);
// }

// greet();

// let args1 = [1,2,3];
// let args2 = [1,2,3];
// function test(){
// 	console.log(args);
// }

// //test.apply(null, args);

// test(...args);

//===================================================

//========new data structures
// let myArray = [11,22,34,65,71];
// let mySet = new Set(myArray);
// mySet.add(100);
// mySet.add({a : 1, b : 2})
// mySet.delete(22);
// //mySet.clear();

// console.log(mySet.size)

// mySet.forEach(function(val){
// 	console.log(val)
// })


// let carWeakSet = new WeakSet();
// let car1 = {
// 	'make' : 'honda',
// 	'model' : 'civic'
// };
// carWeakSet.add(car1);
// console.log(carWeakSet)

//===========================


//===========arrow function

// function prefixer(prefix){
// 	this.prefix = prefix;
// }

// prefixer.prototype.prefixArray = function(arr){
// 	return arr.map((x) => {
// 		console.log(this.prefix + x)
// 	})
// }

// let pre = new prefixer("hello ");
// pre.prefixArray(["brad", "jeff"])


// let add = (a,b) => {
// 	let sum = a + b;
// 	console.log(sum);
// 	return false;
// }

// add(2,4);
//=========================

//========================Promise=========
//=immediately resolved promise

//var myPromise = Promise.resolve('Foo');
//myPromise.then((res) => console.log(res));
// var myPromise = new Promise(function(resolve, reject){
// 	setTimeout(() => resolve(4),2000)
// });


// myPromise.then((res) => {
// 	res += 3;
// 	console.log(res);
// })


// function getData(method, url){
// 	return new Promise(function(resolve, reject){
// 		var xhr = new XMLHttpRequest();
// 		xhr.open(method, url);
// 		xhr.onload = function(){
// 			if(this.status >= 200 && this.status <= 300){
// 				resolve(this.response);
// 			}else{
// 				reject({
// 					status : this.status,
// 					statusText : this.statusText
// 				})
// 			}
// 		};

// 		xhr.onerror = function(){
// 			reject({
// 				status : this.status,
// 				statusText : this.statusText
// 			})
// 		}
// 		xhr.send();
// 	});
// }

// getData("GET", "https://jsonplaceholder.typicode.com/todos").then((res) => {
// 	console.log(res)
// 	let todos = JSON.parse(res);
// 	let output = '';
// 	for(let todo of todos){
// 		output += `
// 			<div><h3>${todo.title}</h3></div>
// 		`;
// 	}
// 	document.getElementById("template").innerHTML = output
// });
//=========================================

//========generators
// let regeneratorRuntime =  require("babel-polyfill");
// function *g1(){
// 	console.log("hello");
// 	yield 'Yield 1 ran...';
// 	console.log("world");
// 	yield 'Yield 1 ran...';
// }

// var g = g1();

// console.log(g.next())

//==================