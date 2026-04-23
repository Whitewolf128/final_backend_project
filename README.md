--Summarize the features into a concise summary.

package installations:
    npm init -y
    npm install typescript ts-node @types/node --save-dev
    npm install express
    npm install @types/express --save-dev
    npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
    npm install morgan @types/morgan
    npm install firebase-admin
    npm install joi
    npm install @types/joi --save-dev
    npm install swagger-ui-express swagger-jsdoc
    npm install -D @redocly/cli
    npm install dotenv
    npm install helmet
    npm install cors
    npm install express multer
    npm install -D typescript ts-node-dev @types/node @types/express @types/multer

    --if fs is having a problem, then do these:
    npm install --save-dev @types/node
    then put "types": ["node"], in the tsconfig

    **Used multer for uploading files which pastes them into a a file called uploads. The file is named with a timestamp and the original name. The service returns the file information back to the user. The controller checks if a file was uploaded and then calls the service.**
    see the new component plan for more details on the implementation.

    **biggest challenge was the unit testing, had so many issues with the import statements.

    ** the best thing that happened was making the upload file component working completely in the second milestone, it was a huge relief and confidence boost. sure the first attempt was not with multer which made me do more research but I found that very easily.

    ***all crud operations are in working order on postman.

    ****next steps: fix the validation for the file upload and make sure it works right, then make it work with the frontend and add it to the musicRoutes stuff.
    
    ***** when creating new files make sure to import all the necessary modules and to export the functions at the end of the file, I had a lot of issues with that and it was a huge time waster. also make sure to check the import paths, I had a lot of issues with that as well.
    even though they may have been imported correctly they may still have issues for some reason.

    ******I did have to use the github copilot for fixing some of the issues I was having and to help explain what was wrong with my code.
