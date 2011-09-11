jQuery.get('test.feature', function(data) 
{
    var lines = data.replace(/\n\n/g,"\n").replace(/\r/g,"").split("\n");
    var tests = [];
    
    var previous = null;
    var tests = [];
    for(var i=0;i<lines.length;i++)
    {
		var match =  lines[i].match(/^(Given|When|Then|And) (.+)$/);
		var test;
		if(match)
		{
			if("Given" == match[1])
			{
				test = [];
				tests.push(test);
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
			for(var j=0;j<statements[previous.toLowerCase()].length;j++)
			{
				var res = match[2].match(statements[previous.toLowerCase()][j].regex);
				if(res)
				{
					matches.push({step:statements[previous.toLowerCase()][j].step,variables:res.splice(0,1)});
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
				test.push(matches[0]);
			}	
		}
		else
		{
			throw new Error("Badly formed line",lines[i]);
		}	
    }
    for(i=0;i<tests.length;i++)
    {
    	for(j=0;j<tests[i].length;j++)
    	{
    		var test = tests[i][j];
    		test.step(test.variables);
    	}
    }	
    
    
});