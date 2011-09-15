var CucumberJmvc = {};

CucumberJmvc.statements = {given:[],when:[],then:[]};

var Given = function(regex, step)
{
	CucumberJmvc.statements.given.push({regex:regex,step:step});
};

var When = function(regex, step)
{
	CucumberJmvc.statements.when.push({regex:regex,step:step});
};

var Then = function(regex, step)
{
	CucumberJmvc.statements.then.push({regex:regex,step:step});
};

CucumberJmvc.runFeature = function(filePath)
{
	FuncUnit.jquery.ajax({
		  url: filePath,
		  beforeSend: function(xhr) 
		  {
		    xhr.overrideMimeType( 'text/plain; charset=x-user-defined' );
		  },
		  error: function(jqXHR, textStatus, errorThrown)	
		  {
				console.log(arguments);
		  },
		  success: function( data ) 
		  {  
			/** Maybe define setup with Feature definition ? **/
			module("Test",{
				setup : function(){
					
				}
			});
			
		    var lines = data.replace(/\n\n/g,"\n").replace(/\r/g,"").split("\n");
		   
		    var tests = [];
		    
		    var previous = null;
		
		    var createTest = function(testArray)
		    {
		    	test("Random test", function()
		    	{
		    		for(var i=0;i<testArray.length;i++)
			    	{
			    		var myTest = testArray[i];
			    		myTest.step(myTest.variables);
			    	}
		    	});
		    }
		    var testArray;
		    for(var i=0;i<lines.length;i++)
		    {
		    	
				var match =  lines[i].match(/^(Given|When|Then|And) (.+)$/);
				if("" == lines[i])
				{
					//Nothing to do
				}
				else if(match)
				{
					if("Given" == match[1])
					{
						if(testArray)
						{
							createTest(testArray);
						}
						testArray = [];
					}	
					if("Given" != match[1] && !previous)
					{
						throw new Error("First line needs to start with Given");
					}	
					if("And" != match[1])
					{
						previous = match[1];
					}
					var matches = [];
					for(var j=0;j<CucumberJmvc.statements[previous.toLowerCase()].length;j++)
					{
						var res = match[2].match(CucumberJmvc.statements[previous.toLowerCase()][j].regex);
						if(res)
						{
							matches.push({step:CucumberJmvc.statements[previous.toLowerCase()][j].step,variables:res.splice(0,1)});
						}	
					}	
					if(!matches.length)
					{
						throw new Error("Missing statement",lines[i]);
					}
					else if(matches.length>1)
					{
						throw new Error("Too many statements", lines[i], matches);
					}
					else
					{
						testArray.push(matches[0]);
					}	
				}
				else
				{
					throw new Error("Badly formed line",lines[i]);
				}	
		    }
		    createTest(testArray);
		    QUnit.start();
		  }
	});
};