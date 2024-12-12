const contentful = require('contentful');

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer'); 

const client = contentful.createClient({
  space: 'MY_SPACE_ID',
  accessToken: 'MY_ACCESS_TOKEN',
});

module.exports = async () => {
  return client.getEntries({ content_type: 'lab02', order: 'sys.createdAt'})
  .then(function(response){
    return response.items.map(lab02 => ({
      title: lab02.fields.title,
      content:documentToHtmlString(lab02.fields.content),
    }));
  }).catch(console.error)
  
};
