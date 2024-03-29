var CucumberJmvc = {};

CucumberJmvc.statements =[];

Given = When = Then = function(regex, step)
{
	CucumberJmvc.statements.push({regex:regex,step:step});
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
			module("Test",
			{
				setup : function()
				{
					
					//S.open(path_to("the homepage"));
				}
			});
			
		    var lines = data.replace(/\n\n/g,"\n").replace(/\r/g,"").split("\n");
		   
		    var tests = [];
		    
		    var title = null;
		    var context = this;
		    
		    /**
		     * Needs to be in a different context than test()
		     * @param test
		     * @returns
		     */
		    var add = function(test)
		    {
		    	 FuncUnit.add({
	    				method: function(success, error){
	    					success();
	    				},
	    				callback: function()
	    				{
	    					test.step.apply(context, test.variables);
	    				},
	    				error: "Error in step",
	    				bind: this
	    			});
		    };
		    
		    var createTest = function(testArray, title)
		    {
		    	test(title, function()
		    	{
		    		for(var i=0;i<testArray.length;i++)
			    	{
			    		add(testArray[i]);
			    	}
		    	});
		    };
		    
		    var createModule = function(testArray)
		    {
		    	module("Module", 
		    	{
		    		setup: function()
		    		{
		    			for(var i=0;i<testArray.length;i++)
				    	{
				    		add(testArray[i]);
				    	}
		    		}		    		
		    	});
		    };
		    var testArray;
		    var setBackground = false;
		    for(var i=0;i<lines.length;i++)
		    {
		    	//Empty module. Necessary but ugly... Can do better
		    	if(i==0)
		    	{
		    		createModule([]);
		    	}
				var match =  lines[i].match(/^(Given|When|Then|And|But|Scenario:|Background:) (.+)$/);
				if("" == lines[i])
				{
					//Nothing to do
				}
				else if(match)
				{
					if("Background:" == match[1])
					{
						setBackground = true;
					}
					else if("Scenario:" == match[1])
					{
						if(testArray)
						{
							if(setBackground)
							{
								createModule(testArray);
								setBackground = false;
							}
							else
							{
								createTest(testArray, title);
							}	
						}
						testArray = [];
						title = match[2];
					}	
					else
					{
						var matches = [];
						for(var j=0;j<CucumberJmvc.statements.length;j++)
						{
							var res = match[2].match(CucumberJmvc.statements[j].regex);
							if(res)
							{
								matches.push({step:CucumberJmvc.statements[j].step,variables:res.splice(1,res.length-1)});
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
				}
				else
				{
					throw new Error("Badly formed line",lines[i]);
				}	
		    }
		    
		    createTest(testArray, title);
		   
		  }
	});
};
