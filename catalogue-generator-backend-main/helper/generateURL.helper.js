const generateProductURL = (name) => {
    // Replace spaces with hyphens, remove invalid characters, and convert to lowercase
    // return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-&]/g, "").toLowerCase();

    //Slug
    return name.toString().trim().toLowerCase().split(" ").join("-");
};

module.exports = generateProductURL;
