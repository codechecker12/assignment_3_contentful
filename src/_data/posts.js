
const contentful = require('contentful');

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer'); 

const client = contentful.createClient({
  space: 'MY_SPACE_ID',
  accessToken: 'MY_ACCESS_TOKEN',
});

module.exports = async () => {
  return client.getEntries({ content_type: 'blogPage', order: 'sys.createdAt'})
  .then(function(response){
    return response.items.map(blogPage => ({
      title: blogPage.fields.title,
      slug: blogPage.fields.slug,
      image: blogPage.fields.image?.fields?.file?.url,
      content:documentToHtmlString(blogPage.fields.content),
    }));
  }).catch(console.error)
  
};

