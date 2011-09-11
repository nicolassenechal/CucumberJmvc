Given(/I have entered (\d+) in the calculator/, function(value)
{
	S("#calculator").type(vale);
});

When(/I press (\w+)/, function(value)
{
	S("#"+value).click();
});

Then(/I should see (\d+) in the calculator/, function(value)
{
	equal($("#calculator").value(),value);
});