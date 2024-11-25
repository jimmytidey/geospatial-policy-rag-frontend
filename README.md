# Local Plans Geospatial RAG prototype

This project explores using AI process policy documents as mapped data.

It uses planning policy in England, a topic where its easy to find lots of publicly available policy documents.

Planning in England is guided bythe The National Planning Policy Framework - the national guide to built environment policy.

Local PLans are the key document that guides the built environment in every Local Authority in England. Local Plans respond to the NPPF.

In turn, Neighbourhood Plans are informed by Local Plans, and are for smaller areas within Local Authorities.

This experiment investigates building a RAG that has features to support:

- Hierarchical sets of policy documents (NPPF->Local Plans->Neighbourhood Plans)
- Documents with geospatial domains (policys about locations and areas.)

# Structure

- This is the front end code
- Data processing pipeline: https://github.com/jimmytidey/geospatial-policy-rag-pipeline
- API: https://github.com/jimmytidey/geospatial-policy-rag-api

# Deploying

npm run build
git push heroku main

- This project contains all the configuration necessary to deploy to a Heroku instance
- To connect the API, set VITE_API_PATH in the .env file (The API code: https://github.com/jimmytidey/geospatial-policy-rag-api )

# Running locally

npm run dev
To connect to the API, set VITE_API_PATH in the .env.development file
