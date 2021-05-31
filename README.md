# CSC308

** Javascript Style Guide / Formatter **  
Prettier -  
https://prettier.io/  
Open VSCode, install Prettier extension  
Use before pushing updates to js/jsx files: in command line, execute 'npx prettier --write .'

** Python Style Guide / Linter **  
Pylint (PEP8) -  
https://www.pylint.org/  
Execute command in terminal: python -m pip install pylint  
Open VSCode, ctrl+shift+P <Python: Select Linter>  
To use: save file, or ctrl+shift+P <Python: Run Linter>  
        outputs to Problems tab
        
** Running frontend **\
In frontend directory, execute 'npm install', then 'npm start'\
\
** Running backend **\
In backend directory, execute 'pipenv shell'\
Execute 'export FLASK_APP=app.py', then 'export FLASK_ENV=development'\
Execute 'flask run'\
\
** Running local unit/integration tests **\
In backend directory, execute 'pytest testing.py'\
\
** Travis CI **\
https://travis-ci.com/github/ericta-portfolio/CSC308-PolySnaps\
\
** Heroku CD **\
dashboards: \
backend - https://dashboard.heroku.com/apps/polysnaps-be\
frontend - https://dashboard.heroku.com/apps/polysnaps-fe\
deployed apps:\
backend - https://polysnaps-be.herokuapp.com/\
frontend - https://polysnaps-fe.herokuapp.com/\
\
** Code Coverage Report **

<img width="289" alt="Screen Shot 2021-05-31 at 1 01 28 PM" src="https://user-images.githubusercontent.com/67278790/120242027-d4cadb80-c218-11eb-95ba-1b3177431465.png">
