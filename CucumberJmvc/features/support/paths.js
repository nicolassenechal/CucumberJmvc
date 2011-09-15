function path_to(page_name)
{
	var return_value = [];
	if(/the home\s?page/.test(page_name))
	{
		return_value.push("index.html");
	}
	if(/the second page/.test(page_name))
	{
		return_value.push("page2.html");
	}
	
	if(!return_value.length)
	{
		throw new Error("Page unknown", page_name);
	}
	if(return_value.length>1)
	{
		throw new Error("Too many possible paths found for the page", page_name, return_value);
	}	
	return return_value[0];
}