// Marta API key
var martakey = "34127def-ccfe-4ed4-b0d4-2bfd7611807d";

// Using Proxy because idk how CORS works
var queryBase = "https://cors-anywhere.herokuapp.com/developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=" + martakey;

// console log marta API address
console.log("Marta API Address:");
console.log(queryBase);

// Call marta api for full data and pass marta data to marta query
$.ajax({
    url: queryBase,
    method: "GET"
}).done(function(martadata) {
	martaquery(martadata)
});

// ********************** Begin function martaquery **************************
function martaquery(martadata) {
	var martadata = martadata;
	console.log("Full Data:");
	console.log(martadata);
	
	// Variable creation
	var trainNumber = [];
	var nextDestination = [];
	var finalDestination = [];
	var trainDirection =[];

	// locate all current train numbers
	for (var i = 0; i < martadata.length; i++) {
		trainNumber.push(martadata[i].TRAIN_ID);
		trainDirection.push(martadata[i].DIRECTION);
		finalDestination.push(martadata[i].DESTINATION);
	}
	
	// remove duplicate train numbers
	function onlyUnique(value, index, self) { 
   		return self.indexOf(value) === index;
	}
	
	var uniqueTrains = trainNumber.filter(onlyUnique);

	// associate a direction with all trains
	var uniqueDirection =[];
	for (var i = 0; i < uniqueTrains.length; i++) {

		function findDirection(martadata) { 
			return martadata.TRAIN_ID === uniqueTrains[i];
		}
		
		uniqueDirection.push((martadata.find(findDirection).DIRECTION));
	}

	// Associate a final destination with all trains
	var uniqueDestination =[];
	for (var i = 0; i < uniqueTrains.length; i++) {

		function findDestination(martadata) { 
			return martadata.TRAIN_ID === uniqueTrains[i];
		}
		
		uniqueDestination.push((martadata.find(findDestination).DESTINATION));
	}
	
	// log all unique values
	console.log("Unique Trains:");
	console.log(uniqueTrains);
	console.log("Corresponding Direction:");	
	console.log(uniqueDirection);
	console.log("Corresponding End Location:");
	console.log(uniqueDestination);
	// Create object child for each train
	var allTrains = {};
	allTrains["trainId"] = [];
	allTrains["trainDirection"] = [];
	allTrains["finalDestination"]= [];
	for (var i = 0; i < uniqueTrains.length; i++) {
		// allTrains["Train-ID " +i] = uniqueTrains[i];
		// allTrains["Train-Direction " +i] = uniqueDirection[i];
		
		allTrains.trainDirection.push(uniqueDirection[i]);
		allTrains.trainId.push(uniqueTrains[i]);
		allTrains.finalDestination.push(uniqueDestination[i]);
	}

	console.log(allTrains);
	
	for (var i = 0; i < uniqueTrains.length; i++) {
		
		$('#targetbody').append($('<tr>')	
    		.append($('<td>').append(i))
    		.append($('<td>').append(allTrains.trainId[i]))
    		.append($('<td>').append(allTrains.trainDirection[i]))
    		.append($('<td>').append("TBD"))
    		.append($('<td>').append("TBD"))
    		.append($('<td>').append(allTrains.finalDestination[i]))
  		)

	}




}
// ********************** End function martaquery ***************************

