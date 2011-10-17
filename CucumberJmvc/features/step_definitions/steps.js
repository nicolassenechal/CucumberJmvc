Given(/I have entered (\d+) in the calculator/, function(value)
{
	S("#calculator").type(value);
});

Given(/I have entered (\d+) and (\d+) in the calculator/, function(value, value2)
{
	S("#calculator").type(value);
	S("#calculator2").type(value2);
	
});

When(/I press (\w+)/, function(value)
{
	S("#"+value).click();
});

Then(/I should see (\d+) in the result/, function(value)
{
	S("body").exists(function()
	{
		console.log("val", S("#result").val())
		//Rewrite equal, ok... as blocking Funcunit steps
		equal(S("#result").val(),value);
	})

});