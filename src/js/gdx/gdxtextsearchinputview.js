function initializeTextSearchInputView(){

	indexesParentElement = "textSearchInputPanel2";
	
	document.getElementById("textSearchInputResultsView").style.display = "none";
	
	//Create text fields
    $("#textSearchInputValueField").jqxInput({ width: '100%', height: componentHeight });
    
    //Create buttons
    $("#textSearchInputSubmitButton").jqxButton({ width: '100%', height: componentHeight });
    
    //Add event listeners
    $('#textSearchInputSubmitButton').on('click', function (event) {
    	
    		document.getElementById("gdxWaitWindowMessage").innerHTML = "Please wait while data is loaded from Geodex.org.";
		$('#gdxWaitWindow').jqxWindow('open');
    	
		if(mainData.getSelectedProviders().length==mainData.getProviders().length){
			var keyArray = ["q", "s", "n"];
    			var valueArray = [$("#textSearchInputValueField").jqxInput("val"), "0", "100"];
			performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCHSET, keyArray, valueArray, updateAfterTextindexSearchset);
		}else{
			/*for(var i=0; i<mainData.getSelectedProviders().length; i++){
				var provider = mainData.getSelectedProviders()[i];
				var keyArray = ["q", "s", "n", "i"];
    				var valueArray = [$("#textSearchInputValueField").jqxInput("val"), "0", "100", provider.getIndex()];
				performWebServiceCall(WebServiceActions.TEXTINDEX_SEARCH, keyArray, valueArray, updateAfterTextindexSearch);
			}*/
		}
		
	});
    
    //Create wait window 
    $('#gdxWaitWindow').jqxWindow({  
    		title: 'Please Wait...',
    		width: 400,
        height: 140, 
        resizable: true,
        autoOpen: false,
        isModal: true
    });
    
    //Call and get current providers list
    var keyArray = [];
   	var valueArray = [];
    performWebServiceCall(WebServiceActions.TYPEAHEAD_PROVIDERS, keyArray, valueArray, updateAfterTypeaheadProviders);
    
}

function updateAfterTypeaheadProviders(data){
	mainData.processProviders(data);
	initializeIndexCheckBoxes();
}

function gotoTextSearchResultsView(){
	document.getElementById("textSearchInputView").style.display = "none";
	document.getElementById("textSearchResultsView").style.display = "block";
}

function updateAfterTextindexSearchset(data){
	$('#gdxWaitWindow').jqxWindow('close');
	mainData.populateSelectedProviderTextResults(data);
	gotoTextSearchResultsView();
}

function updateAfterTextindexSearch(data){
	$('#gdxWaitWindow').jqxWindow('close');
	mainData.populateSelectedProviderTextResults(data);
}