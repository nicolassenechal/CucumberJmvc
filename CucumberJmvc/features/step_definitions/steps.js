Given(/I have entered (\d+) in the calculator/, function(value)
{
	ok(true, "Calculator value: "+value)
	S("#calculator").type(value);
});

Given(/I have entered (\d+) and (\d+) in the calculator/, function(value, value2)
{
	ok(true, "Calculator values: "+value+" "+value2)
	S("#calculator").type(value);
});

When(/I press (\w+)/, function(value)
{
	S("#"+value).click();
});

Then(/I should see (\d+) in the calculator/, function(value)
{
	equal(S("#calculator").val(),value);
});