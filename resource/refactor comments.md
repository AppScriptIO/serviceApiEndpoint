/**
Schema: 
fieldname: "personalInfo" --> database/resolver/aggregationPatternResolver.js({databaseTabel: 'personalInfo'})

fieldName: "ui" --> database/resolver/aggregationPatternResolver.js({databaseTabel: 'ui'})
  fieldName: 'title' --> database/resolver/extractFieldFromParentDataset.js

fieldName: "article",  --> database/resolver/aggregationPatternResolver.js({databaseTabel: 'article'})
  fieldName: 'title' --> database/resolver/extractFieldFromParentDataset.js
  fieldName: 'paragraph' --> database/resolver/extractFieldFromParentDataset.js
*/

/**
Api engpoint middleware graph: 
> Request body parser.

/content --> apiContentMessage middleware
/content/* --> apiSchema.js
*/
