var statements = {given:[],when:[],then:[]};

var Given = function(regex, step)
{
	statements.given.push({regex:regex,step:step});
};

var When = function(regex, step)
{
	statements.when.push({regex:regex,step:step});
};

var Then = function(regex, step)
{
	statements.then.push({regex:regex,step:step});
};